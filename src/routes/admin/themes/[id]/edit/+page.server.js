import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_UPDATE_ERROR = 'Er is iets misgegaan bij het bijwerken van het thema.'
const GENERIC_LOAD_ERROR = 'Er is een probleem opgetreden bij het ophalen van het thema.'

export async function load({ params, cookies }) {
	const themeId = String(params.id ?? '').trim()
	if (!themeId) {
		return {
			theme: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const token = cookies.get('access_token')
	if (!token) {
		return {
			theme: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const { data: content, errors } = await ContentService.fetchContent('themes', themeId, null, null, false, token)
	const theme = Array.isArray(content.themes) ? (content.themes[0] ?? null) : null

	if (errors.length > 0 || !theme) {
		return {
			theme: null,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	return {
		theme,
		loadError: null
	}
}

export const actions = {
	// Handles form submission for editing a theme. Validates input, optionally
	// replaces the hero image, and updates the theme. Publish is ignored here.
	default: async ({ params, request, cookies }) => {
		const data = await request.formData()
		const { submitAction: rawSubmitAction = 'save', ...submittedFormState } = extractFormState(data, {})
		const submitAction = String(rawSubmitAction ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const image = data.get('image')
		delete submittedFormState.image

		const themeId = String(params.id ?? '').trim()
		const title = String(submittedFormState.title ?? '').trim()
		const description = String(submittedFormState.description ?? '').trim()
		const date = String(submittedFormState.date ?? '').trim()
		const excerpt = String(submittedFormState.excerpt ?? '').trim()
		const body = String(submittedFormState.body ?? '').trim()
		const currentHeroId = String(submittedFormState.currentHeroId ?? '').trim() || null
		const token = cookies.get('access_token')

		if (!token) {
			return fail(403, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!themeId) {
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

		if (!excerpt) {
			return fail(400, { error: 'Vul een samenvatting in.', ...submittedFormState })
		}

		if (!body) {
			return fail(400, { error: 'Vul de body in.', ...submittedFormState })
		}

		const hasNewImage = image instanceof File && image.size > 0
		let newHeroId = null

		try {
			if (hasNewImage) {
				const imageUpload = await ContentService.postFile(image, token, {
					folderName: FILE_LIBRARY_FOLDER,
					allowedMimePrefixes: ['image/'],
					invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
				})

				if (!imageUpload?.success) {
					console.error('[themes/edit] Image upload failed:', imageUpload)
					return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
				}

				newHeroId = imageUpload.id
			}

			const payload = {
				title,
				description,
				date,
				excerpt,
				body
			}

			if (newHeroId) {
				payload.hero = newHeroId
			}

			const updateResult = await ContentService.updateContent(themeId, payload, 'themes', token)

			if (!updateResult?.success) {
				console.error('[themes/edit] Theme update failed:', updateResult)
				if (newHeroId) {
					const rollback = await ContentService.deleteFile(newHeroId, token)
					if (!rollback?.success) {
						console.error(`[themes/edit] Rollback failed for file ${newHeroId}`)
					}
				}
				return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
			}

			if (newHeroId && currentHeroId) {
				const cleanup = await ContentService.deleteFile(currentHeroId, token)
				if (!cleanup?.success) {
					console.error(`[themes/edit] Cleanup of old hero ${currentHeroId} failed`)
				}
			}

			if (shouldPublish) {
				console.error('[themes/edit] Publish action ignored in edit route.')
			}

			return {
				success: true,
				message: 'Thema succesvol bijgewerkt.',
				themeId: updateResult.id ?? themeId
			}
		} catch (err) {
			console.error('[themes/edit] Unexpected error during update:', err)
			if (newHeroId) {
				const rollback = await ContentService.deleteFile(newHeroId, token)
				if (!rollback?.success) {
					console.error(`[themes/edit] Rollback failed for file ${newHeroId}`)
				}
			}
			return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}
	}
}
