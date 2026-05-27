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
			value.forEach((entry) => formData.append(key, entry))
		} else {
			formData.append(key, value)
		}
	}
	return formData
}

function createActionEvent({ fields = {}, accessToken = 'token-123', id = 'lado-789' } = {}) {
	return {
		params: { id },
		request: {
			formData: vi.fn().mockResolvedValue(
				createFormData({
					title: 'Bedrijf X',
					contactPersons: JSON.stringify(['Persoon 1']),
					nationalAdProfile: 'Nationaal profiel',
					ladoStatus: 'Actief',
					parent: '',
					courses: ['222', '333'],
					sectoralAdvisoryBoard: '456',
					submitAction: 'save',
					...fields
				})
			)
		},
		cookies: {
			get: vi.fn().mockReturnValue(accessToken)
		}
	}
}

describe('admin lados edit load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns the lado, sorted options, and selected courses', async () => {
		ContentService.fetchContent
			.mockResolvedValueOnce({
				data: {
					lados: [
						{
							id: 'lado-789',
							title: 'Bedrijf X',
							contact_persons: ['Persoon 1'],
							national_ad_profile: 'Nationaal profiel',
							lado_status: 'Actief',
							parent: 12,
							sectoral_advisory_board: 456
						}
					]
				},
				errors: []
			})
			.mockResolvedValueOnce({
				data: {
					lados: [
						{ id: 'lado-12', title: 'Business' },
						{ id: 'lado-22', title: 'Zorg' }
					]
				},
				errors: []
			})
			.mockResolvedValueOnce({
				data: {
					courses: [
						{ id: 'course-b', title: 'Zorg', lado: 'lado-789' },
						{ id: 'course-a', title: 'Administratie', lado: 'other-lado' }
					]
				},
				errors: []
			})
			.mockResolvedValueOnce({
				data: {
					sectoralAdvisoryBoards: [
						{ id: 'board-b', title: 'Techniek' },
						{ id: 'board-a', title: 'Economie' }
					]
				},
				errors: []
			})

		const result = await load({
			params: { id: 'lado-789' },
			cookies: {
				get: vi.fn().mockReturnValue('token-123')
			}
		})

		expect(result).toMatchObject({
			lado: {
				id: 'lado-789',
				title: 'Bedrijf X'
			},
			lados: [
				{ id: 'lado-12', title: 'Business' },
				{ id: 'lado-22', title: 'Zorg' }
			],
			courses: [
				{ id: 'course-a', title: 'Administratie', lado: 'other-lado' },
				{ id: 'course-b', title: 'Zorg', lado: 'lado-789' }
			],
			selectedCourseIds: ['course-b'],
			parentId: '12',
			sectoralAdvisoryBoardId: '456',
			sectoralAdvisoryBoards: [
				{ id: 'board-a', title: 'Economie' },
				{ id: 'board-b', title: 'Techniek' }
			],
			loadError: null
		})
	})
})

describe('admin lados edit actions.default', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns 403 when access token is missing', async () => {
		const event = createActionEvent({ accessToken: null })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 403,
			data: { error: 'Er is iets misgegaan bij het bijwerken van de Lado.' }
		})
		expect(ContentService.updateContent).not.toHaveBeenCalled()
	})

	it('updates lado and synchronizes courses', async () => {
		const event = createActionEvent()
		ContentService.updateContent.mockResolvedValueOnce({ success: true, id: 'lado-789' }).mockResolvedValueOnce({ success: true, id: 333 }).mockResolvedValueOnce({ success: true, id: 111 })
		ContentService.fetchContent.mockResolvedValueOnce({
			data: {
				courses: [
					{ id: 111, title: 'Opleiding 1', lado: 'lado-789' },
					{ id: 222, title: 'Opleiding 2', lado: 'lado-789' },
					{ id: 333, title: 'Opleiding 3', lado: 'other-lado' }
				]
			},
			errors: []
		})

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Lado succesvol bijgewerkt.',
			ladoId: 'lado-789'
		})
		expect(ContentService.updateContent).toHaveBeenNthCalledWith(
			1,
			'lado-789',
			{
				title: 'Bedrijf X',
				contact_persons: ['Persoon 1'],
				national_ad_profile: 'Nationaal profiel',
				lado_status: 'Actief',
				parent: null,
				sectoral_advisory_board: 456,
				courseIds: ['222', '333']
			},
			'lados',
			'token-123'
		)
		expect(ContentService.updateContent).toHaveBeenNthCalledWith(2, 333, { lado: 'lado-789' }, 'courses', 'token-123')
		expect(ContentService.updateContent).toHaveBeenNthCalledWith(3, '111', { lado: null }, 'courses', 'token-123')
	})

	it('updates lado with selected parent id', async () => {
		const event = createActionEvent({ fields: { parent: '42' } })
		ContentService.updateContent.mockResolvedValueOnce({ success: true, id: 'lado-789' })
		ContentService.fetchContent.mockResolvedValueOnce({
			data: {
				courses: [
					{ id: 222, title: 'Opleiding 2', lado: 'lado-789' },
					{ id: 333, title: 'Opleiding 3', lado: 'lado-789' }
				]
			},
			errors: []
		})

		await actions.default(event)

		expect(ContentService.updateContent).toHaveBeenNthCalledWith(
			1,
			'lado-789',
			expect.objectContaining({
				parent: 42
			}),
			'lados',
			'token-123'
		)
	})

	it('returns 400 when parent equals current lado id', async () => {
		const event = createActionEvent({ id: '789', fields: { parent: '789' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Een lado kan niet zijn eigen parent zijn.' }
		})
		expect(ContentService.updateContent).not.toHaveBeenCalled()
	})
})
