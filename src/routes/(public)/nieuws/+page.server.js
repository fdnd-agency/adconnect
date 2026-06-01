// +page.server.js

import { ContentService } from '$lib/server/contentService.js'

const NEWS_PAGE_FIELDS = 'id,hero_heading,hero_body'

export async function load() {
	const [newsPageResponse, res] = await Promise.all([ContentService.fetchContent('pageNews', null, NEWS_PAGE_FIELDS, null, false), ContentService.fetchContent('news', null, null, null, false)])

	const newsPageItem = newsPageResponse.data.pageNews?.[0]
	const news = Array.from(res.data.news?.values?.() ?? [])

	const sortedNews = news.sort((a, b) => new Date(b.date) - new Date(a.date))

	return {
		newsPage: newsPageItem ?? {},
		news: sortedNews,
		latest3: sortedNews.slice(0, 3)
	}
}
