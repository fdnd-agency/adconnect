// +page.server.js

import { ContentService } from '$lib/server/contentService.js'

export async function load() {
	const res = await ContentService.fetchContent('news', null, null, null, false)
	const news = Array.from(res.data.news?.values?.() ?? [])

	const sortedNews = news.sort((a, b) => new Date(b.date) - new Date(a.date))

	return {
		news: sortedNews,
		latest3: sortedNews.slice(0, 3)
	}
}