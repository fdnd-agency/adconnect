import { error } from '@sveltejs/kit'

import { ContentService } from '$lib/server/contentService.js'

export async function load({ params }) {
	const res = await ContentService.fetchContent('news', null, null, null, false)
	const newsItems = Array.isArray(res.data.news) ? res.data.news : Array.from(res.data.news?.values?.() ?? [])
	const item = newsItems.find((newsItem) => newsItem.uuid === params.uuid)

	if (!item) {
		throw error(404, 'Nieuwsartikel niet gevonden')
	}

	return {
		content: [item]
	}
}
