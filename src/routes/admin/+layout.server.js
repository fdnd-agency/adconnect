import { ContentService } from '$lib/server/contentService.js'
import { redirect } from '@sveltejs/kit'

export async function load({ locals, url, cookies }) {
	if (!locals.user && !url.pathname.startsWith('/admin/login')) {
		throw redirect(303, '/admin/login')
	}

	const accessToken = cookies.get('access_token')

	await ContentService.fetchContent(accessToken)

	return {
		user: locals.user?.data ?? null,
		documents: ContentService.documents,
		themes: ContentService.themes,
		events: ContentService.events,
		cooperations: ContentService.cooperations,
		news: ContentService.news,
		nominations: ContentService.nominations,
		faqs: ContentService.faqs
	}
}
