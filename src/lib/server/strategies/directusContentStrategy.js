import { RESEND_API_KEY } from '$env/static/private'
import { DIRECTUS_URL } from '$lib/server/directus.js'
import { fail } from '@sveltejs/kit'
import { Resend } from 'resend'

const DIRECTUS_ITEMS_BASE = `${DIRECTUS_URL}/items`
const DIRECTUS_FILES_BASE = `${DIRECTUS_URL}/files`

const COLLECTIONS = {
	documents: { path: 'adconnect_documents', key: 'id', fileFields: ['hero_image', 'source_file'] },
	categories: { path: 'adconnect_categories', key: 'id' },
	themes: { path: 'adconnect_themes', key: 'id', fileFields: ['hero'] },
	events: { path: 'adconnect_events', key: 'id', fileFields: ['hero'] },
	cooperations: { path: 'adconnect_cooperation', key: 'id' },
	news: { path: 'adconnect_news', key: 'uuid', fileFields: ['hero'] },
	nominations: { path: 'adconnect_nominations', key: 'id', fileFields: ['profile_picture'] },
	faqs: { path: 'adconnect_faqs', key: 'id' },
	lados: { path: 'adconnect_lados', key: 'id' },
	courses: { path: 'adconnect_courses', key: 'id' },
	sectoralAdvisoryBoards: { path: 'adconnect_sectoral_advisory_boards', key: 'id' }
}

function getConfig(contentType) {
	const config = Object.hasOwn(COLLECTIONS, contentType) ? COLLECTIONS[contentType] : undefined
	if (!config) throw new Error(`Onbekend content type: '${contentType}'`)
	return config
}

export class DirectusContentStrategy {
	#resend = new Resend(RESEND_API_KEY)

	async #fetchCollection(path, id = null, fields = null, filters = null, accessToken = null) {
		try {
			const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {}

			let url
			if (id) {
				url = new URL(`${DIRECTUS_ITEMS_BASE}/${path}/${id}`)
			} else {
				url = new URL(`${DIRECTUS_ITEMS_BASE}/${path}`)
			}

			if (fields) url.searchParams.set('fields', fields)
			if (filters) url.searchParams.set('filter', JSON.stringify(filters))

			const res = await fetch(url, { headers })
			const json = await res.json()
			if (!res.ok || json.data === undefined) {
				const error = new Error(`No data returned for ${path}: ${JSON.stringify(json)}`)
				if (res.status !== 403) {
					console.error(error)
				}
				return { items: [], error }
			}
			return { items: json.data, error: null }
		} catch (err) {
			console.error(`Failed to fetch ${path}:`, err)
			return { items: [], error: err }
		}
	}

	async #resolveFolderId(folderName, accessToken) {
		try {
			const url = new URL(`${DIRECTUS_URL}/folders`)
			url.searchParams.set('fields', 'id')
			url.searchParams.set('filter[name][_eq]', folderName)
			url.searchParams.set('limit', '1')

			const res = await fetch(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			})

			if (!res.ok) return null
			const json = await res.json()
			const folder = json?.data?.[0] ?? null
			if (!folder) return null
			return folder.id
		} catch (err) {
			console.error(`[resolveFolderId] Failed to resolve folder '${folderName}':`, err)
			return null
		}
	}

	async fetchContent(contentType = null, id = null, fields = null, filters = null, asMap = false, accessToken = null) {
		const entries = contentType ? [[contentType, getConfig(contentType)]] : Object.entries(COLLECTIONS)

		const results = await Promise.all(entries.map(([, cfg]) => this.#fetchCollection(cfg.path, id, fields, filters, accessToken)))

		const errors = []
		const dataObj = {}

		entries.forEach(([name, cfg], index) => {
			const { items = [], error } = results[index] ?? {}
			const itemList = Array.isArray(items) ? items : items ? [items] : []

			if (error) {
				errors.push({ collection: name, message: error.message ?? String(error) })
			}

			const normalized = itemList.map((item) => (cfg.key !== 'id' && item[cfg.key] !== undefined && item.id === undefined ? { ...item, id: item[cfg.key] } : item))

			const collectionMap = new Map(normalized.map((item) => [item[cfg.key], item]))
			dataObj[name] = asMap ? collectionMap : Array.from(collectionMap.values())
		})

		return { data: dataObj, errors }
	}

	async publishContent(id, contentType, accessToken = null) {
		if (!accessToken) {
			return fail(403, { error: 'Publiceren mislukt: Unauthorized' })
		}
		const config = getConfig(contentType)
		const res = await fetch(`${DIRECTUS_ITEMS_BASE}/${config.path}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify({ status: 'published' })
		})

		if (!res.ok) {
			return fail(res.status, { error: 'Publiceren mislukt.' })
		}
		return { success: true }
	}

	async depublishContent(id, contentType, accessToken = null) {
		if (!accessToken) {
			return fail(403, { error: 'Depubliceren mislukt: Unauthorized' })
		}

		const config = getConfig(contentType)
		const res = await fetch(`${DIRECTUS_ITEMS_BASE}/${config.path}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify({ status: 'draft' })
		})

		if (!res.ok) {
			return fail(res.status, { error: 'Depubliceren mislukt.' })
		}
		return { success: true }
	}

	async deleteContent(id, contentType, accessToken = null) {
		if (!accessToken) {
			return fail(403, { error: 'Verwijderen mislukt: Unauthorized' })
		}

		const config = getConfig(contentType)

		const fileIdsToDelete = []

		if (Array.isArray(config.fileFields) && config.fileFields.length > 0) {
			try {
				const fields = config.fileFields.join(',')
				const fetchRes = await fetch(`${DIRECTUS_ITEMS_BASE}/${config.path}/${id}?fields=${fields}`, {
					headers: { Authorization: `Bearer ${accessToken}` }
				})

				if (fetchRes.ok) {
					const json = await fetchRes.json()
					const item = json?.data

					for (const fieldName of config.fileFields) {
						const fieldValue = item?.[fieldName]
						if (!fieldValue) continue

						const fileId = typeof fieldValue === 'object' ? fieldValue.id : fieldValue
						if (fileId) {
							fileIdsToDelete.push({ fieldName, fileId })
						}
					}
				} else {
					console.error(`[deleteContent] Failed to fetch file references for ${contentType} ${id}: ${fetchRes.status} ${fetchRes.statusText}`)
				}
			} catch (err) {
				console.error(`[deleteContent] Failed to fetch file references for ${contentType} ${id}:`, err)
			}
		}

		const res = await fetch(`${DIRECTUS_ITEMS_BASE}/${config.path}/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${accessToken}` }
		})

		if (!res.ok) {
			return fail(res.status, { error: 'Verwijderen mislukt.' })
		}

		for (const { fieldName, fileId } of fileIdsToDelete) {
			const deleteResult = await this.deleteFile(fileId, accessToken)
			if (!deleteResult?.success) {
				console.error(`[deleteContent] Failed to delete ${fieldName} (${fileId}).`)
			}
		}

		return { success: true }
	}

	async postContent(data, contentType, accessToken = null) {
		if (!accessToken) {
			return fail(403, { error: 'Aanmaken mislukt: Unauthorized' })
		}

		const config = getConfig(contentType)
		try {
			const res = await fetch(`${DIRECTUS_ITEMS_BASE}/${config.path}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`
				},
				body: JSON.stringify(data)
			})

			if (!res.ok) {
				let parsedError = null

				try {
					const errorJson = await res.json()
					parsedError = errorJson?.errors?.[0]?.message ?? errorJson?.error?.message ?? errorJson?.message ?? null
				} catch {
					parsedError = null
				}

				return fail(res.status, { error: parsedError ?? `Aanmaken mislukt (${res.status}).` })
			}

			const json = await res.json()
			const createdItem = json.data
			const itemId = createdItem?.[config.key]
			return { success: true, id: itemId }
		} catch (err) {
			console.error('Failed to post content:', err)
			return fail(500, { error: 'Aanmaken mislukt.' })
		}
	}

	async updateContent(id, data, contentType, accessToken = null) {
		if (!accessToken) {
			return fail(403, { error: 'Bijwerken mislukt: Unauthorized' })
		}

		if (!id) {
			return fail(400, { error: 'Bijwerken mislukt: Geen item id.' })
		}

		const config = getConfig(contentType)
		try {
			const res = await fetch(`${DIRECTUS_ITEMS_BASE}/${config.path}/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`
				},
				body: JSON.stringify(data)
			})

			if (!res.ok) {
				let parsedError = null

				try {
					const errorJson = await res.json()
					parsedError = errorJson?.errors?.[0]?.message ?? errorJson?.error?.message ?? errorJson?.message ?? null
				} catch {
					parsedError = null
				}

				return fail(res.status, { error: parsedError ?? `Bijwerken mislukt (${res.status}).` })
			}

			const json = await res.json()
			const updatedItem = json?.data
			const itemId = updatedItem?.[config.key] ?? id
			return { success: true, id: itemId }
		} catch (err) {
			console.error('Failed to update content:', err)
			return fail(500, { error: 'Bijwerken mislukt.' })
		}
	}

	async postContact(name, email, message) {
		const contactAPI = `${DIRECTUS_ITEMS_BASE}/adconnect_contact`

		await this.#resend.emails.send({
			from: 'Overlegplatform Ad <onboarding@resend.dev>',
			to: 'amschalker@gmail.com',
			subject: 'Nieuwe inzending contactformulier',
			text: `Naam: ${name}\nEmail: ${email}\nBericht: ${message}`
		})

		await fetch(contactAPI, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			body: JSON.stringify({
				name,
				email,
				message
			})
		})
	}

	async postFile(file, accessToken = null, options = {}) {
		if (!accessToken) {
			return fail(403, { error: 'Bestand uploaden mislukt: Unauthorized' })
		}
		if (!(file instanceof File) || file.size === 0) {
			return fail(400, { error: 'Bestand uploaden mislukt: Geen bestand ontvangen.' })
		}

		if (Array.isArray(options.allowedMimePrefixes) && options.allowedMimePrefixes.length > 0) {
			const isAllowed = options.allowedMimePrefixes.some((prefix) => typeof prefix === 'string' && file.type.startsWith(prefix))
			if (!isAllowed) {
				return fail(400, {
					error: options.invalidTypeError ?? 'Bestand uploaden mislukt: Ongeldig bestandstype.'
				})
			}
		}

		let folderId = null
		if (options.folderName) {
			folderId = await this.#resolveFolderId(options.folderName, accessToken)
			if (!folderId) {
				return fail(404, {
					error: `Bestand uploaden mislukt: Map '${options.folderName}' niet gevonden in Directus.`
				})
			}
		}

		const formData = new FormData()
		const fileName = options.filename ?? file.name

		if (folderId) {
			formData.append('folder', folderId)
		}
		if (options.title) {
			formData.append('title', options.title)
		}

		formData.append('file', file, fileName)

		try {
			const res = await fetch(DIRECTUS_FILES_BASE, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`
				},
				body: formData
			})

			if (!res.ok) {
				const errorText = await res.text()
				console.error('[postFile] Upload failed:')
				console.error('[postFile] Status:', res.status)
				console.error('[postFile] Response body:', errorText)
				return fail(res.status, { error: 'Bestand uploaden mislukt.' })
			}

			const json = await res.json()
			const uploadedFile = json?.data
			const fileId = uploadedFile?.id

			if (!fileId) {
				return fail(500, { error: 'Bestand uploaden mislukt: Geen bestand id ontvangen.' })
			}

			return { success: true, id: fileId, file: uploadedFile }
		} catch (err) {
			console.error('[postFile] Failed to upload file:', err)
			return fail(500, { error: 'Bestand uploaden mislukt.' })
		}
	}

	async deleteFile(id, accessToken = null) {
		if (!accessToken) {
			return fail(403, { error: 'Bestand verwijderen mislukt: Unauthorized' })
		}

		if (!id) {
			return fail(400, { error: 'Bestand verwijderen mislukt: Geen bestand id.' })
		}

		const res = await fetch(`${DIRECTUS_FILES_BASE}/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${accessToken}` }
		})

		if (!res.ok) {
			return fail(res.status, { error: 'Bestand verwijderen mislukt.' })
		}

		return { success: true }
	}

}
