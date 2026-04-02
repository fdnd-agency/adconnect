import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'

const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van het thema.'
const GENERIC_PUBLISH_WARNING = 'Thema opgeslagen als concept, maar publiceren is mislukt.'

export const actions = {
	// Handles form submission: validates input, creates a theme,
	// and optionally publishes it.
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const submitAction = String(data.get('submitAction') ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const title = String(data.get('title') ?? '').trim()
		const description = String(data.get('description') ?? '').trim()
		const token = cookies.get('access_token')

		if (!token) {
			return fail(403, { error: GENERIC_CREATE_ERROR })
		}

		if (!title) {
			return fail(400, { error: 'Vul een titel in.' })
		}

		if (!description) {
			return fail(400, { error: 'Vul een omschrijving in.' })
		}

		const payload = {
			title,
			description,
			status: 'draft'
		}

		const createResult = await ContentService.postContent(payload, 'themes', token)

		if (!createResult?.success) {
			console.error('[themes/form] Theme create failed:', createResult)
			return fail(500, { error: GENERIC_CREATE_ERROR })
		}

		if (shouldPublish) {
			try {
				const publishResult = await ContentService.publishContent(createResult.id, 'themes', token)

				if (!publishResult?.success) {
					console.error('[themes/form] Publish failed:', publishResult)
					return {
						success: true,
						message: GENERIC_PUBLISH_WARNING,
						themeId: createResult.id
					}
				}
			} catch (err) {
				console.error('[themes/form] Unexpected error during publish:', err)
				return {
					success: true,
					message: GENERIC_PUBLISH_WARNING,
					themeId: createResult.id
				}
			}

			return {
				success: true,
				message: 'Thema succesvol opgeslagen en gepubliceerd.',
				themeId: createResult.id
			}
		}

		return {
			success: true,
			message: 'Thema succesvol opgeslagen als concept.',
			themeId: createResult.id
		}
	}
}
