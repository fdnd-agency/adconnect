import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'

const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van het nieuwsartikel.'
const GENERIC_PUBLISH_WARNING = 'Nieuwsartikel opgeslagen als concept, maar publiceren is mislukt.'

// Creates a URL-safe slug from a title string.
function slugify(value) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
}

export const actions = {
	// Handles form submission: validates input, creates a news article,
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
			slug: slugify(title),
			status: 'draft'
		}

		let createResult = null

		try {
			createResult = await ContentService.postContent(payload, 'news', token)

			if (!createResult?.success) {
				console.error('[news/form] News create failed:', createResult)
				return fail(500, { error: GENERIC_CREATE_ERROR })
			}

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(createResult.id, 'news', token)

					if (!publishResult?.success) {
						console.error('[news/form] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							newsId: createResult.id
						}
					}
				} catch (err) {
					console.error('[news/form] Unexpected error during publish:', err)
					return {
						success: true,
						message: GENERIC_PUBLISH_WARNING,
						newsId: createResult.id
					}
				}

				return {
					success: true,
					message: 'Nieuwsartikel succesvol opgeslagen en gepubliceerd.',
					newsId: createResult.id
				}
			}

			return {
				success: true,
				message: 'Nieuwsartikel succesvol opgeslagen als concept.',
				newsId: createResult.id
			}
		} catch (err) {
			console.error('[news/form] Unexpected error during create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR })
		}
	}
}
