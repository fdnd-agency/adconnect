import { ContentService } from '$lib/server/contentService'

export async function load({ cookies, url }) {
	if (url.searchParams.get('e2e_reset') === '1') {
		ContentService.resetE2EData()
	}

	// Retrieves lados through the ContentService.
	const { data: content, errors } = await ContentService.fetchContent('lados', null, null, null, true, cookies.get('access_token'))

	return {
		lados: content.lados,
		loadError: errors.length ? `Er is een probleem opgetreden bij het ophalen van de lado's.` : null
	}
}

export const actions = {
	/**
	 * Sets a lado's status to 'published'.
	 */
	publish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = String(data.get('id') ?? '')
		const token = cookies.get('access_token')

		return await ContentService.publishContent(id, 'lados', token)
	},

	/**
	 * Sets a lado's status to 'draft'.
	 */
	depublish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = String(data.get('id') ?? '')
		const token = cookies.get('access_token')

		return await ContentService.depublishContent(id, 'lados', token)
	},

	/**
	 * Deletes a lado.
	 */
	delete: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = String(data.get('id') ?? '')
		const token = cookies.get('access_token')

		return await ContentService.deleteContent(id, 'lados', token)
	}
}
