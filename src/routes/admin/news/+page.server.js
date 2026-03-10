import { ContentService } from '$lib/server/contentService'

export async function load({ cookies }) {
	// Retrieves news from Directus API through the ContentService.
	const { data: content, errors } = await ContentService.fetchContent('news', cookies.get('access_token'))

	return {
		news: content.news,
		loadError: errors.length ? 'Er is een probleem opgetreden bij het ophalen van de nieuwsartikelen.' : null
	}
}

export const actions = {
	/**
	 * Sets a news article's status to 'published'.
	 */
	publish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.publishContent(id, 'news', token)
	},

	/**
	 * Sets a news article's status to 'draft'.
	 */
	depublish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.depublishContent(id, 'news', token)
	},

	/**
	 * Deletes a news article.
	 */
	delete: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.deleteContent(id, 'news', token)
	}
}
