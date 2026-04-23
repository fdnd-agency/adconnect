import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'
import { Slugify } from '$lib/server/slugify.js'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van de nominatie.'
const GENERIC_PUBLISH_WARNING = 'Nominatie opgeslagen als concept, maar publiceren is mislukt.'

// Deletes uploaded files when nomination creation fails.
async function rollbackUploadedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[nominations/create] Rollback failed for file ${fileId}`)
		}
	}
}

// Loads existing events so admins can link a nomination to one event.
export async function load({ cookies }) {
	const { data: content, errors } = await ContentService.fetchContent('events', null, null, null, true, cookies.get('access_token'))

	const events = content.events ? [...content.events.values()] : []
	events.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	return {
		events,
		loadError: errors.length ? 'Events konden niet worden geladen.' : null
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const { submitAction: rawSubmitAction = 'save', ...submittedFormState } = extractFormState(data, {})
		// Drop the File object so the form component can safely re-render using this state.
		delete submittedFormState.profile_picture

		const submitAction = String(rawSubmitAction ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const title = String(submittedFormState.title ?? '').trim()
		const header = String(submittedFormState.header ?? '').trim()
		const date = String(submittedFormState.date ?? '').trim()
		const excerpt = String(submittedFormState.excerpt ?? '').trim()
		const body = String(submittedFormState.body ?? '').trim()
		const eventId = String(submittedFormState.event_id ?? '').trim()
		const institution = String(submittedFormState.institution ?? '').trim()
		const course = String(submittedFormState.course ?? '').trim()
		const previousCourse = String(submittedFormState.previous_course ?? '').trim()
		const educationVariant = String(submittedFormState.education_variant ?? '').trim()
		const alumnus = String(submittedFormState.alumnus ?? '').trim()
		const profilePicture = data.get('profile_picture')
		const token = cookies.get('access_token')

		if (!token) {
			return fail(403, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		}

		if (!title) {
			return fail(400, { error: 'Vul een titel in.', ...submittedFormState })
		}

		if (!header) {
			return fail(400, { error: 'Vul een header in.', ...submittedFormState })
		}

		if (!date) {
			return fail(400, { error: 'Vul een datum in.', ...submittedFormState })
		}

		if (!excerpt) {
			return fail(400, { error: 'Vul een samenvatting in.', ...submittedFormState })
		}

		if (!body) {
			return fail(400, { error: 'Vul de body in.', ...submittedFormState })
		}

		if (!eventId) {
			return fail(400, { error: 'Kies een event.', ...submittedFormState })
		}

		if (!institution) {
			return fail(400, { error: 'Vul een instelling in.', ...submittedFormState })
		}

		if (!course) {
			return fail(400, { error: 'Vul een opleiding in.', ...submittedFormState })
		}

		if (!previousCourse) {
			return fail(400, { error: 'Vul een vorige opleiding in.', ...submittedFormState })
		}

		if (!educationVariant) {
			return fail(400, { error: 'Vul een onderwijsvariant in.', ...submittedFormState })
		}

		if (!alumnus) {
			return fail(400, { error: 'Vul alumnis in.', ...submittedFormState })
		}

		if (!(profilePicture instanceof File) || profilePicture.size === 0) {
			return fail(400, { error: 'Upload een profielfoto.', ...submittedFormState })
		}

		const uploadedFileIds = []
		let nominationCreated = false

		try {
			const profilePictureUpload = await ContentService.postFile(profilePicture, token, {
				folderName: FILE_LIBRARY_FOLDER,
				allowedMimePrefixes: ['image/'],
				invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
			})

			if (!profilePictureUpload?.success) {
				console.error('[nominations/create] Profile picture upload failed:', profilePictureUpload)
				return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
			}
			uploadedFileIds.push(profilePictureUpload.id)

			const baseSlug = Slugify.slugify(title)
			let payload = {
				title,
				header,
				date,
				excerpt,
				body,
				event_id: {
					create: [{ adconnect_events_id: eventId }]
				},
				institution,
				course,
				previous_course: previousCourse,
				education_variant: educationVariant,
				alumnus,
				profile_picture: profilePictureUpload.id,
				slug: baseSlug,
				status: 'draft'
			}

			let createResult = await ContentService.postContent(payload, 'nominations', token)

			let retryCount = 0
			while (!createResult?.success && Slugify.isDuplicateSlugError(createResult) && retryCount < 3) {
				retryCount += 1
				payload = { ...payload, slug: Slugify.slugWithRandomSuffix(baseSlug) }
				createResult = await ContentService.postContent(payload, 'nominations', token)
			}

			if (!createResult?.success) {
				console.error('[nominations/create] Nomination create failed:', createResult)
				const createStatus = Number(createResult?.status) || 500
				const errorMessage = createResult?.data?.error ?? GENERIC_CREATE_ERROR
				return fail(createStatus, { error: errorMessage, ...submittedFormState })
			}

			nominationCreated = true

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(createResult.id, 'nominations', token)

					if (!publishResult?.success) {
						console.error('[nominations/create] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							nominationId: createResult.id
						}
					}
				} catch (err) {
					console.error('[nominations/create] Unexpected error during publish:', err)
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
			console.error('[nominations/create] Unexpected error during create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		} finally {
			if (!nominationCreated && uploadedFileIds.length > 0) {
				await rollbackUploadedFiles(uploadedFileIds, token)
			}
		}
	}
}
