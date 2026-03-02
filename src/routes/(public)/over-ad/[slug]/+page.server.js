export async function load({ params }) {
	const { slug } = params

	// Data from Directus API
	const baseUrl = 'https://fdnd-agency.directus.app/items/'
	const themeEndpoint = 'adconnect_themes'
	const fields = '&fields=title,description,hero,slug,body'
	const fieldsThemes = '?fields=id,title,description,hero,slug'
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
