import { ContentService } from '$lib/server/contentService'
import { error } from '@sveltejs/kit'

export async function load({ params, cookies }) {
	const fields = params.type === 'documents' ? 'title,id,description,slug,hero_image,source_file.*,date,status' : null
	const { data, errors } = await ContentService.fetchContent(params.type, params.id, fields, null, false, cookies.get('access_token'))
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
