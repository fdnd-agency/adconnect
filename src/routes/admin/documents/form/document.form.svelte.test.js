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

function expectNoMutationCalls() {
	expect(ContentService.postFile).not.toHaveBeenCalled()
	expect(ContentService.postContent).not.toHaveBeenCalled()
	expect(ContentService.publishContent).not.toHaveBeenCalled()
}

function mockSuccessfulUploadsAndCreate({ imageId = 'img-123', sourceId = 'src-456', documentId = 'doc-789' } = {}) {
	ContentService.postFile.mockResolvedValueOnce({ success: true, id: imageId }).mockResolvedValueOnce({ success: true, id: sourceId })
	ContentService.postContent.mockResolvedValue({ success: true, id: documentId })
}

describe('admin documents form load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns categories sorted by title', async () => {
		// Arrange: simulate unsorted category records from the service.
		// Why: the admin dropdown should remain alphabetically stable.
		ContentService.fetchContent.mockResolvedValue({
			data: {
				categories: new Map([
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

		// Assert: load asks for categories with the provided token.
		expect(ContentService.fetchContent).toHaveBeenCalledWith('categories', null, null, null, false, 'token-123')
		// Assert: successful fetch should not produce a load error.
		expect(result.loadError).toBeNull()
		// Assert: categories are returned in ascending title order.
		expect(result.categories.map((category) => category.title)).toEqual(['Aap', 'Mier', 'Zebra'])
	})

	it('returns loadError when category fetch has errors', async () => {
		// Arrange: simulate a fetch response that includes service errors.
		// Why: the page should surface a fallback warning to admins.
		ContentService.fetchContent.mockResolvedValue({
			data: {
				categories: new Map([['1', { id: '1', title: 'Nieuws' }]])
			},
			errors: [{ collection: 'categories', message: 'Network timeout' }]
		})

		// Arrange: provide cookie access token as load input context.
		const event = createLoadEvent()

		// Act: execute the load function.
		const result = await load(event)

		// Assert: categories still render, and loadError is exposed.
		expect(result.categories.map((category) => category.title)).toEqual(['Nieuws'])
		expect(result.loadError).toBe('Categorieen konden niet worden geladen.')
	})

	it('returns empty categories when categories map is missing', async () => {
		// Arrange: simulate a partial service response without a categories map.
		// Why: load should be resilient and avoid crashing on incomplete payloads.
		ContentService.fetchContent.mockResolvedValue({
			data: {},
			errors: []
		})

		// Arrange: provide cookie access token as load input context.
		const event = createLoadEvent()

		// Act: execute the load function.
		const result = await load(event)

		// Assert: categories fall back to an empty array and no load error is shown.
		expect(result.categories).toEqual([])
		expect(result.loadError).toBeNull()
	})
})

describe('admin documents form actions.default', () => {
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
			data: { error: 'Er is iets misgegaan bij het opslaan van het document.' }
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

	it('returns 400 when category is empty after trim', async () => {
		// Arrange: start from valid baseline form data and override only category.
		// Why: this isolates required category validation from unrelated fields.
		const event = createActionEvent({
			fields: {
				category: '   '
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the category validation message.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Kies een categorie.' }
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

	it('returns 400 when source_file is zero-byte', async () => {
		// Arrange: start from valid baseline form data and override only source_file.
		// Why: zero-byte source uploads should be rejected as invalid files.
		const event = createActionEvent({
			fields: {
				source_file: new File([], 'empty.pdf', { type: 'application/pdf' })
			}
		})

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns a 400 fail payload with the source file validation message.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Upload een bronbestand.' }
		})
		// Assert: validation fails before any content mutation calls.
		expectNoMutationCalls()
	})

	it('saves document as draft and returns success payload', async () => {
		// Arrange: provide valid form input for the default save flow.
		// Why: this is the primary path admins use to create draft documents.
		const event = createActionEvent()
		mockSuccessfulUploadsAndCreate()

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: save flow returns success response for draft creation.
		expect(result).toEqual({
			success: true,
			message: 'Document succesvol opgeslagen als concept.',
			documentId: 'doc-789'
		})
		// Assert: both file uploads and content creation are executed once.
		expect(ContentService.postFile).toHaveBeenCalledTimes(2)
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
		mockSuccessfulUploadsAndCreate()

		// Act: execute the default action.
		await actions.default(event)

		// Assert: first upload call is the image with strict image upload options.
		expect(ContentService.postFile).toHaveBeenNthCalledWith(1, expect.any(File), 'token-123', {
			folderName: 'Adconnect',
			allowedMimePrefixes: ['image/'],
			invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
		})
	})

	it('sends expected payload to postContent including slug and draft status', async () => {
		// Arrange: provide a title with spaces/symbols to validate slug normalization.
		// Why: the persisted content contract depends on correct slug and draft defaults.
		const event = createActionEvent({
			fields: {
				title: '  Mijn Titel!! Met   Spaties  '
			}
		})
		mockSuccessfulUploadsAndCreate()

		// Act: execute the default action.
		await actions.default(event)

		// Assert: content payload includes mapped file ids, slug, and draft status.
		expect(ContentService.postContent).toHaveBeenCalledWith(
			{
				title: 'Mijn Titel!! Met   Spaties',
				description: 'Korte beschrijving',
				date: '2026-03-18',
				category: 'cat-1',
				hero_image: 'img-123',
				source_file: 'src-456',
				slug: 'mijn-titel-met-spaties',
				status: 'draft'
			},
			'documents',
			'token-123'
		)
	})

	it('retries with random slug suffix when slug already exists', async () => {
		// Arrange: create uses a duplicate slug first, then retries with random suffix.
		const event = createActionEvent({
			fields: {
				title: 'test'
			}
		})

		const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.42)

		ContentService.postFile.mockResolvedValueOnce({ success: true, id: 'img-123' }).mockResolvedValueOnce({ success: true, id: 'src-456' })
		ContentService.postContent
			.mockResolvedValueOnce({
				success: false,
				status: 400,
				data: {
					error: 'Aanmaken mislukt: Value "test" for field "slug" in collection "adconnect_documents" has to be unique.'
				}
			})
			.mockResolvedValueOnce({ success: true, id: 'doc-789' })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action retries once with a suffixed slug and succeeds.
		expect(result).toEqual({
			success: true,
			message: 'Document succesvol opgeslagen als concept.',
			documentId: 'doc-789'
		})
		expect(ContentService.postContent).toHaveBeenCalledTimes(2)
		expect(ContentService.postContent).toHaveBeenNthCalledWith(1, expect.objectContaining({ slug: 'test' }), 'documents', 'token-123')
		expect(ContentService.postContent).toHaveBeenNthCalledWith(2, expect.objectContaining({ slug: 'test-4780' }), 'documents', 'token-123')

		randomSpy.mockRestore()
	})

	it('publishes created document when submitAction is publish', async () => {
		// Arrange: provide valid form input and switch submit action to publish.
		// Why: publish mode should perform create + publish and return publish success feedback.
		const event = createActionEvent({
			fields: {
				submitAction: 'publish'
			}
		})
		mockSuccessfulUploadsAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: publish path returns published success message and document id.
		expect(result).toEqual({
			success: true,
			message: 'Document succesvol opgeslagen en gepubliceerd.',
			documentId: 'doc-789'
		})
		// Assert: publish is called with created id, documents type, and token.
		expect(ContentService.publishContent).toHaveBeenCalledWith('doc-789', 'documents', 'token-123')
	})

	it('returns warning success payload when publish returns non-success', async () => {
		// Arrange: create succeeds, but publish returns a non-success result.
		// Why: flow should keep the created draft and return a warning instead of failing hard.
		const event = createActionEvent({
			fields: {
				submitAction: 'publish'
			}
		})
		mockSuccessfulUploadsAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: false })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: response is success with warning message and created document id.
		expect(result).toEqual({
			success: true,
			message: 'Document opgeslagen als concept, maar publiceren is mislukt.',
			documentId: 'doc-789'
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
		mockSuccessfulUploadsAndCreate()
		ContentService.publishContent.mockRejectedValue(new Error('Publish endpoint timeout'))

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: response is success with warning message and created document id.
		expect(result).toEqual({
			success: true,
			message: 'Document opgeslagen als concept, maar publiceren is mislukt.',
			documentId: 'doc-789'
		})
		// Assert: no rollback is triggered because content creation succeeded.
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('rolls back uploaded image when source file upload fails', async () => {
		// Arrange: image upload succeeds, but source upload fails.
		// Why: partially uploaded files must be cleaned up to avoid orphaned storage.
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValueOnce({ success: true, id: 'img-123' }).mockResolvedValueOnce({ success: false })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action fails with generic create error when second upload fails.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het document.' }
		})
		// Assert: rollback removes the first uploaded file id.
		expect(ContentService.deleteFile).toHaveBeenCalledTimes(1)
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-123', 'token-123')
		// Assert: content create and publish are skipped on failed upload.
		expect(ContentService.postContent).not.toHaveBeenCalled()
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('rolls back both uploaded files when content creation fails', async () => {
		// Arrange: both uploads succeed, but content creation fails.
		// Why: all uploaded files must be cleaned up when document creation does not complete.
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValueOnce({ success: true, id: 'img-123' }).mockResolvedValueOnce({ success: true, id: 'src-456' })
		ContentService.postContent.mockResolvedValue({ success: false })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action fails with generic create error when postContent is unsuccessful.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het document.' }
		})
		// Assert: rollback removes both uploaded file ids in order.
		expect(ContentService.deleteFile).toHaveBeenCalledTimes(2)
		expect(ContentService.deleteFile).toHaveBeenNthCalledWith(1, 'img-123', 'token-123')
		expect(ContentService.deleteFile).toHaveBeenNthCalledWith(2, 'src-456', 'token-123')
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
		mockSuccessfulUploadsAndCreate()
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
		mockSuccessfulUploadsAndCreate()

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: response follows save mode behavior (draft success message).
		expect(result).toEqual({
			success: true,
			message: 'Document succesvol opgeslagen als concept.',
			documentId: 'doc-789'
		})
		// Assert: publish is not called for unknown submit actions.
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})
})
