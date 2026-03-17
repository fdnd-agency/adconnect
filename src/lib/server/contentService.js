import { DIRECTUS_URL } from '$lib/server/directus.js'
import { fail } from '@sveltejs/kit'

/**
 * Centralizes fetching of all Directus collections.
 * Call `fetchContent()` once per request and use the returned Maps directly.
 */
export class ContentService {
	static #directusBase = `${DIRECTUS_URL}/items`
	static #directusFilesBase = `${DIRECTUS_URL}/files`

	/** Registry mapping each content type to its Directus collection path and primary key field. */
	static #collections = {
		documents: { path: 'adconnect_documents', key: 'id' },
		categories: { path: 'adconnect_categories', key: 'id' },
		themes: { path: 'adconnect_themes', key: 'id' },
		events: { path: 'adconnect_events', key: 'id' },
		cooperations: { path: 'adconnect_cooperation', key: 'id' },
		news: { path: 'adconnect_news', key: 'uuid' },
		nominations: { path: 'adconnect_nominations', key: 'id' },
		faqs: { path: 'adconnect_faqs', key: 'id' }
	}

	/**
	 * Fetches a single Directus collection and returns its items.
	 * Optionally includes an Authorization header to retrieve draft content.
	 *
	 * @param {string} path - Collection name, appended to the Directus items base URL.
	 * @param {string | null} accessToken - Bearer token for authenticated requests (drafts).
	 * @returns {Promise<{items: Array, error: Error|null}>} Array of items, or an empty array and Error on failure.
	 */
	static async #fetchCollection(path, accessToken = null) {
		try {
			const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
			const res = await fetch(`${this.#directusBase}/${path}`, { headers })
			const json = await res.json()
			if (!json.data) {
				const error = new Error(`No data returned for ${path}: ${JSON.stringify(json)}`)
				console.error(error)
				return { items: [], error }
			}
			return { items: json.data, error: null }
		} catch (err) {
			console.error(`Failed to fetch ${path}:`, err)
			return { items: [], error: err }
		}
	}

	/**
	 * Resolves a Directus folder id by folder name.
	 *
	 * @param {string} folderName - Folder display name in Directus.
	 * @param {string} accessToken - Bearer token for authenticated requests.
	 * @returns {Promise<string | null>} Folder id when found, otherwise null.
	 */
	static async #resolveFolderId(folderName, accessToken) {
		try {
			const url = new URL(`${DIRECTUS_URL}/folders`)
			url.searchParams.set('fields', 'id,name,parent')
			url.searchParams.set('filter[name][_eq]', folderName)
			url.searchParams.set('limit', '1')

			const res = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			})

			if (!res.ok) {
				const errorText = await res.text()
				console.error('[resolveFolderId] Folder lookup failed:')
				console.error('[resolveFolderId] Status:', res.status)
				console.error('[resolveFolderId] Response body:', errorText)
				return null
			}

			const json = await res.json()

			const folder = json?.data?.[0] ?? null

			if (!folder) {
				return null
			}

			return folder.id
		} catch (err) {
			console.error(`[resolveFolderId] Failed to resolve folder '${folderName}':`, err)
			return null
		}
	}

	/**
	 * Fetches collections in parallel and returns them as Maps keyed by each collection's primary key.
	 *
	 * @param {string | null} contentType - A key from #collections to fetch a single type, or null to fetch all.
	 * @param {string | null} accessToken - Pass the access_token cookie value to fetch drafts as an authenticated user.
	 * @returns {Promise<{data: Record<string, Map>, errors: Array}>} Object whose keys are content type names and values are Maps.
	 */
	static async fetchContent(contentType = null, accessToken = null) {
		const entries = contentType ? [[contentType, this.#collections[contentType]]] : Object.entries(this.#collections)

		const results = await Promise.all(entries.map(([, cfg]) => this.#fetchCollection(cfg.path, accessToken)))

		const errors = []
		const maps = entries.map(([name, cfg], index) => {
			const { items = [], error } = results[index] ?? {}

			if (error) {
				errors.push({ collection: name, message: error.message ?? String(error) })
			}

			// Normalize items so they always expose an `id` property used by admin UI.
			// Some collections (e.g. `news`) use a different primary key field like `uuid`.
			const normalized = items.map((item) => (cfg.key !== 'id' && item[cfg.key] !== undefined && item.id === undefined ? { ...item, id: item[cfg.key] } : item))

			return [name, new Map(normalized.map((item) => [item[cfg.key], item]))]
		})

		return { data: Object.fromEntries(maps), errors }
	}

	/**
	 * Sets the status of the specified content to published.
	 *
	 * @param {string} id - Id of the item to publish.
	 * @param {string} contentType - A key from #collections identifying the collection to update.
	 * @param {string | null} accessToken - Pass the access_token cookie value to authenticate the request.
	 * @returns {Promise<{success: true} | import('@sveltejs/kit').ActionFailure>}
	 */
	static async publishContent(id, contentType, accessToken = null) {
		if (!accessToken) {
			return fail(403, { error: 'Publiceren mislukt: Unauthorized' })
		}
		const res = await fetch(`${this.#directusBase}/${this.#collections[contentType].path}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify({ status: 'published' })
		})

		if (!res.ok) {
			return fail(res.status, { error: 'Publiceren mislukt.' })
		} else {
			return { success: true }
		}
	}

	/**
	 * Sets the status of the specified content back to draft.
	 *
	 * @param {string} id - Id of the item to depublish.
	 * @param {string} contentType - A key from #collections identifying the collection to update.
	 * @param {string | null} accessToken - Pass the access_token cookie value to authenticate the request.
	 * @returns {Promise<{success: true} | import('@sveltejs/kit').ActionFailure>}
	 */
	static async depublishContent(id, contentType, accessToken = null) {
		if (!accessToken) {
			return fail(403, { error: 'Depubliceren mislukt: Unauthorized' })
		}
		const res = await fetch(`${this.#directusBase}/${this.#collections[contentType].path}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify({ status: 'draft' })
		})

		if (!res.ok) {
			return fail(res.status, { error: 'Depubliceren mislukt.' })
		} else {
			return { success: true }
		}
	}

	/**
	 * Deletes the specified content.
	 *
	 * @param {string} id - Id of the item to delete.
	 * @param {string} contentType - A key from #collections identifying the collection to delete from.
	 * @param {string | null} accessToken - Pass the access_token cookie value to authenticate the request.
	 * @returns {Promise<{success: true} | import('@sveltejs/kit').ActionFailure>}
	 */
	static async deleteContent(id, contentType, accessToken = null) {
		if (!accessToken) {
			return fail(403, { error: 'Verwijderen mislukt: Unauthorized' })
		}
		const res = await fetch(`${this.#directusBase}/${this.#collections[contentType].path}/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${accessToken}` }
		})

		if (!res.ok) {
			return fail(res.status, { error: 'Verwijderen mislukt.' })
		} else {
			return { success: true }
		}
	}

	/**
	 * Creates new content with the specified fields.
	 *
	 * @param {Object} data - Object containing all fields for the new content item.
	 * @param {string} contentType - A key from #collections identifying the collection to create in.
	 * @param {string | null} accessToken - Pass the access_token cookie value to authenticate the request.
	 * @returns {Promise<{success: true, id: string} | import('@sveltejs/kit').ActionFailure>}
	 */
	static async postContent(data, contentType, accessToken = null) {
		if (!accessToken) {
			return fail(403, { error: 'Aanmaken mislukt: Unauthorized' })
		}
		try {
			const res = await fetch(`${this.#directusBase}/${this.#collections[contentType].path}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`
				},
				body: JSON.stringify(data)
			})

			if (!res.ok) {
				return fail(res.status, { error: 'Aanmaken mislukt.' })
			}
			const json = await res.json()
			const createdItem = json.data
			const itemId = createdItem?.[this.#collections[contentType].key]
			return { success: true, id: itemId }
		} catch (err) {
			console.error('Failed to post content:', err)
			return fail(500, { error: 'Aanmaken mislukt.' })
		}
	}

	/**
	 * Uploads an image file to Directus and stores it in the configured image folder.
	 *
	 * This method is a thin wrapper around `postFile` that adds image-only validation.
	 *
	 * @param {File} file - Image file from request.formData().
	 * @param {string | null} accessToken - Pass the access_token cookie value to authenticate the request.
	 * @param {{ folderName?: string, title?: string, filename?: string }} [options]
	 * @returns {Promise<{success: true, id: string, file: object} | import('@sveltejs/kit').ActionFailure>}
	 */
	static async postImage(file, accessToken = null, options = {}) {
		if (!accessToken) {
			return fail(403, { error: 'Afbeelding uploaden mislukt: Unauthorized' })
		}

		if (!file || typeof file !== 'object' || file.size === 0) {
			return fail(400, { error: 'Afbeelding uploaden mislukt: Geen bestand ontvangen.' })
		}

		if (file.type && !file.type.startsWith('image/')) {
			return fail(400, { error: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.' })
		}

		return this.postFile(file, accessToken, options)
	}

	/**
	 * Uploads a file to Directus /files.
	 *
	 * @param {File} file - File from request.formData().
	 * @param {string | null} accessToken - Pass the access_token cookie value to authenticate the request.
	 * @param {{ folderName?: string, title?: string, filename?: string }} [options]
	 * @returns {Promise<{success: true, id: string, file: object} | import('@sveltejs/kit').ActionFailure>}
	 */
	static async postFile(file, accessToken = null, options = {}) {
		if (!accessToken) {
			return fail(403, { error: 'Bestand uploaden mislukt: Unauthorized' })
		}

		if (!(file instanceof File) || file.size === 0) {
			return fail(400, { error: 'Bestand uploaden mislukt: Geen bestand ontvangen.' })
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
		const fileName = options.filename ?? file.name ?? 'upload-file'

		// BELANGRIJK: metadata eerst, file als laatste
		if (folderId) {
			formData.append('folder', folderId)
		}
		if (options.title) {
			formData.append('title', options.title)
		}
		formData.append('file', file, fileName)

		try {
			const res = await fetch(this.#directusFilesBase, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`
				},
				body: formData
			})

			if (!res.ok) {
				const errorText = await res.text()
				console.error('[postFile] Upload failed:')
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

	/**
	 * Deletes a file from Directus /files by id.
	 *
	 * @param {string} id - Directus file id.
	 * @param {string | null} accessToken - Pass the access_token cookie value to authenticate the request.
	 * @returns {Promise<{success: true} | import('@sveltejs/kit').ActionFailure>}
	 */
	static async deleteFile(id, accessToken = null) {
		if (!accessToken) {
			return fail(403, { error: 'Bestand verwijderen mislukt: Unauthorized' })
		}

		if (!id) {
			return fail(400, { error: 'Bestand verwijderen mislukt: Geen bestand id.' })
		}

		const res = await fetch(`${this.#directusFilesBase}/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${accessToken}` }
		})

		if (!res.ok) {
			return fail(res.status, { error: 'Bestand verwijderen mislukt.' })
		}

		return { success: true }
	}
}
