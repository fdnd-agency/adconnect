import { ContentService } from '$lib/server/contentService'

export async function load({ params, cookies }) {
	const { data: content, errors } = await ContentService.fetchContent(params.type, params.id, cookies.get('access_token'))

	return {
		type: params.type,
		content: content,
		loadError: errors.length ? `Er is een probleem opgetreden bij het ophalen van de ${params.type} preview.` : null
	}
}
