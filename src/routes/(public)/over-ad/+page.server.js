import { DIRECTUS_URL } from '$lib/server/directus.js'

export async function load({ url: _url }) {
	// Data from Directus API
	const baseUrl = `${DIRECTUS_URL}/items/`
	const themesEndpoint = 'adconnect_themes'
	const cooperationEndpoint = 'adconnect_cooperation'
	const fieldsThemes = '?fields=title,description,hero,slug'
	const fieldsCooperation = '?fields=url,name,logo'

	// Convert themes data to json
	const themesResponse = await fetch(baseUrl + themesEndpoint + fieldsThemes)
	const themesData = await themesResponse.json()

	// Convert cooperation data to json
	const cooperationResponse = await fetch(baseUrl + cooperationEndpoint + fieldsCooperation)
	const cooperationData = await cooperationResponse.json()

	return {
		themes: themesData.data,
		cooperation: cooperationData.data
	}
}
