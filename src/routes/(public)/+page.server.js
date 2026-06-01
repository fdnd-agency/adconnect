import { ContentService } from '$lib/server/contentService'

export async function load() {
	// Requested fields for the data from Directus API
	const newsFields = 'title,description,date_updated,uuid,hero'
	const cooperationFields = 'id,url,name,logo'
	const faqFields = 'id,question,answer,important'

	// Important faq filter
	const faqFilters = { important: { _eq: true } }

	// Fetch the content data via the ContentService.
	const newsResponse = await ContentService.fetchContent('news', null, newsFields, null, false)
	const cooperationResponse = await ContentService.fetchContent('cooperations', null, cooperationFields, null, false)
	const faqResponse = await ContentService.fetchContent('faqs', null, faqFields, faqFilters, false)

	return {
		news: Array.from(newsResponse.data.news.values()),
		cooperations: Array.from(cooperationResponse.data.cooperations.values()),
		faqs: Array.from(faqResponse.data.faqs.values())
	}
}
