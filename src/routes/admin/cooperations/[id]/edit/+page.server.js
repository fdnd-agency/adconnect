import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_UPDATE_ERROR = 'Er is iets misgegaan bij het bijwerken van de samenwerking.'
const GENERIC_LOAD_ERROR = 'Er is een probleem opgetreden bij het ophalen van de samenwerking.'
const URL_REGEX = /^https?:\/\/[^\s/$.?#].[^\s]*$/i

async function rollbackUploadedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[cooperations/edit] Rollback failed for file ${fileId}`)
		}
	}
}

async function cleanupReplacedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[cooperations/edit] Cleanup failed for replaced file ${fileId}`)
		}
	}
}

export async function load({ params, cookies }) {
	const cooperationId = String(params.id ?? '').trim()
	if (!cooperationId) {
		return {
			cooperation: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const token = cookies.get('access_token')
	if (!token) {
		return {
			cooperation: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const { data: content, errors } = await ContentService.fetchContent('cooperations', cooperationId, null, null, false, token)
	const cooperation = Array.isArray(content.cooperations) ? (content.cooperations[0] ?? null) : null

	if (errors.length > 0 || !cooperation) {
		return {
			cooperation: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	return {
		cooperation,
		loadError: null
	}
}

export const actions = {
	default: async ({ params, request, cookies }) => {
		const data = await request.formData()
		const { submitAction: rawSubmitAction = 'save', logo, currentLogoId = '', ...submittedFormState } = extractFormState(data)

		const submitAction = String(rawSubmitAction ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const cooperationId = String(params.id ?? '').trim()
		const name = String(submittedFormState.name ?? '').trim()
		const url = String(submittedFormState.url ?? '').trim()
		const token = cookies.get('access_token')

		submittedFormState.name = String(submittedFormState.name ?? '')
		submittedFormState.url = String(submittedFormState.url ?? '')

		if (!token) {
			return fail(403, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!cooperationId) {
			return fail(400, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!name) {
			return fail(400, { error: 'Vul een naam in.', ...submittedFormState })
		}

		if (!url) {
			return fail(400, { error: 'Vul een URL in.', ...submittedFormState })
		}

		if (!URL_REGEX.test(url)) {
			return fail(400, { error: 'Vul een geldige URL in (http:// of https://).', ...submittedFormState })
		}

		const uploadedFileIds = []
		const replacedFileIds = []
		let updateSucceeded = false

		try {
			const payload = {
				name,
				url
			}

			if (logo instanceof File && logo.size > 0) {
				const logoUpload = await ContentService.postFile(logo, token, {
					folderName: FILE_LIBRARY_FOLDER,
					allowedMimePrefixes: ['image/'],
					invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
				})

				if (!logoUpload?.success) {
					console.error('[cooperations/edit] Logo upload failed:', logoUpload)
					return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
				}
				uploadedFileIds.push(logoUpload.id)
				payload.logo = logoUpload.id

				const oldLogoId = String(currentLogoId ?? '').trim()
				if (oldLogoId) {
					replacedFileIds.push(oldLogoId)
				}
			} else {
				const oldLogoId = String(currentLogoId ?? '').trim()
				if (oldLogoId) {
					payload.logo = oldLogoId
				}
			}

			const updateResult = await ContentService.updateContent(cooperationId, payload, 'cooperations', token)

			if (!updateResult?.success) {
				console.error('[cooperations/edit] Cooperation update failed:', updateResult)
				const updateStatus = Number(updateResult?.status) || 500
				const errorMessage = updateResult?.data?.error ?? GENERIC_UPDATE_ERROR
				return fail(updateStatus, { error: errorMessage, ...submittedFormState })
			}

			updateSucceeded = true

			if (shouldPublish) {
				console.error('[cooperations/edit] Publish action ignored in edit route.')
			}

			return {
				success: true,
				message: 'Samenwerking succesvol bijgewerkt.',
				cooperationId: updateResult.id ?? cooperationId
			}
		} catch (err) {
			console.error('[cooperations/edit] Unexpected error during update:', err)
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
