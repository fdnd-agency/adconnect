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
		formData.append(key, value)
	}
	return formData
}

function createValidFormFields(overrides = {}) {
	return {
		title: 'Mijn document',
		description: 'Korte beschrijving',
		date: '2026-03-18',
		category: 'cat-1',
		image: new File(['image-bytes'], 'cover.png', { type: 'image/png' }),
		source_file: new File(['pdf-bytes'], 'source.pdf', { type: 'application/pdf' }),
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

function createLoadEvent({ accessToken = 'token-123' } = {}) {
	return {
		cookies: {
			get: vi.fn().mockReturnValue(accessToken)
		}
	}
}

describe('admin documents create load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns categories sorted by title', async () => {
		// Arrange
		ContentService.fetchContent.mockResolvedValue({
			data: {
				categories: new Map([
					['1', { id: '1', title: 'Zebra' }],
					['2', { id: '2', title: 'Aap' }]
				])
			},
			errors: []
		})
		const event = createLoadEvent()

		// Act
		const result = await load(event)

		// Assert
		expect(result.categories.map((category) => category.title)).toEqual(['Aap', 'Zebra'])
		expect(result.loadError).toBeNull()
	})
})

describe('admin documents create actions.default', () => {
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
			data: { error: 'Er is iets misgegaan bij het opslaan van het document.' }
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
			data: { error: 'Vul een titel in.' }
		})
	})

	it('creates document as draft and returns success payload', async () => {
		// Arrange
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValueOnce({ success: true, id: 'img-123' }).mockResolvedValueOnce({ success: true, id: 'src-456' })
		ContentService.postContent.mockResolvedValue({ success: true, id: 'doc-789' })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Document succesvol opgeslagen als concept.',
			documentId: 'doc-789'
		})
		expect(ContentService.postContent).toHaveBeenCalledWith(
			expect.objectContaining({
				hero_image: 'img-123',
				source_file: 'src-456',
				status: 'draft'
			}),
			'documents',
			'token-123'
		)
	})

	it('publishes created document when submitAction is publish', async () => {
		// Arrange
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		ContentService.postFile.mockResolvedValueOnce({ success: true, id: 'img-123' }).mockResolvedValueOnce({ success: true, id: 'src-456' })
		ContentService.postContent.mockResolvedValue({ success: true, id: 'doc-789' })
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Document succesvol opgeslagen en gepubliceerd.',
			documentId: 'doc-789'
		})
	})

	it('returns 500 when image upload fails', async () => {
		// Arrange
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: false })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het document.' }
		})
	})
})
