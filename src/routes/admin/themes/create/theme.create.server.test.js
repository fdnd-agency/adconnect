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

describe('admin themes create actions.default', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns 403 when access token is missing', async () => {
		// Arrange: valid form values but no access token cookie.
		const event = createActionEvent({ accessToken: null })

		// Act: run the default action.
		const result = await actions.default(event)

		// Assert: 403 fail payload and no mutations happen.
		expect(result).toMatchObject({
			status: 403,
			data: { error: 'Er is iets misgegaan bij het opslaan van het thema.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when title is empty after trim', async () => {
		// Arrange: whitespace-only title.
		const event = createActionEvent({ fields: { title: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: title validation message, no mutations.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een titel in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when description is empty after trim', async () => {
		// Arrange: whitespace-only description.
		const event = createActionEvent({ fields: { description: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: description validation message, no mutations.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een omschrijving in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when date is empty after trim', async () => {
		// Arrange: whitespace-only date.
		const event = createActionEvent({ fields: { date: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: date validation message, no mutations.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een datum in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when excerpt is empty after trim', async () => {
		// Arrange: whitespace-only excerpt.
		const event = createActionEvent({ fields: { excerpt: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: excerpt validation message, no mutations.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een samenvatting in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when body is empty after trim', async () => {
		// Arrange: whitespace-only body.
		const event = createActionEvent({ fields: { body: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: body validation message, no mutations.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul de body in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when image file is zero-byte', async () => {
		// Arrange: empty file posted as image.
		const event = createActionEvent({
			fields: { image: new File([], 'empty.png', { type: 'image/png' }) }
		})

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: image validation error blocks upload/create.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Upload een afbeelding.' }
		})
		expectNoMutationCalls()
	})

	it('echoes submitted field values back in the fail payload', async () => {
		// Arrange: valid values except missing body to trigger validation after other fields pass.
		const event = createActionEvent({
			fields: {
				title: 'Titel A',
				description: 'Omschrijving A',
				date: '2026-04-01',
				excerpt: 'Samenvatting A',
				body: '   '
			}
		})

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: fail payload echoes the submitted state so the UI can rehydrate inputs.
		expect(result).toMatchObject({
			status: 400,
			data: {
				error: 'Vul de body in.',
				title: 'Titel A',
				description: 'Omschrijving A',
				date: '2026-04-01',
				excerpt: 'Samenvatting A',
				body: '   '
			}
		})
	})

	it('saves theme as draft and returns success payload', async () => {
		// Arrange: happy-path save flow.
		const event = createActionEvent()
		mockSuccessfulUploadAndCreate()

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: draft success payload and expected call sequence.
		expect(result).toEqual({
			success: true,
			message: 'Thema succesvol opgeslagen als concept.',
			themeId: 'theme-789'
		})
		expect(ContentService.postFile).toHaveBeenCalledTimes(1)
		expect(ContentService.postContent).toHaveBeenCalledTimes(1)
		expect(ContentService.publishContent).not.toHaveBeenCalled()
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('uploads image with expected folder and mime validation options', async () => {
		// Arrange: valid submission with a happy-path upload service.
		const event = createActionEvent()
		mockSuccessfulUploadAndCreate()

		// Act: submit the form.
		await actions.default(event)

		// Assert: postFile is called with the shared Adconnect folder config and image mime guard.
		expect(ContentService.postFile).toHaveBeenCalledWith(expect.any(File), 'token-123', {
			folderName: 'Adconnect',
			allowedMimePrefixes: ['image/'],
			invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
		})
	})

	it('sends expected payload to postContent including hero, slug and draft status', async () => {
		// Arrange: messy title to verify trim+slugify; specific image id via mock.
		const event = createActionEvent({
			fields: { title: '  Mijn Thema!! Met   Spaties  ' }
		})
		mockSuccessfulUploadAndCreate({ imageId: 'img-999' })

		// Act: submit the form.
		await actions.default(event)

		// Assert: payload matches the Directus contract with slug + draft defaults.
		expect(ContentService.postContent).toHaveBeenCalledWith(
			{
				title: 'Mijn Thema!! Met   Spaties',
				description: 'Korte beschrijving',
				date: '2026-03-18',
				excerpt: 'Korte samenvatting',
				body: 'Volledige body van het thema.',
				hero: 'img-999',
				slug: 'mijn-thema-met-spaties',
				status: 'draft'
			},
			'themes',
			'token-123'
		)
	})

	it('retries with random slug suffix when slug already exists', async () => {
		// Arrange: first create hits a duplicate slug error; second succeeds.
		// Why: Directus enforces unique slugs, so the action retries with a random suffix.
		const event = createActionEvent({ fields: { title: 'test' } })
		const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.42)

		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent
			.mockResolvedValueOnce({
				success: false,
				status: 400,
				data: {
					error: 'Aanmaken mislukt: Value "test" for field "slug" in collection "adconnect_themes" has to be unique.'
				}
			})
			.mockResolvedValueOnce({ success: true, id: 'theme-789' })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: second attempt uses a suffixed slug and eventually succeeds.
		expect(result).toEqual({
			success: true,
			message: 'Thema succesvol opgeslagen als concept.',
			themeId: 'theme-789'
		})
		expect(ContentService.postContent).toHaveBeenCalledTimes(2)
		expect(ContentService.postContent).toHaveBeenNthCalledWith(1, expect.objectContaining({ slug: 'test' }), 'themes', 'token-123')
		expect(ContentService.postContent).toHaveBeenNthCalledWith(2, expect.objectContaining({ slug: 'test-4780' }), 'themes', 'token-123')

		randomSpy.mockRestore()
	})

	it('publishes created theme when submitAction is publish', async () => {
		// Arrange: publish submit action with a fully successful backend.
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: publishContent is called and the success message reflects publication.
		expect(result).toEqual({
			success: true,
			message: 'Thema succesvol opgeslagen en gepubliceerd.',
			themeId: 'theme-789'
		})
		expect(ContentService.publishContent).toHaveBeenCalledWith('theme-789', 'themes', 'token-123')
	})

	it('returns warning success payload when publish returns non-success', async () => {
		// Arrange: create succeeds but publish returns a non-success result.
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: false })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: draft is kept and the warning message is returned.
		expect(result).toEqual({
			success: true,
			message: 'Thema opgeslagen als concept, maar publiceren is mislukt.',
			themeId: 'theme-789'
		})
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('returns warning success payload when publish throws an exception', async () => {
		// Arrange: create succeeds, but the publish service throws unexpectedly.
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockRejectedValue(new Error('Publish endpoint timeout'))

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: action treats the throw the same as a non-success (draft kept, warning message).
		expect(result).toEqual({
			success: true,
			message: 'Thema opgeslagen als concept, maar publiceren is mislukt.',
			themeId: 'theme-789'
		})
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('returns 500 when image upload fails', async () => {
		// Arrange: file upload service returns a non-success result.
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: false, error: 'Upload failed' })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: action short-circuits before trying to create content or publish.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het thema.' }
		})
		expect(ContentService.postContent).not.toHaveBeenCalled()
		expect(ContentService.publishContent).not.toHaveBeenCalled()
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('rolls back uploaded image when content creation fails', async () => {
		// Arrange: upload succeeds but content creation fails afterwards.
		// Why: the orphaned file must be removed so the library stays clean.
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent.mockResolvedValue({ success: false })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: the uploaded file is deleted and publish is never attempted.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het thema.' }
		})
		expect(ContentService.deleteFile).toHaveBeenCalledTimes(1)
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-123', 'token-123')
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('does not rollback files when publish flow succeeds', async () => {
		// Arrange: end-to-end happy path with publish requested.
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act: submit the form.
		await actions.default(event)

		// Assert: no cleanup is performed when the whole flow succeeds.
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('treats unknown submitAction as save and skips publish', async () => {
		// Arrange: unexpected submitAction value simulating a stale or tampered button.
		const event = createActionEvent({ fields: { submitAction: 'archive' } })
		mockSuccessfulUploadAndCreate()

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: defaults to draft save semantics and never calls publishContent.
		expect(result).toEqual({
			success: true,
			message: 'Thema succesvol opgeslagen als concept.',
			themeId: 'theme-789'
		})
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('catches unexpected errors during create and returns generic error', async () => {
		// Arrange: postFile throws unexpectedly.
		const event = createActionEvent()
		ContentService.postFile.mockRejectedValue(new Error('Network error'))

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: unknown exceptions are converted to a generic 500 error.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van het thema.' }
		})
	})
})
