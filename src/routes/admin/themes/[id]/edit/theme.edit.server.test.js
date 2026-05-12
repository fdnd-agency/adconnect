import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContentService } from '$lib/server/contentService.js'
import { actions, load } from './+page.server.js'

vi.mock('$lib/server/contentService.js', () => ({
	ContentService: {
		fetchContent: vi.fn(),
		postFile: vi.fn(),
		updateContent: vi.fn(),
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
		submitAction: 'save',
		...overrides
	}
}

function createActionEvent({ fields = {}, accessToken = 'token-123', id = 'theme-789' } = {}) {
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

describe('admin themes edit load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns loadError when id is missing', async () => {
		// Arrange: load event without a params.id.
		const event = { params: {}, cookies: { get: vi.fn().mockReturnValue('token-123') } }

		// Act: run the load function.
		const result = await load(event)

		// Assert: fetchContent is not called and loadError is returned.
		expect(result).toEqual({
			theme: null,
			loadError: 'Er is een probleem opgetreden bij het ophalen van het thema.'
		})
		expect(ContentService.fetchContent).not.toHaveBeenCalled()
	})

	it('returns loadError when access token is missing', async () => {
		// Arrange: load event with id but no token.
		const event = { params: { id: 'theme-789' }, cookies: { get: vi.fn().mockReturnValue(null) } }

		// Act: run the load function.
		const result = await load(event)

		// Assert: fetchContent is not called and loadError is returned.
		expect(result).toEqual({
			theme: null,
			loadError: 'Er is een probleem opgetreden bij het ophalen van het thema.'
		})
		expect(ContentService.fetchContent).not.toHaveBeenCalled()
	})

	it('returns theme when fetch succeeds', async () => {
		// Arrange: fetchContent returns a theme in the themes array.
		const theme = { id: 'theme-789', title: 'T', hero: 'img-1' }
		ContentService.fetchContent.mockResolvedValue({
			data: { themes: [theme] },
			errors: []
		})
		const event = { params: { id: 'theme-789' }, cookies: { get: vi.fn().mockReturnValue('token-123') } }

		// Act: run the load function.
		const result = await load(event)

		// Assert: the loaded theme is exposed without loadError.
		expect(result).toEqual({ theme, loadError: null })
		expect(ContentService.fetchContent).toHaveBeenCalledWith('themes', 'theme-789', null, null, false, 'token-123')
	})
})

describe('admin themes edit actions.default', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns 403 when token is missing', async () => {
		// Arrange: action without access token.
		const event = createActionEvent({ accessToken: null })

		// Act: submit the edit form.
		const result = await actions.default(event)

		// Assert: authorization guard blocks mutations.
		expect(result).toMatchObject({
			status: 403,
			data: { error: 'Er is iets misgegaan bij het bijwerken van het thema.' }
		})
		expect(ContentService.postFile).not.toHaveBeenCalled()
		expect(ContentService.updateContent).not.toHaveBeenCalled()
	})

	it('returns 400 when params.id is missing', async () => {
		// Arrange: action with empty id.
		const event = createActionEvent({ id: '' })

		// Act: submit the edit form.
		const result = await actions.default(event)

		// Assert: action fails with a generic update error before any mutation.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Er is iets misgegaan bij het bijwerken van het thema.' }
		})
		expect(ContentService.updateContent).not.toHaveBeenCalled()
	})

	it('returns 400 when title is empty after trim', async () => {
		// Arrange: whitespace-only title.
		const event = createActionEvent({ fields: { title: '   ' } })

		// Act: submit the edit form.
		const result = await actions.default(event)

		// Assert: title validation message and no update attempt.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een titel in.' }
		})
		expect(ContentService.updateContent).not.toHaveBeenCalled()
	})

	it('updates theme without touching hero when no new image is uploaded', async () => {
		// Arrange: submit without a new image file.
		// Why: payload should omit hero so the existing image stays untouched.
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'theme-789' })
		const event = createActionEvent()

		// Act: submit the edit form.
		const result = await actions.default(event)

		// Assert: success response is returned and payload does not include hero.
		expect(result).toEqual({
			success: true,
			message: 'Thema succesvol bijgewerkt.',
			themeId: 'theme-789'
		})
		expect(ContentService.postFile).not.toHaveBeenCalled()
		const payload = ContentService.updateContent.mock.calls[0][1]
		expect(payload).not.toHaveProperty('hero')
		expect(payload).toMatchObject({
			title: 'Mijn thema',
			description: 'Korte beschrijving',
			date: '2026-03-18',
			excerpt: 'Korte samenvatting',
			body: 'Volledige body van het thema.'
		})
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('uploads new image and deletes old hero on successful update', async () => {
		// Arrange: submission includes a new image file plus the existing hero id.
		// Why: uploading replaces the hero and the old file should be cleaned up.
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-new' })
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'theme-789' })
		ContentService.deleteFile.mockResolvedValue({ success: true })
		const event = createActionEvent({
			fields: {
				image: new File(['bytes'], 'new.png', { type: 'image/png' }),
				currentHeroId: 'img-old'
			}
		})

		// Act: submit the edit form.
		const result = await actions.default(event)

		// Assert: update payload uses the new hero id and the old file is deleted.
		expect(result).toEqual({
			success: true,
			message: 'Thema succesvol bijgewerkt.',
			themeId: 'theme-789'
		})
		expect(ContentService.postFile).toHaveBeenCalledWith(expect.any(File), 'token-123', {
			folderName: 'Adconnect',
			allowedMimePrefixes: ['image/'],
			invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
		})
		expect(ContentService.updateContent).toHaveBeenCalledWith('theme-789', expect.objectContaining({ hero: 'img-new' }), 'themes', 'token-123')
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-old', 'token-123')
	})

	it('does not attempt to delete an old hero when currentHeroId is empty', async () => {
		// Arrange: new image uploaded but no previous hero id stored in the form.
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-new' })
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'theme-789' })
		const event = createActionEvent({
			fields: {
				image: new File(['bytes'], 'new.png', { type: 'image/png' })
			}
		})

		// Act: submit the edit form.
		await actions.default(event)

		// Assert: no cleanup call is made when there is no current hero to replace.
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('returns 500 when image upload fails', async () => {
		// Arrange: upload service returns a non-success result.
		ContentService.postFile.mockResolvedValue({ success: false })
		const event = createActionEvent({
			fields: { image: new File(['bytes'], 'new.png', { type: 'image/png' }) }
		})

		// Act: submit the edit form.
		const result = await actions.default(event)

		// Assert: action aborts before updating content.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het bijwerken van het thema.' }
		})
		expect(ContentService.updateContent).not.toHaveBeenCalled()
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('rolls back newly uploaded image when update fails', async () => {
		// Arrange: upload succeeds but update fails afterwards.
		// Why: the orphaned new file must be removed so the library stays clean.
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-new' })
		ContentService.updateContent.mockResolvedValue({ success: false })
		ContentService.deleteFile.mockResolvedValue({ success: true })
		const event = createActionEvent({
			fields: {
				image: new File(['bytes'], 'new.png', { type: 'image/png' }),
				currentHeroId: 'img-old'
			}
		})

		// Act: submit the edit form.
		const result = await actions.default(event)

		// Assert: the new upload is deleted, the old hero is preserved.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het bijwerken van het thema.' }
		})
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-new', 'token-123')
		expect(ContentService.deleteFile).not.toHaveBeenCalledWith('img-old', 'token-123')
	})

	it('ignores publish submit action in edit route', async () => {
		// Arrange: submit with publish action; update service succeeds.
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'theme-789' })
		const event = createActionEvent({ fields: { submitAction: 'publish' } })

		// Act: submit the edit form.
		const result = await actions.default(event)

		// Assert: edit route never calls publishContent.
		expect(result).toMatchObject({ success: true })
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('catches unexpected errors and returns generic update error', async () => {
		// Arrange: updateContent throws unexpectedly.
		ContentService.updateContent.mockRejectedValue(new Error('Network error'))
		const event = createActionEvent()

		// Act: submit the edit form.
		const result = await actions.default(event)

		// Assert: error is caught and returned as generic 500 fail payload.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het bijwerken van het thema.' }
		})
	})
})
