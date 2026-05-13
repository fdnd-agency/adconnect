import { ContentService } from '$lib/server/contentService.js'

const LADO_FIELDS = 'id,title,national_ad_profile,lado_status,contact_persons,status,sectoral_advisory_board'
const COURSE_FIELDS = 'id,title,lado,cooperations.adconnect_cooperation_id.id,cooperations.adconnect_cooperation_id.name,cooperations.adconnect_cooperation_id.url'
const SECTORAL_ADVISORY_BOARD_FIELDS = 'id,title'
const PUBLISHED_FILTER = { status: { _eq: 'published' } }
const LOAD_ERROR = `Er is een probleem opgetreden bij het ophalen van de LAdO's.`

function getRelationId(value) {
	return value?.id ?? value
}

function getRelationIds(value) {
	if (Array.isArray(value)) {
		return value.map(getRelationId).filter(Boolean)
	}

	const id = getRelationId(value)
	return id ? [id] : []
}

function getUniqueIds(items, selector) {
	return [...new Set(items.flatMap((item) => getRelationIds(selector(item))))]
}

function emptyCollection(collection) {
	return { data: { [collection]: [] }, errors: [] }
}

function hasErrors(...responses) {
	return responses.some((response) => response.errors.length > 0)
}

function getCourseCooperations(course) {
	if (!Array.isArray(course.cooperations)) return []

	return course.cooperations.map((cooperation) => cooperation?.adconnect_cooperation_id).filter((cooperation) => cooperation?.id && cooperation?.name)
}

export async function load() {
	const ladosResponse = await ContentService.fetchContent('lados', null, LADO_FIELDS, PUBLISHED_FILTER, false)
	const ladoItems = ladosResponse.data.lados ?? []
	const ladoIds = getUniqueIds(ladoItems, (lado) => lado.id)
	const sectoralAdvisoryBoardIds = getUniqueIds(ladoItems, (lado) => getRelationId(lado.sectoral_advisory_board))

	const coursesResponse = ladoIds.length ? await ContentService.fetchContent('courses', null, COURSE_FIELDS, { lado: { _in: ladoIds } }, false) : emptyCollection('courses')
	const courses = coursesResponse.data.courses ?? []
	const sectoralAdvisoryBoardsResponse = sectoralAdvisoryBoardIds.length
		? await ContentService.fetchContent('sectoralAdvisoryBoards', null, SECTORAL_ADVISORY_BOARD_FIELDS, { id: { _in: sectoralAdvisoryBoardIds } }, false)
		: emptyCollection('sectoralAdvisoryBoards')

	const sectoralAdvisoryBoards = sectoralAdvisoryBoardsResponse.data.sectoralAdvisoryBoards ?? []
	const coursesWithCooperation = courses.map((course) => ({
		...course,
		cooperations: getCourseCooperations(course)
	}))

	const lados = ladoItems
		.map((lado) => ({
			...lado,
			sectoral_advisory_board: sectoralAdvisoryBoards.find((board) => String(board.id) === String(getRelationId(lado.sectoral_advisory_board))) ?? lado.sectoral_advisory_board,
			courses: coursesWithCooperation.filter((course) => String(getRelationId(course.lado)) === String(lado.id))
		}))
		.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? '', 'nl', { numeric: true }))

	return {
		lados,
		loadError: hasErrors(ladosResponse, coursesResponse, sectoralAdvisoryBoardsResponse) ? LOAD_ERROR : null
	}
}
