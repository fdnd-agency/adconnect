import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'

const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van de opleiding.'

export async function load({ cookies }) {
	const { data: cooperationContent, errors: cooperationErrors = [] } = await ContentService.fetchContent('cooperations', null, null, null, true, cookies.get('access_token'))

	const cooperations = cooperationContent.cooperations ? [...cooperationContent.cooperations.values()] : []
	cooperations.sort((a, b) => (a?.name ?? '').localeCompare(b?.name ?? '', 'nl'))

	return {
		cooperations,
		loadError: cooperationErrors.length ? 'Samenwerkingen konden niet worden geladen.' : null
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const submittedFormState = extractFormState(data, { arrayFields: ['cooperations'] })
		const rawTitle = String(submittedFormState.title ?? '')
		const title = rawTitle.trim()
		const cooperationIds = Array.isArray(submittedFormState.cooperations) ? submittedFormState.cooperations : []
		const token = cookies.get('access_token')

		submittedFormState.title = rawTitle
		submittedFormState.cooperations = cooperationIds

		if (!token) {
			return fail(403, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		}

		if (!title) {
			return fail(400, { error: 'Vul een titel in.', ...submittedFormState })
		}

		const payload = { title }

		if (cooperationIds.length > 0) {
			payload.cooperations = {
				create: cooperationIds.map((id) => ({ adconnect_cooperation_id: id }))
			}
		}

		try {
			const createResult = await ContentService.postContent(payload, 'courses', token)

			if (!createResult?.success) {
				console.error('[courses/create] Course create failed:', createResult)
				return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
			}

			return {
				success: true,
				message: 'Opleiding succesvol opgeslagen.',
				courseId: createResult.id
			}
		} catch (err) {
			console.error('[courses/create] Unexpected error during create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		}
	}
}
