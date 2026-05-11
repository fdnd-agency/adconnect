import { RESEND_API_KEY } from '$env/static/private'
import { DIRECTUS_URL } from '$lib/server/directus.js'
import { fail } from '@sveltejs/kit'
import { Resend } from 'resend'

/**
 * Centralizes fetching of all Directus collections.
 * Call `fetchContent()` once per request and use the returned Maps directly.
 */
export class ContentService {
	static #directusBase = `${DIRECTUS_URL}/items`
	static #directusFilesBase = `${DIRECTUS_URL}/files`

	static #resend = new Resend(RESEND_API_KEY)

	/** Registry mapping each content type to its Directus collection path, primary key field, and optional file relations. */
	static #collections = {
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

	/* Private helper to get collection config by content type key. */
	static #getConfig(contentType) {
		const config = Object.hasOwn(this.#collections, contentType) ? this.#collections[contentType] : undefined
		if (!config) throw new Error(`Onbekend content type: '${contentType}'`)
		return config
	}

	static #isE2EMode() {
		return process.env.E2E_TEST_MODE === '1'
	}

	static #createE2EState() {
		return {
			nextLadoNumber: 4,
			lados: new Map([
				[
					'e2e-lado-1',
					{
						id: 'e2e-lado-1',
						title: 'E2E Lado Concept',
						contact_persons: ['Persoon 1'],
						national_ad_profile: 'Profiel 1',
						lado_status: 'Actief',
						sectoral_advisory_board: 1,
						status: 'draft'
					}
				],
				[
					'e2e-lado-2',
					{
						id: 'e2e-lado-2',
						title: 'E2E Lado Gepubliceerd',
						contact_persons: ['Persoon 2'],
						national_ad_profile: 'Profiel 2',
						lado_status: 'Actief',
						sectoral_advisory_board: 2,
						status: 'published'
					}
				],
				[
					'e2e-lado-3',
					{
						id: 'e2e-lado-3',
						title: 'E2E Lado Verwijderen',
						contact_persons: ['Persoon 3'],
						national_ad_profile: 'Profiel 3',
						lado_status: 'Actief',
						sectoral_advisory_board: 3,
						status: 'draft'
					}
				]
			]),
			courses: new Map([
				[1, { id: 1, title: 'E2E Opleiding 1', lado: 'e2e-lado-1' }],
				[2, { id: 2, title: 'E2E Opleiding 2', lado: null }],
				[3, { id: 3, title: 'E2E Opleiding 3', lado: 'e2e-lado-2' }]
			]),
			sectoralAdvisoryBoards: new Map([
				[1, { id: 1, title: 'E2E Adviescollege 1' }],
				[2, { id: 2, title: 'E2E Adviescollege 2' }],
				[3, { id: 3, title: 'E2E Adviescollege 3' }]
			])
		}
	}

	static #e2eState = null

	static #getE2EState() {
		if (!this.#e2eState) {
			this.#e2eState = this.#createE2EState()
		}
		return this.#e2eState
	}

	static #setE2ECourseLinks(courseIds, ladoId) {
		const state = this.#getE2EState()
		const selected = new Set((courseIds ?? []).map((id) => Number(id)))

		for (const [courseId, course] of state.courses.entries()) {
			if (selected.has(Number(courseId))) {
				state.courses.set(courseId, { ...course, lado: ladoId })
			} else if (String(course.lado ?? '') === String(ladoId)) {
				state.courses.set(courseId, { ...course, lado: null })
			}
		}
	}

	/* Simple E2E test data for IDs starting with 'e2e-' */
	static #getE2EData(contentType, id) {
		if (!id || !id.startsWith('e2e-')) return null

		if (contentType === 'news') {
			return {
				uuid: id,
				id,
				title: 'E2E Draft Nieuws',
				description: 'Dit is een conceptnieuwsbericht voor end-to-end tests.',
				body: '<p>Preview van conceptcontent.</p>',
				hero: 'e2e-hero-image',
				status: 'draft'
			}
		}
		if (contentType === 'faqs') {
			return {
				id,
				question: 'E2E FAQ',
				answer: 'FAQ voor E2E tests',
				order: 1,
				status: 'draft'
			}
		}
		if (contentType === 'themes') {
			return {
				id,
				title: 'E2E Thema',
				description: 'Concept thema voor preview-tests.',
				body: '<p>Concept themabody.</p>',
				hero: 'e2e-theme-hero',
				status: 'draft'
			}
		}
		if (contentType === 'documents') {
			return {
				id,
				title: 'E2E Document',
				description: 'Dit document wordt gebruikt voor preview-tests.',
				hero_image: 'e2e-document-hero',
				source_file: { id: 'e2e-document-file' },
				status: 'draft'
			}
		}
		if (contentType === 'lados') {
			return this.#getE2EState().lados.get(id) ?? null
		}
		return null
	}

	static resetE2EData() {
		if (!this.#isE2EMode()) return false
		this.#e2eState = this.#createE2EState()
		return true
	}

	/**
	 * Fetches a single Directus collection and returns its items.
	 * Optionally includes an Authorization header to retrieve draft content.
	 *
	 * @param {string} path - Collection name, appended to the Directus items base URL.
	 * @param {string | null} accessToken - Bearer token for authenticated requests (drafts).
	 * @returns {Promise<{items: Array, error: Error|null}>} Array of items, or an empty array and Error on failure.
	 */
	static async #fetchCollection(path, id = null, fields = null, filters = null, accessToken = null) {
		try {
			const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {}

			let url
			if (id) {
				url = new URL(`${this.#directusBase}/${path}/${id}`)
			} else {
				url = new URL(`${this.#directusBase}/${path}`)
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

	/**
	 * Fetches collections in parallel and returns them as Maps keyed by each collection's primary key.
	 *
	 * @param {string | null} contentType - A key from #collections to fetch a single type, or null to fetch all.
	 * @param {string | null} accessToken - Pass the access_token cookie value to fetch drafts as an authenticated user.
	 * @param {string | null} id - A key from #collections to fetch a single type, or null to fetch all.
	 * @param {string | null} fields -
	 * @param {string | null} filters -
	 * @param {boolean} asMap - When true returns Map values per collection, otherwise returns Arrays.
	 * @returns {Promise<{data: Record<string, Map | Array>, errors: Array}>} Object whose keys are content type names and values are Maps or Arrays.
	 */
	static async fetchContent(contentType = null, id = null, fields = null, filters = null, asMap = false, accessToken = null) {
		if (this.#isE2EMode() && contentType && id && id.startsWith('e2e-')) {
			const e2eItem = this.#getE2EData(contentType, id)
			if (e2eItem) {
				const collectionMap = new Map([[id, e2eItem]])
				return { data: { [contentType]: asMap ? collectionMap : [e2eItem] }, errors: [] }
			}
		}

		if (this.#isE2EMode() && contentType === 'lados' && id === null) {
			const lados = Array.from(this.#getE2EState().lados.values())
			const collectionMap = new Map(lados.map((item) => [item.id, item]))
			return { data: { lados: asMap ? collectionMap : lados }, errors: [] }
		}

		if (this.#isE2EMode() && contentType === 'courses' && id === null) {
			const courses = Array.from(this.#getE2EState().courses.values())
			const collectionMap = new Map(courses.map((item) => [item.id, item]))
			return { data: { courses: asMap ? collectionMap : courses }, errors: [] }
		}

		if (this.#isE2EMode() && contentType === 'sectoralAdvisoryBoards' && id === null) {
			const boards = Array.from(this.#getE2EState().sectoralAdvisoryBoards.values())
			const collectionMap = new Map(boards.map((item) => [item.id, item]))
			return { data: { sectoralAdvisoryBoards: asMap ? collectionMap : boards }, errors: [] }
		}

		const entries = contentType ? [[contentType, this.#getConfig(contentType)]] : Object.entries(this.#collections)

		const results = await Promise.all(entries.map(([, cfg]) => this.#fetchCollection(cfg.path, id, fields, filters, accessToken)))

		const errors = []
		const dataObj = {}

		entries.forEach(([name, cfg], index) => {
			const { items = [], error } = results[index] ?? {}
			const itemList = Array.isArray(items) ? items : items ? [items] : []

			if (error) {
				errors.push({ collection: name, message: error.message ?? String(error) })
			}

			// Normalize items so they always expose an `id` property used by admin UI.
			// Some collections (e.g. `news`) use a different primary key field like `uuid`.
			const normalized = itemList.map((item) => (cfg.key !== 'id' && item[cfg.key] !== undefined && item.id === undefined ? { ...item, id: item[cfg.key] } : item))

			const collectionMap = new Map(normalized.map((item) => [item[cfg.key], item]))
			dataObj[name] = asMap ? collectionMap : Array.from(collectionMap.values())
		})

		return { data: dataObj, errors }
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
		if (this.#isE2EMode() && contentType === 'lados') {
			const state = this.#getE2EState()
			const existing = state.lados.get(String(id))
			if (!existing) return fail(404, { error: 'Publiceren mislukt.' })
			state.lados.set(String(id), { ...existing, status: 'published' })
			return { success: true }
		}

		if (!accessToken) {
			return fail(403, { error: 'Publiceren mislukt: Unauthorized' })
		}
		const config = this.#getConfig(contentType)
		const res = await fetch(`${this.#directusBase}/${config.path}/${id}`, {
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
		if (this.#isE2EMode() && contentType === 'lados') {
			const state = this.#getE2EState()
			const existing = state.lados.get(String(id))
			if (!existing) return fail(404, { error: 'Depubliceren mislukt.' })
			state.lados.set(String(id), { ...existing, status: 'draft' })
			return { success: true }
		}

		if (!accessToken) {
			return fail(403, { error: 'Depubliceren mislukt: Unauthorized' })
		}

		const config = this.#getConfig(contentType)
		const res = await fetch(`${this.#directusBase}/${config.path}/${id}`, {
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
	 * Deletes the specified content and cleans up associated files.
	 *
	 * This method dynamically handles file cleanup based on the content type configuration:
	 * 1. If the content type has fileFields defined in #collections, it fetches only those fields
	 * 2. Extracts all related file IDs from the item
	 * 3. Deletes the content item itself
	 * 4. Cleans up related files best-effort
	 *
	 * This works for any content type - just add a fileFields array to the #collections registry.
	 * File field values can be either plain string IDs or objects with an { id, ... } structure.
	 *
	 * @param {string} id - Id of the item to delete.
	 * @param {string} contentType - A key from #collections identifying the collection to delete from.
	 * @param {string | null} accessToken - Pass the access_token cookie value to authenticate the request.
	 * @returns {Promise<{success: true} | import('@sveltejs/kit').ActionFailure>}
	 */
	static async deleteContent(id, contentType, accessToken = null) {
		if (this.#isE2EMode() && contentType === 'lados') {
			const state = this.#getE2EState()
			const existed = state.lados.delete(String(id))
			if (!existed) return fail(404, { error: 'Verwijderen mislukt.' })

			for (const [courseId, course] of state.courses.entries()) {
				if (String(course.lado ?? '') === String(id)) {
					state.courses.set(courseId, { ...course, lado: null })
				}
			}

			return { success: true }
		}

		if (!accessToken) {
			return fail(403, { error: 'Verwijderen mislukt: Unauthorized' })
		}

		const config = this.#getConfig(contentType)

		// Capture file IDs first, then delete content, then cleanup files.
		// This avoids ending up with content that still references deleted files when content deletion fails.
		const fileIdsToDelete = []

		if (Array.isArray(config.fileFields) && config.fileFields.length > 0) {
			try {
				const fields = config.fileFields.join(',')
				const fetchRes = await fetch(`${this.#directusBase}/${config.path}/${id}?fields=${fields}`, {
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

		// Delete the content item itself
		const res = await fetch(`${this.#directusBase}/${config.path}/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${accessToken}` }
		})

		if (!res.ok) {
			return fail(res.status, { error: 'Verwijderen mislukt.' })
		}

		// Content is deleted successfully; now cleanup associated files best-effort.
		for (const { fieldName, fileId } of fileIdsToDelete) {
			const deleteResult = await this.deleteFile(fileId, accessToken)
			if (!deleteResult?.success) {
				console.error(`[deleteContent] Failed to delete ${fieldName} (${fileId}).`)
			}
		}

		return { success: true }
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
		if (this.#isE2EMode() && contentType === 'lados') {
			if (data?.title === 'E2E FORCE 500') {
				return fail(500, { error: 'Er is iets misgegaan bij het opslaan van de Lado.' })
			}

			const state = this.#getE2EState()
			const id = `e2e-lado-${state.nextLadoNumber}`
			state.nextLadoNumber += 1

			const created = {
				id,
				title: data.title,
				contact_persons: data.contact_persons ?? [],
				national_ad_profile: data.national_ad_profile ?? '',
				lado_status: data.lado_status ?? '',
				sectoral_advisory_board: data.sectoral_advisory_board ?? null,
				status: data.shouldPublish ? 'published' : 'draft'
			}

			state.lados.set(id, created)
			this.#setE2ECourseLinks(data.courseIds ?? [], id)
			return { success: true, id }
		}

		if (!accessToken) {
			return fail(403, { error: 'Aanmaken mislukt: Unauthorized' })
		}

		const config = this.#getConfig(contentType)
		try {
			const res = await fetch(`${this.#directusBase}/${config.path}`, {
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

	/**
	 * Updates existing content with the specified fields.
	 *
	 * @param {string} id - Id of the existing content item.
	 * @param {Object} data - Object containing fields to update.
	 * @param {string} contentType - A key from #collections identifying the collection to update in.
	 * @param {string | null} accessToken - Pass the access_token cookie value to authenticate the request.
	 * @returns {Promise<{success: true, id: string} | import('@sveltejs/kit').ActionFailure>}
	 */
	static async updateContent(id, data, contentType, accessToken = null) {
		if (this.#isE2EMode() && contentType === 'lados') {
			const state = this.#getE2EState()
			const existing = state.lados.get(String(id))
			if (!existing) return fail(404, { error: 'Bijwerken mislukt.' })

			const updated = {
				...existing,
				title: data.title,
				contact_persons: data.contact_persons ?? [],
				national_ad_profile: data.national_ad_profile ?? '',
				lado_status: data.lado_status ?? '',
				sectoral_advisory_board: data.sectoral_advisory_board ?? null
			}

			state.lados.set(String(id), updated)
			if (Array.isArray(data.courseIds)) {
				this.#setE2ECourseLinks(data.courseIds, String(id))
			}

			return { success: true, id: String(id) }
		}

		if (this.#isE2EMode() && contentType === 'courses') {
			const state = this.#getE2EState()
			const numericId = Number(id)
			const existing = state.courses.get(numericId)
			if (!existing) return fail(404, { error: 'Bijwerken mislukt.' })
			state.courses.set(numericId, { ...existing, lado: data?.lado ?? null })
			return { success: true, id: numericId }
		}

		if (!accessToken) {
			return fail(403, { error: 'Bijwerken mislukt: Unauthorized' })
		}

		if (!id) {
			return fail(400, { error: 'Bijwerken mislukt: Geen item id.' })
		}

		const config = this.#getConfig(contentType)
		try {
			const res = await fetch(`${this.#directusBase}/${config.path}/${id}`, {
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

	static async postContact(name, email, message) {
		const contactAPI = `${this.#directusBase}/adconnect_contact`

		// Send the email using Resend
		await this.#resend.emails.send({
			from: 'Overlegplatform Ad <onboarding@resend.dev>',
			to: 'amschalker@gmail.com',
			subject: 'Nieuwe inzending contactformulier',
			text: `Naam: ${name}\nEmail: ${email}\nBericht: ${message}`
		})

		// Post data to API Directus
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

	/**
	 * Uploads a file to Directus /files.
	 *
	 * This is the core file upload method for all file uploads.
	 * It handles:
	 * - File validation (must be valid File object with size > 0)
	 * - Folder resolution: converts folder name to folder ID using #resolveFolderId
	 * - FormData construction: builds multipart form with metadata (folder, title) and file
	 * - Directus /files endpoint: POSTs the FormData and extracts the returned file ID
	 *
	 * @param {File} file - File from request.formData().
	 * @param {string | null} accessToken - Pass the access_token cookie value to authenticate the request.
	 * @param {{
	 *  folderName?: string,
	 *  title?: string,
	 *  filename?: string,
	 *  allowedMimePrefixes?: string[],
	 *  invalidTypeError?: string
	 * }} [options]
	 * @returns {Promise<{success: true, id: string, file: object} | import('@sveltejs/kit').ActionFailure>}
	 */
	static async postFile(file, accessToken = null, options = {}) {
		if (!accessToken) {
			return fail(403, { error: 'Bestand uploaden mislukt: Unauthorized' })
		}
		if (!(file instanceof File) || file.size === 0) {
			return fail(400, { error: 'Bestand uploaden mislukt: Geen bestand ontvangen.' })
		}

		// Guard: controleer het bestandstype
		// allowedMimePrefixes is een array van toegestane MIME-type prefixen, bijvoorbeeld:
		//   ['image/']              → staat alle afbeeldingen toe (image/png, image/jpeg, etc.)
		//   ['application/pdf']    → staat alleen PDF toe
		// Als allowedMimePrefixes niet is meegegeven, wordt deze check overgeslagen en zijn alle bestandstypes toegestaan.
		if (Array.isArray(options.allowedMimePrefixes) && options.allowedMimePrefixes.length > 0) {
			// .some() loopt door de array en geeft true terug zodra één prefix overeenkomt.
			// Elk MIME-type heeft de structuur 'categorie/specifictype', bv. 'image/png'.
			// Met startsWith() checken we of het bestandstype begint met de opgegeven prefix.
			const isAllowed = options.allowedMimePrefixes.some((prefix) => typeof prefix === 'string' && file.type.startsWith(prefix))
			if (!isAllowed) {
				return fail(400, {
					error: options.invalidTypeError ?? 'Bestand uploaden mislukt: Ongeldig bestandstype.'
				})
			}
		}
		// Als er een mapnaam is meegegeven, zoeken we eerst het bijbehorende ID op.
		let folderId = null
		if (options.folderName) {
			folderId = await this.#resolveFolderId(options.folderName, accessToken)
			if (!folderId) {
				return fail(404, {
					error: `Bestand uploaden mislukt: Map '${options.folderName}' niet gevonden in Directus.`
				})
			}
		}

		// Bouw een FormData object op volgens de Directus specificaties.
		const formData = new FormData()
		const fileName = options.filename ?? file.name

		if (folderId) {
			formData.append('folder', folderId)
		}
		if (options.title) {
			formData.append('title', options.title)
		}

		// Voeg het bestand als laatste toe (Directus verwacht deze volgorde)
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
				console.error('[postFile] Status:', res.status)
				console.error('[postFile] Response body:', errorText)
				return fail(res.status, { error: 'Bestand uploaden mislukt.' })
			}

			// Haal het ID van het geüploade bestand op uit de Directus response.
			// Dit ID wordt daarna opgeslagen in het document
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
