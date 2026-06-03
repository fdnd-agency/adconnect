import { ContentService } from '$lib/server/contentService.js'

const AD_DAY_PAGE_FIELDS = [
	'id',
	'hero_heading',
	'hero_body',
	'about_heading',
	'about_body',
	'faq_heading',
	'faq_1_heading',
	'faq_1_body',
	'faq_2_heading',
	'faq_2_body',
	'faq_3_heading',
	'faq_3_body',
	'faq_4_heading',
	'faq_4_body',
	'planning_heading',
	'planning_body',
	'program_heading',
	'program_body',
	'program_button_text',
	'program_button_url',
	'workshops_heading',
	'workshops_body',
	'workshops_button_text',
	'workshops_button_url',
	'location_heading',
	'location_body'
].join(',')

export async function load() {
	const adDayPageResponse = await ContentService.fetchContent('pageAdDay', null, AD_DAY_PAGE_FIELDS, null, false)
	const adDayPageItem = adDayPageResponse.data.pageAdDay?.[0]

	return {
		adDayPage: adDayPageItem ?? {}
	}
}
