import { ContentService } from '$lib/server/contentService'

export async function load() {
	// Requested fields for the data from Directus API
	const newsFields = 'title,description,date_updated,uuid,hero'
	const cooperationFields = 'id,url,name,logo'

	// Fetch the content data via the ContentService.
	const newsResponse = await ContentService.fetchContent('news', null, newsFields, null, false)
	const cooperationResponse = await ContentService.fetchContent('cooperations', null, cooperationFields, null, false)

	return {
		news: Array.from(newsResponse.data.news.values()),
		cooperation: Array.from(cooperationResponse.data.cooperations.values())
	}
}
