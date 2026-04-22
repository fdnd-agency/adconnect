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
		title: 'Mijn nominatie',
		header: 'Winnaar',
		date: '2026-04-08',
		excerpt: 'Korte samenvatting',
		body: 'Volledige body van de nominatie.',
		event_id: 'evt-1',
		institution: 'Hogeschool Utrecht',
		course: 'Software Development',
		previous_course: 'MBO ICT',
		education_variant: 'Deeltijd',
		alumnus: 'Ja',
		profile_picture: new File(['image-bytes'], 'profile.png', { type: 'image/png' }),
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

function mockSuccessfulUploadAndCreate({ imageId = 'img-123', nominationId = 'nom-789' } = {}) {
	ContentService.postFile.mockResolvedValue({ success: true, id: imageId })
	ContentService.postContent.mockResolvedValue({ success: true, id: nominationId })
}

describe('admin nominations create load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns events sorted by title', async () => {
		// Arrange: simulate unsorted event records from the service.
		ContentService.fetchContent.mockResolvedValue({
			data: {
				events: new Map([
					['1', { id: '1', title: 'Zebra Event' }],
					['2', { id: '2', title: 'Aap Event' }],
					['3', { id: '3', title: 'Mier Event' }]
				])
			},
			errors: []
		})

		const event = createLoadEvent()

		// Act: execute load.
		const result = await load(event)

		// Assert: load requests events with access token and alphabetically sorts them.
		expect(ContentService.fetchContent).toHaveBeenCalledWith('events', null, null, null, true, 'token-123')
		expect(result.loadError).toBeNull()
		expect(result.events.map((item) => item.title)).toEqual(['Aap Event', 'Mier Event', 'Zebra Event'])
	})

	it('returns loadError when event fetch has errors', async () => {
		// Arrange: return events but include service errors.
		ContentService.fetchContent.mockResolvedValue({
			data: {
				events: new Map([['1', { id: '1', title: 'Eerste Event' }]])
			},
			errors: [{ collection: 'events', message: 'Network timeout' }]
		})

		const event = createLoadEvent()

		// Act: execute load.
		const result = await load(event)

		// Assert: events still render and load error is exposed.
		expect(result.events.map((item) => item.title)).toEqual(['Eerste Event'])
		expect(result.loadError).toBe('Events konden niet worden geladen.')
	})

	it('returns empty events when events map is missing', async () => {
		// Arrange: simulate partial service response without events map.
		ContentService.fetchContent.mockResolvedValue({
			data: {},
			errors: []
		})

		const event = createLoadEvent()

		// Act: execute load.
		const result = await load(event)

		// Assert: fallback to empty list without load error.
		expect(result.events).toEqual([])
		expect(result.loadError).toBeNull()
	})
})

describe('admin nominations create actions.default', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns 403 when access token is missing', async () => {
		// Arrange: session without access token.
		const event = createActionEvent({ accessToken: null })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: authorization guard triggers before any mutation.
		expect(result).toMatchObject({
			status: 403,
			data: { error: 'Er is iets misgegaan bij het opslaan van de nominatie.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when title is empty after trim', async () => {
		// Arrange: whitespace-only title.
		const event = createActionEvent({ fields: { title: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: validation error surfaces before uploads happen.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een titel in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when header is empty after trim', async () => {
		// Arrange: whitespace-only header.
		const event = createActionEvent({ fields: { header: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: validation error surfaces before uploads happen.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een header in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when date is empty after trim', async () => {
		// Arrange: whitespace-only date.
		const event = createActionEvent({ fields: { date: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: validation error surfaces before uploads happen.
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

		// Assert: validation error surfaces before uploads happen.
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

		// Assert: validation error surfaces before uploads happen.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul de body in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when event_id is empty after trim', async () => {
		// Arrange: whitespace-only event selection.
		const event = createActionEvent({ fields: { event_id: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: validation error surfaces before uploads happen.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Kies een event.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when institution is empty after trim', async () => {
		// Arrange: whitespace-only institution.
		const event = createActionEvent({ fields: { institution: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: validation error surfaces before uploads happen.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een instelling in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when course is empty after trim', async () => {
		// Arrange: whitespace-only course.
		const event = createActionEvent({ fields: { course: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: validation error surfaces before uploads happen.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een opleiding in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when previous_course is empty after trim', async () => {
		// Arrange: whitespace-only previous course.
		const event = createActionEvent({ fields: { previous_course: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: validation error surfaces before uploads happen.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een vorige opleiding in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when education_variant is empty after trim', async () => {
		// Arrange: whitespace-only education variant.
		const event = createActionEvent({ fields: { education_variant: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: validation error surfaces before uploads happen.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een onderwijsvariant in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when alumnus is empty after trim', async () => {
		// Arrange: whitespace-only alumnus.
		const event = createActionEvent({ fields: { alumnus: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: validation error surfaces before uploads happen.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul alumnis in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when profile_picture is zero-byte', async () => {
		// Arrange: empty file posted as profile picture.
		const event = createActionEvent({
			fields: { profile_picture: new File([], 'empty.png', { type: 'image/png' }) }
		})

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: validation error blocks upload attempts.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Upload een profielfoto.' }
		})
		expectNoMutationCalls()
	})

	it('echoes submitted field values back inside the failure payload', async () => {
		// Arrange: submit a form with a blank alumnus so validation kicks in.
		// Why: the form component relies on this echo to repopulate inputs after a server-side rejection.
		const event = createActionEvent({ fields: { alumnus: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: the other submitted fields are returned so the UI can restore them.
		expect(result.data).toMatchObject({
			title: 'Mijn nominatie',
			header: 'Winnaar',
			course: 'Software Development'
		})
		// Assert: the File object is stripped from the echoed state.
		expect(result.data.profile_picture).toBeUndefined()
	})

	it('saves nomination as draft and returns success payload', async () => {
		// Arrange: fresh submission with all required fields.
		const event = createActionEvent()
		mockSuccessfulUploadAndCreate()

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: draft save flow skips publish and cleanup.
		expect(result).toEqual({
			success: true,
			message: 'Nominatie succesvol opgeslagen als concept.',
			nominationId: 'nom-789'
		})
		expect(ContentService.postFile).toHaveBeenCalledTimes(1)
		expect(ContentService.postContent).toHaveBeenCalledTimes(1)
		expect(ContentService.publishContent).not.toHaveBeenCalled()
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('uploads profile picture with expected folder and mime validation options', async () => {
		// Arrange: valid form submission with a happy-path upload service.
		const event = createActionEvent()
		mockSuccessfulUploadAndCreate()

		// Act: submit the form.
		await actions.default(event)

		// Assert: postFile is invoked with the shared Adconnect folder config and image mime guard.
		expect(ContentService.postFile).toHaveBeenCalledWith(expect.any(File), 'token-123', {
			folderName: 'Adconnect',
			allowedMimePrefixes: ['image/'],
			invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
		})
	})

	it('sends expected payload to postContent including slug and event relation shape', async () => {
		// Arrange: messy title to verify trim+slugify and a specific event id to check the junction shape.
		const event = createActionEvent({
			fields: {
				title: '  Mijn Nominatie!! Titel  ',
				event_id: 'evt-42'
			}
		})
		mockSuccessfulUploadAndCreate({ imageId: 'img-999' })

		// Act: submit the form.
		await actions.default(event)

		// Assert: payload matches Directus contract (trimmed title, slug, junction create entry).
		expect(ContentService.postContent).toHaveBeenCalledWith(
			{
				title: 'Mijn Nominatie!! Titel',
				header: 'Winnaar',
				date: '2026-04-08',
				excerpt: 'Korte samenvatting',
				body: 'Volledige body van de nominatie.',
				event_id: {
					create: [{ adconnect_events_id: 'evt-42' }]
				},
				institution: 'Hogeschool Utrecht',
				course: 'Software Development',
				previous_course: 'MBO ICT',
				education_variant: 'Deeltijd',
				alumnus: 'Ja',
				profile_picture: 'img-999',
				slug: 'mijn-nominatie-titel',
				status: 'draft'
			},
			'nominations',
			'token-123'
		)
	})

	it('retries with random slug suffix when slug already exists', async () => {
		// Arrange: first attempt hits a duplicate slug error; second attempt succeeds.
		// Why: Directus enforces unique slugs, so the action retries with a random suffix.
		const event = createActionEvent({
			fields: {
				title: 'test'
			}
		})

		const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.42)

		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent
			.mockResolvedValueOnce({
				success: false,
				status: 400,
				data: {
					error: 'Aanmaken mislukt: Value "test" for field "slug" in collection "adconnect_nominations" has to be unique.'
				}
			})
			.mockResolvedValueOnce({ success: true, id: 'nom-789' })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: second attempt uses a suffixed slug and eventually succeeds.
		expect(result).toEqual({
			success: true,
			message: 'Nominatie succesvol opgeslagen als concept.',
			nominationId: 'nom-789'
		})
		expect(ContentService.postContent).toHaveBeenCalledTimes(2)
		expect(ContentService.postContent).toHaveBeenNthCalledWith(1, expect.objectContaining({ slug: 'test' }), 'nominations', 'token-123')
		expect(ContentService.postContent).toHaveBeenNthCalledWith(2, expect.objectContaining({ slug: 'test-4780' }), 'nominations', 'token-123')

		randomSpy.mockRestore()
	})

	it('publishes created nomination when submitAction is publish', async () => {
		// Arrange: publish submit action with a fully successful backend.
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: true })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: publishContent is called with the new id and the success message reflects publication.
		expect(result).toEqual({
			success: true,
			message: 'Nominatie succesvol opgeslagen en gepubliceerd.',
			nominationId: 'nom-789'
		})
		expect(ContentService.publishContent).toHaveBeenCalledWith('nom-789', 'nominations', 'token-123')
	})

	it('returns warning success payload when publish returns non-success', async () => {
		// Arrange: create succeeds but publish call returns a non-success result.
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: false })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: draft is kept and the warning message is returned.
		expect(result).toEqual({
			success: true,
			message: 'Nominatie opgeslagen als concept, maar publiceren is mislukt.',
			nominationId: 'nom-789'
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
			message: 'Nominatie opgeslagen als concept, maar publiceren is mislukt.',
			nominationId: 'nom-789'
		})
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('returns 500 when profile picture upload fails', async () => {
		// Arrange: file upload service returns a non-success result.
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: false, error: 'Upload failed' })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: action short-circuits before trying to create content or publish.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van de nominatie.' }
		})
		expect(ContentService.postContent).not.toHaveBeenCalled()
		expect(ContentService.publishContent).not.toHaveBeenCalled()
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('rolls back uploaded profile picture when content creation fails', async () => {
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
			data: { error: 'Er is iets misgegaan bij het opslaan van de nominatie.' }
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
			message: 'Nominatie succesvol opgeslagen als concept.',
			nominationId: 'nom-789'
		})
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})
})
