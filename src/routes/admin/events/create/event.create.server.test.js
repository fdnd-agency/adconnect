import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContentService } from '$lib/server/contentService.js'
import { actions, load } from './+page.server.js'

vi.mock('$lib/server/contentService.js', () => ({
	ContentService: {
		fetchContent: vi.fn(),
		postFile: vi.fn(),
		postContent: vi.fn(),
		publishContent: vi.fn(),
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
		image: new File(['image-bytes'], 'hero.png', { type: 'image/png' }),
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

describe('admin events create load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns nominations sorted by title', async () => {
		// Arrange
		ContentService.fetchContent.mockResolvedValue({
			data: {
				nominations: new Map([
					['1', { id: '1', title: 'Zebra' }],
					['2', { id: '2', title: 'Aap' }]
				])
			},
			errors: []
		})

		// Act
		const result = await load({ cookies: { get: vi.fn().mockReturnValue('token-123') } })

		// Assert
		expect(result.nominations.map((nomination) => nomination.title)).toEqual(['Aap', 'Zebra'])
		expect(result.loadError).toBeNull()
	})
})

describe('admin events create actions.default', () => {
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
			data: { error: 'Er is iets misgegaan bij het opslaan van het event.' }
		})
	})

	it('creates event as draft and returns success payload', async () => {
		// Arrange
		const event = createActionEvent({ fields: { nomination_ids: ['nom-42', 'nom-43'] } })
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent.mockResolvedValue({ success: true, id: 'evt-789' })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Event succesvol opgeslagen als concept.',
			eventId: 'evt-789'
		})
		expect(ContentService.postContent).toHaveBeenCalledWith(
			expect.objectContaining({
				hero: 'img-123',
				nomination_id: {
					create: [{ adconnect_nominations_id: 'nom-42' }, { adconnect_nominations_id: 'nom-43' }]
				},
				status: 'draft'
			}),
			'events',
			'token-123'
		)
	})

	it('publishes created event when submitAction is publish', async () => {
		// Arrange
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent.mockResolvedValue({ success: true, id: 'evt-789' })
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Event succesvol opgeslagen en gepubliceerd.',
			eventId: 'evt-789'
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
			data: { error: 'Er is iets misgegaan bij het opslaan van het event.' }
		})
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-123', 'token-123')
	})
})
