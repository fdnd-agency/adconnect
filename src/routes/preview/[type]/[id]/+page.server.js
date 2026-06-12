import { ContentService } from '$lib/server/contentService'
import { error, redirect } from '@sveltejs/kit'

const LADO_FIELDS = 'id,title,national_ad_profile,lado_status,contact_persons,status,parent,sectoral_advisory_board'
const COURSE_FIELDS = 'id,title,lado,cooperations.adconnect_cooperation_id.id,cooperations.adconnect_cooperation_id.name,cooperations.adconnect_cooperation_id.url'
const SECTORAL_ADVISORY_BOARD_FIELDS = 'id,title'
const NOMINATION_FIELDS = 'id,title,header,date,excerpt,body,institution,course,previous_course,education_variant,alumnus,profile_picture,slug,status'

// Field sets per content type. A missing entry means "all fields" (null). Every
// set must include `status`, since PreviewBanner reads it from the first item.
const FIELDS_BY_TYPE = {
	documents: 'title,id,description,slug,hero_image,source_file.*,date,status',
	nominations: NOMINATION_FIELDS,
	lados: LADO_FIELDS
}

function getRelationId(value) {
	return value?.id ?? value
}

function getCourseCooperations(course) {
	if (!Array.isArray(course.cooperations)) return []

	return course.cooperations.map((cooperation) => cooperation?.adconnect_cooperation_id).filter((cooperation) => cooperation?.id && cooperation?.name)
}

// Mirrors the public LAdO page enrichment, but scoped to the single previewed
// LAdO and its subclusters, so LadosOverview/LadoAccordionItem can render the
// resolved courses, sectoral advisory board and grouping.
async function enrichLadoPreview(lado, accessToken) {
	const subclustersResponse = await ContentService.fetchContent('lados', null, LADO_FIELDS, { parent: { _eq: lado.id } }, false, accessToken)
	const subclusters = subclustersResponse.data.lados ?? []
	const allLados = [lado, ...subclusters]

	const ladoIds = allLados.map((item) => item.id).filter(Boolean)
	const boardIds = [...new Set(allLados.map((item) => getRelationId(item.sectoral_advisory_board)).filter(Boolean))]

	const [coursesResponse, boardsResponse] = await Promise.all([
		ladoIds.length ? ContentService.fetchContent('courses', null, COURSE_FIELDS, { lado: { _in: ladoIds } }, false, accessToken) : Promise.resolve({ data: { courses: [] }, errors: [] }),
		boardIds.length
			? ContentService.fetchContent('sectoralAdvisoryBoards', null, SECTORAL_ADVISORY_BOARD_FIELDS, { id: { _in: boardIds } }, false, accessToken)
			: Promise.resolve({ data: { sectoralAdvisoryBoards: [] }, errors: [] })
	])

	const courses = (coursesResponse.data.courses ?? []).map((course) => ({ ...course, cooperations: getCourseCooperations(course) }))
	const boards = boardsResponse.data.sectoralAdvisoryBoards ?? []

	const lados = allLados.map((item) => ({
		...item,
		sectoral_advisory_board: boards.find((board) => String(board.id) === String(getRelationId(item.sectoral_advisory_board))) ?? item.sectoral_advisory_board,
		courses: courses.filter((course) => String(getRelationId(course.lado)) === String(item.id))
	}))

	const hasError = [subclustersResponse, coursesResponse, boardsResponse].some((response) => response.errors.length > 0)
	return { lados, hasError }
}

export async function load({ params, cookies, locals }) {
	if (!locals.user) {
		throw redirect(303, '/admin/login')
	}

	const accessToken = cookies.get('access_token')
	const fields = FIELDS_BY_TYPE[params.type] ?? null
	const loadErrorMessage = `Er is een probleem opgetreden bij het ophalen van de ${params.type} preview.`
	let response

	try {
		response = await ContentService.fetchContent(params.type, params.id, fields, null, false, accessToken)
	} catch {
		return {
			type: params.type,
			content: [],
			loadError: loadErrorMessage
		}
	}

	const { data, errors } = response
	let content = Array.isArray(data?.[params.type]) ? data[params.type] : []

	if (!content.length) {
		throw error(404, 'Preview item niet gevonden')
	}

	let loadError = errors.length ? loadErrorMessage : null

	if (params.type === 'lados') {
		try {
			const { lados, hasError } = await enrichLadoPreview(content[0], accessToken)
			content = lados
			if (hasError) loadError = loadError ?? loadErrorMessage
		} catch {
			loadError = loadError ?? loadErrorMessage
		}
	}

	return {
		type: params.type,
		content,
		loadError
	}
}
