import { ContentService } from '$lib/server/contentService'
import { error } from '@sveltejs/kit'

export async function load({ params, cookies }) {
	const { data, errors } = await ContentService.fetchContent(params.type, params.id, null, null, false, cookies.get('access_token'))
	const content = Array.isArray(data?.[params.type]) ? data[params.type] : []

	if (!content.length) {
		throw error(404, 'Preview item niet gevonden')
	}

	return {
		type: params.type,
		content,
		loadError: errors.length ? `Er is een probleem opgetreden bij het ophalen van de ${params.type} preview.` : null
	}
}
