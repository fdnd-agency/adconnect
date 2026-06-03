import { ContentService } from '$lib/server/contentService.js'

const ABOUT_US_PAGE_FIELDS = [
	'id',
	'hero_heading',
	'hero_body',
	'why_heading',
	'why_body',
	'origin_heading',
	'origin_body',
	'founding_letter_heading',
	'founding_letter_body',
	'advice_heading',
	'advice_body'
].join(',')

export async function load({ url: _url }) {
	// Data from Directus API
	const themesFields = 'id,title,description,hero,slug'
	const cooperationFields = 'id,url,name,logo'

	const [aboutUsPageResponse, themesResponse, cooperationsResponse] = await Promise.all([
		ContentService.fetchContent('pageAboutUs', null, ABOUT_US_PAGE_FIELDS, null, false),
		ContentService.fetchContent('themes', null, themesFields, null, false),
		ContentService.fetchContent('cooperations', null, cooperationFields, null, false)
	])

	const aboutUsPageItem = aboutUsPageResponse.data.pageAboutUs?.[0]

	return {
		aboutUsPage: aboutUsPageItem ?? {},
		themes: Array.from(themesResponse.data.themes?.values?.() ?? []),
		cooperations: Array.from(cooperationsResponse.data.cooperations?.values?.() ?? [])
	}
}
