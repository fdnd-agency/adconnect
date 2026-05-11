import { ContentService } from '$lib/server/contentService'
import { error, redirect } from '@sveltejs/kit'

export async function load({ params, cookies, locals }) {
	if (!locals.user) {
		throw redirect(303, '/admin/login')
	}

	const fields = params.type === 'documents' ? 'title,id,description,slug,hero_image,source_file.*,date,status' : null
	let response

	try {
		response = await ContentService.fetchContent(params.type, params.id, fields, null, false, cookies.get('access_token'))
	} catch {
		return {
			type: params.type,
			content: [],
			loadError: `Er is een probleem opgetreden bij het ophalen van de ${params.type} preview.`
		}
	}

	const { data, errors } = response
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
