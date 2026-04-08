import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'

const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van de samenwerking.'
const GENERIC_PUBLISH_WARNING = 'Samenwerking opgeslagen als concept, maar publiceren is mislukt.'

export const actions = {
	// Handles form submission for initial cooperations form version.
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const submitAction = String(data.get('submitAction') ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const name = String(data.get('name') ?? '').trim()
		const token = cookies.get('access_token')

		if (!token) {
			return fail(403, { error: GENERIC_CREATE_ERROR })
		}

		if (!name) {
			return fail(400, { error: 'Vul een naam in.' })
		}

		const payload = {
			name,
			status: 'draft'
		}

		try {
			const createResult = await ContentService.postContent(payload, 'cooperations', token)

			if (!createResult?.success) {
				console.error('[cooperations/form] Cooperation create failed:', createResult)
				const createStatus = Number(createResult?.status) || 500
				const errorMessage = createResult?.data?.error ?? GENERIC_CREATE_ERROR
				return fail(createStatus, { error: errorMessage })
			}

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(createResult.id, 'cooperations', token)

					if (!publishResult?.success) {
						console.error('[cooperations/form] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							cooperationId: createResult.id
						}
					}
				} catch (err) {
					console.error('[cooperations/form] Unexpected error during publish:', err)
					return {
						success: true,
						message: GENERIC_PUBLISH_WARNING,
						cooperationId: createResult.id
					}
				}

				return {
					success: true,
					message: 'Samenwerking succesvol opgeslagen en gepubliceerd.',
					cooperationId: createResult.id
				}
			}

			return {
				success: true,
				message: 'Samenwerking succesvol opgeslagen als concept.',
				cooperationId: createResult.id
			}
		} catch (err) {
			console.error('[cooperations/form] Unexpected error during create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR })
		}
	}
}
