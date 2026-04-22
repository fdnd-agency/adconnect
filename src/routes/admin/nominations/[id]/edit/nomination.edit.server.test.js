import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContentService } from '$lib/server/contentService.js'
import { actions, load } from './+page.server.js'

vi.mock('$lib/server/contentService.js', () => ({
	ContentService: {
		fetchContent: vi.fn(),
		postFile: vi.fn(),
		updateContent: vi.fn(),
		deleteFile: vi.fn()
	}
}))

const NOMINATION_FIELDS = '*,event_id.id,event_id.adconnect_events_id.id,event_id.adconnect_events_id.title'

function createFormData(fields = {}) {
	const formData = new FormData()
	for (const [key, value] of Object.entries(fields)) {
		formData.append(key, value)
	}
	return formData
}

function createValidFormFields(overrides = {}) {
	return {
		title: 'Bijgewerkte nominatie',
		header: 'Winnaar',
		date: '2026-04-08',
		excerpt: 'Nieuwe samenvatting',
		body: 'Nieuwe body.',
		event_id: 'evt-1',
		institution: 'Hogeschool Utrecht',
		course: 'Software Development',
		previous_course: 'MBO ICT',
		education_variant: 'Deeltijd',
		alumnus: 'Ja',
		submitAction: 'save',
		...overrides
	}
}

function createActionEvent({ fields = {}, accessToken = 'token-123', id = 'nom-789' } = {}) {
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

function createLoadEvent({ accessToken = 'token-123', id = 'nom-789' } = {}) {
	return {
		params: { id },
		cookies: { get: vi.fn().mockReturnValue(accessToken) }
	}
}

function mockCurrentNominationFetch({ eventId = 'evt-1', junctionId = 'junction-1' } = {}) {
	ContentService.fetchContent.mockResolvedValue({
		data: {
			nominations: [
				{
					id: 'nom-789',
					title: 'Huidig',
					event_id: [{ id: junctionId, adconnect_events_id: { id: eventId, title: 'Event A' } }]
				}
			]
		},
		errors: []
	})
}

describe('admin nominations edit load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns loadError when token is missing', async () => {
		// Arrange: no access token in cookies.
		const event = createLoadEvent({ accessToken: null })

		// Act: load the edit page.
		const result = await load(event)

		// Assert: guarded load with empty events list.
		expect(result).toEqual({
			nomination: null,
			events: [],
			loadError: 'Er is een probleem opgetreden bij het ophalen van de nominatie.'
		})
	})

	it('loads nomination with nested event_id fields and events list', async () => {
		// Arrange: service returns nomination (with nested event_id data) and an events map.
		// Why: the edit form needs to pre-select the currently linked event.
		ContentService.fetchContent.mockImplementation((contentType) => {
			if (contentType === 'nominations') {
				return Promise.resolve({
					data: {
						nominations: [
							{
								id: 'nom-789',
								title: 'Huidig',
								event_id: [{ id: 'junction-1', adconnect_events_id: { id: 'evt-2', title: 'Event B' } }]
							}
						]
					},
					errors: []
				})
			}
			return Promise.resolve({
				data: { events: new Map([['evt-1', { id: 'evt-1', title: 'Event A' }]]) },
				errors: []
			})
		})

		const event = createLoadEvent()

		// Act: load the edit page.
		const result = await load(event)

		// Assert: fetchContent requested the correct nested fields.
		expect(ContentService.fetchContent).toHaveBeenCalledWith('nominations', 'nom-789', NOMINATION_FIELDS, null, false, 'token-123')
		expect(result.loadError).toBeNull()
		expect(result.nomination.id).toBe('nom-789')
		expect(result.events.map((item) => item.title)).toEqual(['Event A'])
	})

	it('returns loadError when nomination is not found', async () => {
		// Arrange: service returns no nomination data.
		ContentService.fetchContent.mockResolvedValue({
			data: { nominations: [] },
			errors: []
		})

		const event = createLoadEvent()

		// Act: load the edit page.
		const result = await load(event)

		// Assert: guarded load returns the generic error message.
		expect(result.nomination).toBeNull()
		expect(result.loadError).toBe('Er is een probleem opgetreden bij het ophalen van de nominatie.')
	})
})

describe('admin nominations edit actions.default', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns 403 when token is missing', async () => {
		// Arrange: action without access token.
		const event = createActionEvent({ accessToken: null })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: authorization guard blocks mutations.
		expect(result).toMatchObject({
			status: 403,
			data: { error: 'Er is iets misgegaan bij het bijwerken van de nominatie.' }
		})
		expect(ContentService.updateContent).not.toHaveBeenCalled()
	})

	it('returns 400 when title is empty after trim', async () => {
		// Arrange: whitespace-only title.
		const event = createActionEvent({ fields: { title: '   ' } })

		// Act: submit the edit form.
		const result = await actions.default(event)

		// Assert: validation error surfaces and no update is attempted.
		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een titel in.' }
		})
		expect(ContentService.updateContent).not.toHaveBeenCalled()
	})

	it('updates nomination without touching profile_picture or event_id when unchanged', async () => {
		// Arrange: current nomination already references evt-1 via junction-1; submit same event.
		// Why: untouched fields should not ship a file id or junction diff.
		mockCurrentNominationFetch({ eventId: 'evt-1', junctionId: 'junction-1' })
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'nom-789' })

		const event = createActionEvent()

		// Act: submit the edit form without a new picture.
		const result = await actions.default(event)

		// Assert: update skips picture and event_id diff.
		expect(result).toEqual({
			success: true,
			message: 'Nominatie succesvol bijgewerkt.',
			nominationId: 'nom-789'
		})
		expect(ContentService.postFile).not.toHaveBeenCalled()
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
		const updatePayload = ContentService.updateContent.mock.calls[0][1]
		expect(updatePayload).not.toHaveProperty('profile_picture')
		expect(updatePayload).not.toHaveProperty('event_id')
		expect(updatePayload).toMatchObject({
			title: 'Bijgewerkte nominatie',
			header: 'Winnaar',
			previous_course: 'MBO ICT'
		})
	})

	it('sends junction diff when event selection changes', async () => {
		// Arrange: current event is evt-1; the user selects evt-2.
		// Why: M2M relations require deleting old junction rows and creating a new one.
		mockCurrentNominationFetch({ eventId: 'evt-1', junctionId: 'junction-1' })
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'nom-789' })

		const event = createActionEvent({ fields: { event_id: 'evt-2' } })

		// Act: submit with a different event selection.
		await actions.default(event)

		// Assert: payload contains create + delete entries for the junction table.
		const updatePayload = ContentService.updateContent.mock.calls[0][1]
		expect(updatePayload.event_id).toEqual({
			create: [{ adconnect_events_id: 'evt-2' }],
			delete: ['junction-1']
		})
	})

	it('uploads new profile picture, swaps file id, and deletes old file on success', async () => {
		// Arrange: current nomination has an existing picture; the user uploads a new one.
		// Why: the edit flow should replace the file and clean up the old asset best-effort.
		mockCurrentNominationFetch({ eventId: 'evt-1', junctionId: 'junction-1' })
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-new' })
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'nom-789' })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		const event = createActionEvent({
			fields: {
				profile_picture: new File(['new'], 'nieuw.png', { type: 'image/png' }),
				currentProfilePictureId: 'img-old'
			}
		})

		// Act: submit the edit form with the new image.
		await actions.default(event)

		// Assert: new id ends up in the payload and old file is deleted.
		const updatePayload = ContentService.updateContent.mock.calls[0][1]
		expect(updatePayload.profile_picture).toBe('img-new')
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-old', 'token-123')
	})

	it('rolls back the new file when updateContent fails', async () => {
		// Arrange: new upload succeeds but the content update returns failure.
		// Why: orphaned files should be cleaned up so the file library stays tidy.
		mockCurrentNominationFetch({ eventId: 'evt-1', junctionId: 'junction-1' })
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-new' })
		ContentService.updateContent.mockResolvedValue({ success: false })
		ContentService.deleteFile.mockResolvedValue({ success: true })

		const event = createActionEvent({
			fields: {
				profile_picture: new File(['new'], 'nieuw.png', { type: 'image/png' }),
				currentProfilePictureId: 'img-old'
			}
		})

		// Act: submit the edit form.
		const result = await actions.default(event)

		// Assert: rollback deletes the just-uploaded file, not the original.
		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het bijwerken van de nominatie.' }
		})
		expect(ContentService.deleteFile).toHaveBeenCalledWith('img-new', 'token-123')
		expect(ContentService.deleteFile).not.toHaveBeenCalledWith('img-old', 'token-123')
	})

	it('ignores publish submitAction in edit route', async () => {
		// Arrange: publish button submit value.
		mockCurrentNominationFetch()
		ContentService.updateContent.mockResolvedValue({ success: true, id: 'nom-789' })

		const event = createActionEvent({ fields: { submitAction: 'publish' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: update still succeeds but no publish side effects are triggered.
		expect(result).toEqual({
			success: true,
			message: 'Nominatie succesvol bijgewerkt.',
			nominationId: 'nom-789'
		})
	})

	it('echoes submitted field values back inside the failure payload', async () => {
		// Arrange: trigger a validation failure on the alumnus field.
		const event = createActionEvent({ fields: { alumnus: '   ' } })

		// Act: submit the form.
		const result = await actions.default(event)

		// Assert: other submitted values are echoed so the UI can restore them.
		expect(result.data).toMatchObject({
			title: 'Bijgewerkte nominatie',
			course: 'Software Development'
		})
	})
})
