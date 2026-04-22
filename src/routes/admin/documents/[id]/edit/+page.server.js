import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_UPDATE_ERROR = 'Er is iets misgegaan bij het bijwerken van het document.'
const GENERIC_LOAD_ERROR = 'Er is een probleem opgetreden bij het ophalen van het document.'

async function rollbackUploadedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[documents/edit] Rollback failed for file ${fileId}`)
		}
	}
}

async function cleanupReplacedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[documents/edit] Cleanup failed for replaced file ${fileId}`)
		}
	}
}

export async function load({ params, cookies }) {
	const id = String(params.id ?? '').trim()
	if (!id) {
		return {
			document: null,
			categories: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const token = cookies.get('access_token')
	if (!token) {
		return {
			document: null,
			categories: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const [categoriesRes, documentRes] = await Promise.all([
		ContentService.fetchContent('categories', null, null, null, false, token),
		ContentService.fetchContent('documents', id, null, null, false, token)
	])

	const categories = categoriesRes.data.categories ? [...categoriesRes.data.categories.values()] : []
	categories.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	const document = Array.isArray(documentRes.data.documents) ? (documentRes.data.documents[0] ?? null) : Array.isArray(documentRes.data.document) ? (documentRes.data.document[0] ?? null) : null

	if (categoriesRes.errors.length > 0 || documentRes.errors.length > 0 || !document) {
		return {
			document: null,
			categories,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	return {
		document,
		categories,
		loadError: null
	}
}

export const actions = {
	default: async ({ params, request, cookies }) => {
		const data = await request.formData()
		const { submitAction: rawSubmitAction = 'save', image, source_file: sourceFile, currentHeroImageId = '', currentSourceFileId = '', ...submittedFormState } = extractFormState(data)

		const submitAction = String(rawSubmitAction ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const id = String(params.id ?? '').trim()
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
			return fail(403, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!id) {
			return fail(400, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
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

		const uploadedFileIds = []
		const replacedFileIds = []
		let updateSucceeded = false

		try {
			const payload = {
				title,
				description,
				date,
				category
			}

			if (image instanceof File && image.size > 0) {
				const imageUpload = await ContentService.postFile(image, token, {
					folderName: FILE_LIBRARY_FOLDER,
					allowedMimePrefixes: ['image/'],
					invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
				})

				if (!imageUpload?.success) {
					console.error('[documents/edit] Image upload failed:', imageUpload)
					return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
				}
				uploadedFileIds.push(imageUpload.id)
				payload.hero_image = imageUpload.id

				const oldHeroId = String(currentHeroImageId ?? '').trim()
				if (oldHeroId) {
					replacedFileIds.push(oldHeroId)
				}
			} else {
				const oldHeroId = String(currentHeroImageId ?? '').trim()
				if (oldHeroId) {
					payload.hero_image = oldHeroId
				}
			}

			if (sourceFile instanceof File && sourceFile.size > 0) {
				const sourceUpload = await ContentService.postFile(sourceFile, token, {
					folderName: FILE_LIBRARY_FOLDER,
					allowedMimePrefixes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument'],
					invalidTypeError: 'Bestand uploaden mislukt: Ongeldig bestandstype. Alleen PDF- en Word-documenten zijn toegestaan.'
				})

				if (!sourceUpload?.success) {
					console.error('[documents/edit] Source file upload failed:', sourceUpload)
					return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
				}
				uploadedFileIds.push(sourceUpload.id)
				payload.source_file = sourceUpload.id

				const oldSourceId = String(currentSourceFileId ?? '').trim()
				if (oldSourceId) {
					replacedFileIds.push(oldSourceId)
				}
			} else {
				const oldSourceId = String(currentSourceFileId ?? '').trim()
				if (oldSourceId) {
					payload.source_file = oldSourceId
				}
			}

			const updateResult = await ContentService.updateContent(id, payload, 'documents', token)

			if (!updateResult?.success) {
				console.error('[documents/edit] Document update failed:', updateResult)
				const updateStatus = Number(updateResult?.status) || 500
				const errorMessage = updateResult?.data?.error ?? GENERIC_UPDATE_ERROR
				return fail(updateStatus, { error: errorMessage, ...submittedFormState })
			}

			updateSucceeded = true

			if (shouldPublish) {
				console.error('[documents/edit] Publish action ignored in edit route.')
			}

			return {
				success: true,
				message: 'Document succesvol bijgewerkt.',
				documentId: updateResult.id ?? id
			}
		} catch (err) {
			console.error('[documents/edit] Unexpected error during update:', err)
			return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		} finally {
			if (!updateSucceeded && uploadedFileIds.length > 0) {
				await rollbackUploadedFiles(uploadedFileIds, token)
			}

			if (updateSucceeded && replacedFileIds.length > 0) {
				await cleanupReplacedFiles(replacedFileIds, token)
			}
		}
	}
}
