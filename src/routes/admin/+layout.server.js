import { ContentService } from '$lib/server/contentService.js'
import { redirect } from '@sveltejs/kit'

export async function load({ locals, url, cookies }) {
	if (!locals.user && !url.pathname.startsWith('/admin/login')) {
		throw redirect(303, '/admin/login')
	}

	// Retrieves content from Directus API through the ContentService.
	const { data: content, errors } = await ContentService.fetchContent(null, null, cookies.get('access_token'))

	return {
		user: locals.user?.data ?? null,
		fetchErrors: errors,
		documents: [...content.documents.values()],
		documentCount: content.documents.size,
		themes: [...content.themes.values()],
		themeCount: content.themes.size,
		events: [...content.events.values()],
		eventCount: content.events.size,
		cooperations: [...content.cooperations.values()],
		cooperationCount: content.cooperations.size,
		news: [...content.news.values()],
		newsCount: content.news.size,
		nominations: [...content.nominations.values()],
		nominationCount: content.nominations.size,
		faqs: [...content.faqs.values()],
		faqCount: content.faqs.size
	}
}
