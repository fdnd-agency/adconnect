import { DIRECTUS_URL } from '$lib/server/directus.js'

export class ContentService {
	static #directusBase = `${DIRECTUS_URL}/items`

	static #documents = new Map()
	static #themes = new Map()
	static #events = new Map()
	static #cooperations = new Map()
	static #news = new Map()
	static #nominations = new Map()
	static #faqs = new Map()

	static get documents() {
		return this.#documents
	}
	static get themes() {
		return this.#themes
	}
	static get events() {
		return this.#events
	}
	static get cooperations() {
		return this.#cooperations
	}
	static get news() {
		return this.#news
	}
	static get nominations() {
		return this.#nominations
	}
	static get faqs() {
		return this.#faqs
	}

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
	 * @param {string | null} accessToken - Pass the access_token cookie value to fetch drafts as an authenticated user
	 */
	static async fetchContent(accessToken = null) {
		const [documents, themes, events, cooperations, news, nominations, faqs] = await Promise.all([
			this.#fetchCollection('adconnect_documents', accessToken),
			this.#fetchCollection('adconnect_themes', accessToken),
			this.#fetchCollection('adconnect_events', accessToken),
			this.#fetchCollection('adconnect_cooperation', accessToken),
			this.#fetchCollection('adconnect_news', accessToken),
			this.#fetchCollection('adconnect_nominations', accessToken),
			this.#fetchCollection('adconnect_faqs', accessToken)
		])

		this.#documents = new Map(documents.map((item) => [item.id, item]))
		this.#themes = new Map(themes.map((item) => [item.id, item]))
		this.#events = new Map(events.map((item) => [item.id, item]))
		this.#cooperations = new Map(cooperations.map((item) => [item.id, item]))
		this.#news = new Map(news.map((item) => [item.uuid, item]))
		this.#nominations = new Map(nominations.map((item) => [item.id, item]))
		this.#faqs = new Map(faqs.map((item) => [item.id, item]))
	}
}
