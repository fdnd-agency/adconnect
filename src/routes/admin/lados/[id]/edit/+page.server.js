import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'
import { depublishE2ELado, getE2ECourses, getE2ELadoById, getE2ESectoralAdvisoryBoards, publishE2ELado, setE2ECourseLinks, updateE2ELado } from '$lib/server/e2eLadosStore.js'

function isE2EMode() {
	return process.env.E2E_TEST_MODE === '1'
}

const GENERIC_UPDATE_ERROR = 'Er is iets misgegaan bij het bijwerken van de Lado.'
const GENERIC_LOAD_ERROR = 'Er is een probleem opgetreden bij het ophalen van de Lado.'
const GENERIC_COURSE_LINK_WARNING = 'Lado bijgewerkt, maar koppelen aan opleiding is mislukt.'

function normalizeIdList(items) {
	return items.map((item) => String(item ?? '').trim()).filter(Boolean)
}

function getLinkedCourseIds(courses, ladoId) {
	return courses.filter((course) => String(course?.lado?.id ?? course?.lado ?? '') === ladoId).map((course) => String(course.id))
}

export async function load({ params, cookies }) {
	const ladoId = String(params.id ?? '').trim()

	if (isE2EMode()) {
		const lado = getE2ELadoById(ladoId)
		if (!lado) {
			return {
				lado: null,
				courses: [],
				selectedCourseIds: [],
				sectoralAdvisoryBoardId: '',
				sectoralAdvisoryBoards: [],
				loadError: GENERIC_LOAD_ERROR
			}
		}

		const courses = getE2ECourses()
			.slice()
			.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))
		const sectoralAdvisoryBoards = getE2ESectoralAdvisoryBoards()
			.slice()
			.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))
		return {
			lado,
			courses,
			selectedCourseIds: getLinkedCourseIds(courses, ladoId),
			sectoralAdvisoryBoardId: String(lado?.sectoral_advisory_board ?? ''),
			sectoralAdvisoryBoards,
			loadError: null
		}
	}

	if (!ladoId) {
		return {
			lado: null,
			courses: [],
			selectedCourseIds: [],
			sectoralAdvisoryBoardId: '',
			sectoralAdvisoryBoards: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const token = cookies.get('access_token')
	if (!token) {
		return {
			lado: null,
			courses: [],
			selectedCourseIds: [],
			sectoralAdvisoryBoardId: '',
			sectoralAdvisoryBoards: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const [{ data: ladoContent, errors: ladoErrors = [] }, { data: coursesContent, errors: coursesErrors = [] }, { data: boardsContent, errors: boardsErrors = [] }] = await Promise.all([
		ContentService.fetchContent('lados', ladoId, null, null, false, token),
		ContentService.fetchContent('courses', null, null, null, false, token),
		ContentService.fetchContent('sectoralAdvisoryBoards', null, null, null, false, token)
	])

	const lado = Array.isArray(ladoContent.lados) ? (ladoContent.lados[0] ?? null) : null
	const courses = Array.isArray(coursesContent.courses) ? [...coursesContent.courses] : []
	courses.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	const sectoralAdvisoryBoards = Array.isArray(boardsContent.sectoralAdvisoryBoards) ? [...boardsContent.sectoralAdvisoryBoards] : []
	sectoralAdvisoryBoards.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	if (ladoErrors.length > 0 || coursesErrors.length > 0 || boardsErrors.length > 0 || !lado) {
		return {
			lado: null,
			courses: [],
			selectedCourseIds: [],
			sectoralAdvisoryBoardId: '',
			sectoralAdvisoryBoards: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const sectoralAdvisoryBoardId = String(lado?.sectoral_advisory_board?.id ?? lado?.sectoral_advisory_board ?? '')

	return {
		lado,
		courses,
		selectedCourseIds: getLinkedCourseIds(courses, ladoId),
		sectoralAdvisoryBoardId,
		sectoralAdvisoryBoards,
		loadError: null
	}
}

export const actions = {
	default: async ({ params, request, cookies }) => {
		if (isE2EMode()) {
			const data = await request.formData()
			const submitAction = String(data.get('submitAction') ?? 'save').trim()
			const shouldPublish = submitAction === 'publish'
			const ladoId = String(params.id ?? '').trim()
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

			if (!ladoId) return fail(400, { error: GENERIC_UPDATE_ERROR, title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })
			if (!title) return fail(400, { error: 'Vul een naam in.', title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })
			if (contactPersons.length === 0) return fail(400, { error: 'Vul een contactpersoon in.', title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })
			if (!nationalAdProfile) return fail(400, { error: 'Vul een nationaal ad-profiel in.', title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })
			if (!ladoStatus) return fail(400, { error: 'Vul een lado status in.', title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })
			if (!courseIds.length) return fail(400, { error: 'Kies minimaal één opleiding.', title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })
			if (!sectoralAdvisoryBoard) return fail(400, { error: 'Kies een sectoraal adviescollege.', title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })

			const lado = updateE2ELado(ladoId, {
				title,
				contactPersons,
				nationalAdProfile,
				ladoStatus,
				sectoralAdvisoryBoard: Number(sectoralAdvisoryBoard)
			})

			if (!lado) {
				return fail(404, { error: GENERIC_UPDATE_ERROR, title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courses: courseIds })
			}

			setE2ECourseLinks(courseIds, ladoId)

			if (shouldPublish) {
				publishE2ELado(ladoId)
				return { success: true, message: 'Lado succesvol bijgewerkt en gepubliceerd.', ladoId }
			}

			return { success: true, message: 'Lado succesvol bijgewerkt.', ladoId }
		}

		const data = await request.formData()
		const submitAction = String(data.get('submitAction') ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const ladoId = String(params.id ?? '').trim()
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
			return fail(403, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!ladoId) {
			return fail(400, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
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
				sectoral_advisory_board: sectoralAdvisoryBoardId
			}

			const updateResult = await ContentService.updateContent(ladoId, payload, 'lados', token)

			if (!updateResult?.success) {
				console.error('[lados/edit] Lado update failed:', updateResult)
				const updateStatus = Number(updateResult?.status) || 500
				const errorMessage = updateResult?.data?.error ?? GENERIC_UPDATE_ERROR
				return fail(updateStatus, { error: errorMessage, ...submittedFormState })
			}

			const { data: coursesContent } = await ContentService.fetchContent('courses', null, null, null, false, token)
			const allCourses = Array.isArray(coursesContent.courses) ? coursesContent.courses : []
			const currentCourseIds = getLinkedCourseIds(allCourses, ladoId)
			const selectedCourseIdSet = new Set(normalizeIdList(courseIds))
			const currentCourseIdSet = new Set(currentCourseIds)
			const courseIdsToLink = validCourseIds.filter((id) => !currentCourseIdSet.has(String(id)))
			const courseIdsToUnlink = currentCourseIds.filter((id) => !selectedCourseIdSet.has(id))

			const syncResults = await Promise.allSettled([
				...courseIdsToLink.map((id) => ContentService.updateContent(id, { lado: ladoId }, 'courses', token)),
				...courseIdsToUnlink.map((id) => ContentService.updateContent(id, { lado: null }, 'courses', token))
			])

			const failedCourseSync = syncResults.filter((result) => result.status === 'rejected' || !result.value?.success)
			if (failedCourseSync.length > 0) {
				console.error('[lados/edit] Some course links failed:', failedCourseSync)
				return {
					success: true,
					message: GENERIC_COURSE_LINK_WARNING,
					ladoId
				}
			}

			if (shouldPublish) {
				try {
					const publishResult = await ContentService.publishContent(ladoId, 'lados', token)

					if (!publishResult?.success) {
						console.error('[lados/edit] Publish failed:', publishResult)
						return {
							success: true,
							message: 'Lado bijgewerkt als concept, maar publiceren is mislukt.',
							ladoId
						}
					}
				} catch (err) {
					console.error('[lados/edit] Unexpected error during publish:', err)
					return {
						success: true,
						message: 'Lado bijgewerkt als concept, maar publiceren is mislukt.',
						ladoId
					}
				}

				return {
					success: true,
					message: 'Lado succesvol bijgewerkt en gepubliceerd.',
					ladoId
				}
			}

			return {
				success: true,
				message: 'Lado succesvol bijgewerkt.',
				ladoId
			}
		} catch (err) {
			console.error('[lados/edit] Unexpected error during update:', err)
			return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}
	}
}
