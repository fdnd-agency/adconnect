import { ContentService } from '$lib/server/contentService.js'
import { extractFormState } from '$lib/server/formUtils.js'
import { fail } from '@sveltejs/kit'

const GENERIC_UPDATE_ERROR = 'Er is iets misgegaan bij het bijwerken van de opleiding.'
const GENERIC_LOAD_ERROR = 'Er is een probleem opgetreden bij het ophalen van de opleiding.'

function extractCooperationLinks(rawLinks) {
	if (!Array.isArray(rawLinks)) return []

	return rawLinks
		.map((link) => {
			if (typeof link !== 'object' || link === null) {
				const rawValue = String(link ?? '').trim()
				return { junctionId: null, cooperationId: rawValue, cooperationName: '' }
			}

			const junctionId = String(link.id ?? '').trim() || null
			const relation = link.adconnect_cooperation_id ?? link.cooperation_id ?? link.cooperation ?? link.cooperations ?? null
			const cooperationId = typeof relation === 'object' && relation !== null ? String(relation.id ?? '').trim() : String(relation ?? '').trim()
			const cooperationName = typeof relation === 'object' && relation !== null ? String(relation.name ?? '').trim() : String(link.name ?? '').trim()

			return {
				junctionId,
				cooperationId,
				cooperationName
			}
		})
		.filter((link) => Boolean(link.cooperationId || link.cooperationName))
}

function resolveSelectedCooperationIds(rawLinks, cooperations) {
	const cooperationById = new Map(
		cooperations.map((cooperation) => [String(cooperation?.id ?? '').trim(), String(cooperation?.id ?? '').trim()]).filter(([key, value]) => Boolean(key) && Boolean(value))
	)

	const cooperationByName = new Map(
		cooperations
			.map((cooperation) => [
				String(cooperation?.name ?? '')
					.trim()
					.toLowerCase(),
				String(cooperation?.id ?? '').trim()
			])
			.filter(([key, value]) => Boolean(key) && Boolean(value))
	)

	const selectedIds = []
	for (const link of extractCooperationLinks(rawLinks)) {
		const candidates = [link.cooperationId, link.cooperationName]
		for (const candidate of candidates) {
			const normalizedCandidate = String(candidate ?? '').trim()
			if (!normalizedCandidate) continue

			const byId = cooperationById.get(normalizedCandidate)
			if (byId && !selectedIds.includes(byId)) {
				selectedIds.push(byId)
				break
			}

			const byName = cooperationByName.get(normalizedCandidate.toLowerCase())
			if (byName && !selectedIds.includes(byName)) {
				selectedIds.push(byName)
				break
			}
		}
	}

	return selectedIds
}

export async function load({ params, cookies }) {
	const courseId = String(params.id ?? '').trim()
	if (!courseId) {
		return {
			course: null,
			cooperations: [],
			selectedCooperationIds: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const token = cookies.get('access_token')
	if (!token) {
		return {
			course: null,
			cooperations: [],
			selectedCooperationIds: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	const [courseRes, cooperationsRes] = await Promise.all([
		ContentService.fetchContent('courses', courseId, '*,cooperations.id,cooperations.adconnect_cooperation_id.id,cooperations.adconnect_cooperation_id.name', null, false, token),
		ContentService.fetchContent('cooperations', null, null, null, true, token)
	])

	const { data: courseContent, errors: courseErrors = [] } = courseRes
	const { data: cooperationContent, errors: cooperationErrors = [] } = cooperationsRes

	const cooperations = cooperationContent.cooperations ? [...cooperationContent.cooperations.values()] : []
	cooperations.sort((a, b) => (a?.name ?? '').localeCompare(b?.name ?? '', 'nl'))

	const course = Array.isArray(courseContent.courses) ? (courseContent.courses[0] ?? null) : null

	if (courseErrors.length > 0 || !course) {
		return {
			course: null,
			cooperations,
			selectedCooperationIds: [],
			loadError: GENERIC_LOAD_ERROR
		}
	}

	return {
		course,
		cooperations,
		selectedCooperationIds: resolveSelectedCooperationIds(course.cooperations, cooperations),
		loadError: cooperationErrors.length > 0 ? 'Samenwerkingen konden niet worden geladen.' : null
	}
}

export const actions = {
	default: async ({ params, request, cookies }) => {
		const data = await request.formData()
		const submittedFormState = extractFormState(data, { arrayFields: ['cooperations'] })
		const courseId = String(params.id ?? '').trim()
		const rawTitle = String(submittedFormState.title ?? '')
		const title = rawTitle.trim()
		const cooperationIds = Array.isArray(submittedFormState.cooperations) ? submittedFormState.cooperations : []
		const token = cookies.get('access_token')

		submittedFormState.title = rawTitle
		submittedFormState.cooperations = cooperationIds

		if (!token && process.env.E2E_TEST_MODE !== '1') {
			return fail(403, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!courseId) {
			return fail(400, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}

		if (!title) {
			return fail(400, { error: 'Vul een titel in.', ...submittedFormState })
		}

		try {
			const normalizedCooperationIds = cooperationIds.map((id) => String(id ?? '').trim()).filter(Boolean)
			const payload = { title }

			const existingCourseRes = await ContentService.fetchContent(
				'courses',
				courseId,
				'cooperations.id,cooperations.adconnect_cooperation_id.id,cooperations.adconnect_cooperation_id.name',
				null,
				false,
				token
			)
			const existingCourse = Array.isArray(existingCourseRes.data.courses) ? (existingCourseRes.data.courses[0] ?? null) : null
			if (existingCourseRes.errors.length > 0 || !existingCourse) {
				return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
			}

			const existingLinks = extractCooperationLinks(existingCourse.cooperations)
			const existingByCooperationId = new Map(existingLinks.map((link) => [link.cooperationId, link]).filter(([key]) => Boolean(key)))
			const selectedCooperationSet = new Set(normalizedCooperationIds)

			const cooperationsToCreate = normalizedCooperationIds.filter((id) => !existingByCooperationId.has(id)).map((id) => ({ adconnect_cooperation_id: id }))

			const cooperationsToDelete = existingLinks.filter((link) => link.junctionId && !selectedCooperationSet.has(link.cooperationId)).map((link) => link.junctionId)

			if (cooperationsToCreate.length > 0 || cooperationsToDelete.length > 0) {
				payload.cooperations = {}
				if (cooperationsToCreate.length > 0) {
					payload.cooperations.create = cooperationsToCreate
				}
				if (cooperationsToDelete.length > 0) {
					payload.cooperations.delete = cooperationsToDelete
				}
			}

			const updateResult = await ContentService.updateContent(courseId, payload, 'courses', token)

			if (!updateResult?.success) {
				console.error('[courses/edit] Course update failed:', updateResult)
				const updateStatus = Number(updateResult?.status) || 500
				const errorMessage = updateResult?.data?.error ?? GENERIC_UPDATE_ERROR
				return fail(updateStatus, { error: errorMessage, ...submittedFormState })
			}

			return {
				success: true,
				message: 'Opleiding succesvol bijgewerkt.',
				courseId
			}
		} catch (err) {
			console.error('[courses/edit] Unexpected error during update:', err)
			return fail(500, { error: GENERIC_UPDATE_ERROR, ...submittedFormState })
		}
	}
}
