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

describe('admin nominations form load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns events sorted by title', async () => {
		// Arrange: simulate unsorted event records from the service.
		// Why: the admin dropdown should remain alphabetically stable.
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

		// Assert: load requests events with access token.
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

describe('admin nominations form actions.default', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns 403 when access token is missing', async () => {
		const event = createActionEvent({ accessToken: null })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 403,
			data: { error: 'Er is iets misgegaan bij het opslaan van de nominatie.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when title is empty after trim', async () => {
		const event = createActionEvent({ fields: { title: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een titel in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when header is empty after trim', async () => {
		const event = createActionEvent({ fields: { header: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een header in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when date is empty after trim', async () => {
		const event = createActionEvent({ fields: { date: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een datum in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when excerpt is empty after trim', async () => {
		const event = createActionEvent({ fields: { excerpt: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een samenvatting in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when body is empty after trim', async () => {
		const event = createActionEvent({ fields: { body: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul de body in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when event_id is empty after trim', async () => {
		const event = createActionEvent({ fields: { event_id: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Kies een event.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when institution is empty after trim', async () => {
		const event = createActionEvent({ fields: { institution: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een instelling in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when course is empty after trim', async () => {
		const event = createActionEvent({ fields: { course: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een opleiding in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when previous_course is empty after trim', async () => {
		const event = createActionEvent({ fields: { previous_course: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een vorige opleiding in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when education_variant is empty after trim', async () => {
		const event = createActionEvent({ fields: { education_variant: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een onderwijsvariant in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when alumnus is empty after trim', async () => {
		const event = createActionEvent({ fields: { alumnus: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul alumnis in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when profile_picture is zero-byte', async () => {
		const event = createActionEvent({
			fields: { profile_picture: new File([], 'empty.png', { type: 'image/png' }) }
		})

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Upload een profielfoto.' }
		})
		expectNoMutationCalls()
	})

	it('saves nomination as draft and returns success payload', async () => {
		const event = createActionEvent()
		mockSuccessfulUploadAndCreate()

		const result = await actions.default(event)

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
		const event = createActionEvent()
		mockSuccessfulUploadAndCreate()

		await actions.default(event)

		expect(ContentService.postFile).toHaveBeenCalledWith(expect.any(File), 'token-123', {
			folderName: 'Adconnect',
			allowedMimePrefixes: ['image/'],
			invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
		})
	})

	it('sends expected payload to postContent including slug and event relation shape', async () => {
		const event = createActionEvent({
			fields: {
				title: '  Mijn Nominatie!! Titel  ',
				event_id: 'evt-42'
			}
		})
		mockSuccessfulUploadAndCreate({ imageId: 'img-999' })

		await actions.default(event)

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

		const result = await actions.default(event)

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
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: true })

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Nominatie succesvol opgeslagen en gepubliceerd.',
			nominationId: 'nom-789'
		})
		expect(ContentService.publishContent).toHaveBeenCalledWith('nom-789', 'nominations', 'token-123')
	})

	it('returns warning success payload when publish returns non-success', async () => {
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: false })

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Nominatie opgeslagen als concept, maar publiceren is mislukt.',
			nominationId: 'nom-789'
		})
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('returns warning success payload when publish throws an exception', async () => {
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockRejectedValue(new Error('Publish endpoint timeout'))

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Nominatie opgeslagen als concept, maar publiceren is mislukt.',
			nominationId: 'nom-789'
		})
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('returns 500 when profile picture upload fails', async () => {
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: false, error: 'Upload failed' })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van de nominatie.' }
		})
		expect(ContentService.postContent).not.toHaveBeenCalled()
		expect(ContentService.publishContent).not.toHaveBeenCalled()
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('rolls back uploaded profile picture when content creation fails', async () => {
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent.mockResolvedValue({ success: false })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van de nominatie.' }
		})
		expect(ContentService.deleteFile).toHaveBeenCalledTimes(1)
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-123', 'token-123')
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})

	it('does not rollback files when publish flow succeeds', async () => {
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: true })

		await actions.default(event)

		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('treats unknown submitAction as save and skips publish', async () => {
		const event = createActionEvent({ fields: { submitAction: 'archive' } })
		mockSuccessfulUploadAndCreate()

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Nominatie succesvol opgeslagen als concept.',
			nominationId: 'nom-789'
		})
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})
})
