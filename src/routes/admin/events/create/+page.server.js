import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'
import { Slugify } from '$lib/server/slugify.js'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van het event.'
const GENERIC_PUBLISH_WARNING = 'Event opgeslagen als concept, maar publiceren is mislukt.'

async function rollbackUploadedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[events/create] Rollback failed for file ${fileId}`)
		}
	}
}

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
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const {
			submitAction: rawSubmitAction = 'save',
			image,
			nomination_ids: nominationIds = [],
			...submittedFormState
		} = extractFormState(data, {
			arrayFields: ['nomination_ids']
		})

		const submitAction = String(rawSubmitAction ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const title = String(submittedFormState.title ?? '').trim()
		const description = String(submittedFormState.description ?? '').trim()
		const date = String(submittedFormState.date ?? '').trim()
		const timeDuration = String(submittedFormState.time_duration ?? '').trim()
		const excerpt = String(submittedFormState.excerpt ?? '').trim()
		const body = String(submittedFormState.body ?? '').trim()
		const token = cookies.get('access_token')

		submittedFormState.title = String(submittedFormState.title ?? '')
		submittedFormState.description = String(submittedFormState.description ?? '')
		submittedFormState.date = String(submittedFormState.date ?? '')
		submittedFormState.time_duration = String(submittedFormState.time_duration ?? '')
		submittedFormState.excerpt = String(submittedFormState.excerpt ?? '')
		submittedFormState.body = String(submittedFormState.body ?? '')
		submittedFormState.nomination_ids = nominationIds

		if (!token) {
			return fail(403, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		}

		if (!title) {
			return fail(400, { error: 'Vul een titel in.', ...submittedFormState })
		}

		if (!description) {
			return fail(400, { error: 'Vul een omschrijving in.', ...submittedFormState })
		}

		if (!date) {
			return fail(400, { error: 'Vul een datum in.', ...submittedFormState })
		}

		if (!timeDuration) {
			return fail(400, { error: 'Vul een tijdsduur in.', ...submittedFormState })
		}

		if (!excerpt) {
			return fail(400, { error: 'Vul een samenvatting in.', ...submittedFormState })
		}

		if (!body) {
			return fail(400, { error: 'Vul de body in.', ...submittedFormState })
		}

		if (!(image instanceof File) || image.size === 0) {
			return fail(400, { error: 'Upload een afbeelding.', ...submittedFormState })
		}

		const uploadedFileIds = []
		let eventCreated = false

		const baseSlug = Slugify.slugify(title)
		let payload = {
			title,
			slug: baseSlug,
			description,
			date,
			time_duration: timeDuration,
			excerpt,
			body,
			status: 'draft'
		}

		if (nominationIds.length > 0) {
			payload.nomination_id = {
				create: nominationIds.map((nominationId) => ({
					adconnect_nominations_id: nominationId
				}))
			}
		}

		try {
			const imageUpload = await ContentService.postFile(image, token, {
				folderName: FILE_LIBRARY_FOLDER,
				allowedMimePrefixes: ['image/'],
				invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
			})

			if (!imageUpload?.success) {
				console.error('[events/create] Image upload failed:', imageUpload)
				return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
			}
			uploadedFileIds.push(imageUpload.id)

			payload = { ...payload, hero: imageUpload.id }

			let createResult = await ContentService.postContent(payload, 'events', token)
			let retryCount = 0
			while (!createResult?.success && Slugify.isDuplicateSlugError(createResult) && retryCount < 3) {
				retryCount += 1
				payload = { ...payload, slug: Slugify.slugWithRandomSuffix(baseSlug) }
				createResult = await ContentService.postContent(payload, 'events', token)
			}

			if (!createResult?.success) {
				console.error('[events/create] Event create failed:', createResult)
				const status = Number(createResult?.status) || 500
				const errorMessage = createResult?.data?.error ?? GENERIC_CREATE_ERROR
				return fail(status, { error: errorMessage, ...submittedFormState })
			}

			eventCreated = true

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(createResult.id, 'events', token)

					if (!publishResult?.success) {
						console.error('[events/create] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							eventId: createResult.id
						}
					}
				} catch (err) {
					console.error('[events/create] Unexpected error during publish:', err)
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
			console.error('[events/create] Unexpected error during create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		} finally {
			if (!eventCreated && uploadedFileIds.length > 0) {
				await rollbackUploadedFiles(uploadedFileIds, token)
			}
		}
	}
}
