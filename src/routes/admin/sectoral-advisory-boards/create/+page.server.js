import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'
import { ValidationChainFactory } from '$lib/server/validation/chains/validationChainFactory.js'

const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van het sectorale adviescollege.'

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const submittedFormState = extractFormState(data)
		const rawTitle = String(submittedFormState.title ?? '')
		const title = rawTitle.trim()
		const token = cookies.get('access_token')

		submittedFormState.title = rawTitle

		// Validation (Chain of Responsibility)
		const validator = ValidationChainFactory.create('sectoralAdvisoryBoard', { mode: 'create', message: GENERIC_CREATE_ERROR })
		const validationError = validator.handle({ token, ...submittedFormState })
		if (validationError) {
			return fail(validationError.status, { error: validationError.message, ...submittedFormState })
		}

		const payload = { title }

		try {
			const createResult = await ContentService.postContent(payload, 'sectoralAdvisoryBoards', token)

			if (!createResult?.success) {
				console.error('[sectoral-advisory-boards/create] Create failed:', createResult)
				return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
			}

			return {
				success: true,
				message: 'Sectoraal adviescollege succesvol opgeslagen.',
				sectoralAdvisoryBoardId: createResult.id
			}
		} catch (err) {
			console.error('[sectoral-advisory-boards/create] Unexpected error during create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		}
	}
}
