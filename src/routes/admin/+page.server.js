import { ContentService } from '$lib/server/contentService.js'

export async function load({ cookies }) {
	const { data: content, errors } = await ContentService.fetchContent(null, null, cookies.get('access_token'))

	return {
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
