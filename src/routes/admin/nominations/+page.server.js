import { ContentService } from '$lib/server/contentService'

export async function load({ cookies }) {
	// Retrieves nominations from Directus API through the ContentService.
	const { data: content, errors } = await ContentService.fetchContent('nominations', null, null, null, true, cookies.get('access_token'))

	return {
		nominations: content.nominations,
		loadError: errors.length ? 'Er is een probleem opgetreden bij het ophalen van de nominaties.' : null
	}
}

export const actions = {
	/**
	 * Sets a nomination's status to 'published'.
	 */
	publish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.publishContent(id, 'nominations', token)
	},

	/**
	 * Sets a nomination's status to 'draft'.
	 */
	depublish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.depublishContent(id, 'nominations', token)
	},

	/**
	 * Deletes a nomination.
	 */
	delete: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.deleteContent(id, 'nominations', token)
	}
}
