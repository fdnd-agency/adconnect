import { fail } from '@sveltejs/kit'
import { DirectusContentStrategy } from '$lib/server/strategies/directusContentStrategy.js'

export class E2EContentStrategy extends DirectusContentStrategy {
	#e2eState = null

	#createE2EState() {
		return {
			nextLadoNumber: 4,
			nextSectoralAdvisoryBoardNumber: 4,
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
				[1, { id: 1, title: 'E2E Opleiding 1', lado: 'e2e-lado-1' }],
				[2, { id: 2, title: 'E2E Opleiding 2', lado: null }],
				[3, { id: 3, title: 'E2E Opleiding 3', lado: 'e2e-lado-2' }]
			]),
			sectoralAdvisoryBoards: new Map([
				[1, { id: 1, title: 'E2E Adviescollege 1', status: 'draft' }],
				[2, { id: 2, title: 'E2E Adviescollege 2', status: 'published' }],
				[3, { id: 3, title: 'E2E Adviescollege 3', status: 'draft' }]
			])
		}
	}

	#getE2EState() {
		if (!this.#e2eState) {
			this.#e2eState = this.#createE2EState()
		}
		return this.#e2eState
	}

	#setE2ECourseLinks(courseIds, ladoId) {
		const state = this.#getE2EState()
		const selected = new Set((courseIds ?? []).map((id) => Number(id)))

		for (const [courseId, course] of state.courses.entries()) {
			if (selected.has(Number(courseId))) {
				state.courses.set(courseId, { ...course, lado: ladoId })
			} else if (String(course.lado ?? '') === String(ladoId)) {
				state.courses.set(courseId, { ...course, lado: null })
			}
		}
	}

	#getE2EData(contentType, id) {
		if (!id || !id.startsWith('e2e-')) return null

		if (contentType === 'news') {
			return {
				uuid: id,
				id,
				title: 'E2E Draft Nieuws',
				description: 'Dit is een conceptnieuwsbericht voor end-to-end tests.',
				body: '<p>Preview van conceptcontent.</p>',
				hero: 'e2e-hero-image',
				status: 'draft'
			}
		}
		if (contentType === 'faqs') {
			return {
				id,
				question: 'E2E FAQ',
				answer: 'FAQ voor E2E tests',
				order: 1,
				status: 'draft'
			}
		}
		if (contentType === 'themes') {
			return {
				id,
				title: 'E2E Thema',
				description: 'Concept thema voor preview-tests.',
				body: '<p>Concept themabody.</p>',
				hero: 'e2e-theme-hero',
				status: 'draft'
			}
		}
		if (contentType === 'documents') {
			return {
				id,
				title: 'E2E Document',
				description: 'Dit document wordt gebruikt voor preview-tests.',
				hero_image: 'e2e-document-hero',
				source_file: { id: 'e2e-document-file' },
				status: 'draft'
			}
		}
		if (contentType === 'lados') {
			return this.#getE2EState().lados.get(id) ?? null
		}
		return null
	}

	resetE2EData() {
		this.#e2eState = this.#createE2EState()
		return true
	}

	async fetchContent(contentType = null, id = null, fields = null, filters = null, asMap = false, accessToken = null) {
		if (contentType && id && id.startsWith('e2e-')) {
			const e2eItem = this.#getE2EData(contentType, id)
			if (e2eItem) {
				const collectionMap = new Map([[id, e2eItem]])
				return { data: { [contentType]: asMap ? collectionMap : [e2eItem] }, errors: [] }
			}
		}

		if (contentType === 'lados' && id === null) {
			const lados = Array.from(this.#getE2EState().lados.values())
			const collectionMap = new Map(lados.map((item) => [item.id, item]))
			return { data: { lados: asMap ? collectionMap : lados }, errors: [] }
		}

		if (contentType === 'courses' && id === null) {
			const courses = Array.from(this.#getE2EState().courses.values())
			const collectionMap = new Map(courses.map((item) => [item.id, item]))
			return { data: { courses: asMap ? collectionMap : courses }, errors: [] }
		}

		if (contentType === 'sectoralAdvisoryBoards' && id !== null) {
			const state = this.#getE2EState()
			const numericId = Number(id)
			const board = state.sectoralAdvisoryBoards.get(numericId) ?? null
			if (!board) {
				return { data: { sectoralAdvisoryBoards: [] }, errors: [{ collection: 'sectoralAdvisoryBoards', message: 'Not found' }] }
			}
			const collectionMap = new Map([[numericId, board]])
			return { data: { sectoralAdvisoryBoards: asMap ? collectionMap : [board] }, errors: [] }
		}

		if (contentType === 'sectoralAdvisoryBoards' && id === null) {
			const boards = Array.from(this.#getE2EState().sectoralAdvisoryBoards.values())
			const collectionMap = new Map(boards.map((item) => [item.id, item]))
			return { data: { sectoralAdvisoryBoards: asMap ? collectionMap : boards }, errors: [] }
		}

		return super.fetchContent(contentType, id, fields, filters, asMap, accessToken)
	}

	async publishContent(id, contentType, accessToken = null) {
		if (contentType === 'lados') {
			const state = this.#getE2EState()
			const existing = state.lados.get(String(id))
			if (!existing) return fail(404, { error: 'Publiceren mislukt.' })
			state.lados.set(String(id), { ...existing, status: 'published' })
			return { success: true }
		}

		if (contentType === 'sectoralAdvisoryBoards') {
			const state = this.#getE2EState()
			const numericId = Number(id)
			const existing = state.sectoralAdvisoryBoards.get(numericId)
			if (!existing) return fail(404, { error: 'Publiceren mislukt.' })
			state.sectoralAdvisoryBoards.set(numericId, { ...existing, status: 'published' })
			return { success: true }
		}

		return super.publishContent(id, contentType, accessToken)
	}

	async depublishContent(id, contentType, accessToken = null) {
		if (contentType === 'lados') {
			const state = this.#getE2EState()
			const existing = state.lados.get(String(id))
			if (!existing) return fail(404, { error: 'Depubliceren mislukt.' })
			state.lados.set(String(id), { ...existing, status: 'draft' })
			return { success: true }
		}

		if (contentType === 'sectoralAdvisoryBoards') {
			const state = this.#getE2EState()
			const numericId = Number(id)
			const existing = state.sectoralAdvisoryBoards.get(numericId)
			if (!existing) return fail(404, { error: 'Depubliceren mislukt.' })
			state.sectoralAdvisoryBoards.set(numericId, { ...existing, status: 'draft' })
			return { success: true }
		}

		return super.depublishContent(id, contentType, accessToken)
	}

	async deleteContent(id, contentType, accessToken = null) {
		if (contentType === 'lados') {
			const state = this.#getE2EState()
			const existed = state.lados.delete(String(id))
			if (!existed) return fail(404, { error: 'Verwijderen mislukt.' })

			for (const [courseId, course] of state.courses.entries()) {
				if (String(course.lado ?? '') === String(id)) {
					state.courses.set(courseId, { ...course, lado: null })
				}
			}

			return { success: true }
		}

		if (contentType === 'sectoralAdvisoryBoards') {
			const state = this.#getE2EState()
			const numericId = Number(id)
			const existed = state.sectoralAdvisoryBoards.delete(numericId)
			if (!existed) return fail(404, { error: 'Verwijderen mislukt.' })

			for (const [ladoId, lado] of state.lados.entries()) {
				if (Number(lado.sectoral_advisory_board) === numericId) {
					state.lados.set(ladoId, { ...lado, sectoral_advisory_board: null })
				}
			}

			return { success: true }
		}

		return super.deleteContent(id, contentType, accessToken)
	}

	async postContent(data, contentType, accessToken = null) {
		if (contentType === 'lados') {
			if (data?.title === 'E2E FORCE 500') {
				return fail(500, { error: 'Er is iets misgegaan bij het opslaan van de Lado.' })
			}

			const state = this.#getE2EState()
			const id = `e2e-lado-${state.nextLadoNumber}`
			state.nextLadoNumber += 1

			const created = {
				id,
				title: data.title,
				contact_persons: data.contact_persons ?? [],
				national_ad_profile: data.national_ad_profile ?? '',
				lado_status: data.lado_status ?? '',
				sectoral_advisory_board: data.sectoral_advisory_board ?? null,
				status: data.shouldPublish ? 'published' : 'draft'
			}

			state.lados.set(id, created)
			this.#setE2ECourseLinks(data.courseIds ?? [], id)
			return { success: true, id }
		}

		if (contentType === 'sectoralAdvisoryBoards') {
			const state = this.#getE2EState()
			const id = state.nextSectoralAdvisoryBoardNumber
			state.nextSectoralAdvisoryBoardNumber += 1

			const created = {
				id,
				title: data?.title ?? '',
				status: data?.status ?? 'draft'
			}

			state.sectoralAdvisoryBoards.set(id, created)
			return { success: true, id }
		}

		return super.postContent(data, contentType, accessToken)
	}

	async updateContent(id, data, contentType, accessToken = null) {
		if (contentType === 'lados') {
			const state = this.#getE2EState()
			const existing = state.lados.get(String(id))
			if (!existing) return fail(404, { error: 'Bijwerken mislukt.' })

			const updated = {
				...existing,
				title: data.title,
				contact_persons: data.contact_persons ?? [],
				national_ad_profile: data.national_ad_profile ?? '',
				lado_status: data.lado_status ?? '',
				sectoral_advisory_board: data.sectoral_advisory_board ?? null
			}

			state.lados.set(String(id), updated)
			if (Array.isArray(data.courseIds)) {
				this.#setE2ECourseLinks(data.courseIds, String(id))
			}

			return { success: true, id: String(id) }
		}

		if (contentType === 'sectoralAdvisoryBoards') {
			const state = this.#getE2EState()
			const numericId = Number(id)
			const existing = state.sectoralAdvisoryBoards.get(numericId)
			if (!existing) return fail(404, { error: 'Bijwerken mislukt.' })
			const updated = { ...existing }
			const hasTitle = Object.prototype.hasOwnProperty.call(data ?? {}, 'title')
			const hasStatus = Object.prototype.hasOwnProperty.call(data ?? {}, 'status')

			if (hasTitle) {
				updated.title = data?.title ?? ''
			}
			if (hasStatus) {
				updated.status = data?.status ?? updated.status
			}

			state.sectoralAdvisoryBoards.set(numericId, updated)
			return { success: true, id: numericId }
		}

		if (contentType === 'courses') {
			const state = this.#getE2EState()
			const numericId = Number(id)
			const existing = state.courses.get(numericId)
			if (!existing) return fail(404, { error: 'Bijwerken mislukt.' })
			const updated = { ...existing }
			const hasLado = Object.prototype.hasOwnProperty.call(data ?? {}, 'lado')
			const hasTitle = Object.prototype.hasOwnProperty.call(data ?? {}, 'title')

			if (hasLado) {
				updated.lado = data?.lado ?? null
			}
			if (hasTitle) {
				updated.title = data?.title ?? ''
			}

			state.courses.set(numericId, updated)
			return { success: true, id: numericId }
		}

		return super.updateContent(id, data, contentType, accessToken)
	}
}
