import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContentService } from '$lib/server/contentService.js'
import { actions, load } from './+page.server.js'

vi.mock('$lib/server/contentService.js', () => ({
	ContentService: {
		fetchContent: vi.fn(),
		postContent: vi.fn(),
		updateContent: vi.fn(),
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

function expectNoMutationCalls() {
	expect(ContentService.postContent).not.toHaveBeenCalled()
	expect(ContentService.updateContent).not.toHaveBeenCalled()
	expect(ContentService.publishContent).not.toHaveBeenCalled()
}

describe('admin faqs form actions.default', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns 403 when access token is missing', async () => {
		// Arrange: provide valid form values but no access token cookie.
		// Why: content creation must be blocked for unauthorized requests.
		const event = createActionEvent({ accessToken: null })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns 403 fail payload with generic create error message.
		expect(result).toMatchObject({
			status: 403,
			data: { error: 'Er is iets misgegaan bij het opslaan van de faq.' }
		})
		// Assert: no mutation calls happen when request is unauthorized.
		expectNoMutationCalls()
	})

	it('returns 400 when question is empty after trim', async () => {
		// Arrange: provide authenticated context but a whitespace-only question.
		// Why: server-side trim validation should block empty questions.
		const event = createActionEvent({
			fields: {
				question: '   '
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the question validation message.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een vraag in.' }
		})
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when answer is empty after trim', async () => {
		// Arrange: start from valid baseline form data and override only answer.
		// Why: this isolates the answer trim validation from unrelated fields.
		const event = createActionEvent({
			fields: {
				answer: '   '
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the answer validation message.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een antwoord in.' }
		})
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns submitted values on validation fail so form can keep user input', async () => {
		// Arrange: provide empty question but a filled answer.
		// Why: the server should return submitted values so textarea/input are preserved in UI.
		const event = createActionEvent({
			fields: {
				question: '   ',
				answer: 'Dit moet blijven staan.'
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: validation fail payload includes submitted values.
		expect(result).toMatchObject({
			status: 400,
			data: {
				error: 'Vul een vraag in.',
				question: '   ',
				answer: 'Dit moet blijven staan.',
				important: false
			}
		})
	})

	it('saves faq as draft and returns success payload', async () => {
		// Arrange: provide valid form input for the default save flow.
		// Why: this is the primary path admins use to create draft faqs.
		const event = createActionEvent()
		ContentService.postContent.mockResolvedValue({ success: true, id: 'faq-789' })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: save flow returns success response for draft creation.
		expect(result).toEqual({
			success: true,
			message: 'Faq succesvol opgeslagen als concept.',
			faqId: 'faq-789'
		})
		// Assert: content creation is executed once.
		expect(ContentService.postContent).toHaveBeenCalledTimes(1)
		// Assert: publish is not called in save mode.
		expect(ContentService.publishContent).not.toHaveBeenCalled()
		// Assert: update flow is not used without faqId.
		expect(ContentService.updateContent).not.toHaveBeenCalled()
	})

	it('sends expected payload to postContent with important=false by default', async () => {
		// Arrange: provide valid form input without important toggle.
		// Why: unchecked toggle should be mapped to false in payload.
		const event = createActionEvent()
		ContentService.postContent.mockResolvedValue({ success: true, id: 'faq-789' })

		// Act: execute the default action.
		await actions.default(event)

		// Assert: payload includes important false and draft status.
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
	})

	it('sends expected payload to postContent with important=true when toggle is checked', async () => {
		// Arrange: provide valid form input with important set to on.
		// Why: checked toggle should be mapped to true in payload.
		const event = createActionEvent({
			fields: {
				important: 'on'
			}
		})
		ContentService.postContent.mockResolvedValue({ success: true, id: 'faq-789' })

		// Act: execute the default action.
		await actions.default(event)

		// Assert: payload includes important true.
		expect(ContentService.postContent).toHaveBeenCalledWith(
			expect.objectContaining({
				important: true
			}),
			'faqs',
			'token-123'
		)
	})

	it('publishes created faq when submitAction is publish', async () => {
		// Arrange: provide valid form input and switch submit action to publish.
		// Why: publish mode should perform create + publish and return publish success feedback.
		const event = createActionEvent({
			fields: {
				submitAction: 'publish'
			}
		})
		ContentService.postContent.mockResolvedValue({ success: true, id: 'faq-789' })
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: publish path returns published success message and faq id.
		expect(result).toEqual({
			success: true,
			message: 'Faq succesvol opgeslagen en gepubliceerd.',
			faqId: 'faq-789'
		})
		// Assert: publish is called with created id, faqs type, and token.
		expect(ContentService.publishContent).toHaveBeenCalledWith('faq-789', 'faqs', 'token-123')
		// Assert: update flow is not used without faqId.
		expect(ContentService.updateContent).not.toHaveBeenCalled()
	})

	it('updates faq as draft when faqId is provided', async () => {
		// Arrange: provide faqId to switch to edit mode.
		// Why: in edit mode the action should call updateContent instead of postContent.
		const event = createActionEvent({
			fields: {
				faqId: 'faq-321'
			}
		})
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'faq-321' })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: update flow returns update success message.
		expect(result).toEqual({
			success: true,
			message: 'Faq succesvol bijgewerkt als concept.',
			faqId: 'faq-321'
		})
		// Assert: postContent is not called in edit mode.
		expect(ContentService.postContent).not.toHaveBeenCalled()
		// Assert: updateContent receives id, payload, type and token.
		expect(ContentService.updateContent).toHaveBeenCalledWith(
			'faq-321',
			{
				question: 'Wat is AD Connect?',
				answer: 'AD Connect is een platform voor studenten en werkgevers.',
				important: false,
				status: 'draft'
			},
			'faqs',
			'token-123'
		)
	})

	it('publishes updated faq when submitAction is publish in edit mode', async () => {
		// Arrange: provide faqId and publish submit action.
		// Why: edit + publish should run update first and publish the same id.
		const event = createActionEvent({
			fields: {
				faqId: 'faq-321',
				submitAction: 'publish'
			}
		})
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'faq-321' })
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns edit publish success payload.
		expect(result).toEqual({
			success: true,
			message: 'Faq succesvol bijgewerkt en gepubliceerd.',
			faqId: 'faq-321'
		})
		// Assert: postContent is not called in edit mode.
		expect(ContentService.postContent).not.toHaveBeenCalled()
		// Assert: publish targets updated faq id.
		expect(ContentService.publishContent).toHaveBeenCalledWith('faq-321', 'faqs', 'token-123')
	})

	it('returns 500 with update error when updateContent returns non-success in edit mode', async () => {
		// Arrange: provide faqId to enter edit mode and mock update failure.
		// Why: failed edit should return the dedicated update error message.
		const event = createActionEvent({
			fields: {
				faqId: 'faq-321'
			}
		})
		ContentService.updateContent.mockResolvedValue({ success: false })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action fails with generic update error.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het bijwerken van de faq.' }
		})
		// Assert: create flow is not called in edit mode.
		expect(ContentService.postContent).not.toHaveBeenCalled()
	})

	it('returns warning success payload when publish returns non-success', async () => {
		// Arrange: create succeeds, but publish returns a non-success result.
		// Why: flow should keep the created draft and return a warning instead of failing hard.
		const event = createActionEvent({
			fields: {
				submitAction: 'publish'
			}
		})
		ContentService.postContent.mockResolvedValue({ success: true, id: 'faq-789' })
		ContentService.publishContent.mockResolvedValue({ success: false })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: response is success with warning message and created faq id.
		expect(result).toEqual({
			success: true,
			message: 'Faq opgeslagen als concept, maar publiceren is mislukt.',
			faqId: 'faq-789'
		})
	})

	it('returns warning success payload when publish throws an exception', async () => {
		// Arrange: create succeeds, but publish throws unexpectedly.
		// Why: publish exceptions should still degrade to a warning while preserving created draft.
		const event = createActionEvent({
			fields: {
				submitAction: 'publish'
			}
		})
		ContentService.postContent.mockResolvedValue({ success: true, id: 'faq-789' })
		ContentService.publishContent.mockRejectedValue(new Error('Publish endpoint timeout'))

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: response is success with warning message and created faq id.
		expect(result).toEqual({
			success: true,
			message: 'Faq opgeslagen als concept, maar publiceren is mislukt.',
			faqId: 'faq-789'
		})
	})

	it('returns 500 when postContent returns non-success', async () => {
		// Arrange: provide valid form input but mock create failure.
		// Why: failed creation should return generic create error.
		const event = createActionEvent()
		ContentService.postContent.mockResolvedValue({ success: false })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action fails with generic create error.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van de faq.' }
		})
		// Assert: publish is skipped when create fails.
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('returns submitted values on mutation fail so form can keep user input', async () => {
		// Arrange: provide valid input but make create operation fail.
		// Why: even on server failure, entered fields should be restored in the form.
		const event = createActionEvent({
			fields: {
				question: 'Nieuwe vraag',
				answer: 'Nieuwe antwoord',
				important: 'on'
			}
		})
		ContentService.postContent.mockResolvedValue({ success: false })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: failure payload includes submitted values.
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

	it('catches unexpected errors during create and returns generic error', async () => {
		// Arrange: provide valid input and mock unexpected error in postContent.
		// Why: uncaught exceptions should be caught and returned as generic 500 error.
		const event = createActionEvent()
		ContentService.postContent.mockRejectedValue(new Error('Network error'))

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns 500 fail payload with generic error.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van de faq.' }
		})
	})

	it('treats unknown submitAction as save and skips publish', async () => {
		// Arrange: provide an unexpected submitAction value with otherwise valid input.
		// Why: only explicit "publish" should trigger publishing; unknown actions should stay in save flow.
		const event = createActionEvent({
			fields: {
				submitAction: 'archive'
			}
		})
		ContentService.postContent.mockResolvedValue({ success: true, id: 'faq-789' })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: response follows save mode behavior (draft success message).
		expect(result).toEqual({
			success: true,
			message: 'Faq succesvol opgeslagen als concept.',
			faqId: 'faq-789'
		})
		// Assert: publish is not called for unknown submit actions.
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})
})

describe('admin faqs form load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns non-edit mode state when id query is missing', async () => {
		// Arrange: load request without id query.
		// Why: creating a new faq should render an empty create form.
		const event = {
			url: new URL('http://localhost/admin/faqs/form'),
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		}

		// Act: execute page load.
		const result = await load(event)

		// Assert: route stays in create mode and does not fetch an existing faq.
		expect(result).toEqual({
			faq: null,
			isEditMode: false,
			loadError: null
		})
		expect(ContentService.fetchContent).not.toHaveBeenCalled()
	})

	it('returns faq data in edit mode when id query is present', async () => {
		// Arrange: load request with id query and successful faq fetch.
		// Why: edit form must prefill fields with existing faq data.
		const event = {
			url: new URL('http://localhost/admin/faqs/form?id=faq-321'),
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		}
		ContentService.fetchContent.mockResolvedValue({
			data: {
				faqs: [{ id: 'faq-321', question: 'Vraag', answer: 'Antwoord', important: true }]
			},
			errors: []
		})

		// Act: execute page load.
		const result = await load(event)

		// Assert: route returns faq data and marks mode as edit.
		expect(result).toEqual({
			faq: { id: 'faq-321', question: 'Vraag', answer: 'Antwoord', important: true },
			isEditMode: true,
			loadError: null
		})
		expect(ContentService.fetchContent).toHaveBeenCalledWith('faqs', 'faq-321', null, null, false, 'token-123')
	})

	it('returns loadError when faq lookup fails in edit mode', async () => {
		// Arrange: load request with id query and failed faq fetch.
		// Why: invalid id or API failure should surface a clear load error.
		const event = {
			url: new URL('http://localhost/admin/faqs/form?id=faq-missing'),
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		}
		ContentService.fetchContent.mockResolvedValue({
			data: { faqs: [] },
			errors: [{ collection: 'faqs', message: 'Not found' }]
		})

		// Act: execute page load.
		const result = await load(event)

		// Assert: route stays in edit mode but returns a load error and no faq.
		expect(result).toEqual({
			faq: null,
			isEditMode: true,
			loadError: 'Er is een probleem opgetreden bij het ophalen van de faq.'
		})
	})
})
