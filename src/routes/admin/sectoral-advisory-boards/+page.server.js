import { ContentService } from '$lib/server/contentService'

export async function load({ cookies }) {
	const { data: content, errors } = await ContentService.fetchContent('sectoralAdvisoryBoards', null, null, null, true, cookies.get('access_token'))

	return {
		sectoralAdvisoryBoards: content.sectoralAdvisoryBoards ? [...content.sectoralAdvisoryBoards.values()] : [],
		loadError: errors.length ? 'Er is een probleem opgetreden bij het ophalen van de sectorale adviescolleges.' : null
	}
}

export const actions = {
	/**
	 * Deletes a sectoral advisory board.
	 */
	delete: async ({ request, cookies }) => {
		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.deleteContent(id, 'sectoralAdvisoryBoards', token)
	}
}
