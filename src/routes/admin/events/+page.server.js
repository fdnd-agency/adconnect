import { ContentService } from '$lib/server/contentService'

export async function load({ cookies }) {
	// Retrieves events from Directus API through the ContentService.
	const { data: content, errors } = await ContentService.fetchContent('events', null, null, null, false, cookies.get('access_token'))

	return {
		events: content.events,
		loadError: errors.length ? 'Er is een probleem opgetreden bij het ophalen van de events.' : null
	}
}

export const actions = {
	/**
	 * Sets an event's status to 'published'.
	 */
	publish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.publishContent(id, 'events', token)
	},

	/**
	 * Sets an event's status to 'draft'.
	 */
	depublish: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.depublishContent(id, 'events', token)
	},

	/**
	 * Deletes an event.
	 */
	delete: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.deleteContent(id, 'events', token)
	}
}
