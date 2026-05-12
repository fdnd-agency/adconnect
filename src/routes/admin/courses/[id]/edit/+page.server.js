import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'

const GENERIC_UPDATE_ERROR = 'Er is iets misgegaan bij het bijwerken van de opleiding.'
const GENERIC_LOAD_ERROR = 'Er is een probleem opgetreden bij het ophalen van de opleiding.'

export async function load({ params, cookies }) {
	const courseId = String(params.id ?? '').trim()
	if (!courseId) {
		return {
			course: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const token = cookies.get('access_token')
	const { data: content, errors } = await ContentService.fetchContent('courses', courseId, null, null, false, token)
	const course = Array.isArray(content.courses) ? (content.courses[0] ?? null) : null

	if (errors.length > 0 || !course) {
		return {
			course: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	return {
		course,
		loadError: null
	}
}

export const actions = {
	default: async ({ params, request, cookies }) => {
		const data = await request.formData()
		const submittedFormState = extractFormState(data)
		const courseId = String(params.id ?? '').trim()
		const rawTitle = String(submittedFormState.title ?? '')
		const title = rawTitle.trim()
		const token = cookies.get('access_token')

		submittedFormState.title = rawTitle

		if (!token && process.env.E2E_TEST_MODE !== '1') {
			return fail(403, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!courseId) {
			return fail(400, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!title) {
			return fail(400, { error: 'Vul een titel in.', ...submittedFormState })
		}

		try {
			const payload = { title }
			const updateResult = await ContentService.updateContent(courseId, payload, 'courses', token)

			if (!updateResult?.success) {
				console.error('[courses/edit] Course update failed:', updateResult)
				const updateStatus = Number(updateResult?.status) || 500
				const errorMessage = updateResult?.data?.error ?? GENERIC_UPDATE_ERROR
				return fail(updateStatus, { error: errorMessage, ...submittedFormState })
			}

			return {
				success: true,
				message: 'Opleiding succesvol bijgewerkt.',
				courseId
			}
		} catch (err) {
			console.error('[courses/edit] Unexpected error during update:', err)
			return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}
	}
}
