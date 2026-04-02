import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'

const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van de faq.'
const GENERIC_PUBLISH_WARNING = 'Faq opgeslagen als concept, maar publiceren is mislukt.'

export const actions = {
	// Handles form submission: validates input, creates a faq,
	// and optionally publishes it.
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const submitAction = String(data.get('submitAction') ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const question = String(data.get('question') ?? '').trim()
		const answer = String(data.get('answer') ?? '').trim()
		const token = cookies.get('access_token')

		if (!token) {
			return fail(403, { error: GENERIC_CREATE_ERROR })
		}

		if (!question) {
			return fail(400, { error: 'Vul een vraag in.' })
		}

		if (!answer) {
			return fail(400, { error: 'Vul een antwoord in.' })
		}

		const payload = {
			question,
			answer,
			status: 'draft'
		}

		const createResult = await ContentService.postContent(payload, 'faqs', token)

		if (!createResult?.success) {
			console.error('[faqs/form] Faq create failed:', createResult)
			return fail(500, { error: GENERIC_CREATE_ERROR })
		}

		if (shouldPublish) {
			try {
				const publishResult = await ContentService.publishContent(createResult.id, 'faqs', token)

				if (!publishResult?.success) {
					console.error('[faqs/form] Publish failed:', publishResult)
					return {
						success: true,
						message: GENERIC_PUBLISH_WARNING,
						faqId: createResult.id
					}
				}
			} catch (err) {
				console.error('[faqs/form] Unexpected error during publish:', err)
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
	}
}
