import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'

const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van de nominatie.'
const GENERIC_PUBLISH_WARNING = 'Nominatie opgeslagen als concept, maar publiceren is mislukt.'

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
	// Handles form submission for initial nominations form version.
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const submitAction = String(data.get('submitAction') ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const title = String(data.get('title') ?? '').trim()
		const header = String(data.get('header') ?? '').trim()
		const date = String(data.get('date') ?? '').trim()
		const excerpt = String(data.get('excerpt') ?? '').trim()
		const body = String(data.get('body') ?? '').trim()
		const token = cookies.get('access_token')

		if (!token) {
			return fail(403, { error: GENERIC_CREATE_ERROR })
		}

		if (!title) {
			return fail(400, { error: 'Vul een titel in.' })
		}

		if (!header) {
			return fail(400, { error: 'Vul een header in.' })
		}

		if (!date) {
			return fail(400, { error: 'Vul een datum in.' })
		}

		if (!excerpt) {
			return fail(400, { error: 'Vul een samenvatting in.' })
		}

		if (!body) {
			return fail(400, { error: 'Vul de body in.' })
		}

		const payload = {
			title,
			header,
			date,
			excerpt,
			body,
			slug: slugify(title),
			status: 'draft'
		}

		try {
			const createResult = await ContentService.postContent(payload, 'nominations', token)

			if (!createResult?.success) {
				console.error('[nominations/form] Nomination create failed:', createResult)
				const createStatus = Number(createResult?.status) || 500
				const errorMessage = createResult?.data?.error ?? GENERIC_CREATE_ERROR
				return fail(createStatus, { error: errorMessage })
			}

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(createResult.id, 'nominations', token)

					if (!publishResult?.success) {
						console.error('[nominations/form] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							nominationId: createResult.id
						}
					}
				} catch (err) {
					console.error('[nominations/form] Unexpected error during publish:', err)
					return {
						success: true,
						message: GENERIC_PUBLISH_WARNING,
						nominationId: createResult.id
					}
				}

				return {
					success: true,
					message: 'Nominatie succesvol opgeslagen en gepubliceerd.',
					nominationId: createResult.id
				}
			}

			return {
				success: true,
				message: 'Nominatie succesvol opgeslagen als concept.',
				nominationId: createResult.id
			}
		} catch (err) {
			console.error('[nominations/form] Unexpected error during create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR })
		}
	}
}
