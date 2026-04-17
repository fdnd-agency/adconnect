import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'

const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van de faq.'
const GENERIC_UPDATE_ERROR = 'Er is iets misgegaan bij het bijwerken van de faq.'
const GENERIC_PUBLISH_WARNING = 'Faq opgeslagen als concept, maar publiceren is mislukt.'
const GENERIC_LOAD_ERROR = 'Er is een probleem opgetreden bij het ophalen van de faq.'

export async function load({ url, cookies }) {
	const faqId = String(url.searchParams.get('id') ?? '').trim()

	if (!faqId) {
		return {
			faq: null,
			isEditMode: false,
			loadError: null
		}
	}

	const token = cookies.get('access_token')
	if (!token) {
		return {
			faq: null,
			isEditMode: true,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const { data: content, errors } = await ContentService.fetchContent('faqs', faqId, null, null, false, token)
	const faq = Array.isArray(content.faqs) ? (content.faqs[0] ?? null) : null

	if (errors.length > 0 || !faq) {
		return {
			faq: null,
			isEditMode: true,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	return {
		faq,
		isEditMode: true,
		loadError: null
	}
}

export const actions = {
	// Handles form submission: validates input, creates a faq,
	// and optionally publishes it.
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const { submitAction: rawSubmitAction = 'save', faqId: rawFaqId = '', ...submittedFormState } = Object.fromEntries(data.entries())
		const submitAction = String(rawSubmitAction).trim()
		const faqId = String(rawFaqId ?? '').trim()
		const isEditMode = faqId.length > 0
		const shouldPublish = !isEditMode && submitAction === 'publish'
		const rawQuestion = String(submittedFormState.question ?? '')
		const rawAnswer = String(submittedFormState.answer ?? '')
		const question = rawQuestion.trim()
		const answer = rawAnswer.trim()
		const important = submittedFormState.important === 'on'
		const token = cookies.get('access_token')

		// Checkbox values are omitted by FormData when unchecked, so normalize to explicit boolean.
		submittedFormState.question = rawQuestion
		submittedFormState.answer = rawAnswer
		submittedFormState.important = important

		if (!token) {
			return fail(403, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
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
			important,
			...(isEditMode ? {} : { status: 'draft' })
		}

		try {
			const mutationResult = isEditMode ? await ContentService.updateContent(faqId, payload, 'faqs', token) : await ContentService.postContent(payload, 'faqs', token)

			const finalFaqId = mutationResult?.id ?? faqId

			if (!mutationResult?.success) {
				console.error('[faqs/form] Faq save failed:', mutationResult)
				return fail(500, {
					error: isEditMode ? GENERIC_UPDATE_ERROR : GENERIC_CREATE_ERROR,
					...submittedFormState
				})
			}

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(finalFaqId, 'faqs', token)

					if (!publishResult?.success) {
						console.error('[faqs/form] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							faqId: finalFaqId
						}
					}
				} catch (err) {
					console.error('[faqs/form] Unexpected error during publish:', err)
					return {
						success: true,
						message: GENERIC_PUBLISH_WARNING,
						faqId: finalFaqId
					}
				}

				return {
					success: true,
					message: isEditMode ? 'Faq succesvol bijgewerkt en gepubliceerd.' : 'Faq succesvol opgeslagen en gepubliceerd.',
					faqId: finalFaqId
				}
			}

			return {
				success: true,
				message: isEditMode ? 'Faq succesvol bijgewerkt.' : 'Faq succesvol opgeslagen als concept.',
				faqId: finalFaqId
			}
		} catch (err) {
			console.error('[faqs/form] Unexpected error during save:', err)
			return fail(500, {
				error: isEditMode ? GENERIC_UPDATE_ERROR : GENERIC_CREATE_ERROR,
				...submittedFormState
			})
		}
	}
}
