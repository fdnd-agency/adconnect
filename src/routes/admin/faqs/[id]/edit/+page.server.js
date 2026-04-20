import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'

const GENERIC_UPDATE_ERROR = 'Er is iets misgegaan bij het bijwerken van de faq.'
const GENERIC_LOAD_ERROR = 'Er is een probleem opgetreden bij het ophalen van de faq.'

export async function load({ params, cookies }) {
	const faqId = String(params.id ?? '').trim()
	if (!faqId) {
		return {
			faq: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const token = cookies.get('access_token')
	if (!token) {
		return {
			faq: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const { data: content, errors } = await ContentService.fetchContent('faqs', faqId, null, null, false, token)
	const faq = Array.isArray(content.faqs) ? (content.faqs[0] ?? null) : null

	if (errors.length > 0 || !faq) {
		return {
			faq: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	return {
		faq,
		loadError: null
	}
}

/**
 * Handles form submission for editing a FAQ. Validates input, updates the FAQ, and optionally publishes it.
 *
 * @param {Object} event - The event object containing request and cookies.
 * @returns {Object} The result of the action, including success status and messages.
 */
export const actions = {
	default: async ({ params, request, cookies }) => {
		const data = await request.formData()
		const { submitAction: rawSubmitAction = 'save', ...submittedFormState } = extractFormState(data, {
			checkboxFields: ['important']
		})
		const submitAction = String(rawSubmitAction ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const faqId = String(params.id ?? '').trim()
		const rawQuestion = String(submittedFormState.question ?? '')
		const rawAnswer = String(submittedFormState.answer ?? '')
		const question = rawQuestion.trim()
		const answer = rawAnswer.trim()
		const important = submittedFormState.important === true
		const token = cookies.get('access_token')

		submittedFormState.question = rawQuestion
		submittedFormState.answer = rawAnswer
		submittedFormState.important = important

		if (!token) {
			return fail(403, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!faqId) {
			return fail(400, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!question) {
			return fail(400, { error: 'Vul een vraag in.', ...submittedFormState })
		}

		if (!answer) {
			return fail(400, { error: 'Vul een antwoord in.', ...submittedFormState })
		}

		const payload = {
			question,
			answer,
			important
		}

		try {
			const updateResult = await ContentService.updateContent(faqId, payload, 'faqs', token)

			if (!updateResult?.success) {
				console.error('[faqs/edit] Faq update failed:', updateResult)
				return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
			}

			if (shouldPublish) {
				console.error('[faqs/edit] Publish action ignored in edit route.')
			}

			return {
				success: true,
				message: 'Faq succesvol bijgewerkt.',
				faqId: updateResult.id ?? faqId
			}
		} catch (err) {
			console.error('[faqs/edit] Unexpected error during update:', err)
			return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}
	}
}
