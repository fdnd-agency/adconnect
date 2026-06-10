import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'
import { ValidationChainFactory } from '$lib/server/validation/chains/validationChainFactory.js'

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
	if (!ladoId) {
		return {
			lado: null,
			lados: [],
			courses: [],
			selectedCourseIds: [],
			parentId: '',
			sectoralAdvisoryBoardId: '',
			sectoralAdvisoryBoards: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const token = cookies.get('access_token')

	const [
		{ data: ladoContent, errors: ladoErrors = [] },
		{ data: ladosContent, errors: ladosErrors = [] },
		{ data: coursesContent, errors: coursesErrors = [] },
		{ data: boardsContent, errors: boardsErrors = [] }
	] = await Promise.all([
		ContentService.fetchContent('lados', ladoId, null, null, false, token),
		ContentService.fetchContent('lados', null, null, null, false, token),
		ContentService.fetchContent('courses', null, null, null, false, token),
		ContentService.fetchContent('sectoralAdvisoryBoards', null, null, null, false, token)
	])

	const lado = Array.isArray(ladoContent.lados) ? (ladoContent.lados[0] ?? null) : null
	const lados = Array.isArray(ladosContent.lados) ? [...ladosContent.lados] : ladosContent.lados ? [...ladosContent.lados.values()] : []
	lados.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))
	const courses = Array.isArray(coursesContent.courses) ? [...coursesContent.courses] : []
	courses.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	const sectoralAdvisoryBoards = Array.isArray(boardsContent.sectoralAdvisoryBoards) ? [...boardsContent.sectoralAdvisoryBoards] : []
	sectoralAdvisoryBoards.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	if (ladoErrors.length > 0 || ladosErrors.length > 0 || coursesErrors.length > 0 || boardsErrors.length > 0 || !lado) {
		return {
			lado: null,
			lados: [],
			courses: [],
			selectedCourseIds: [],
			parentId: '',
			sectoralAdvisoryBoardId: '',
			sectoralAdvisoryBoards: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const parentId = String(lado?.parent?.id ?? lado?.parent ?? '')
	const sectoralAdvisoryBoardId = String(lado?.sectoral_advisory_board?.id ?? lado?.sectoral_advisory_board ?? '')

	return {
		lado,
		lados,
		courses,
		selectedCourseIds: getLinkedCourseIds(courses, ladoId),
		parentId,
		sectoralAdvisoryBoardId,
		sectoralAdvisoryBoards,
		loadError: null
	}
}

export const actions = {
	default: async ({ params, request, cookies }) => {
		const data = await request.formData()
		const submitAction = String(data.get('submitAction') ?? 'save').trim()
		const shouldPublish = submitAction === 'publish'
		const ladoId = String(params.id ?? '').trim()
		const title = String(data.get('title') ?? '').trim()
		const nationalAdProfile = String(data.get('nationalAdProfile') ?? '').trim()
		const ladoStatus = String(data.get('ladoStatus') ?? '').trim()
		const parent = String(data.get('parent') ?? '').trim()
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
			parent,
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

		if (!ladoId) {
			return fail(400, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		// Validation (Chain of Responsibility) for the leading presence checks.
		// In E2E mode the access token may be absent, so we treat that flag as a
		// valid token. The integer/business rules (and the self-parent rule) stay
		// inline below to keep the exact error order.
		const validator = ValidationChainFactory.create('lado', { mode: 'update', message: GENERIC_UPDATE_ERROR })
		const validationError = validator.handle({ token: token || process.env.E2E_TEST_MODE === '1', title, contactPersons, nationalAdProfile, ladoStatus, courseIds })
		if (validationError) {
			return fail(validationError.status, { error: validationError.message, ...submittedFormState })
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

		const parentId = parent ? Number(parent) : null
		if (parent && (!Number.isInteger(parentId) || parentId <= 0)) {
			return fail(400, { error: 'Kies een geldige parent-lado.', ...submittedFormState })
		}

		if (parentId !== null && String(parentId) === ladoId) {
			return fail(400, { error: 'Een lado kan niet zijn eigen parent zijn.', ...submittedFormState })
		}

		try {
			const payload = {
				title,
				contact_persons: contactPersons,
				national_ad_profile: nationalAdProfile,
				lado_status: ladoStatus,
				parent: parentId,
				sectoral_advisory_board: sectoralAdvisoryBoardId,
				courseIds
			}

			const updateResult = await ContentService.updateContent(ladoId, payload, 'lados', token)

			if (!updateResult?.success) {
				console.error('[lados/edit] Lado update failed:', updateResult)
				const updateStatus = Number(updateResult?.status) || 500
				const errorMessage = updateResult?.data?.error ?? GENERIC_UPDATE_ERROR
				return fail(updateStatus, { error: errorMessage, ...submittedFormState })
			}

			// If course linking needed, the mock updateContent handles it when in E2E mode.
			// For the real service we already performed course sync below.
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
