import { ContentService } from '$lib/server/contentService'

export async function load({ cookies }) {
	// Retrieves cooperations from Directus API through the ContentService.
	const { data: content, errors } = await ContentService.fetchContent('cooperations', null, null, null, true, cookies.get('access_token'))

	return {
		cooperations: content.cooperations,
		loadError: errors.length ? 'Er is een probleem opgetreden bij het ophalen van de samenwerkingen.' : null
	}
}

export const actions = {
	/**
	 * Sets a cooperation's status to 'published'.
	 */
	publish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.publishContent(id, 'cooperations', token)
	},

	/**
	 * Sets a cooperation's status to 'draft'.
	 */
	depublish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.depublishContent(id, 'cooperations', token)
	},

	/**
	 * Deletes a cooperation.
	 */
	delete: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.deleteContent(id, 'cooperations', token)
	}
}
