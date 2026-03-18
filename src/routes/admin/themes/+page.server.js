import { ContentService } from '$lib/server/contentService'

export async function load({ cookies }) {
	// Retrieves themes from Directus API through the ContentService.
	const { data: content, errors } = await ContentService.fetchContent('themes', null, null, null, false, cookies.get('access_token'))

	return {
		themes: content.themes,
		loadError: errors.length ? 'Er is een probleem opgetreden bij het ophalen van de themas.' : null
	}
}

export const actions = {
	/**
	 * Sets a theme's status to 'published'.
	 */
	publish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.publishContent(id, 'themes', token)
	},

	/**
	 * Sets a theme's status to 'draft'.
	 */
	depublish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.depublishContent(id, 'themes', token)
	},

	/**
	 * Deletes a theme.
	 */
	delete: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.deleteContent(id, 'themes', token)
	}
}
