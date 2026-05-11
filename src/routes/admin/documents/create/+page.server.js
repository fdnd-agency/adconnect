import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'
import { Slugify } from '$lib/server/slugify.js'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van het document.'
const GENERIC_PUBLISH_WARNING = 'Document opgeslagen als concept, maar publiceren is mislukt.'

async function rollbackUploadedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[documents/create] Rollback failed for file ${fileId}`)
		}
	}
}

export async function load({ cookies }) {
	const { data: content, errors } = await ContentService.fetchContent('categories', null, null, null, false, cookies.get('access_token'))

	const categories = content.categories ? [...content.categories.values()] : []
	categories.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	return {
		categories,
		loadError: errors.length ? 'Categorieen konden niet worden geladen.' : null
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const { submitAction: rawSubmitAction = 'save', image, source_file: sourceFile, ...submittedFormState } = extractFormState(data)

		const submitAction = String(rawSubmitAction ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const title = String(submittedFormState.title ?? '').trim()
		const description = String(submittedFormState.description ?? '').trim()
		const date = String(submittedFormState.date ?? '').trim()
		const category = String(submittedFormState.category ?? '').trim()
		const token = cookies.get('access_token')

		submittedFormState.title = String(submittedFormState.title ?? '')
		submittedFormState.description = String(submittedFormState.description ?? '')
		submittedFormState.date = String(submittedFormState.date ?? '')
		submittedFormState.category = String(submittedFormState.category ?? '')

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

		if (!category) {
			return fail(400, { error: 'Kies een categorie.', ...submittedFormState })
		}

		if (!(image instanceof File) || image.size === 0) {
			return fail(400, { error: 'Upload een afbeelding.', ...submittedFormState })
		}

		if (!(sourceFile instanceof File) || sourceFile.size === 0) {
			return fail(400, { error: 'Upload een bronbestand.', ...submittedFormState })
		}

		const uploadedFileIds = []
		let documentCreated = false

		try {
			const imageUpload = await ContentService.postFile(image, token, {
				folderName: FILE_LIBRARY_FOLDER,
				allowedMimePrefixes: ['image/'],
				invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
			})

			if (!imageUpload?.success) {
				console.error('[documents/create] Image upload failed:', imageUpload)
				return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
			}
			uploadedFileIds.push(imageUpload.id)

			const sourceUpload = await ContentService.postFile(sourceFile, token, {
				folderName: FILE_LIBRARY_FOLDER,
				allowedMimePrefixes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument'],
				invalidTypeError: 'Bestand uploaden mislukt: Ongeldig bestandstype. Alleen PDF- en Word-documenten zijn toegestaan.'
			})

			if (!sourceUpload?.success) {
				console.error('[documents/create] Source file upload failed:', sourceUpload)
				return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
			}
			uploadedFileIds.push(sourceUpload.id)

			const baseSlug = Slugify.slugify(title)
			let payload = {
				title,
				description,
				date,
				category,
				hero_image: imageUpload.id,
				source_file: sourceUpload.id,
				slug: baseSlug,
				status: 'draft'
			}

			let createResult = await ContentService.postContent(payload, 'documents', token)
			let retryCount = 0
			while (!createResult?.success && Slugify.isDuplicateSlugError(createResult) && retryCount < 3) {
				retryCount += 1
				payload = { ...payload, slug: Slugify.slugWithRandomSuffix(baseSlug) }
				createResult = await ContentService.postContent(payload, 'documents', token)
			}

			if (!createResult?.success) {
				console.error('[documents/create] Document create failed:', createResult)
				const createStatus = Number(createResult?.status) || 500
				const errorMessage = createResult?.data?.error ?? GENERIC_CREATE_ERROR
				return fail(createStatus, { error: errorMessage, ...submittedFormState })
			}

			documentCreated = true

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(createResult.id, 'documents', token)

					if (!publishResult?.success) {
						console.error('[documents/create] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							documentId: createResult.id
						}
					}
				} catch (err) {
					console.error('[documents/create] Unexpected error during publish:', err)
					return {
						success: true,
						message: GENERIC_PUBLISH_WARNING,
						documentId: createResult.id
					}
				}

				return {
					success: true,
					message: 'Document succesvol opgeslagen en gepubliceerd.',
					documentId: createResult.id
				}
			}

			return {
				success: true,
				message: 'Document succesvol opgeslagen als concept.',
				documentId: createResult.id
			}
		} catch (err) {
			console.error('[documents/create] Unexpected error during upload/create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		} finally {
			if (!documentCreated && uploadedFileIds.length > 0) {
				await rollbackUploadedFiles(uploadedFileIds, token)
			}
		}
	}
}
