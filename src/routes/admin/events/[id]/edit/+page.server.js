import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_UPDATE_ERROR = 'Er is iets misgegaan bij het bijwerken van het event.'
const GENERIC_LOAD_ERROR = 'Er is een probleem opgetreden bij het ophalen van het event.'

async function rollbackUploadedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[events/edit] Rollback failed for file ${fileId}`)
		}
	}
}

async function cleanupReplacedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		if (!fileId) continue

		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`[events/edit] Cleanup failed for replaced file ${fileId}`)
		}
	}
}

/**
 * Extracts nomination links from the raw event data, handling various possible formats and ensuring valid nomination IDs are returned.
 * @param {*} rawNominationLinks - The raw nomination links data from the event, which can be in various formats.
 * @returns {Array} An array of objects containing junctionId, nominationId, and nominationTitle for each valid nomination link.
 */
function extractNominationLinks(rawNominationLinks) {
	if (!Array.isArray(rawNominationLinks)) return []

	return rawNominationLinks
		.map((link) => {
			if (typeof link !== 'object' || link === null) {
				return { junctionId: null, nominationId: '' }
			}

			const junctionId = String(link.id ?? '').trim() || null
			const relation = link.adconnect_nominations_id
			const nominationId = typeof relation === 'object' && relation !== null ? String(relation.id ?? '').trim() : String(relation ?? '').trim()
			const nominationTitle = typeof relation === 'object' && relation !== null ? String(relation.title ?? '').trim() : String(link.title ?? '').trim()

			return {
				junctionId,
				nominationId,
				nominationTitle
			}
		})
		.filter((link) => Boolean(link.nominationId || link.nominationTitle))
}

/**
 * Resolves the selected nomination IDs from the raw nomination links and the available nominations.
 * @param {*} rawNominationLinks - The raw nomination links data from the event.
 * @param {*} nominations - The available nominations to match against.
 * @returns {Array} An array of selected nomination IDs.
 */
function resolveSelectedNominationIds(rawNominationLinks, nominations) {
	const nominationById = new Map(nominations.map((nomination) => [String(nomination?.id ?? '').trim(), String(nomination?.id ?? '').trim()]).filter(([key, value]) => Boolean(key) && Boolean(value)))

	const nominationByTitle = new Map(
		nominations
			.map((nomination) => [
				String(nomination?.title ?? '')
					.trim()
					.toLowerCase(),
				String(nomination?.id ?? '').trim()
			])
			.filter(([key, value]) => Boolean(key) && Boolean(value))
	)

	const selectedIds = []
	for (const link of extractNominationLinks(rawNominationLinks)) {
		const candidates = [link.nominationId, link.nominationTitle]
		for (const candidate of candidates) {
			const normalizedCandidate = String(candidate ?? '').trim()
			if (!normalizedCandidate) continue

			const byId = nominationById.get(normalizedCandidate)
			if (byId && !selectedIds.includes(byId)) {
				selectedIds.push(byId)
				break
			}

			const byTitle = nominationByTitle.get(normalizedCandidate.toLowerCase())
			if (byTitle && !selectedIds.includes(byTitle)) {
				selectedIds.push(byTitle)
				break
			}
		}
	}

	return selectedIds
}

/**
 * Extracts the hero ID from the event item, with an optional fallback.
 * @param {*} eventItem - The event item containing the hero data.
 * @param {*} fallback - The fallback value to use if the hero ID is not found.
 * @returns {string} The extracted hero ID or the fallback value.
 */
function extractHeroId(eventItem, fallback) {
	const fallbackId = String(fallback ?? '').trim()
	if (fallbackId) return fallbackId

	const hero = eventItem?.hero
	if (typeof hero === 'object' && hero !== null) {
		return String(hero.id ?? '').trim()
	}

	return String(hero ?? '').trim()
}

export async function load({ params, cookies }) {
	const eventId = String(params.id ?? '').trim()
	if (!eventId) {
		return {
			event: null,
			nominations: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const token = cookies.get('access_token')
	if (!token) {
		return {
			event: null,
			nominations: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const [nominationsRes, eventRes] = await Promise.all([
		ContentService.fetchContent('nominations', null, null, null, true, token),
		ContentService.fetchContent('events', eventId, '*,nomination_id.id,nomination_id.adconnect_nominations_id.id,nomination_id.adconnect_nominations_id.title', null, false, token)
	])

	const nominations = nominationsRes.data.nominations ? [...nominationsRes.data.nominations.values()] : []
	nominations.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	const event = Array.isArray(eventRes.data.events) ? (eventRes.data.events[0] ?? null) : null

	if (nominationsRes.errors.length > 0 || eventRes.errors.length > 0 || !event) {
		return {
			event: null,
			nominations,
			loadError: GENERIC_LOAD_ERROR
		}
	}

	return {
		event,
		nominations,
		selectedNominationIds: resolveSelectedNominationIds(event.nomination_id, nominations),
		loadError: null
	}
}

export const actions = {
	default: async ({ params, request, cookies }) => {
		const data = await request.formData()
		const {
			submitAction: rawSubmitAction = 'save',
			image,
			currentHeroId = '',
			nomination_ids: nominationIds = [],
			...submittedFormState
		} = extractFormState(data, {
			arrayFields: ['nomination_ids']
		})

		const submitAction = String(rawSubmitAction ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const eventId = String(params.id ?? '').trim()
		const title = String(submittedFormState.title ?? '').trim()
		const description = String(submittedFormState.description ?? '').trim()
		const date = String(submittedFormState.date ?? '').trim()
		const timeDuration = String(submittedFormState.time_duration ?? '').trim()
		const excerpt = String(submittedFormState.excerpt ?? '').trim()
		const body = String(submittedFormState.body ?? '').trim()
		const token = cookies.get('access_token')

		submittedFormState.title = String(submittedFormState.title ?? '')
		submittedFormState.description = String(submittedFormState.description ?? '')
		submittedFormState.date = String(submittedFormState.date ?? '')
		submittedFormState.time_duration = String(submittedFormState.time_duration ?? '')
		submittedFormState.excerpt = String(submittedFormState.excerpt ?? '')
		submittedFormState.body = String(submittedFormState.body ?? '')
		submittedFormState.nomination_ids = nominationIds

		if (!token) {
			return fail(403, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!eventId) {
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

		if (!timeDuration) {
			return fail(400, { error: 'Vul een tijdsduur in.', ...submittedFormState })
		}

		if (!excerpt) {
			return fail(400, { error: 'Vul een samenvatting in.', ...submittedFormState })
		}

		if (!body) {
			return fail(400, { error: 'Vul de body in.', ...submittedFormState })
		}

		const existingEventRes = await ContentService.fetchContent(
			'events',
			eventId,
			'*,nomination_id.id,nomination_id.adconnect_nominations_id.id,nomination_id.adconnect_nominations_id.title',
			null,
			false,
			token
		)
		const existingEvent = Array.isArray(existingEventRes.data.events) ? (existingEventRes.data.events[0] ?? null) : null
		if (existingEventRes.errors.length > 0 || !existingEvent) {
			return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		const uploadedFileIds = []
		const replacedFileIds = []
		let updateSucceeded = false

		try {
			const payload = {
				title,
				description,
				date,
				time_duration: timeDuration,
				excerpt,
				body
			}

			const previousHeroId = extractHeroId(existingEvent, currentHeroId)
			if (image instanceof File && image.size > 0) {
				const imageUpload = await ContentService.postFile(image, token, {
					folderName: FILE_LIBRARY_FOLDER,
					allowedMimePrefixes: ['image/'],
					invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
				})

				if (!imageUpload?.success) {
					console.error('[events/edit] Image upload failed:', imageUpload)
					return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
				}
				uploadedFileIds.push(imageUpload.id)
				payload.hero = imageUpload.id

				if (previousHeroId) {
					replacedFileIds.push(previousHeroId)
				}
			} else if (previousHeroId) {
				payload.hero = previousHeroId
			}

			const existingLinks = extractNominationLinks(existingEvent.nomination_id)
			const existingByNominationId = new Map(existingLinks.map((link) => [link.nominationId, link]))
			const selectedNominationSet = new Set(nominationIds)

			const nominationsToCreate = nominationIds.filter((nominationId) => !existingByNominationId.has(nominationId)).map((nominationId) => ({ adconnect_nominations_id: nominationId }))

			const nominationsToDelete = existingLinks.filter((link) => !selectedNominationSet.has(link.nominationId) && link.junctionId).map((link) => link.junctionId)

			if (nominationsToCreate.length > 0 || nominationsToDelete.length > 0) {
				payload.nomination_id = {}

				if (nominationsToCreate.length > 0) {
					payload.nomination_id.create = nominationsToCreate
				}

				if (nominationsToDelete.length > 0) {
					payload.nomination_id.delete = nominationsToDelete
				}
			}

			const updateResult = await ContentService.updateContent(eventId, payload, 'events', token)

			if (!updateResult?.success) {
				console.error('[events/edit] Event update failed:', updateResult)
				const status = Number(updateResult?.status) || 500
				const errorMessage = updateResult?.data?.error ?? GENERIC_UPDATE_ERROR
				return fail(status, { error: errorMessage, ...submittedFormState })
			}

			updateSucceeded = true

			if (shouldPublish) {
				console.error('[events/edit] Publish action ignored in edit route.')
			}

			return {
				success: true,
				message: 'Event succesvol bijgewerkt.',
				eventId: updateResult.id ?? eventId
			}
		} catch (err) {
			console.error('[events/edit] Unexpected error during update:', err)
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
