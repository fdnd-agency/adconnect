import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van het nieuwsartikel.'
const GENERIC_PUBLISH_WARNING = 'Nieuwsartikel opgeslagen als concept, maar publiceren is mislukt.'

async function rollbackUploadedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[news/create] Rollback failed for file ${fileId}`)
		}
	}
}

function parseTags(rawValue) {
	const tagsRaw = String(rawValue ?? '').trim()
	if (!tagsRaw) return []

	try {
		const parsedTags = JSON.parse(tagsRaw)
		return Array.isArray(parsedTags) ? parsedTags.map((tag) => String(tag).trim()).filter(Boolean) : []
	} catch {
		return []
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const {
			submitAction: rawSubmitAction = 'save',
			image,
			...submittedFormState
		} = extractFormState(data)

		const submitAction = String(rawSubmitAction ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const title = String(submittedFormState.title ?? '').trim()
		const description = String(submittedFormState.description ?? '').trim()
		const date = String(submittedFormState.date ?? '').trim()
		const author = String(submittedFormState.author ?? '').trim()
		const body = String(submittedFormState.body ?? '').trim()
		const tags = parseTags(submittedFormState.tags)
		const token = cookies.get('access_token')

		submittedFormState.title = String(submittedFormState.title ?? '')
		submittedFormState.description = String(submittedFormState.description ?? '')
		submittedFormState.date = String(submittedFormState.date ?? '')
		submittedFormState.author = String(submittedFormState.author ?? '')
		submittedFormState.tags = String(submittedFormState.tags ?? '')
		submittedFormState.body = String(submittedFormState.body ?? '')

		if (!token) {
			return fail(403, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		}

		if (!title) {
			return fail(400, { error: 'Vul een titel in.', ...submittedFormState })
		}

		if (!description) {
			return fail(400, { error: 'Vul een omschrijving in.', ...submittedFormState })
		}

		if (!(image instanceof File) || image.size === 0) {
			return fail(400, { error: 'Upload een afbeelding.', ...submittedFormState })
		}

		if (!date) {
			return fail(400, { error: 'Vul een datum in.', ...submittedFormState })
		}

		if (!author) {
			return fail(400, { error: 'Vul een auteur in.', ...submittedFormState })
		}

		if (tags.length === 0) {
			return fail(400, { error: 'Vul tags in.', ...submittedFormState })
		}

		if (!body) {
			return fail(400, { error: 'Vul de body in.', ...submittedFormState })
		}

		const uploadedFileIds = []
		let newsCreated = false

		const payload = {
			title,
			description,
			date,
			author,
			tags,
			body,
			status: 'draft'
		}

		try {
			const imageUpload = await ContentService.postFile(image, token, {
				folderName: FILE_LIBRARY_FOLDER,
				allowedMimePrefixes: ['image/'],
				invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
			})

			if (!imageUpload?.success) {
				console.error('[news/create] Image upload failed:', imageUpload)
				return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
			}
			uploadedFileIds.push(imageUpload.id)

			payload.hero = imageUpload.id

			const createResult = await ContentService.postContent(payload, 'news', token)

			if (!createResult?.success) {
				console.error('[news/create] News create failed:', createResult)
				const createStatus = Number(createResult?.status) || 500
				const errorMessage = createResult?.data?.error ?? GENERIC_CREATE_ERROR
				return fail(createStatus, { error: errorMessage, ...submittedFormState })
			}

			newsCreated = true

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(createResult.id, 'news', token)

					if (!publishResult?.success) {
						console.error('[news/create] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							newsId: createResult.id
						}
					}
				} catch (err) {
					console.error('[news/create] Unexpected error during publish:', err)
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
			console.error('[news/create] Unexpected error during create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		} finally {
			if (!newsCreated && uploadedFileIds.length > 0) {
				await rollbackUploadedFiles(uploadedFileIds, token)
			}
		}
	}
}
