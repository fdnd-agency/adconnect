import { DIRECTUS_URL } from '$lib/server/directus.js'

export async function load({ params }) {
	const { slug } = params

	// Data from Directus API
	const baseUrl = `${DIRECTUS_URL}/items/`
	const themeEndpoint = 'adconnect_themes'
	const fields = '&fields=title,description,hero,slug,body'
	const fieldsThemes = '?fields=title,description,hero,slug'
	const filter = `?filter[slug][_eq]=${slug}`

	// Convert data to json
	const themeResponse = await fetch(`${baseUrl}${themeEndpoint}${filter}${fields}`)
	const themeData = await themeResponse.json()

	const themesResponse = await fetch(baseUrl + themeEndpoint + fieldsThemes)
	const themesData = await themesResponse.json()

	return {
		theme: themeData.data,
		themes: themesData.data
	}
}
