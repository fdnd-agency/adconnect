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
		title: 'Mijn thema',
		description: 'Korte beschrijving',
		date: '2026-03-18',
		excerpt: 'Korte samenvatting',
		body: 'Volledige body van het thema.',
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

function expectNoMutationCalls() {
	expect(ContentService.postFile).not.toHaveBeenCalled()
	expect(ContentService.postContent).not.toHaveBeenCalled()
	expect(ContentService.publishContent).not.toHaveBeenCalled()
}

function mockSuccessfulUploadAndCreate({ imageId = 'img-123', themeId = 'theme-789' } = {}) {
	ContentService.postFile.mockResolvedValue({ success: true, id: imageId })
	ContentService.postContent.mockResolvedValue({ success: true, id: themeId })
}

describe('admin themes form actions.default', () => {
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
			data: { error: 'Er is iets misgegaan bij het opslaan van het thema.' }
		})
		// Assert: no mutation calls happen when request is unauthorized.
		expectNoMutationCalls()
	})

	it('returns 400 when title is empty after trim', async () => {
		// Arrange: provide authenticated context but a whitespace-only title.
		// Why: server-side trim validation should block empty titles.
		const event = createActionEvent({
			fields: {
				title: '   '
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the title validation message.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een titel in.' }
		})
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when description is empty after trim', async () => {
		// Arrange: start from valid baseline form data and override only description.
		// Why: this isolates the description trim validation from unrelated fields.
		const event = createActionEvent({
			fields: {
				description: '   '
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the description validation message.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een omschrijving in.' }
		})
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when date is empty after trim', async () => {
		// Arrange: start from valid baseline form data and override only date.
		// Why: this isolates required date validation from unrelated fields.
		const event = createActionEvent({
			fields: {
				date: '   '
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the date validation message.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een datum in.' }
		})
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when excerpt is empty after trim', async () => {
		// Arrange: start from valid baseline form data and override only excerpt.
		// Why: this isolates required excerpt validation from unrelated fields.
		const event = createActionEvent({
			fields: {
				excerpt: '   '
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the excerpt validation message.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een samenvatting in.' }
		})
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when body is empty after trim', async () => {
		// Arrange: start from valid baseline form data and override only body.
		// Why: this isolates required body validation from unrelated fields.
		const event = createActionEvent({
			fields: {
				body: '   '
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the body validation message.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul de body in.' }
		})
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when image file is zero-byte', async () => {
		// Arrange: start from valid baseline form data and override only image.
		// Why: zero-byte uploads should be rejected as invalid images.
		const event = createActionEvent({
			fields: {
				image: new File([], 'empty.png', { type: 'image/png' })
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the image validation message.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Upload een afbeelding.' }
		})
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('saves theme as draft and returns success payload', async () => {
		// Arrange: provide valid form input for the default save flow.
		// Why: this is the primary path admins use to create draft themes.
		const event = createActionEvent()
		mockSuccessfulUploadAndCreate()

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: save flow returns success response for draft creation.
		expect(result).toEqual({
			success: true,
			message: 'Thema succesvol opgeslagen als concept.',
			themeId: 'theme-789'
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

		// Assert: upload call is the image with strict image upload options.
		expect(ContentService.postFile).toHaveBeenCalledWith(expect.any(File), 'token-123', {
			folderName: 'Adconnect',
			allowedMimePrefixes: ['image/'],
			invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
		})
	})

	it('sends expected payload to postContent including hero and draft status', async () => {
		// Arrange: provide a title with spaces/symbols to validate trimming.
		// Why: the persisted content contract depends on correct mapping and draft defaults.
		const event = createActionEvent({
			fields: {
				title: '  Mijn Thema!! Met   Spaties  '
			}
		})
		mockSuccessfulUploadAndCreate()

		// Act: execute the default action.
		await actions.default(event)

		// Assert: content payload includes mapped hero id and draft status.
		expect(ContentService.postContent).toHaveBeenCalledWith(
			{
				title: 'Mijn Thema!! Met   Spaties',
				description: 'Korte beschrijving',
				date: '2026-03-18',
				excerpt: 'Korte samenvatting',
				body: 'Volledige body van het thema.',
				hero: 'img-123',
				status: 'draft'
			},
			'themes',
			'token-123'
		)
	})

	it('publishes created theme when submitAction is publish', async () => {
		// Arrange: provide valid form input and switch submit action to publish.
		// Why: publish mode should perform create + publish and return publish success feedback.
		const event = createActionEvent({
			fields: {
				submitAction: 'publish'
			}
		})
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: publish path returns published success message and theme id.
		expect(result).toEqual({
			success: true,
			message: 'Thema succesvol opgeslagen en gepubliceerd.',
			themeId: 'theme-789'
		})
		// Assert: publish is called with created id, themes type, and token.
		expect(ContentService.publishContent).toHaveBeenCalledWith('theme-789', 'themes', 'token-123')
	})

	it('returns warning success payload when publish returns non-success', async () => {
		// Arrange: create succeeds, but publish returns a non-success result.
		// Why: flow should keep the created draft and return a warning instead of failing hard.
		const event = createActionEvent({
			fields: {
				submitAction: 'publish'
			}
		})
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: false })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: response is success with warning message and created theme id.
		expect(result).toEqual({
			success: true,
			message: 'Thema opgeslagen als concept, maar publiceren is mislukt.',
			themeId: 'theme-789'
		})
		// Assert: no rollback is triggered because content creation succeeded.
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('returns warning success payload when publish throws an exception', async () => {
		// Arrange: create succeeds, but publish throws unexpectedly.
		// Why: publish exceptions should still degrade to a warning while preserving created draft.
		const event = createActionEvent({
			fields: {
				submitAction: 'publish'
			}
		})
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockRejectedValue(new Error('Publish endpoint timeout'))

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: response is success with warning message and created theme id.
		expect(result).toEqual({
			success: true,
			message: 'Thema opgeslagen als concept, maar publiceren is mislukt.',
			themeId: 'theme-789'
		})
		// Assert: no rollback is triggered because content creation succeeded.
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('rolls back uploaded image when content creation fails', async () => {
		// Arrange: image upload succeeds, but content creation fails.
		// Why: uploaded files must be cleaned up when theme creation does not complete.
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent.mockResolvedValue({ success: false })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action fails with generic create error when postContent is unsuccessful.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het thema.' }
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
		const event = createActionEvent({
			fields: {
				submitAction: 'publish'
			}
		})
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
		const event = createActionEvent({
			fields: {
				submitAction: 'archive'
			}
		})
		mockSuccessfulUploadAndCreate()

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: response follows save mode behavior (draft success message).
		expect(result).toEqual({
			success: true,
			message: 'Thema succesvol opgeslagen als concept.',
			themeId: 'theme-789'
		})
		// Assert: publish is not called for unknown submit actions.
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('returns 500 when image upload fails', async () => {
		// Arrange: provide valid form input but mock image upload failure.
		// Why: failed uploads should block theme creation with generic error.
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: false, error: 'Upload failed' })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action fails with generic create error.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het thema.' }
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
			data: { error: 'Er is iets misgegaan bij het opslaan van het thema.' }
		})
	})
})
