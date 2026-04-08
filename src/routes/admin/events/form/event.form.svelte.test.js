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
		title: 'Mijn event',
		description: 'Korte omschrijving',
		date: '2026-04-01',
		time_duration: '19:00 - 21:00',
		excerpt: 'Korte samenvatting',
		body: 'Volledige body van het event.',
		nomination_id: 'nom-1',
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

function createLoadEvent({ accessToken = 'token-123' } = {}) {
	return {
		cookies: {
			get: vi.fn().mockReturnValue(accessToken)
		}
	}
}

function expectNoMutationCalls() {
	expect(ContentService.postFile).not.toHaveBeenCalled()
	expect(ContentService.postContent).not.toHaveBeenCalled()
	expect(ContentService.publishContent).not.toHaveBeenCalled()
}

function mockSuccessfulUploadAndCreate({ imageId = 'img-123', eventId = 'evt-789' } = {}) {
	ContentService.postFile.mockResolvedValue({ success: true, id: imageId })
	ContentService.postContent.mockResolvedValue({ success: true, id: eventId })
}

describe('admin events form load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns nominations sorted by title', async () => {
		// Arrange: simulate unsorted nomination records from the service.
		// Why: the nomination dropdown should remain alphabetically stable.
		ContentService.fetchContent.mockResolvedValue({
			data: {
				nominations: new Map([
					['1', { id: '1', title: 'Zebra' }],
					['2', { id: '2', title: 'Aap' }],
					['3', { id: '3', title: 'Mier' }]
				])
			},
			errors: []
		})

		// Arrange: provide cookie access token as load input context.
		const event = createLoadEvent()

		// Act: execute the load function.
		const result = await load(event)

		// Assert: load asks for nominations with the provided token.
		expect(ContentService.fetchContent).toHaveBeenCalledWith('nominations', null, null, null, true, 'token-123')
		// Assert: successful fetch should not produce a load error.
		expect(result.loadError).toBeNull()
		// Assert: nominations are returned in ascending title order.
		expect(result.nominations.map((nomination) => nomination.title)).toEqual(['Aap', 'Mier', 'Zebra'])
	})

	it('returns loadError when nomination fetch has errors', async () => {
		// Arrange: simulate a fetch response that includes service errors.
		// Why: the page should surface a fallback warning to admins.
		ContentService.fetchContent.mockResolvedValue({
			data: {
				nominations: new Map([['1', { id: '1', title: 'Kandidaat' }]])
			},
			errors: [{ collection: 'nominations', message: 'Network timeout' }]
		})

		// Arrange: provide cookie access token as load input context.
		const event = createLoadEvent()

		// Act: execute the load function.
		const result = await load(event)

		// Assert: nominations still render, and loadError is exposed.
		expect(result.nominations.map((nomination) => nomination.title)).toEqual(['Kandidaat'])
		expect(result.loadError).toBe('Nominaties konden niet worden geladen.')
	})

	it('returns empty nominations when nominations map is missing', async () => {
		// Arrange: simulate a partial service response without a nominations map.
		// Why: load should be resilient and avoid crashing on incomplete payloads.
		ContentService.fetchContent.mockResolvedValue({
			data: {},
			errors: []
		})

		// Arrange: provide cookie access token as load input context.
		const event = createLoadEvent()

		// Act: execute the load function.
		const result = await load(event)

		// Assert: nominations fall back to an empty array and no load error is shown.
		expect(result.nominations).toEqual([])
		expect(result.loadError).toBeNull()
	})
})

describe('admin events form actions.default', () => {
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
			data: { error: 'Er is iets misgegaan bij het opslaan van het event.' }
		})
		// Assert: no mutation calls happen when request is unauthorized.
		expectNoMutationCalls()
	})

	it('returns 400 when title is empty after trim', async () => {
		// Arrange: provide authenticated context but a whitespace-only title.
		// Why: server-side trim validation should block empty titles.
		const event = createActionEvent({ fields: { title: '   ' } })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the title validation message.
		expect(result).toMatchObject({ status: 400, data: { error: 'Vul een titel in.' } })
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when description is empty after trim', async () => {
		// Arrange: start from valid baseline form data and override only description.
		// Why: this isolates the description trim validation from unrelated fields.
		const event = createActionEvent({ fields: { description: '   ' } })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the description validation message.
		expect(result).toMatchObject({ status: 400, data: { error: 'Vul een omschrijving in.' } })
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when date is empty after trim', async () => {
		// Arrange: start from valid baseline form data and override only date.
		// Why: this isolates required date validation from unrelated fields.
		const event = createActionEvent({ fields: { date: '   ' } })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the date validation message.
		expect(result).toMatchObject({ status: 400, data: { error: 'Vul een datum in.' } })
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when time_duration is empty after trim', async () => {
		// Arrange: start from valid baseline form data and override only time_duration.
		// Why: this isolates required duration validation from unrelated fields.
		const event = createActionEvent({ fields: { time_duration: '   ' } })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the duration validation message.
		expect(result).toMatchObject({ status: 400, data: { error: 'Vul een tijdsduur in.' } })
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when excerpt is empty after trim', async () => {
		// Arrange: start from valid baseline form data and override only excerpt.
		// Why: this isolates required excerpt validation from unrelated fields.
		const event = createActionEvent({ fields: { excerpt: '   ' } })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the excerpt validation message.
		expect(result).toMatchObject({ status: 400, data: { error: 'Vul een samenvatting in.' } })
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when body is empty after trim', async () => {
		// Arrange: start from valid baseline form data and override only body.
		// Why: this isolates required body validation from unrelated fields.
		const event = createActionEvent({ fields: { body: '   ' } })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the body validation message.
		expect(result).toMatchObject({ status: 400, data: { error: 'Vul de body in.' } })
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when nomination_id is empty after trim', async () => {
		// Arrange: start from valid baseline form data and override only nomination_id.
		// Why: this isolates required nomination selection validation from unrelated fields.
		const event = createActionEvent({ fields: { nomination_id: '   ' } })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with nomination validation message.
		expect(result).toMatchObject({ status: 400, data: { error: 'Kies een nominatie.' } })
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when image file is zero-byte', async () => {
		// Arrange: start from valid baseline form data and override only image.
		// Why: zero-byte uploads should be rejected as invalid images.
		const event = createActionEvent({ fields: { image: new File([], 'empty.png', { type: 'image/png' }) } })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with image validation message.
		expect(result).toMatchObject({ status: 400, data: { error: 'Upload een afbeelding.' } })
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('saves event as draft and returns success payload', async () => {
		// Arrange: provide valid form input for the default save flow.
		// Why: this is the primary path admins use to create draft events.
		const event = createActionEvent()
		mockSuccessfulUploadAndCreate()

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: save flow returns success response for draft creation.
		expect(result).toEqual({
			success: true,
			message: 'Event succesvol opgeslagen als concept.',
			eventId: 'evt-789'
		})
		// Assert: upload and content creation are executed once.
		expect(ContentService.postFile).toHaveBeenCalledTimes(1)
		expect(ContentService.postContent).toHaveBeenCalledTimes(1)
		// Assert: publish is not called in save mode.
		expect(ContentService.publishContent).not.toHaveBeenCalled()
		// Assert: no rollback is needed on successful create.
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('uploads image with expected folder and mime validation options', async () => {
		// Arrange: provide valid form input and successful service mocks.
		// Why: image upload must enforce folder placement and image-only MIME guard.
		const event = createActionEvent()
		mockSuccessfulUploadAndCreate()

		// Act: execute the default action.
		await actions.default(event)

		// Assert: upload call includes strict image upload options.
		expect(ContentService.postFile).toHaveBeenCalledWith(expect.any(File), 'token-123', {
			folderName: 'Adconnect',
			allowedMimePrefixes: ['image/'],
			invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
		})
	})

	it('sends expected payload to postContent including slug, relation and draft status', async () => {
		// Arrange: provide valid form input with custom values for assertion clarity.
		// Why: persisted content contract depends on correct field mapping.
		const event = createActionEvent({
			fields: {
				title: '  Mijn Event!! Titel  ',
				time_duration: '20:00 - 22:00',
				nomination_id: 'nom-42'
			}
		})
		mockSuccessfulUploadAndCreate({ imageId: 'img-999' })

		// Act: execute the default action.
		await actions.default(event)

		// Assert: payload includes mapped hero id, nomination relation and draft status.
		expect(ContentService.postContent).toHaveBeenCalledWith(
			{
				title: 'Mijn Event!! Titel',
				slug: 'mijn-event-titel',
				description: 'Korte omschrijving',
				date: '2026-04-01',
				time_duration: '20:00 - 22:00',
				excerpt: 'Korte samenvatting',
				body: 'Volledige body van het event.',
				nomination_id: ['nom-42'],
				status: 'draft',
				hero: 'img-999'
			},
			'events',
			'token-123'
		)
	})

	it('publishes created event when submitAction is publish', async () => {
		// Arrange: provide valid form input and switch submit action to publish.
		// Why: publish mode should perform create + publish and return publish success feedback.
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: publish path returns published success message and event id.
		expect(result).toEqual({
			success: true,
			message: 'Event succesvol opgeslagen en gepubliceerd.',
			eventId: 'evt-789'
		})
		// Assert: publish is called with created id, events type and token.
		expect(ContentService.publishContent).toHaveBeenCalledWith('evt-789', 'events', 'token-123')
	})

	it('returns warning success payload when publish returns non-success', async () => {
		// Arrange: create succeeds, but publish returns a non-success result.
		// Why: flow should keep the created draft and return a warning instead of failing hard.
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: false })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: response is success with warning message and created event id.
		expect(result).toEqual({
			success: true,
			message: 'Event opgeslagen als concept, maar publiceren is mislukt.',
			eventId: 'evt-789'
		})
		// Assert: no rollback is triggered because content creation succeeded.
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('returns warning success payload when publish throws an exception', async () => {
		// Arrange: create succeeds, but publish throws unexpectedly.
		// Why: publish exceptions should still degrade to a warning while preserving created draft.
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockRejectedValue(new Error('Publish endpoint timeout'))

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: response is success with warning message and created event id.
		expect(result).toEqual({
			success: true,
			message: 'Event opgeslagen als concept, maar publiceren is mislukt.',
			eventId: 'evt-789'
		})
		// Assert: no rollback is triggered because content creation succeeded.
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('rolls back uploaded image when content creation fails', async () => {
		// Arrange: image upload succeeds, but content creation fails.
		// Why: uploaded files must be cleaned up when event creation does not complete.
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent.mockResolvedValue({ success: false })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action fails with generic create error when postContent is unsuccessful.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het event.' }
		})
		// Assert: rollback removes uploaded file id.
		expect(ContentService.deleteFile).toHaveBeenCalledTimes(1)
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-123', 'token-123')
		// Assert: publish is skipped because content creation failed.
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('does not rollback files when publish flow succeeds', async () => {
		// Arrange: all operations succeed in publish mode.
		// Why: successful completion should not trigger cleanup in the finally block.
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act: execute the default action.
		await actions.default(event)

		// Assert: rollback is never called after successful create + publish.
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('treats unknown submitAction as save and skips publish', async () => {
		// Arrange: provide an unexpected submitAction value with otherwise valid input.
		// Why: only explicit "publish" should trigger publishing; unknown actions should stay in save flow.
		const event = createActionEvent({ fields: { submitAction: 'archive' } })
		mockSuccessfulUploadAndCreate()

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: response follows save mode behavior (draft success message).
		expect(result).toEqual({
			success: true,
			message: 'Event succesvol opgeslagen als concept.',
			eventId: 'evt-789'
		})
		// Assert: publish is not called for unknown submit actions.
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('returns 500 when image upload fails', async () => {
		// Arrange: provide valid form input but mock image upload failure.
		// Why: failed uploads should block event creation with generic error.
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: false, error: 'Upload failed' })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action fails with generic create error.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het event.' }
		})
		// Assert: content create and publish are skipped on failed upload.
		expect(ContentService.postContent).not.toHaveBeenCalled()
		expect(ContentService.publishContent).not.toHaveBeenCalled()
		// Assert: no rollback because upload failed (no file id to clean up).
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('catches unexpected errors during create and returns generic error', async () => {
		// Arrange: provide valid input and mock unexpected error in postFile.
		// Why: uncaught exceptions should be caught and returned as generic 500 error.
		const event = createActionEvent()
		ContentService.postFile.mockRejectedValue(new Error('Network error'))

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns 500 fail payload with generic error.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het event.' }
		})
	})
})
