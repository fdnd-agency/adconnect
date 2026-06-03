import { error } from '@sveltejs/kit'
import { ContentService } from '$lib/server/contentService.js'

const TALENT_AWARD_PAGE_FIELDS = [
	'id',
	'hero_heading',
	'hero_body',
	'hero_button_text',
	'hero_button_url',
	'about_heading',
	'about_body',
	'info_card_1_title',
	'info_card_1_body',
	'info_card_2_title',
	'info_card_2_body',
	'info_card_3_title',
	'info_card_3_body',
	'nominations_heading',
	'nominations_body'
].join(',')

export async function load() {
	const cooperationFields = 'id,name,logo'
	const [talentAwardPageResponse, nominationsResponse, cooperationsResponse] = await Promise.all([
		ContentService.fetchContent('pageTalentAward', null, TALENT_AWARD_PAGE_FIELDS, null, false),
		ContentService.fetchContent('nominations', null, null, null, false),
		ContentService.fetchContent('cooperations', null, cooperationFields, null, false)
	])

	const talentAwardPageItem = talentAwardPageResponse.data.pageTalentAward?.[0]
	const nominations = Array.from(nominationsResponse.data.nominations?.values?.() ?? [])
	const cooperations = Array.from(cooperationsResponse.data.cooperations?.values?.() ?? [])

	if (nominations.length === 0) {
		throw error(404, 'Talent en Nominaties niet gevonden')
	}

	return {
		talentAwardPage: talentAwardPageItem ?? {},
		nominations,
		cooperations
	}
}
