import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContentService } from '$lib/server/contentService.js'
import { actions, load } from './+page.server.js'

vi.mock('$lib/server/contentService.js', () => ({
	ContentService: {
		fetchContent: vi.fn(),
		postContent: vi.fn(),
		updateContent: vi.fn(),
		publishContent: vi.fn()
	}
}))

function createFormData(fields = {}) {
	const formData = new FormData()
	for (const [key, value] of Object.entries(fields)) {
		if (Array.isArray(value)) {
			value.forEach((v) => formData.append(key, v))
		} else {
			formData.append(key, value)
		}
	}
	return formData
}

function createValidFormFields(overrides = {}) {
	return {
		title: 'Bedrijf X',
		contactPersons: JSON.stringify(['Persoon 1']),
		nationalAdProfile: 'Nationaal profiel',
		ladoStatus: 'Actief',
		courses: '123',
		sectoralAdvisoryBoard: '456',
		submitAction: 'save',
		...overrides
	}
}

function createActionEvent({ fields = {}, accessToken = 'token-123' } = {}) {
	return {
		request: {
			formData: vi.fn().mockResolvedValue(createFormData(createValidFormFields(fields)))
		},
		cookies: {
			get: vi.fn().mockReturnValue(accessToken)
		}
	}
}

function expectNoMutationCalls() {
	expect(ContentService.postContent).not.toHaveBeenCalled()
	expect(ContentService.updateContent).not.toHaveBeenCalled()
	expect(ContentService.publishContent).not.toHaveBeenCalled()
}

function mockSuccessfulCreate({ ladoId = 'lado-789' } = {}) {
	ContentService.postContent.mockResolvedValue({ success: true, id: ladoId })
	ContentService.updateContent.mockResolvedValue({ success: true, id: 123 })
}

describe('admin lados form load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns sorted course and sectoral advisory board options', async () => {
		ContentService.fetchContent
			.mockResolvedValueOnce({
				data: {
					courses: new Map([
						['course-b', { id: 'course-b', title: 'Zorg' }],
						['course-a', { id: 'course-a', title: 'Administratie' }]
					])
				},
				errors: []
			})
			.mockResolvedValueOnce({
				data: {
					sectoralAdvisoryBoards: new Map([
						['board-b', { id: 'board-b', title: 'Techniek' }],
						['board-a', { id: 'board-a', title: 'Economie' }]
					])
				},
				errors: []
			})

		const result = await load({
			cookies: {
				get: vi.fn().mockReturnValue('token-123')
			}
		})

		expect(result).toMatchObject({
			courses: [
				{ id: 'course-a', title: 'Administratie' },
				{ id: 'course-b', title: 'Zorg' }
			],
			sectoralAdvisoryBoards: [
				{ id: 'board-a', title: 'Economie' },
				{ id: 'board-b', title: 'Techniek' }
			],
			loadError: null
		})
	})
})

describe('admin lados form actions.default', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns 403 when access token is missing', async () => {
		const event = createActionEvent({ accessToken: null })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 403,
			data: { error: 'Er is iets misgegaan bij het opslaan van de Lado.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when title is empty after trim', async () => {
		const event = createActionEvent({ fields: { title: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een naam in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when contact persons are empty', async () => {
		const event = createActionEvent({ fields: { contactPersons: JSON.stringify([]) } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een contactpersoon in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when national AD profile is empty', async () => {
		const event = createActionEvent({ fields: { nationalAdProfile: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een nationaal ad-profiel in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when Lado status is empty', async () => {
		const event = createActionEvent({ fields: { ladoStatus: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een lado status in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when course is not selected', async () => {
		const event = createActionEvent({ fields: { courses: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Kies minimaal één opleiding.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when sectoral advisory board is not selected', async () => {
		const event = createActionEvent({ fields: { sectoralAdvisoryBoard: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Kies een sectoraal adviescollege.' }
		})
		expectNoMutationCalls()
	})

	it('saves lado as draft and returns success payload', async () => {
		const event = createActionEvent()
		mockSuccessfulCreate()

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Lado succesvol opgeslagen als concept.',
			ladoId: 'lado-789'
		})
		expect(ContentService.postContent).toHaveBeenCalledTimes(1)
		expect(ContentService.postContent).toHaveBeenCalledWith(
			{
				title: 'Bedrijf X',
				contact_persons: ['Persoon 1'],
				national_ad_profile: 'Nationaal profiel',
				lado_status: 'Actief',
				sectoral_advisory_board: 456,
				status: 'draft'
			},
			'lados',
			'token-123'
		)
		expect(ContentService.updateContent).toHaveBeenCalledTimes(1)
		expect(ContentService.updateContent).toHaveBeenCalledWith(123, { lado: 'lado-789' }, 'courses', 'token-123')
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('links multiple courses to lado', async () => {
		const event = createActionEvent({ fields: { courses: ['111', '222', '333'] } })
		mockSuccessfulCreate()

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Lado succesvol opgeslagen als concept.',
			ladoId: 'lado-789'
		})
		expect(ContentService.updateContent).toHaveBeenCalledTimes(3)
		expect(ContentService.updateContent).toHaveBeenCalledWith(111, { lado: 'lado-789' }, 'courses', 'token-123')
		expect(ContentService.updateContent).toHaveBeenCalledWith(222, { lado: 'lado-789' }, 'courses', 'token-123')
		expect(ContentService.updateContent).toHaveBeenCalledWith(333, { lado: 'lado-789' }, 'courses', 'token-123')
	})

	it('returns warning success payload when course link update fails', async () => {
		const event = createActionEvent({ fields: { courses: ['111', '222'] } })
		ContentService.postContent.mockResolvedValue({ success: true, id: 'lado-789' })
		ContentService.updateContent.mockResolvedValue({ success: false })

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Lado opgeslagen, maar koppelen aan opleiding is mislukt.',
			ladoId: 'lado-789'
		})
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('returns warning success payload when some course links fail', async () => {
		const event = createActionEvent({ fields: { courses: ['111', '222', '333'] } })
		ContentService.postContent.mockResolvedValue({ success: true, id: 'lado-789' })
		ContentService.updateContent.mockResolvedValueOnce({ success: true }).mockResolvedValueOnce({ success: false }).mockResolvedValueOnce({ success: true })

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Lado opgeslagen, maar koppelen aan opleiding is mislukt.',
			ladoId: 'lado-789'
		})
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('publishes created lado when submitAction is publish', async () => {
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulCreate()
		ContentService.publishContent.mockResolvedValue({ success: true })

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Lado succesvol opgeslagen en gepubliceerd.',
			ladoId: 'lado-789'
		})
		expect(ContentService.publishContent).toHaveBeenCalledWith('lado-789', 'lados', 'token-123')
	})

	it('returns warning success payload when publish returns non-success', async () => {
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulCreate()
		ContentService.publishContent.mockResolvedValue({ success: false })

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Lado opgeslagen als concept, maar publiceren is mislukt.',
			ladoId: 'lado-789'
		})
	})

	it('returns warning success payload when publish throws an exception', async () => {
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulCreate()
		ContentService.publishContent.mockRejectedValue(new Error('Publish endpoint timeout'))

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Lado opgeslagen als concept, maar publiceren is mislukt.',
			ladoId: 'lado-789'
		})
	})

	it('returns create failure details when content creation fails', async () => {
		const event = createActionEvent()
		ContentService.postContent.mockResolvedValue({
			success: false,
			status: 400,
			data: { error: 'Aanmaken mislukt: Name must be unique.' }
		})

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Aanmaken mislukt: Name must be unique.' }
		})
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('returns 500 when content creation throws unexpectedly', async () => {
		const event = createActionEvent()
		ContentService.postContent.mockRejectedValue(new Error('Network error'))

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van de Lado.' }
		})
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})
})
