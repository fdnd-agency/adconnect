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
		title: 'Mijn Nieuwsartikel',
		description: 'Korte beschrijving van het artikel',
		date: '2026-03-18',
		author: 'John Doe',
		tags: JSON.stringify(['tech', 'nieuws']),
		image: new File(['image-bytes'], 'hero.png', { type: 'image/png' }),
		body: 'Dit is de volledige inhoud van het nieuwsartikel.',
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

function mockSuccessfulUploadAndCreate({ imageId = 'img-123', newsId = 'news-789' } = {}) {
	ContentService.postFile.mockResolvedValue({ success: true, id: imageId })
	ContentService.postContent.mockResolvedValue({ success: true, id: newsId })
}

describe('admin news form actions.default', () => {
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
			data: { error: 'Er is iets misgegaan bij het opslaan van het nieuwsartikel.' }
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

	it('returns 400 when author is empty after trim', async () => {
		// Arrange: start from valid baseline form data and override only author.
		// Why: this isolates required author validation from unrelated fields.
		const event = createActionEvent({
			fields: {
				author: '   '
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the author validation message.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een auteur in.' }
		})
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('returns 400 when tags is empty after parsing', async () => {
		// Arrange: start from valid baseline form data and override tags with empty array.
		// Why: this isolates required tags validation from unrelated fields.
		const event = createActionEvent({
			fields: {
				tags: JSON.stringify([])
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the tags validation message.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul tags in.' }
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

	it('saves news article as draft and returns success payload', async () => {
		// Arrange: provide valid form input for the default save flow.
		// Why: this is the primary path admins use to create draft news articles.
		const event = createActionEvent()
		mockSuccessfulUploadAndCreate()

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: save flow returns success response for draft creation.
		expect(result).toEqual({
			success: true,
			message: 'Nieuwsartikel succesvol opgeslagen als concept.',
			newsId: 'news-789'
		})
		// Assert: file upload and content creation are executed once.
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

	it('sends expected payload to postContent including hero image and draft status', async () => {
		// Arrange: provide valid form input with parseable tags.
		// Why: the persisted content contract depends on correct field mapping and draft defaults.
		const event = createActionEvent({
			fields: {
				title: '  Breaking News!!  ',
				tags: JSON.stringify(['urgent', 'update'])
			}
		})
		mockSuccessfulUploadAndCreate()

		// Act: execute the default action.
		await actions.default(event)

		// Assert: content payload includes hero image id, tags array, and draft status.
		expect(ContentService.postContent).toHaveBeenCalledWith(
			{
				title: 'Breaking News!!',
				description: 'Korte beschrijving van het artikel',
				date: '2026-03-18',
				author: 'John Doe',
				tags: ['urgent', 'update'],
				body: 'Dit is de volledige inhoud van het nieuwsartikel.',
				hero: 'img-123',
				status: 'draft'
			},
			'news',
			'token-123'
		)
	})

	it('trims individual tags and filters empty ones from parsed array', async () => {
		// Arrange: provide tags array with whitespace-padded values.
		// Why: tags should be trimmed and empty values filtered to prevent duplicate/blank entries.
		const event = createActionEvent({
			fields: {
				tags: JSON.stringify(['  tech  ', '  ', 'news', '   update   '])
			}
		})
		mockSuccessfulUploadAndCreate()

		// Act: execute the default action.
		await actions.default(event)

		// Assert: tags are trimmed and blanks filtered.
		expect(ContentService.postContent).toHaveBeenCalledWith(
			expect.objectContaining({
				tags: ['tech', 'news', 'update']
			}),
			'news',
			'token-123'
		)
	})

	it('handles malformed tags JSON and uses empty array', async () => {
		// Arrange: provide invalid JSON for tags field with otherwise valid input.
		// Why: server should gracefully degrade when tags are malformed, not crash.
		const event = createActionEvent({
			fields: {
				tags: 'not-valid-json'
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action fails with tags validation error (empty array is invalid).
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul tags in.' }
		})
	})

	it('publishes created news article when submitAction is publish', async () => {
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

		// Assert: publish path returns published success message and news id.
		expect(result).toEqual({
			success: true,
			message: 'Nieuwsartikel succesvol opgeslagen en gepubliceerd.',
			newsId: 'news-789'
		})
		// Assert: publish is called with created id, news type, and token.
		expect(ContentService.publishContent).toHaveBeenCalledWith('news-789', 'news', 'token-123')
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

		// Assert: response is success with warning message and created news id.
		expect(result).toEqual({
			success: true,
			message: 'Nieuwsartikel opgeslagen als concept, maar publiceren is mislukt.',
			newsId: 'news-789'
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

		// Assert: response is success with warning message and created news id.
		expect(result).toEqual({
			success: true,
			message: 'Nieuwsartikel opgeslagen als concept, maar publiceren is mislukt.',
			newsId: 'news-789'
		})
		// Assert: no rollback is triggered because content creation succeeded.
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('rolls back uploaded image when content creation fails', async () => {
		// Arrange: image upload succeeds, but content creation fails.
		// Why: uploaded files must be cleaned up when article creation does not complete.
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent.mockResolvedValue({ success: false })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action fails with generic create error when postContent is unsuccessful.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het nieuwsartikel.' }
		})
		// Assert: rollback removes the uploaded file id.
		expect(ContentService.deleteFile).toHaveBeenCalledTimes(1)
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-123', 'token-123')
		// Assert: publish is skipped because content creation failed.
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('does not rollback files when create flow succeeds without publish', async () => {
		// Arrange: all operations succeed in save mode (no publish).
		// Why: successful completion should not trigger cleanup in the finally block.
		const event = createActionEvent({
			fields: {
				submitAction: 'save'
			}
		})
		mockSuccessfulUploadAndCreate()

		// Act: execute the default action.
		await actions.default(event)

		// Assert: rollback is never called after successful create (no publish).
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
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
			message: 'Nieuwsartikel succesvol opgeslagen als concept.',
			newsId: 'news-789'
		})
		// Assert: publish is not called for unknown submit actions.
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('returns 500 when image upload fails', async () => {
		// Arrange: provide valid form input but mock image upload failure.
		// Why: failed uploads should block article creation with generic error.
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: false, error: 'Upload failed' })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action fails with generic create error.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het nieuwsartikel.' }
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
			data: { error: 'Er is iets misgegaan bij het opslaan van het nieuwsartikel.' }
		})
	})
})
