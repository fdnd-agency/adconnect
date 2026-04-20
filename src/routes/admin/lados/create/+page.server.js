import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'
import { createE2ELado, getE2ECourses, getE2ESectoralAdvisoryBoards, setE2ECourseLinks } from '$lib/server/e2eLadosStore.js'

function isE2EMode() {
	return process.env.E2E_TEST_MODE === '1'
}

const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van de Lado.'
const GENERIC_PUBLISH_WARNING = 'Lado opgeslagen als concept, maar publiceren is mislukt.'
const GENERIC_COURSE_LINK_WARNING = 'Lado opgeslagen, maar koppelen aan opleiding is mislukt.'

// Loads existing courses and sectorial advisory boards so admins can link them to Lado's.
export async function load({ cookies }) {
	if (isE2EMode()) {
		const courses = getE2ECourses()
			.slice()
			.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))
		const sectoralAdvisoryBoards = getE2ESectoralAdvisoryBoards()
			.slice()
			.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))
		return {
			courses,
			sectoralAdvisoryBoards,
			loadError: null
		}
	}

	const { data: coursesContent, errors: coursesErrors = [] } = await ContentService.fetchContent('courses', null, null, null, true, cookies.get('access_token'))

	const { data: sectoralAdvisoryBoardContent, errors: sectoralAdvisoryBoardErrors = [] } = await ContentService.fetchContent(
		'sectoralAdvisoryBoards',
		null,
		null,
		null,
		true,
		cookies.get('access_token')
	)

	const courses = coursesContent.courses ? [...coursesContent.courses.values()] : []
	courses.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	const sectoralAdvisoryBoards = sectoralAdvisoryBoardContent.sectoralAdvisoryBoards ? [...sectoralAdvisoryBoardContent.sectoralAdvisoryBoards.values()] : []
	sectoralAdvisoryBoards.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	return {
		courses,
		sectoralAdvisoryBoards,
		loadError: coursesErrors.length ? 'Opleidingen konden niet worden geladen.' : sectoralAdvisoryBoardErrors.length ? 'Sectoraal adviescolleges konden niet worden geladen.' : null
	}
}

export const actions = {
	// Handles form submission for Lado creation with multiple course selection.
	default: async ({ request, cookies }) => {
		if (isE2EMode()) {
			const data = await request.formData()
			const submitAction = String(data.get('submitAction') ?? 'save').trim()
			const shouldPublish = submitAction === 'publish'
			const title = String(data.get('title') ?? '').trim()
			const nationalAdProfile = String(data.get('nationalAdProfile') ?? '').trim()
			const ladoStatus = String(data.get('ladoStatus') ?? '').trim()
			const courseIds = data
				.getAll('courses')
				.map((id) => String(id ?? '').trim())
				.filter(Boolean)
			const sectoralAdvisoryBoard = String(data.get('sectoralAdvisoryBoard') ?? '').trim()
			const contactPersonsRaw = String(data.get('contactPersons') ?? '').trim()
			let contactPersons = []

			try {
				const parsedPersons = JSON.parse(contactPersonsRaw)
				contactPersons = Array.isArray(parsedPersons) ? parsedPersons.map((contactPerson) => String(contactPerson).trim()).filter(Boolean) : []
			} catch {
				contactPersons = []
			}

			if (!title) return fail(400, { error: 'Vul een naam in.', title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })
			if (contactPersons.length === 0) return fail(400, { error: 'Vul een contactpersoon in.', title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })
			if (!nationalAdProfile) return fail(400, { error: 'Vul een nationaal ad-profiel in.', title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })
			if (!ladoStatus) return fail(400, { error: 'Vul een lado status in.', title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })
			if (!courseIds.length) return fail(400, { error: 'Kies minimaal één opleiding.', title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })
			if (!sectoralAdvisoryBoard) return fail(400, { error: 'Kies een sectoraal adviescollege.', title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })

			if (title === 'E2E FORCE 500') {
				return fail(500, { error: GENERIC_CREATE_ERROR, title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })
			}

			const lado = createE2ELado({
				title,
				contactPersons,
				nationalAdProfile,
				ladoStatus,
				sectoralAdvisoryBoard: Number(sectoralAdvisoryBoard),
				courseIds,
				shouldPublish
			})

			setE2ECourseLinks(courseIds, lado.id)

			return {
				success: true,
				message: shouldPublish ? 'Lado succesvol opgeslagen en gepubliceerd.' : 'Lado succesvol opgeslagen als concept.',
				ladoId: lado.id
			}
		}

		const data = await request.formData()
		const submitAction = String(data.get('submitAction') ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const title = String(data.get('title') ?? '').trim()
		const nationalAdProfile = String(data.get('nationalAdProfile') ?? '').trim()
		const ladoStatus = String(data.get('ladoStatus') ?? '').trim()
		const courseIds = data
			.getAll('courses')
			.map((id) => String(id ?? '').trim())
			.filter(Boolean)
		const sectoralAdvisoryBoard = String(data.get('sectoralAdvisoryBoard') ?? '').trim()
		const token = cookies.get('access_token')
		const contactPersonsRaw = String(data.get('contactPersons') ?? '').trim()
		let contactPersons = []
		const submittedFormState = {
			title,
			contactPersons,
			nationalAdProfile,
			ladoStatus,
			sectoralAdvisoryBoard,
			courses: courseIds
		}
		try {
			const parsedPersons = JSON.parse(contactPersonsRaw)
			contactPersons = Array.isArray(parsedPersons) ? parsedPersons.map((contactPerson) => String(contactPerson).trim()).filter(Boolean) : []
		} catch {
			contactPersons = []
		}

		submittedFormState.contactPersons = contactPersons

		if (!token) {
			return fail(403, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		}

		if (!title) {
			return fail(400, { error: 'Vul een naam in.', ...submittedFormState })
		}

		if (contactPersons.length === 0) {
			return fail(400, { error: 'Vul een contactpersoon in.', ...submittedFormState })
		}

		if (!nationalAdProfile) {
			return fail(400, { error: 'Vul een nationaal ad-profiel in.', ...submittedFormState })
		}

		if (!ladoStatus) {
			return fail(400, { error: 'Vul een lado status in.', ...submittedFormState })
		}

		if (courseIds.length === 0) {
			return fail(400, { error: 'Kies minimaal één opleiding.', ...submittedFormState })
		}

		const validCourseIds = courseIds.map((id) => Number(id)).filter((id) => Number.isInteger(id) && id > 0)
		if (validCourseIds.length !== courseIds.length) {
			return fail(400, { error: 'Kies geldige opleidingen.', ...submittedFormState })
		}

		if (!sectoralAdvisoryBoard) {
			return fail(400, { error: 'Kies een sectoraal adviescollege.', ...submittedFormState })
		}

		const sectoralAdvisoryBoardId = Number(sectoralAdvisoryBoard)
		if (!Number.isInteger(sectoralAdvisoryBoardId) || sectoralAdvisoryBoardId <= 0) {
			return fail(400, { error: 'Kies een geldig sectoraal adviescollege.', ...submittedFormState })
		}

		try {
			const payload = {
				title,
				contact_persons: contactPersons,
				national_ad_profile: nationalAdProfile,
				lado_status: ladoStatus,
				sectoral_advisory_board: sectoralAdvisoryBoardId,
				status: 'draft'
			}

			const createResult = await ContentService.postContent(payload, 'lados', token)

			if (!createResult?.success) {
				console.error('[lados/create] Lado create failed:', createResult)
				const createStatus = Number(createResult?.status) || 500
				const errorMessage = createResult?.data?.error ?? GENERIC_CREATE_ERROR
				return fail(createStatus, { error: errorMessage, ...submittedFormState })
			}

			// Link all selected courses to the created Lado
			const courseLinksResults = await Promise.allSettled(validCourseIds.map((id) => ContentService.updateContent(id, { lado: createResult.id }, 'courses', token)))

			const failedCourseLinks = courseLinksResults.filter((result) => result.status === 'rejected' || !result.value?.success)

			if (failedCourseLinks.length > 0) {
				console.error('[lados/create] Some course links failed:', failedCourseLinks)
				return {
					success: true,
					message: GENERIC_COURSE_LINK_WARNING,
					ladoId: createResult.id
				}
			}

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(createResult.id, 'lados', token)

					if (!publishResult?.success) {
						console.error('[lados/create] Publish failed:', publishResult)
						return {
							success: true,
							message: GENERIC_PUBLISH_WARNING,
							ladoId: createResult.id
						}
					}
				} catch (err) {
					console.error('[lados/create] Unexpected error during publish:', err)
					return {
						success: true,
						message: GENERIC_PUBLISH_WARNING,
						ladoId: createResult.id
					}
				}

				return {
					success: true,
					message: 'Lado succesvol opgeslagen en gepubliceerd.',
					ladoId: createResult.id
				}
			}

			return {
				success: true,
				message: 'Lado succesvol opgeslagen als concept.',
				ladoId: createResult.id
			}
		} catch (err) {
			console.error('[lados/create] Unexpected error during create:', err)
			return fail(500, { error: GENERIC_CREATE_ERROR, ...submittedFormState })
		}
	}
}
