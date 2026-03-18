import { ContentService } from '$lib/server/contentService'

export async function load({ cookies }) {
	// Retrieves documents from Directus API through the ContentService.
	const { data: content, errors } = await ContentService.fetchContent('documents', null, null, null, false, cookies.get('access_token'))

	return {
		documents: content.documents,
		loadError: errors.length ? 'Er is een probleem opgetreden bij het ophalen van de documenten.' : null
	}
}

export const actions = {
	/**
	 * Sets a document's status to 'published'.
	 */
	publish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.publishContent(id, 'documents', token)
	},

	/**
	 * Sets a document's status to 'draft'.
	 */
	depublish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.depublishContent(id, 'documents', token)
	},

	/**
	 * Deletes a document.
	 */
	delete: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.deleteContent(id, 'documents', token)
	}
}
