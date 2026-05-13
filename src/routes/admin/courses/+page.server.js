import { ContentService } from '$lib/server/contentService'

export async function load({ cookies }) {
	// Retrieves courses from Directus API through the ContentService.
	const { data: content, errors } = await ContentService.fetchContent('courses', null, null, null, true, cookies.get('access_token'))

	return {
		courses: content.courses ? [...content.courses.values()] : [],
		loadError: errors.length ? 'Er is een probleem opgetreden bij het ophalen van de courses.' : null
	}
}

export const actions = {
	/**
	 * Deletes a course.
	 */
	delete: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.deleteContent(id, 'courses', token)
	}
}
