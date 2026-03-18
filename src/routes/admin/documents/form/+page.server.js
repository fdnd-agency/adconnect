import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van het document.'
const GENERIC_PUBLISH_WARNING = 'Document opgeslagen als concept, maar publiceren is mislukt.'

// Creates a URL-safe slug from a title string.
function slugify(value) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
}

// Deletes uploaded files when document creation fails.
async function rollbackUploadedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[documents/form] Rollback failed for file ${fileId}`)
		}
	}
}

// Loads and alphabetically sorts document categories for the form.
export async function load({ cookies }) {
	const { data: content, errors } = await ContentService.fetchContent('categories', cookies.get('access_token'))

	const categories = content.categories ? [...content.categories.values()] : []
	categories.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	return {
		categories,
		loadError: errors.length ? 'Categorieen konden niet worden geladen.' : null
	}
}

export const actions = {
	// Handles form submission: validates input, uploads files, creates a document,
	// and optionally publishes it.
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const submitAction = String(data.get('submitAction') ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const title = String(data.get('title') ?? '').trim()
		const description = String(data.get('description') ?? '').trim()
		const date = String(data.get('date') ?? '').trim()
		const category = String(data.get('category') ?? '').trim()
		const image = data.get('image')
		const sourceFile = data.get('source_file')
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

		if (!category) {
			return fail(400, { error: 'Kies een categorie.' })
		}

		if (!(image instanceof File) || image.size === 0) {
			return fail(400, { error: 'Upload een afbeelding.' })
		}

		if (!(sourceFile instanceof File) || sourceFile.size === 0) {
			return fail(400, { error: 'Upload een bronbestand.' })
		}

		const uploadedFileIds = []
		let createResult = null
		let documentCreated = false

		try {
			const imageUpload = await ContentService.postFile(image, token, {
				folderName: FILE_LIBRARY_FOLDER,
				allowedMimePrefixes: ['image/'],
				invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
			})

			if (!imageUpload?.success) {
				console.error('[documents/form] Image upload failed:', imageUpload)
				return fail(500, { error: GENERIC_CREATE_ERROR })
			}
			uploadedFileIds.push(imageUpload.id)

			const sourceUpload = await ContentService.postFile(sourceFile, token, {
				folderName: FILE_LIBRARY_FOLDER,
				allowedMimePrefixes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument'],
				invalidTypeError: 'Bestand uploaden mislukt: Ongeldig bestandstype. Alleen PDF- en Word-documenten zijn toegestaan.'
			})

			if (!sourceUpload?.success) {
				console.error('[documents/form] Source file upload failed:', sourceUpload)
				return fail(500, { error: GENERIC_CREATE_ERROR })
			}
			uploadedFileIds.push(sourceUpload.id)

			const payload = {
				title,
				description,
				date,
				category,
				hero_image: imageUpload.id,
				source_file: sourceUpload.id,
				slug: slugify(title),
				status: 'draft'
			}

			createResult = await ContentService.postContent(payload, 'documents', token)

			if (!createResult?.success) {
				console.error('[documents/form] Document create failed:', createResult)
				return fail(500, { error: GENERIC_CREATE_ERROR })
			}

			documentCreated = true

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(createResult.id, 'documents', token)

					if (!publishResult?.success) {
						console.error('[documents/form] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							documentId: createResult.id
						}
					}
				} catch (err) {
					console.error('[documents/form] Unexpected error during publish:', err)
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
			console.error('[documents/form] Unexpected error during upload/create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR })
		} finally {
			if (!documentCreated && uploadedFileIds.length > 0) {
				await rollbackUploadedFiles(uploadedFileIds, token)
			}
		}
	}
}
