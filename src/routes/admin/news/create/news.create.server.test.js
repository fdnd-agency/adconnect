import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContentService } from '$lib/server/contentService.js'
import { actions } from './+page.server.js'

vi.mock('$lib/server/contentService.js', () => ({
	ContentService: {
		postFile: vi.fn(),
		postContent: vi.fn(),
		publishContent: vi.fn(),
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
		image: new File(['image-bytes'], 'hero.png', { type: 'image/png' }),
		body: 'Dit is de volledige inhoud van het nieuwsartikel.',
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

describe('admin news create actions.default', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns 403 when access token is missing', async () => {
		// Arrange
		const event = createActionEvent({ accessToken: null })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 403,
			data: { error: 'Er is iets misgegaan bij het opslaan van het nieuwsartikel.' }
		})
	})

	it('returns 400 when title is empty after trim', async () => {
		// Arrange
		const event = createActionEvent({ fields: { title: '   ' } })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 400,
			data: {
				error: 'Vul een titel in.',
				description: 'Korte beschrijving van het artikel'
			}
		})
	})

	it('returns 400 when tags json is malformed', async () => {
		// Arrange
		const event = createActionEvent({ fields: { tags: 'not-valid-json' } })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul tags in.' }
		})
	})

	it('creates draft article and returns success payload', async () => {
		// Arrange
		const event = createActionEvent({ fields: { tags: JSON.stringify(['  urgent  ', 'update']) } })
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent.mockResolvedValue({ success: true, id: 'news-789' })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Nieuwsartikel succesvol opgeslagen als concept.',
			newsId: 'news-789'
		})
		expect(ContentService.postContent).toHaveBeenCalledWith(
			expect.objectContaining({
				hero: 'img-123',
				tags: ['urgent', 'update'],
				status: 'draft'
			}),
			'news',
			'token-123'
		)
	})

	it('publishes created article when submitAction is publish', async () => {
		// Arrange
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent.mockResolvedValue({ success: true, id: 'news-789' })
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Nieuwsartikel succesvol opgeslagen en gepubliceerd.',
			newsId: 'news-789'
		})
	})

	it('rolls back uploaded image when create fails after upload', async () => {
		// Arrange
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent.mockResolvedValue({ success: false })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het nieuwsartikel.' }
		})
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-123', 'token-123')
	})
})
