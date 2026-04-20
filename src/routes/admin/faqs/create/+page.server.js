import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'

const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van de faq.'
const GENERIC_PUBLISH_WARNING = 'Faq opgeslagen als concept, maar publiceren is mislukt.'

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const { submitAction: rawSubmitAction = 'save', ...submittedFormState } = extractFormState(data, {
			checkboxFields: ['important']
		})
		const submitAction = String(rawSubmitAction ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
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
			status: 'draft'
		}

		try {
			const createResult = await ContentService.postContent(payload, 'faqs', token)

			if (!createResult?.success) {
				console.error('[faqs/create] Faq create failed:', createResult)
				return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
			}

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(createResult.id, 'faqs', token)

					if (!publishResult?.success) {
						console.error('[faqs/create] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							faqId: createResult.id
						}
					}
				} catch (err) {
					console.error('[faqs/create] Unexpected error during publish:', err)
					return {
						success: true,
						message: GENERIC_PUBLISH_WARNING,
						faqId: createResult.id
					}
				}

				return {
					success: true,
					message: 'Faq succesvol opgeslagen en gepubliceerd.',
					faqId: createResult.id
				}
			}

			return {
				success: true,
				message: 'Faq succesvol opgeslagen als concept.',
				faqId: createResult.id
			}
		} catch (err) {
			console.error('[faqs/create] Unexpected error during create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		}
	}
}
