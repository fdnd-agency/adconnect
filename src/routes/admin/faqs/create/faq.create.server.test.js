import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContentService } from '$lib/server/contentService.js'
import { actions } from './+page.server.js'

vi.mock('$lib/server/contentService.js', () => ({
	ContentService: {
		postContent: vi.fn(),
		publishContent: vi.fn()
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
		question: 'Wat is AD Connect?',
		answer: 'AD Connect is een platform voor studenten en werkgevers.',
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

describe('admin faqs create actions.default', () => {
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
			data: { error: 'Er is iets misgegaan bij het opslaan van de faq.' }
		})
	})

	it('returns 400 when question is empty after trim', async () => {
		// Arrange
		const event = createActionEvent({ fields: { question: '   ' } })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 400,
			data: {
				error: 'Vul een vraag in.',
				question: '   '
			}
		})
	})

	it('returns 400 when answer is empty after trim', async () => {
		// Arrange
		const event = createActionEvent({ fields: { answer: '   ' } })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 400,
			data: {
				error: 'Vul een antwoord in.',
				answer: '   '
			}
		})
	})

	it('creates faq as draft and returns success payload', async () => {
		// Arrange
		const event = createActionEvent()
		ContentService.postContent.mockResolvedValue({ success: true, id: 'faq-789' })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Faq succesvol opgeslagen als concept.',
			faqId: 'faq-789'
		})
		expect(ContentService.postContent).toHaveBeenCalledWith(
			{
				question: 'Wat is AD Connect?',
				answer: 'AD Connect is een platform voor studenten en werkgevers.',
				important: false,
				status: 'draft'
			},
			'faqs',
			'token-123'
		)
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('publishes created faq when submitAction is publish', async () => {
		// Arrange
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		ContentService.postContent.mockResolvedValue({ success: true, id: 'faq-789' })
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Faq succesvol opgeslagen en gepubliceerd.',
			faqId: 'faq-789'
		})
		expect(ContentService.publishContent).toHaveBeenCalledWith('faq-789', 'faqs', 'token-123')
	})

	it('returns warning payload when publish fails', async () => {
		// Arrange
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		ContentService.postContent.mockResolvedValue({ success: true, id: 'faq-789' })
		ContentService.publishContent.mockResolvedValue({ success: false })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Faq opgeslagen als concept, maar publiceren is mislukt.',
			faqId: 'faq-789'
		})
	})

	it('returns 500 when create fails and includes submitted values', async () => {
		// Arrange
		const event = createActionEvent({
			fields: {
				question: 'Nieuwe vraag',
				answer: 'Nieuwe antwoord',
				important: 'on'
			}
		})
		ContentService.postContent.mockResolvedValue({ success: false })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 500,
			data: {
				error: 'Er is iets misgegaan bij het opslaan van de faq.',
				question: 'Nieuwe vraag',
				answer: 'Nieuwe antwoord',
				important: true
			}
		})
	})
})
