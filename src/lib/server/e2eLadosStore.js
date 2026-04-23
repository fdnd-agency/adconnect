const STORE_KEY = '__adconnectE2ELadosStore__'

function createSeedState() {
	return {
		nextLadoNumber: 4,
		lados: new Map([
			[
				'e2e-lado-1',
				{
					id: 'e2e-lado-1',
					title: 'E2E Lado Concept',
					contact_persons: ['Persoon 1'],
					national_ad_profile: 'Profiel 1',
					lado_status: 'Actief',
					sectoral_advisory_board: 1,
					status: 'draft'
				}
			],
			[
				'e2e-lado-2',
				{
					id: 'e2e-lado-2',
					title: 'E2E Lado Gepubliceerd',
					contact_persons: ['Persoon 2'],
					national_ad_profile: 'Profiel 2',
					lado_status: 'Actief',
					sectoral_advisory_board: 2,
					status: 'published'
				}
			],
			[
				'e2e-lado-3',
				{
					id: 'e2e-lado-3',
					title: 'E2E Lado Verwijderen',
					contact_persons: ['Persoon 3'],
					national_ad_profile: 'Profiel 3',
					lado_status: 'Actief',
					sectoral_advisory_board: 3,
					status: 'draft'
				}
			]
		]),
		courses: new Map([
			['e2e-course-1', { id: 'e2e-course-1', title: 'E2E Opleiding 1', lado: 'e2e-lado-1' }],
			['e2e-course-2', { id: 'e2e-course-2', title: 'E2E Opleiding 2', lado: null }],
			['e2e-course-3', { id: 'e2e-course-3', title: 'E2E Opleiding 3', lado: 'e2e-lado-2' }]
		]),
		sectoralAdvisoryBoards: new Map([
			['1', { id: '1', title: 'E2E Adviescollege 1' }],
			['2', { id: '2', title: 'E2E Adviescollege 2' }],
			['3', { id: '3', title: 'E2E Adviescollege 3' }]
		])
	}
}

function getStore() {
	if (!globalThis[STORE_KEY]) {
		globalThis[STORE_KEY] = createSeedState()
	}

	return globalThis[STORE_KEY]
}

export function resetE2ELadosStore() {
	globalThis[STORE_KEY] = createSeedState()
	return getStore()
}

export function getE2ELadosList() {
	return Array.from(getStore().lados.values())
}

export function getE2ELadoById(id) {
	return getStore().lados.get(String(id)) ?? null
}

export function getE2ECourses() {
	return Array.from(getStore().courses.values())
}

export function getE2ESectoralAdvisoryBoards() {
	return Array.from(getStore().sectoralAdvisoryBoards.values())
}

export function createE2ELado({ title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard, courseIds, shouldPublish = false }) {
	const store = getStore()
	const id = `e2e-lado-${store.nextLadoNumber}`
	store.nextLadoNumber += 1

	const lado = {
		id,
		title,
		contact_persons: contactPersons,
		national_ad_profile: nationalAdProfile,
		lado_status: ladoStatus,
		sectoral_advisory_board: sectoralAdvisoryBoard,
		status: shouldPublish ? 'published' : 'draft'
	}

	store.lados.set(id, lado)
	setE2ECourseLinks(courseIds, id)

	return lado
}

export function updateE2ELado(id, { title, contactPersons, nationalAdProfile, ladoStatus, sectoralAdvisoryBoard }) {
	const store = getStore()
	const existing = store.lados.get(String(id))
	if (!existing) return null

	const next = {
		...existing,
		title,
		contact_persons: contactPersons,
		national_ad_profile: nationalAdProfile,
		lado_status: ladoStatus,
		sectoral_advisory_board: sectoralAdvisoryBoard
	}

	store.lados.set(String(id), next)
	return next
}

export function setE2ECourseLinks(courseIds, ladoId) {
	const store = getStore()
	const selected = new Set(courseIds.map((id) => String(id)))

	for (const [courseId, course] of store.courses.entries()) {
		if (selected.has(courseId)) {
			store.courses.set(courseId, { ...course, lado: ladoId })
		} else if (String(course.lado ?? '') === String(ladoId)) {
			store.courses.set(courseId, { ...course, lado: null })
		}
	}
}

export function publishE2ELado(id) {
	const store = getStore()
	const lado = store.lados.get(String(id))
	if (!lado) return null
	const next = { ...lado, status: 'published' }
	store.lados.set(String(id), next)
	return next
}

export function depublishE2ELado(id) {
	const store = getStore()
	const lado = store.lados.get(String(id))
	if (!lado) return null
	const next = { ...lado, status: 'draft' }
	store.lados.set(String(id), next)
	return next
}

export function deleteE2ELado(id) {
	const store = getStore()
	const existed = store.lados.delete(String(id))
	if (!existed) return false

	for (const [courseId, course] of store.courses.entries()) {
		if (String(course.lado ?? '') === String(id)) {
			store.courses.set(courseId, { ...course, lado: null })
		}
	}

	return true
}
