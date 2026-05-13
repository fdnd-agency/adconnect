import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_UPDATE_ERROR = 'Er is iets misgegaan bij het bijwerken van het nieuwsartikel.'
const GENERIC_LOAD_ERROR = 'Er is een probleem opgetreden bij het ophalen van het nieuwsartikel.'

async function rollbackUploadedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[news/edit] Rollback failed for file ${fileId}`)
		}
	}
}

async function cleanupReplacedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[news/edit] Cleanup failed for replaced file ${fileId}`)
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

export async function load({ params, cookies }) {
	const newsId = String(params.id ?? '').trim()
	if (!newsId) {
		return {
			article: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const token = cookies.get('access_token')
	if (!token) {
		return {
			article: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const { data: content, errors } = await ContentService.fetchContent('news', newsId, null, null, false, token)
	const article = Array.isArray(content.news) ? (content.news[0] ?? null) : null

	if (errors.length > 0 || !article) {
		return {
			article: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	return {
		article,
		loadError: null
	}
}

export const actions = {
	default: async ({ params, request, cookies }) => {
		const data = await request.formData()
		const { submitAction: rawSubmitAction = 'save', image, currentHeroId = '', ...submittedFormState } = extractFormState(data)

		const submitAction = String(rawSubmitAction ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const newsId = String(params.id ?? '').trim()
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
			return fail(403, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!newsId) {
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
		const replacedFileIds = []
		let updateSucceeded = false

		try {
			const payload = {
				title,
				description,
				date,
				author,
				tags,
				body
			}

			if (image instanceof File && image.size > 0) {
				const imageUpload = await ContentService.postFile(image, token, {
					folderName: FILE_LIBRARY_FOLDER,
					allowedMimePrefixes: ['image/'],
					invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
				})

				if (!imageUpload?.success) {
					console.error('[news/edit] Image upload failed:', imageUpload)
					return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
				}

				uploadedFileIds.push(imageUpload.id)
				payload.hero = imageUpload.id

				const oldHeroId = String(currentHeroId ?? '').trim()
				if (oldHeroId) {
					replacedFileIds.push(oldHeroId)
				}
			} else {
				const oldHeroId = String(currentHeroId ?? '').trim()
				if (oldHeroId) {
					payload.hero = oldHeroId
				}
			}

			const updateResult = await ContentService.updateContent(newsId, payload, 'news', token)

			if (!updateResult?.success) {
				console.error('[news/edit] News update failed:', updateResult)
				const updateStatus = Number(updateResult?.status) || 500
				const errorMessage = updateResult?.data?.error ?? GENERIC_UPDATE_ERROR
				return fail(updateStatus, { error: errorMessage, ...submittedFormState })
			}

			updateSucceeded = true

			if (shouldPublish) {
				console.error('[news/edit] Publish action ignored in edit route.')
			}

			return {
				success: true,
				message: 'Nieuwsartikel succesvol bijgewerkt.',
				newsId: updateResult.id ?? newsId
			}
		} catch (err) {
			console.error('[news/edit] Unexpected error during update:', err)
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
