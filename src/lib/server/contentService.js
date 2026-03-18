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

	static #resend = new Resend(RESEND_API_KEY)

	/** Registry mapping each content type to its Directus collection path and primary key field. */
	static #collections = {
		documents: { path: 'adconnect_documents', key: 'id' },
		themes: { path: 'adconnect_themes', key: 'id' },
		events: { path: 'adconnect_events', key: 'id' },
		cooperations: { path: 'adconnect_cooperation', key: 'id' },
		news: { path: 'adconnect_news', key: 'uuid' },
		nominations: { path: 'adconnect_nominations', key: 'id' },
		faqs: { path: 'adconnect_faqs', key: 'id' },
		categories: { path: 'adconnect_categories', key: 'id' }
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
	 * Fetches collections in parallel and returns them as Maps keyed by each collection's primary key.
	 *
	 * @param {string | null} contentType - A key from #collections to fetch a single type, or null to fetch all.
	 * @param {string | null} accessToken - Pass the access_token cookie value to fetch drafts as an authenticated user.
	 * @param {string | null} id - A key from #collections to fetch a single type, or null to fetch all.
	 * @param {string | null} fields -
	 * @param {string | null} filters -
	 * @param {boolean} asMap -
	 * @returns {Promise<{data: Record<string, Map>, errors: Array}>} Object whose keys are content type names and values are Maps.
	 */
	static async fetchContent(contentType = null, id = null, fields = null, filters = null, _asMap = false, accessToken = null) {
		const entries = contentType ? [[contentType, this.#collections[contentType]]] : Object.entries(this.#collections)

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

			dataObj[name] = new Map(normalized.map((item) => [item[cfg.key], item]))
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
}
