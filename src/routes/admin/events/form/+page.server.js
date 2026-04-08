import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van het event.'
const GENERIC_PUBLISH_WARNING = 'Event opgeslagen als concept, maar publiceren is mislukt.'

// Deletes uploaded files when event creation fails.
async function rollbackUploadedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[events/form] Rollback failed for file ${fileId}`)
		}
	}
}

// Loads existing nominations so admins can link them to events.
export async function load({ cookies }) {
	const { data: content, errors } = await ContentService.fetchContent('nominations', null, null, null, true, cookies.get('access_token'))

	const nominations = content.nominations ? [...content.nominations.values()] : []
	nominations.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	return {
		nominations,
		loadError: errors.length ? 'Nominaties konden niet worden geladen.' : null
	}
}

export const actions = {
	// Handles form submission: validates input, creates an event,
	// and optionally publishes it.
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const submitAction = String(data.get('submitAction') ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const title = String(data.get('title') ?? '').trim()
		const description = String(data.get('description') ?? '').trim()
		const date = String(data.get('date') ?? '').trim()
		const excerpt = String(data.get('excerpt') ?? '').trim()
		const body = String(data.get('body') ?? '').trim()
		const nominationId = String(data.get('nomination_id') ?? '').trim()
		const image = data.get('image')
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

		if (!date) {
			return fail(400, { error: 'Vul een datum in.' })
		}

		if (!excerpt) {
			return fail(400, { error: 'Vul een samenvatting in.' })
		}

		if (!body) {
			return fail(400, { error: 'Vul de body in.' })
		}

		if (!nominationId) {
			return fail(400, { error: 'Kies een nominatie.' })
		}

		if (!(image instanceof File) || image.size === 0) {
			return fail(400, { error: 'Upload een afbeelding.' })
		}

		const uploadedFileIds = []
		let eventCreated = false

		const payload = {
			title,
			description,
			date,
			excerpt,
			body,
			nomination_id: [nominationId],
			status: 'draft'
		}

		try {
			const imageUpload = await ContentService.postFile(image, token, {
				folderName: FILE_LIBRARY_FOLDER,
				allowedMimePrefixes: ['image/'],
				invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
			})

			if (!imageUpload?.success) {
				console.error('[events/form] Image upload failed:', imageUpload)
				return fail(500, { error: GENERIC_CREATE_ERROR })
			}
			uploadedFileIds.push(imageUpload.id)

			payload.hero = imageUpload.id

			const createResult = await ContentService.postContent(payload, 'events', token)

			if (!createResult?.success) {
				console.error('[events/form] Event create failed:', createResult)
				return fail(500, { error: GENERIC_CREATE_ERROR })
			}

			eventCreated = true

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
		} finally {
			if (!eventCreated && uploadedFileIds.length > 0) {
				await rollbackUploadedFiles(uploadedFileIds, token)
			}
		}
	}
}
