import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'
import { Slugify } from '$lib/server/slugify.js'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van het thema.'
const GENERIC_PUBLISH_WARNING = 'Thema opgeslagen als concept, maar publiceren is mislukt.'

// Deletes uploaded files when theme creation fails.
async function rollbackUploadedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[themes/create] Rollback failed for file ${fileId}`)
		}
	}
}

export const actions = {
	// Handles form submission: validates input, creates a theme,
	// and optionally publishes it.
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const { submitAction: rawSubmitAction = 'save', ...submittedFormState } = extractFormState(data, {})
		const submitAction = String(rawSubmitAction ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const image = data.get('image')
		delete submittedFormState.image

		const title = String(submittedFormState.title ?? '').trim()
		const description = String(submittedFormState.description ?? '').trim()
		const date = String(submittedFormState.date ?? '').trim()
		const excerpt = String(submittedFormState.excerpt ?? '').trim()
		const body = String(submittedFormState.body ?? '').trim()
		const token = cookies.get('access_token')

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
		let themeCreated = false

		const baseSlug = Slugify.slugify(title)
		let payload = {
			title,
			description,
			date,
			excerpt,
			body,
			slug: baseSlug,
			status: 'draft'
		}

		let createResult = null

		try {
			const imageUpload = await ContentService.postFile(image, token, {
				folderName: FILE_LIBRARY_FOLDER,
				allowedMimePrefixes: ['image/'],
				invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
			})

			if (!imageUpload?.success) {
				console.error('[themes/create] Image upload failed:', imageUpload)
				return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
			}
			uploadedFileIds.push(imageUpload.id)

			payload = { ...payload, hero: imageUpload.id }

			createResult = await ContentService.postContent(payload, 'themes', token)

			let retryCount = 0
			while (!createResult?.success && Slugify.isDuplicateSlugError(createResult) && retryCount < 3) {
				retryCount += 1
				payload = { ...payload, slug: Slugify.slugWithRandomSuffix(baseSlug) }
				createResult = await ContentService.postContent(payload, 'themes', token)
			}

			if (!createResult?.success) {
				console.error('[themes/create] Theme create failed:', createResult)
				const createStatus = Number(createResult?.status) || 500
				const errorMessage = createResult?.data?.error ?? GENERIC_CREATE_ERROR
				return fail(createStatus, { error: errorMessage, ...submittedFormState })
			}

			themeCreated = true

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(createResult.id, 'themes', token)

					if (!publishResult?.success) {
						console.error('[themes/create] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							themeId: createResult.id
						}
					}
				} catch (err) {
					console.error('[themes/create] Unexpected error during publish:', err)
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
		} catch (err) {
			console.error('[themes/create] Unexpected error during create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		} finally {
			if (!themeCreated && uploadedFileIds.length > 0) {
				await rollbackUploadedFiles(uploadedFileIds, token)
			}
		}
	}
}
