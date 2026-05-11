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
		title: 'Mijn document',
		description: 'Korte beschrijving',
		date: '2026-03-18',
		category: 'cat-1',
		currentHeroImageId: 'img-old',
		currentSourceFileId: 'src-old',
		submitAction: 'save',
		...overrides
	}
}

function createActionEvent({ fields = {}, accessToken = 'token-123', id = 'doc-321' } = {}) {
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

describe('admin documents edit load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns document and categories when lookup succeeds', async () => {
		// Arrange
		const event = {
			params: { id: 'doc-321' },
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		}
		ContentService.fetchContent
			.mockResolvedValueOnce({
				data: {
					categories: new Map([['1', { id: '1', title: 'Nieuws' }]])
				},
				errors: []
			})
			.mockResolvedValueOnce({
				data: {
					documents: [{ id: 'doc-321', title: 'Doc titel' }]
				},
				errors: []
			})

		// Act
		const result = await load(event)

		// Assert
		expect(result).toEqual({
			document: { id: 'doc-321', title: 'Doc titel' },
			categories: [{ id: '1', title: 'Nieuws' }],
			loadError: null
		})
	})
})

describe('admin documents edit actions.default', () => {
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
			data: { error: 'Er is iets misgegaan bij het bijwerken van het document.' }
		})
	})

	it('updates document and preserves status', async () => {
		// Arrange
		const event = createActionEvent()
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'doc-321' })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Document succesvol bijgewerkt.',
			documentId: 'doc-321'
		})
		expect(ContentService.updateContent).toHaveBeenCalledWith(
			'doc-321',
			expect.objectContaining({
				title: 'Mijn document',
				hero_image: 'img-old',
				source_file: 'src-old'
			}),
			'documents',
			'token-123'
		)
	})

	it('replaces files when new uploads are provided', async () => {
		// Arrange
		const event = createActionEvent({
			fields: {
				image: new File(['image-bytes'], 'cover.png', { type: 'image/png' }),
				source_file: new File(['pdf-bytes'], 'source.pdf', { type: 'application/pdf' })
			}
		})
		ContentService.postFile.mockResolvedValueOnce({ success: true, id: 'img-new' }).mockResolvedValueOnce({ success: true, id: 'src-new' })
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'doc-321' })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Document succesvol bijgewerkt.',
			documentId: 'doc-321'
		})
		expect(ContentService.postFile).toHaveBeenCalledTimes(2)
		expect(ContentService.deleteFile).toHaveBeenCalledTimes(2)
	})

	it('rolls back uploaded files when update fails after upload', async () => {
		// Arrange
		const event = createActionEvent({
			fields: {
				image: new File(['image-bytes'], 'cover.png', { type: 'image/png' }),
				source_file: new File(['pdf-bytes'], 'source.pdf', { type: 'application/pdf' })
			}
		})
		ContentService.postFile.mockResolvedValueOnce({ success: true, id: 'img-new' }).mockResolvedValueOnce({ success: true, id: 'src-new' })
		ContentService.updateContent.mockResolvedValue({ success: false })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het bijwerken van het document.' }
		})
		expect(ContentService.deleteFile).toHaveBeenCalledTimes(2)
	})
})
