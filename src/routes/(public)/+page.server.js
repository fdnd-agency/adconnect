import { ContentService } from '$lib/server/contentService'

const homePageFields = [
	'id',
	'hero_heading',
	'hero_body',
	'hero_primary_button_text',
	'hero_primary_button_url',
	'hero_secondary_button_text',
	'hero_secondary_button_url',
	'intro_heading',
	'intro_body',
	'intro_button_text',
	'intro_button_url',
	'cards_heading',
	'cards_intro',
	'card_1_title',
	'card_1_body',
	'card_1_button_text',
	'card_1_button_url',
	'card_2_title',
	'card_2_body',
	'card_2_button_text',
	'card_2_button_url',
	'card_3_title',
	'card_3_body',
	'card_3_button_text',
	'card_3_button_url',
	'why_heading',
	'why_body',
	'why_button_text',
	'why_button_url'
].join(',')

export async function load() {
	// Requested fields for the data from Directus API
	const newsFields = 'title,description,date_updated,uuid,hero'
	const cooperationFields = 'id,url,name,logo'

	// Fetch the content data via the ContentService.
	const [homePageResponse, newsResponse, cooperationsResponse] = await Promise.all([
		ContentService.fetchContent('pageHome', null, homePageFields, null, false),
		ContentService.fetchContent('news', null, newsFields, null, false),
		ContentService.fetchContent('cooperations', null, cooperationFields, null, false)
	])

	const homePageItem = homePageResponse.data.pageHome?.[0]

	return {
		homePage: homePageItem ?? {},
		news: Array.from(newsResponse.data.news.values()),
		cooperations: Array.from(cooperationsResponse.data.cooperations.values())
	}
}
