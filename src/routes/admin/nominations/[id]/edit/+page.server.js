import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'

const FILE_LIBRARY_FOLDER = 'Adconnect'
const GENERIC_UPDATE_ERROR = 'Er is iets misgegaan bij het bijwerken van de nominatie.'
const GENERIC_LOAD_ERROR = 'Er is een probleem opgetreden bij het ophalen van de nominatie.'
const NOMINATION_FIELDS = '*,event_id.id,event_id.adconnect_events_id.id,event_id.adconnect_events_id.title'

export async function load({ params, cookies }) {
	const nominationId = String(params.id ?? '').trim()
	if (!nominationId) {
		return {
			nomination: null,
			events: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const token = cookies.get('access_token')
	if (!token) {
		return {
			nomination: null,
			events: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const [nominationResult, eventsResult] = await Promise.all([
		ContentService.fetchContent('nominations', nominationId, NOMINATION_FIELDS, null, false, token),
		ContentService.fetchContent('events', null, null, null, true, token)
	])

	const nomination = Array.isArray(nominationResult.data.nominations) ? (nominationResult.data.nominations[0] ?? null) : null

	if (nominationResult.errors.length > 0 || !nomination) {
		return {
			nomination: null,
			events: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const events = eventsResult.data.events ? [...eventsResult.data.events.values()] : []
	events.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	return {
		nomination,
		events,
		loadError: eventsResult.errors.length ? 'Events konden niet worden geladen.' : null
	}
}

// Extracts the first related event id and the junction row id from a nomination's event_id array.
function resolveCurrentEventLink(rawEventLinks) {
	if (!Array.isArray(rawEventLinks)) return { eventId: '', junctionIds: [] }

	const junctionIds = []
	let eventId = ''

	for (const link of rawEventLinks) {
		if (link === null || link === undefined) continue

		if (typeof link === 'object') {
			if (link.id !== undefined && link.id !== null) {
				junctionIds.push(link.id)
			}
			if (!eventId) {
				const related = link.adconnect_events_id
				if (typeof related === 'object' && related !== null) {
					eventId = String(related.id ?? '').trim()
				} else if (related !== null && related !== undefined) {
					eventId = String(related).trim()
				}
			}
			continue
		}

		if (!eventId && (typeof link === 'string' || typeof link === 'number')) {
			eventId = String(link).trim()
		}
	}

	return { eventId, junctionIds }
}

export const actions = {
	default: async ({ params, request, cookies }) => {
		const data = await request.formData()
		const { submitAction: rawSubmitAction = 'save', ...submittedFormState } = extractFormState(data, {})
		delete submittedFormState.profile_picture
		delete submittedFormState.currentProfilePictureId

		const submitAction = String(rawSubmitAction ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const nominationId = String(params.id ?? '').trim()
		const title = String(submittedFormState.title ?? '').trim()
		const header = String(submittedFormState.header ?? '').trim()
		const date = String(submittedFormState.date ?? '').trim()
		const excerpt = String(submittedFormState.excerpt ?? '').trim()
		const body = String(submittedFormState.body ?? '').trim()
		const eventId = String(submittedFormState.event_id ?? '').trim()
		const institution = String(submittedFormState.institution ?? '').trim()
		const course = String(submittedFormState.course ?? '').trim()
		const previousCourse = String(submittedFormState.previous_course ?? '').trim()
		const educationVariant = String(submittedFormState.education_variant ?? '').trim()
		const alumnus = String(submittedFormState.alumnus ?? '').trim()
		const profilePicture = data.get('profile_picture')
		const currentProfilePictureId = String(data.get('currentProfilePictureId') ?? '').trim()
		const token = cookies.get('access_token')

		if (!token) {
			return fail(403, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!nominationId) {
			return fail(400, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!title) return fail(400, { error: 'Vul een titel in.', ...submittedFormState })
		if (!header) return fail(400, { error: 'Vul een header in.', ...submittedFormState })
		if (!date) return fail(400, { error: 'Vul een datum in.', ...submittedFormState })
		if (!excerpt) return fail(400, { error: 'Vul een samenvatting in.', ...submittedFormState })
		if (!body) return fail(400, { error: 'Vul de body in.', ...submittedFormState })
		if (!eventId) return fail(400, { error: 'Kies een event.', ...submittedFormState })
		if (!institution) return fail(400, { error: 'Vul een instelling in.', ...submittedFormState })
		if (!course) return fail(400, { error: 'Vul een opleiding in.', ...submittedFormState })
		if (!previousCourse) return fail(400, { error: 'Vul een vorige opleiding in.', ...submittedFormState })
		if (!educationVariant) return fail(400, { error: 'Vul een onderwijsvariant in.', ...submittedFormState })
		if (!alumnus) return fail(400, { error: 'Vul alumnis in.', ...submittedFormState })

		const hasNewProfilePicture = profilePicture instanceof File && profilePicture.size > 0
		let newProfilePictureId = null

		try {
			if (hasNewProfilePicture) {
				const upload = await ContentService.postFile(profilePicture, token, {
					folderName: FILE_LIBRARY_FOLDER,
					allowedMimePrefixes: ['image/'],
					invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
				})

				if (!upload?.success) {
					console.error('[nominations/edit] Profile picture upload failed:', upload)
					return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
				}

				newProfilePictureId = upload.id
			}

			// Fetch current nomination so we can diff the event_id junction rows.
			const currentFetch = await ContentService.fetchContent('nominations', nominationId, NOMINATION_FIELDS, null, false, token)
			const currentNomination = Array.isArray(currentFetch.data.nominations) ? (currentFetch.data.nominations[0] ?? null) : null

			if (currentFetch.errors.length > 0 || !currentNomination) {
				console.error('[nominations/edit] Failed to load current nomination for diff:', currentFetch.errors)
				if (newProfilePictureId) {
					await ContentService.deleteFile(newProfilePictureId, token)
				}
				return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
			}

			const { eventId: currentEventId, junctionIds } = resolveCurrentEventLink(currentNomination.event_id)

			const payload = {
				title,
				header,
				date,
				excerpt,
				body,
				institution,
				course,
				previous_course: previousCourse,
				education_variant: educationVariant,
				alumnus
			}

			if (eventId !== currentEventId) {
				payload.event_id = {
					create: [{ adconnect_events_id: eventId }],
					delete: junctionIds
				}
			}

			if (newProfilePictureId) {
				payload.profile_picture = newProfilePictureId
			}

			const updateResult = await ContentService.updateContent(nominationId, payload, 'nominations', token)

			if (!updateResult?.success) {
				console.error('[nominations/edit] Nomination update failed:', updateResult)
				if (newProfilePictureId) {
					await ContentService.deleteFile(newProfilePictureId, token)
				}
				return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
			}

			// Update succeeded: clean up the old profile picture best-effort.
			if (newProfilePictureId && currentProfilePictureId && currentProfilePictureId !== newProfilePictureId) {
				const cleanup = await ContentService.deleteFile(currentProfilePictureId, token)
				if (!cleanup?.success) {
					console.error(`[nominations/edit] Failed to delete old profile picture ${currentProfilePictureId}.`)
				}
			}

			if (shouldPublish) {
				console.error('[nominations/edit] Publish action ignored in edit route.')
			}

			return {
				success: true,
				message: 'Nominatie succesvol bijgewerkt.',
				nominationId: updateResult.id ?? nominationId
			}
		} catch (err) {
			console.error('[nominations/edit] Unexpected error during update:', err)
			if (newProfilePictureId) {
				await ContentService.deleteFile(newProfilePictureId, token)
			}
			return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}
	}
}
