import { ContentService } from '$lib/server/contentService'
import { getE2ELadosList, resetE2ELadosStore, publishE2ELado, depublishE2ELado, deleteE2ELado } from '$lib/server/e2eLadosStore.js'

function isE2EMode() {
	return process.env.E2E_TEST_MODE === '1'
}

export async function load({ cookies, url }) {
	if (isE2EMode()) {
		if (url.searchParams.get('e2e_reset') === '1') {
			resetE2ELadosStore()
		}

		const lados = new Map(getE2ELadosList().map((lado) => [lado.id, lado]))
		return {
			lados,
			loadError: null
		}
	}

	// Retrieves lados from Directus API through the ContentService.
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
		if (isE2EMode()) {
			const data = await request.formData()
			const id = String(data.get('id') ?? '')
			const lado = publishE2ELado(id)
			return lado ? { success: true } : { success: false }
		}

		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.publishContent(id, 'lados', token)
	},

	/**
	 * Sets a lado's status to 'draft'.
	 */
	depublish: async ({ request, cookies }) => {
		if (isE2EMode()) {
			const data = await request.formData()
			const id = String(data.get('id') ?? '')
			const lado = depublishE2ELado(id)
			return lado ? { success: true } : { success: false }
		}

		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.depublishContent(id, 'lados', token)
	},

	/**
	 * Deletes a lado.
	 */
	delete: async ({ request, cookies }) => {
		if (isE2EMode()) {
			const data = await request.formData()
			const id = String(data.get('id') ?? '')
			const deleted = deleteE2ELado(id)
			return deleted ? { success: true } : { success: false }
		}

		const data = await request.formData()
		const id = data.get('id')
		const token = cookies.get('access_token')

		return await ContentService.deleteContent(id, 'lados', token)
	}
}
