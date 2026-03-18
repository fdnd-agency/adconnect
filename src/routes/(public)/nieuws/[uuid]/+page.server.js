import { error } from '@sveltejs/kit'

import { ContentService } from '$lib/server/contentService.js'

export async function load({ params }) {
	const res = await ContentService.fetchContent('news', null, null, null, false)
	const item = res.data.news?.get?.(params.uuid)

	if (!item) {
		throw error(404, 'Nieuwsartikel niet gevonden')
	}

	return {
		news: [item]
	}
}
