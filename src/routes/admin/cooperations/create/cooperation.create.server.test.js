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
		name: 'Bedrijf X',
		url: 'https://bedrijf-x.nl',
		logo: new File(['image-bytes'], 'logo.png', { type: 'image/png' }),
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

describe('admin cooperations create actions.default', () => {
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
			data: { error: 'Er is iets misgegaan bij het opslaan van de samenwerking.' }
		})
	})

	it('returns 400 when url is invalid', async () => {
		// Arrange
		const event = createActionEvent({ fields: { url: 'bedrijf-x.nl' } })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 400,
			data: {
				error: 'Vul een geldige URL in (http:// of https://).',
				name: 'Bedrijf X'
			}
		})
	})

	it('saves cooperation as draft and returns success payload', async () => {
		// Arrange
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent.mockResolvedValue({ success: true, id: 'coop-789' })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Samenwerking succesvol opgeslagen als concept.',
			cooperationId: 'coop-789'
		})
		expect(ContentService.postContent).toHaveBeenCalledWith(
			expect.objectContaining({
				name: 'Bedrijf X',
				logo: 'img-123',
				url: 'https://bedrijf-x.nl',
				status: 'draft'
			}),
			'cooperations',
			'token-123'
		)
	})

	it('publishes created cooperation when submitAction is publish', async () => {
		// Arrange
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent.mockResolvedValue({ success: true, id: 'coop-789' })
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Samenwerking succesvol opgeslagen en gepubliceerd.',
			cooperationId: 'coop-789'
		})
	})

	it('rolls back uploaded logo when create fails after upload', async () => {
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
			data: { error: 'Er is iets misgegaan bij het opslaan van de samenwerking.' }
		})
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-123', 'token-123')
	})
})
