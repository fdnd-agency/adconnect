import { ContentService } from '$lib/server/contentService.js'

export async function load() {
	const res = await ContentService.fetchContent('news', null, null, null, false)
	const news = Array.from(res.data.news?.values?.() ?? [])

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
	const sortedNews = news.sort((a, b) => new Date(b.date) - new Date(a.date))

	return {
		news: sortedNews,
		latest3: sortedNews.slice(0, 3),
		latest9: sortedNews.slice(0, 9)
	}
}
