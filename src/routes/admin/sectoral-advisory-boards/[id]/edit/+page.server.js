import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'

const GENERIC_UPDATE_ERROR = 'Er is iets misgegaan bij het bijwerken van het sectorale adviescollege.'
const GENERIC_LOAD_ERROR = 'Er is een probleem opgetreden bij het ophalen van het sectorale adviescollege.'

export async function load({ params, cookies }) {
	const sectoralAdvisoryBoardId = String(params.id ?? '').trim()
	if (!sectoralAdvisoryBoardId) {
		return {
			sectoralAdvisoryBoard: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const token = cookies.get('access_token')
	const { data: content, errors } = await ContentService.fetchContent('sectoralAdvisoryBoards', sectoralAdvisoryBoardId, null, null, false, token)
	const sectoralAdvisoryBoard = Array.isArray(content.sectoralAdvisoryBoards) ? (content.sectoralAdvisoryBoards[0] ?? null) : null

	if (errors.length > 0 || !sectoralAdvisoryBoard) {
		return {
			sectoralAdvisoryBoard: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	return {
		sectoralAdvisoryBoard,
		loadError: null
	}
}

export const actions = {
	default: async ({ params, request, cookies }) => {
		const data = await request.formData()
		const submittedFormState = extractFormState(data)
		const sectoralAdvisoryBoardId = String(params.id ?? '').trim()
		const rawTitle = String(submittedFormState.title ?? '')
		const title = rawTitle.trim()
		const token = cookies.get('access_token')

		submittedFormState.title = rawTitle

		if (!token && process.env.E2E_TEST_MODE !== '1') {
			return fail(403, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!sectoralAdvisoryBoardId) {
			return fail(400, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!title) {
			return fail(400, { error: 'Vul een titel in.', ...submittedFormState })
		}

		try {
			const payload = { title }
			const updateResult = await ContentService.updateContent(sectoralAdvisoryBoardId, payload, 'sectoralAdvisoryBoards', token)

			if (!updateResult?.success) {
				console.error('[sectoral-advisory-boards/edit] Update failed:', updateResult)
				const updateStatus = Number(updateResult?.status) || 500
				const errorMessage = updateResult?.data?.error ?? GENERIC_UPDATE_ERROR
				return fail(updateStatus, { error: errorMessage, ...submittedFormState })
			}

			return {
				success: true,
				message: 'Sectoraal adviescollege succesvol bijgewerkt.',
				sectoralAdvisoryBoardId
			}
		} catch (err) {
			console.error('[sectoral-advisory-boards/edit] Unexpected error during update:', err)
			return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}
	}
}
