import { DIRECTUS_URL } from '$lib/server/directus.js'

/**
 * Centralizes fetching of all Directus collections.
 * Call `fetchContent()` once per request and use the returned Maps directly.
 */
export class ContentService {
	static #directusBase = `${DIRECTUS_URL}/items`

	/**
	 * Fetches a single Directus collection and returns its items.
	 * Optionally includes an Authorization header to retrieve draft content.
	 *
	 * @param {string} path - Collection name, appended to the Directus items base URL.
	 * @param {string | null} accessToken - Bearer token for authenticated requests (drafts).
	 * @returns {Promise<Array>} Array of items, or an empty array on failure.
	 */
	static async #fetchCollection(path, accessToken = null) {
		try {
			const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
			const res = await fetch(`${this.#directusBase}/${path}`, { headers })
			const json = await res.json()
			if (!json.data) {
				console.error(`No data returned for ${path}:`, json)
				return []
			}
			return json.data
		} catch (err) {
			console.error(`Failed to fetch ${path}:`, err)
			return []
		}
	}

	/**
	 * Fetches all collections in parallel and returns them as Maps.
	 *
	 * @param {string | null} accessToken - Pass the access_token cookie value to fetch drafts as an authenticated user.
	 * @returns {Promise<{documents: Map, themes: Map, events: Map, cooperations: Map, news: Map, nominations: Map, faqs: Map}>}
	 */
	static async fetchContent(accessToken = null) {
		const [documents, themes, events, cooperations, news, nominations, faqs] =
			await Promise.all([
				this.#fetchCollection('adconnect_documents', accessToken),
				this.#fetchCollection('adconnect_themes', accessToken),
				this.#fetchCollection('adconnect_events', accessToken),
				this.#fetchCollection('adconnect_cooperation', accessToken),
				this.#fetchCollection('adconnect_news', accessToken),
				this.#fetchCollection('adconnect_nominations', accessToken),
				this.#fetchCollection('adconnect_faqs', accessToken)
			])

		return {
			documents: new Map(documents.map((item) => [item.id, item])),
			themes: new Map(themes.map((item) => [item.id, item])),
			events: new Map(events.map((item) => [item.id, item])),
			cooperations: new Map(cooperations.map((item) => [item.id, item])),
			news: new Map(news.map((item) => [item.uuid, item])),
			nominations: new Map(nominations.map((item) => [item.id, item])),
			faqs: new Map(faqs.map((item) => [item.id, item]))
		}
	}
}
