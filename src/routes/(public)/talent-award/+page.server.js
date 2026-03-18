import { error } from '@sveltejs/kit'
import { ContentService } from '$lib/server/contentService.js'

export async function load() {
	const nominationsResponse = await ContentService.fetchContent('nominations', null, null, null, false)
	const nominations = Array.from(nominationsResponse.data.nominations?.values?.() ?? [])

	if (nominations.length === 0) {
		throw error(404, 'Talent en Nominaties niet gevonden')
	}

	return {
		nominations
	}
}
