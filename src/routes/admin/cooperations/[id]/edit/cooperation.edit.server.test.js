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
		name: 'Bedrijf X',
		url: 'https://bedrijf-x.nl',
		currentLogoId: 'img-old',
		submitAction: 'save',
		...overrides
	}
}

function createActionEvent({ fields = {}, accessToken = 'token-123', id = 'coop-321' } = {}) {
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

describe('admin cooperations edit load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns cooperation when lookup succeeds', async () => {
		// Arrange
		const event = {
			params: { id: 'coop-321' },
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		}
		ContentService.fetchContent.mockResolvedValue({
			data: {
				cooperations: [{ id: 'coop-321', name: 'Bedrijf X' }]
			},
			errors: []
		})

		// Act
		const result = await load(event)

		// Assert
		expect(result).toEqual({
			cooperation: { id: 'coop-321', name: 'Bedrijf X' },
			loadError: null
		})
	})
})

describe('admin cooperations edit actions.default', () => {
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
			data: { error: 'Er is iets misgegaan bij het bijwerken van de samenwerking.' }
		})
	})

	it('updates cooperation and keeps current logo when no new upload is provided', async () => {
		// Arrange
		const event = createActionEvent()
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'coop-321' })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Samenwerking succesvol bijgewerkt.',
			cooperationId: 'coop-321'
		})
		expect(ContentService.updateContent).toHaveBeenCalledWith(
			'coop-321',
			expect.objectContaining({
				name: 'Bedrijf X',
				url: 'https://bedrijf-x.nl',
				logo: 'img-old'
			}),
			'cooperations',
			'token-123'
		)
	})

	it('replaces logo when new upload is provided', async () => {
		// Arrange
		const event = createActionEvent({
			fields: {
				logo: new File(['image-bytes'], 'logo.png', { type: 'image/png' })
			}
		})
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-new' })
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'coop-321' })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Samenwerking succesvol bijgewerkt.',
			cooperationId: 'coop-321'
		})
		expect(ContentService.postFile).toHaveBeenCalledTimes(1)
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-old', 'token-123')
	})

	it('rolls back uploaded logo when update fails', async () => {
		// Arrange
		const event = createActionEvent({
			fields: {
				logo: new File(['image-bytes'], 'logo.png', { type: 'image/png' })
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
			data: { error: 'Er is iets misgegaan bij het bijwerken van de samenwerking.' }
		})
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-new', 'token-123')
	})
})
