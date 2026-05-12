import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContentService } from '$lib/server/contentService.js'
import { actions, load } from './+page.server.js'

vi.mock('$lib/server/contentService.js', () => ({
	ContentService: {
		fetchContent: vi.fn(),
		postFile: vi.fn(),
		updateContent: vi.fn(),
		deleteFile: vi.fn()
	}
}))

function createFormData(fields = {}) {
	const formData = new FormData()
	for (const [key, value] of Object.entries(fields)) {
		if (Array.isArray(value)) {
			for (const item of value) {
				formData.append(key, item)
			}
			continue
		}
		formData.append(key, value)
	}
	return formData
}

function createValidFormFields(overrides = {}) {
	return {
		title: 'Mijn event',
		description: 'Korte omschrijving',
		date: '2026-04-01',
		time_duration: '19:00 - 21:00',
		excerpt: 'Korte samenvatting',
		body: 'Volledige body van het event.',
		nomination_ids: ['nom-1'],
		currentHeroId: 'img-old',
		submitAction: 'save',
		...overrides
	}
}

function createActionEvent({ fields = {}, accessToken = 'token-123', id = 'evt-321' } = {}) {
	return {
		params: { id },
		request: {
			formData: vi.fn().mockResolvedValue(createFormData(createValidFormFields(fields)))
		},
		cookies: {
			get: vi.fn().mockReturnValue(accessToken)
		}
	}
}

describe('admin events edit load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns event and nominations when lookup succeeds', async () => {
		// Arrange
		const event = {
			params: { id: 'evt-321' },
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		}
		ContentService.fetchContent
			.mockResolvedValueOnce({
				data: {
					nominations: new Map([['nom-1', { id: 'nom-1', title: 'Nominatie A' }]])
				},
				errors: []
			})
			.mockResolvedValueOnce({
				data: {
					events: [
						{
							id: 'evt-321',
							title: 'Event titel',
							nomination_id: [{ id: 'link-1', adconnect_nominations_id: { id: 'nom-1', title: 'Nominatie A' } }]
						}
					]
				},
				errors: []
			})

		// Act
		const result = await load(event)

		// Assert
		expect(result).toEqual({
			event: {
				id: 'evt-321',
				title: 'Event titel',
				nomination_id: [{ id: 'link-1', adconnect_nominations_id: { id: 'nom-1', title: 'Nominatie A' } }]
			},
			nominations: [{ id: 'nom-1', title: 'Nominatie A' }],
			selectedNominationIds: ['nom-1'],
			loadError: null
		})
	})
})

describe('admin events edit actions.default', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns 403 when token is missing', async () => {
		// Arrange
		const event = createActionEvent({ accessToken: null })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 403,
			data: { error: 'Er is iets misgegaan bij het bijwerken van het event.' }
		})
	})

	it('updates event and nomination links without replacing image', async () => {
		// Arrange
		const event = createActionEvent({ fields: { nomination_ids: ['nom-2'] } })
		ContentService.fetchContent.mockResolvedValue({
			data: {
				events: [
					{
						id: 'evt-321',
						hero: 'img-old',
						nomination_id: [
							{ id: 'link-1', adconnect_nominations_id: 'nom-1' },
							{ id: 'link-2', adconnect_nominations_id: 'nom-2' }
						]
					}
				]
			},
			errors: []
		})
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'evt-321' })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Event succesvol bijgewerkt.',
			eventId: 'evt-321'
		})
		expect(ContentService.updateContent).toHaveBeenCalledWith(
			'evt-321',
			expect.objectContaining({
				hero: 'img-old',
				nomination_id: {
					delete: ['link-1']
				}
			}),
			'events',
			'token-123'
		)
	})

	it('replaces image and cleans up old hero on successful update', async () => {
		// Arrange
		const event = createActionEvent({
			fields: {
				image: new File(['image-bytes'], 'hero.png', { type: 'image/png' })
			}
		})
		ContentService.fetchContent.mockResolvedValue({
			data: {
				events: [{ id: 'evt-321', hero: 'img-old', nomination_id: [] }]
			},
			errors: []
		})
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-new' })
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'evt-321' })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Event succesvol bijgewerkt.',
			eventId: 'evt-321'
		})
		expect(ContentService.postFile).toHaveBeenCalledTimes(1)
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-old', 'token-123')
	})

	it('rolls back uploaded image when update fails', async () => {
		// Arrange
		const event = createActionEvent({
			fields: {
				image: new File(['image-bytes'], 'hero.png', { type: 'image/png' })
			}
		})
		ContentService.fetchContent.mockResolvedValue({
			data: {
				events: [{ id: 'evt-321', hero: 'img-old', nomination_id: [] }]
			},
			errors: []
		})
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-new' })
		ContentService.updateContent.mockResolvedValue({ success: false })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het bijwerken van het event.' }
		})
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-new', 'token-123')
	})
})

describe('admin events edit load nomination resolution', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('requests nested nomination fields when loading the event', async () => {
		// Arrange
		const event = {
			params: { id: 'evt-321' },
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		}
		ContentService.fetchContent.mockResolvedValueOnce({ data: { nominations: new Map() }, errors: [] }).mockResolvedValueOnce({ data: { events: [{ id: 'evt-321', nomination_id: [] }] }, errors: [] })

		// Act
		await load(event)

		// Assert
		expect(ContentService.fetchContent).toHaveBeenNthCalledWith(
			2,
			'events',
			'evt-321',
			'*,nomination_id.id,nomination_id.adconnect_nominations_id.id,nomination_id.adconnect_nominations_id.title',
			null,
			false,
			'token-123'
		)
	})

	it('resolves selected nomination ids from nested junction objects', async () => {
		// Arrange
		const event = {
			params: { id: 'evt-321' },
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		}
		ContentService.fetchContent
			.mockResolvedValueOnce({
				data: {
					nominations: new Map([
						['nom-1', { id: 'nom-1', title: 'Nominatie A' }],
						['nom-2', { id: 'nom-2', title: 'Nominatie B' }],
						['nom-3', { id: 'nom-3', title: 'Nominatie C' }]
					])
				},
				errors: []
			})
			.mockResolvedValueOnce({
				data: {
					events: [
						{
							id: 'evt-321',
							nomination_id: [
								{ id: 'link-1', adconnect_nominations_id: { id: 'nom-1', title: 'Nominatie A' } },
								{ id: 'link-2', adconnect_nominations_id: { id: 'nom-3', title: 'Nominatie C' } }
							]
						}
					]
				},
				errors: []
			})

		// Act
		const result = await load(event)

		// Assert
		expect(result.selectedNominationIds).toEqual(['nom-1', 'nom-3'])
	})

	it('falls back to matching by title when nomination id is missing', async () => {
		// Arrange
		const event = {
			params: { id: 'evt-321' },
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		}
		ContentService.fetchContent
			.mockResolvedValueOnce({
				data: {
					nominations: new Map([['nom-1', { id: 'nom-1', title: 'Nominatie A' }]])
				},
				errors: []
			})
			.mockResolvedValueOnce({
				data: {
					events: [
						{
							id: 'evt-321',
							nomination_id: [{ id: 'link-1', adconnect_nominations_id: { id: '', title: 'Nominatie A' } }]
						}
					]
				},
				errors: []
			})

		// Act
		const result = await load(event)

		// Assert
		expect(result.selectedNominationIds).toEqual(['nom-1'])
	})

	it('returns an empty selection when junction data does not match any nomination', async () => {
		// Arrange
		const event = {
			params: { id: 'evt-321' },
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		}
		ContentService.fetchContent
			.mockResolvedValueOnce({
				data: {
					nominations: new Map([['nom-1', { id: 'nom-1', title: 'Nominatie A' }]])
				},
				errors: []
			})
			.mockResolvedValueOnce({
				data: {
					events: [
						{
							id: 'evt-321',
							nomination_id: [{ id: 'link-1', adconnect_nominations_id: { id: 'nom-999', title: 'Onbekend' } }]
						}
					]
				},
				errors: []
			})

		// Act
		const result = await load(event)

		// Assert
		expect(result.selectedNominationIds).toEqual([])
	})

	it('returns an empty selection when the event has no nomination links', async () => {
		// Arrange
		const event = {
			params: { id: 'evt-321' },
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		}
		ContentService.fetchContent
			.mockResolvedValueOnce({
				data: { nominations: new Map([['nom-1', { id: 'nom-1', title: 'Nominatie A' }]]) },
				errors: []
			})
			.mockResolvedValueOnce({
				data: { events: [{ id: 'evt-321', nomination_id: [] }] },
				errors: []
			})

		// Act
		const result = await load(event)

		// Assert
		expect(result.selectedNominationIds).toEqual([])
	})
})

describe('admin events edit actions nomination junction handling', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('creates junction rows for newly selected nominations', async () => {
		// Arrange
		const event = createActionEvent({ fields: { nomination_ids: ['nom-1', 'nom-2'] } })
		ContentService.fetchContent.mockResolvedValue({
			data: {
				events: [
					{
						id: 'evt-321',
						hero: 'img-old',
						nomination_id: [{ id: 'link-1', adconnect_nominations_id: { id: 'nom-1', title: 'Nominatie A' } }]
					}
				]
			},
			errors: []
		})
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'evt-321' })

		// Act
		await actions.default(event)

		// Assert
		expect(ContentService.updateContent).toHaveBeenCalledWith(
			'evt-321',
			expect.objectContaining({
				nomination_id: {
					create: [{ adconnect_nominations_id: 'nom-2' }]
				}
			}),
			'events',
			'token-123'
		)
	})

	it('deletes junction rows for deselected nominations', async () => {
		// Arrange
		const event = createActionEvent({ fields: { nomination_ids: ['nom-1'] } })
		ContentService.fetchContent.mockResolvedValue({
			data: {
				events: [
					{
						id: 'evt-321',
						hero: 'img-old',
						nomination_id: [
							{ id: 'link-1', adconnect_nominations_id: { id: 'nom-1', title: 'Nominatie A' } },
							{ id: 'link-2', adconnect_nominations_id: { id: 'nom-2', title: 'Nominatie B' } }
						]
					}
				]
			},
			errors: []
		})
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'evt-321' })

		// Act
		await actions.default(event)

		// Assert
		expect(ContentService.updateContent).toHaveBeenCalledWith(
			'evt-321',
			expect.objectContaining({
				nomination_id: {
					delete: ['link-2']
				}
			}),
			'events',
			'token-123'
		)
	})

	it('omits nomination_id from payload when selection is unchanged', async () => {
		// Arrange
		const event = createActionEvent({ fields: { nomination_ids: ['nom-1'] } })
		ContentService.fetchContent.mockResolvedValue({
			data: {
				events: [
					{
						id: 'evt-321',
						hero: 'img-old',
						nomination_id: [{ id: 'link-1', adconnect_nominations_id: { id: 'nom-1', title: 'Nominatie A' } }]
					}
				]
			},
			errors: []
		})
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'evt-321' })

		// Act
		await actions.default(event)

		// Assert
		const payload = ContentService.updateContent.mock.calls[0][1]
		expect(payload).not.toHaveProperty('nomination_id')
	})

	it('both creates and deletes junction rows when selection partially overlaps', async () => {
		// Arrange
		const event = createActionEvent({ fields: { nomination_ids: ['nom-2', 'nom-3'] } })
		ContentService.fetchContent.mockResolvedValue({
			data: {
				events: [
					{
						id: 'evt-321',
						hero: 'img-old',
						nomination_id: [
							{ id: 'link-1', adconnect_nominations_id: { id: 'nom-1', title: 'Nominatie A' } },
							{ id: 'link-2', adconnect_nominations_id: { id: 'nom-2', title: 'Nominatie B' } }
						]
					}
				]
			},
			errors: []
		})
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'evt-321' })

		// Act
		await actions.default(event)

		// Assert
		expect(ContentService.updateContent).toHaveBeenCalledWith(
			'evt-321',
			expect.objectContaining({
				nomination_id: {
					create: [{ adconnect_nominations_id: 'nom-3' }],
					delete: ['link-1']
				}
			}),
			'events',
			'token-123'
		)
	})
})
