import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContentService } from '$lib/server/contentService.js'
import { actions, load } from './+page.server.js'

vi.mock('$lib/server/contentService.js', () => ({
	ContentService: {
		fetchContent: vi.fn(),
		updateContent: vi.fn()
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

function createActionEvent({ fields = {}, accessToken = 'token-123', id = 'faq-321' } = {}) {
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

describe('admin faqs edit load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns loadError when token is missing', async () => {
		// Arrange
		const event = {
			params: { id: 'faq-321' },
			cookies: { get: vi.fn().mockReturnValue(null) }
		}

		// Act
		const result = await load(event)

		// Assert
		expect(result).toEqual({
			faq: null,
			loadError: 'Er is een probleem opgetreden bij het ophalen van de faq.'
		})
	})

	it('returns faq data when lookup succeeds', async () => {
		// Arrange
		const event = {
			params: { id: 'faq-321' },
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		}
		ContentService.fetchContent.mockResolvedValue({
			data: {
				faqs: [{ id: 'faq-321', question: 'Vraag', answer: 'Antwoord', important: true }]
			},
			errors: []
		})

		// Act
		const result = await load(event)

		// Assert
		expect(result).toEqual({
			faq: { id: 'faq-321', question: 'Vraag', answer: 'Antwoord', important: true },
			loadError: null
		})
	})
})

describe('admin faqs edit actions.default', () => {
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
			data: { error: 'Er is iets misgegaan bij het bijwerken van de faq.' }
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
			data: { error: 'Vul een vraag in.' }
		})
	})

	it('updates faq and preserves status', async () => {
		// Arrange
		const event = createActionEvent()
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'faq-321' })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Faq succesvol bijgewerkt.',
			faqId: 'faq-321'
		})
		expect(ContentService.updateContent).toHaveBeenCalledWith(
			'faq-321',
			{
				question: 'Wat is AD Connect?',
				answer: 'AD Connect is een platform voor studenten en werkgevers.',
				important: false
			},
			'faqs',
			'token-123'
		)
	})

	it('ignores publish submitAction in edit route', async () => {
		// Arrange
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'faq-321' })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toEqual({
			success: true,
			message: 'Faq succesvol bijgewerkt.',
			faqId: 'faq-321'
		})
	})

	it('returns 500 when update fails', async () => {
		// Arrange
		const event = createActionEvent({ fields: { question: 'Nieuwe vraag', answer: 'Nieuwe antwoord' } })
		ContentService.updateContent.mockResolvedValue({ success: false })

		// Act
		const result = await actions.default(event)

		// Assert
		expect(result).toMatchObject({
			status: 500,
			data: {
				error: 'Er is iets misgegaan bij het bijwerken van de faq.',
				question: 'Nieuwe vraag',
				answer: 'Nieuwe antwoord',
				important: false
			}
		})
	})
})
