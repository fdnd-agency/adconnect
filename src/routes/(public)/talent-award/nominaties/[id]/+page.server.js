import { ContentService } from '$lib/server/contentService.js'
import { error } from '@sveltejs/kit'

const NOMINATION_FIELDS = 'id,title,header,date,excerpt,body,institution,course,previous_course,education_variant,alumnus,profile_picture,slug'

export async function load({ params }) {
	const nominationId = String(params.id ?? '').trim()

	if (!nominationId) {
		throw error(404, 'Nominatie niet gevonden')
	}

	const response = await ContentService.fetchContent('nominations', nominationId, NOMINATION_FIELDS, null, false)
	let nomination = Array.isArray(response.data.nominations) ? (response.data.nominations[0] ?? null) : null

	if (!nomination) {
		const fallback = await ContentService.fetchContent('nominations', null, NOMINATION_FIELDS, { slug: { _eq: nominationId } }, false)

		nomination = Array.isArray(fallback.data.nominations) ? (fallback.data.nominations[0] ?? null) : null
		if (!nomination || fallback.errors.length > 0) {
			throw error(404, 'Nominatie niet gevonden')
		}

		return { nomination }
	}

	if (response.errors.length > 0) {
		throw error(404, 'Nominatie niet gevonden')
	}

	return { nomination }
}
