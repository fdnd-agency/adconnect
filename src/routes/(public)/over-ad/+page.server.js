import { ContentService } from '$lib/server/contentService.js'

export async function load({ url: _url }) {
	// Data from Directus API
	const themesFields = 'id,title,description,hero,slug'
	const cooperationFields = 'id,url,name,logo'

	// Convert themes data to json
	const themesResponse = await ContentService.fetchContent('themes', null, themesFields, null, false)
	// Convert cooperation data to json
	const cooperationResponse = await ContentService.fetchContent('cooperations', null, cooperationFields, null, false)

	return {
		themes: Array.from(themesResponse.data.themes?.values?.() ?? []),
		cooperation: Array.from(cooperationResponse.data.cooperations?.values?.() ?? [])
	}
}
