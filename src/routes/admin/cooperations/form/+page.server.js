import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van de samenwerking.'
const GENERIC_PUBLISH_WARNING = 'Samenwerking opgeslagen als concept, maar publiceren is mislukt.'
const URL_REGEX = /^https?:\/\/[^\s/$.?#].[^\s]*$/i

// Deletes uploaded files when cooperation creation fails.
async function rollbackUploadedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[cooperations/form] Rollback failed for file ${fileId}`)
		}
	}
}

export const actions = {
	// Handles form submission for initial cooperations form version.
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const submitAction = String(data.get('submitAction') ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const name = String(data.get('name') ?? '').trim()
		const url = String(data.get('url') ?? '').trim()
		const logo = data.get('logo')
		const token = cookies.get('access_token')

		if (!token) {
			return fail(403, { error: GENERIC_CREATE_ERROR })
		}

		if (!name) {
			return fail(400, { error: 'Vul een naam in.' })
		}

		if (!url) {
			return fail(400, { error: 'Vul een URL in.' })
		}

		if (!URL_REGEX.test(url)) {
			return fail(400, { error: 'Vul een geldige URL in (http:// of https://).' })
		}

		if (!(logo instanceof File) || logo.size === 0) {
			return fail(400, { error: 'Upload een logo.' })
		}

		const uploadedFileIds = []
		let cooperationCreated = false

		try {
			const logoUpload = await ContentService.postFile(logo, token, {
				folderName: FILE_LIBRARY_FOLDER,
				allowedMimePrefixes: ['image/'],
				invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
			})

			if (!logoUpload?.success) {
				console.error('[cooperations/form] Logo upload failed:', logoUpload)
				return fail(500, { error: GENERIC_CREATE_ERROR })
			}
			uploadedFileIds.push(logoUpload.id)

			const payload = {
				name,
				logo: logoUpload.id,
				url,
				status: 'draft'
			}

			const createResult = await ContentService.postContent(payload, 'cooperations', token)

			if (!createResult?.success) {
				console.error('[cooperations/form] Cooperation create failed:', createResult)
				const createStatus = Number(createResult?.status) || 500
				const errorMessage = createResult?.data?.error ?? GENERIC_CREATE_ERROR
				return fail(createStatus, { error: errorMessage })
			}

			cooperationCreated = true

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(createResult.id, 'cooperations', token)

					if (!publishResult?.success) {
						console.error('[cooperations/form] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							cooperationId: createResult.id
						}
					}
				} catch (err) {
					console.error('[cooperations/form] Unexpected error during publish:', err)
					return {
						success: true,
						message: GENERIC_PUBLISH_WARNING,
						cooperationId: createResult.id
					}
				}

				return {
					success: true,
					message: 'Samenwerking succesvol opgeslagen en gepubliceerd.',
					cooperationId: createResult.id
				}
			}

			return {
				success: true,
				message: 'Samenwerking succesvol opgeslagen als concept.',
				cooperationId: createResult.id
			}
		} catch (err) {
			console.error('[cooperations/form] Unexpected error during create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR })
		} finally {
			if (!cooperationCreated && uploadedFileIds.length > 0) {
				await rollbackUploadedFiles(uploadedFileIds, token)
			}
		}
	}
}
