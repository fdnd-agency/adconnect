export async function load({ fetch }) {
	const res = await fetch('https://fdnd-agency.directus.app/items/adconnect_news')

	const json = await res.json()

	/**
	 * Sorteert nieuwsberichten op datum (nieuwste eerst)
	 * en maakt selecties van de nieuwste items.
	 *
	 * De variabele `sortedNews` bevat alle nieuwsitems gesorteerd.
	 * De geretourneerde waarde van `load` bevat:
	 *  - `news`: alle nieuwsitems gesorteerd
	 *  - `latest3`: de 3 nieuwste items
	 *  - `latest9`: de 9 nieuwste items
	 */
	const sortedNews = [...json.data].sort((a, b) => new Date(b.date) - new Date(a.date))

	return {
		news: sortedNews,
		latest3: sortedNews.slice(0, 3),
		latest9: sortedNews.slice(0, 9)
	}
}
