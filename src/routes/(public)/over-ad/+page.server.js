import { ContentService } from '$lib/server/contentService.js'

const aboutAdPageFields = [
	'id',
	'hero_heading',
	'hero_body',
	'hero_button_text',
	'hero_button_url',
	'why_heading',
	'why_body',
	'why_card_1_title',
	'why_card_1_body',
	'why_card_2_title',
	'why_card_2_body',
	'why_card_3_title',
	'why_card_3_body',
	'bachelor_heading',
	'bachelor_body',
	'bachelor_button_text',
	'bachelor_button_url',
	'profiles_heading',
	'profiles_body',
	'profiles_button_text',
	'profiles_button_url',
	'awards_heading',
	'awards_body',
	'awards_button_text',
	'awards_button_url'
].join(',')

export async function load({ url: _url }) {
	// Data from Directus API
	const themesFields = 'id,title,description,hero,slug'
	const cooperationFields = 'id,url,name,logo'

	const [aboutAdPageResponse, themesResponse, cooperationsResponse] = await Promise.all([
		ContentService.fetchContent('pageAboutAd', null, aboutAdPageFields, null, false),
		ContentService.fetchContent('themes', null, themesFields, null, false),
		ContentService.fetchContent('cooperations', null, cooperationFields, null, false)
	])

	const aboutAdPageItem = aboutAdPageResponse.data.pageAboutAd?.[0]

	return {
		aboutAdPage: aboutAdPageItem ?? {},
		themes: Array.from(themesResponse.data.themes?.values?.() ?? []),
		cooperations: Array.from(cooperationsResponse.data.cooperations?.values?.() ?? [])
	}
}
