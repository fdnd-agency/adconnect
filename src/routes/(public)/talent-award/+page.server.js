import { error } from '@sveltejs/kit'
import { ContentService } from '$lib/server/contentService.js'

export async function load() {
	const cooperationFields = 'id,name,logo'
	const nominationsResponse = await ContentService.fetchContent('nominations', null, null, null, false)
	const cooperationsResponse = await ContentService.fetchContent('cooperations', null, cooperationFields, null, false)
	const nominations = Array.from(nominationsResponse.data.nominations?.values?.() ?? [])
	const cooperations = Array.from(cooperationsResponse.data.cooperations?.values?.() ?? [])

	if (nominations.length === 0) {
		throw error(404, 'Talent en Nominaties niet gevonden')
	}

	return {
		nominations,
		cooperations
	}
}
