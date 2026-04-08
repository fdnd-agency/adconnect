import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'

const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van het event.'
const GENERIC_PUBLISH_WARNING = 'Event opgeslagen als concept, maar publiceren is mislukt.'

export const actions = {
	// Handles form submission: validates input, creates an event,
	// and optionally publishes it.
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const submitAction = String(data.get('submitAction') ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const title = String(data.get('title') ?? '').trim()
		const token = cookies.get('access_token')

		if (!token) {
			return fail(403, { error: GENERIC_CREATE_ERROR })
		}

		if (!title) {
			return fail(400, { error: 'Vul een titel in.' })
		}

		const payload = {
			title,
			status: 'draft'
		}

		try {
			const createResult = await ContentService.postContent(payload, 'events', token)

			if (!createResult?.success) {
				console.error('[events/form] Event create failed:', createResult)
				return fail(500, { error: GENERIC_CREATE_ERROR })
			}

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(createResult.id, 'events', token)

					if (!publishResult?.success) {
						console.error('[events/form] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							eventId: createResult.id
						}
					}
				} catch (err) {
					console.error('[events/form] Unexpected error during publish:', err)
					return {
						success: true,
						message: GENERIC_PUBLISH_WARNING,
						eventId: createResult.id
					}
				}

				return {
					success: true,
					message: 'Event succesvol opgeslagen en gepubliceerd.',
					eventId: createResult.id
				}
			}

			return {
				success: true,
				message: 'Event succesvol opgeslagen als concept.',
				eventId: createResult.id
			}
		} catch (err) {
			console.error('[events/form] Unexpected error during create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR })
		}
	}
}
