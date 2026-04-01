import { ContentService } from '$lib/server/contentService.js'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
	const { slug } = params

	// Data from Directus API
	const themeFields = 'title,description,hero,slug,body'
	const themesFields = 'id,title,description,hero,slug'
	const filter = { slug: { _eq: slug } }

	// Convert data to json
	const themeResponse = await ContentService.fetchContent('themes', null, themeFields, filter, false)
	const themesResponse = await ContentService.fetchContent('themes', null, themesFields, null, false)
	const theme = Array.from(themeResponse.data.themes?.values?.() ?? [])
	const themes = Array.from(themesResponse.data.themes?.values?.() ?? [])

	if (theme.length === 0) {
		throw error(404, 'Thema niet gevonden')
	}

	return {
		theme,
		themes
	}
}
