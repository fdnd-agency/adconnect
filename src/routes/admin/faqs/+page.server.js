import { ContentService } from '$lib/server/contentService'

export async function load({ cookies }) {
	// Retrieves faqs from Directus API through the ContentService.
	const { data: content, errors } = await ContentService.fetchContent('faqs', cookies.get('access_token'))

	return {
		faqs: content.faqs ? [...content.faqs.values()] : [],
		loadError: errors.length ? 'Er is een probleem opgetreden bij het ophalen van de faqs.' : null
	}
}

export const actions = {
	/**
	 * Sets a faq's status to 'published'.
	 */
	publish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.publishContent(id, 'faqs', token)
	},

	/**
	 * Sets a faq's status to 'draft'.
	 */
	depublish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.depublishContent(id, 'faqs', token)
	},

	/**
	 * Deletes a faq.
	 */
	delete: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.deleteContent(id, 'faqs', token)
	}
}
