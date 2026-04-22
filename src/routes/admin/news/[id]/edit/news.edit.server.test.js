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
		formData.append(key, value)
	}
	return formData
}

function createValidFormFields(overrides = {}) {
	return {
		title: 'Mijn Nieuwsartikel',
		description: 'Korte beschrijving van het artikel',
		date: '2026-03-18',
		author: 'John Doe',
		tags: JSON.stringify(['tech', 'nieuws']),
		body: 'Dit is de volledige inhoud van het nieuwsartikel.',
		currentHeroId: 'img-old',
		submitAction: 'save',
		...overrides
	}
}

function createActionEvent({ fields = {}, accessToken = 'token-123', id = 'uuid-321' } = {}) {
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

describe('admin news edit load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns article when lookup succeeds', async () => {
		// Arrange
		const event = {
			params: { id: 'uuid-321' },
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		}
		ContentService.fetchContent.mockResolvedValue({
			data: {
				news: [{ id: 'uuid-321', title: 'Nieuws titel' }]
			},
			errors: []
		})

		// Act
		const result = await load(event)

		// Assert
		expect(result).toEqual({
			article: { id: 'uuid-321', title: 'Nieuws titel' },
			loadError: null
		})
	})
})

describe('admin news edit actions.default', () => {
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
			data: { error: 'Er is iets misgegaan bij het bijwerken van het nieuwsartikel.' }
		})
	})

	it('updates article while preserving hero when no new upload is provided', async () => {
		// Arrange
		const event = createActionEvent()
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'uuid-321' })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Nieuwsartikel succesvol bijgewerkt.',
			newsId: 'uuid-321'
		})
		expect(ContentService.updateContent).toHaveBeenCalledWith(
			'uuid-321',
			expect.objectContaining({
				title: 'Mijn Nieuwsartikel',
				hero: 'img-old'
			}),
			'news',
			'token-123'
		)
	})

	it('replaces hero image when new upload is provided', async () => {
		// Arrange
		const event = createActionEvent({
			fields: {
				image: new File(['image-bytes'], 'hero.png', { type: 'image/png' })
			}
		})
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-new' })
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'uuid-321' })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Nieuwsartikel succesvol bijgewerkt.',
			newsId: 'uuid-321'
		})
		expect(ContentService.postFile).toHaveBeenCalledTimes(1)
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-old', 'token-123')
	})

	it('rolls back new uploaded hero image when update fails', async () => {
		// Arrange
		const event = createActionEvent({
			fields: {
				image: new File(['image-bytes'], 'hero.png', { type: 'image/png' })
			}
		})
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-new' })
		ContentService.updateContent.mockResolvedValue({ success: false })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het bijwerken van het nieuwsartikel.' }
		})
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-new', 'token-123')
	})
})
