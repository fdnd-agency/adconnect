import { ContentService } from '$lib/server/contentService'

export async function load({ cookies }) {
	// Retrieves documents from Directus API through the ContentService.
	const content = await ContentService.fetchContent('documents', cookies.get('access_token'))

	return {
		documents: content.documents
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
