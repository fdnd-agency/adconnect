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
		name: 'Bedrijf X',
		url: 'https://bedrijf-x.nl',
		logo: new File(['image-bytes'], 'logo.png', { type: 'image/png' }),
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

function mockSuccessfulUploadAndCreate({ logoId = 'img-123', cooperationId = 'coop-789' } = {}) {
	ContentService.postFile.mockResolvedValue({ success: true, id: logoId })
	ContentService.postContent.mockResolvedValue({ success: true, id: cooperationId })
}

describe('admin cooperations form actions.default', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns 403 when access token is missing', async () => {
		const event = createActionEvent({ accessToken: null })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 403,
			data: { error: 'Er is iets misgegaan bij het opslaan van de samenwerking.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when name is empty after trim', async () => {
		const event = createActionEvent({ fields: { name: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een naam in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when url is empty after trim', async () => {
		const event = createActionEvent({ fields: { url: '   ' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een URL in.' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when url does not match required http/https regex', async () => {
		const event = createActionEvent({ fields: { url: 'bedrijf-x.nl' } })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Vul een geldige URL in (http:// of https://).' }
		})
		expectNoMutationCalls()
	})

	it('returns 400 when logo file is zero-byte', async () => {
		const event = createActionEvent({
			fields: { logo: new File([], 'empty.png', { type: 'image/png' }) }
		})

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Upload een logo.' }
		})
		expectNoMutationCalls()
	})

	it('saves cooperation as draft and returns success payload', async () => {
		const event = createActionEvent()
		mockSuccessfulUploadAndCreate()

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Samenwerking succesvol opgeslagen als concept.',
			cooperationId: 'coop-789'
		})
		expect(ContentService.postFile).toHaveBeenCalledTimes(1)
		expect(ContentService.postContent).toHaveBeenCalledTimes(1)
		expect(ContentService.publishContent).not.toHaveBeenCalled()
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('uploads logo with expected folder and mime validation options', async () => {
		const event = createActionEvent()
		mockSuccessfulUploadAndCreate()

		await actions.default(event)

		expect(ContentService.postFile).toHaveBeenCalledWith(expect.any(File), 'token-123', {
			folderName: 'Adconnect',
			allowedMimePrefixes: ['image/'],
			invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
		})
	})

	it('sends expected payload to postContent including logo id and url', async () => {
		const event = createActionEvent({
			fields: {
				name: '  Bedrijf X  ',
				url: 'https://bedrijf-x.nl'
			}
		})
		mockSuccessfulUploadAndCreate({ logoId: 'img-999' })

		await actions.default(event)

		expect(ContentService.postContent).toHaveBeenCalledWith(
			{
				name: 'Bedrijf X',
				logo: 'img-999',
				url: 'https://bedrijf-x.nl',
				status: 'draft'
			},
			'cooperations',
			'token-123'
		)
	})

	it('publishes created cooperation when submitAction is publish', async () => {
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: true })

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Samenwerking succesvol opgeslagen en gepubliceerd.',
			cooperationId: 'coop-789'
		})
		expect(ContentService.publishContent).toHaveBeenCalledWith('coop-789', 'cooperations', 'token-123')
	})

	it('returns warning success payload when publish returns non-success', async () => {
		const event = createActionEvent({ fields: { submitAction: 'publish' } })
		mockSuccessfulUploadAndCreate()
		ContentService.publishContent.mockResolvedValue({ success: false })

		const result = await actions.default(event)

		expect(result).toEqual({
			success: true,
			message: 'Samenwerking opgeslagen als concept, maar publiceren is mislukt.',
			cooperationId: 'coop-789'
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
			message: 'Samenwerking opgeslagen als concept, maar publiceren is mislukt.',
			cooperationId: 'coop-789'
		})
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('returns 500 when logo upload fails', async () => {
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: false, error: 'Upload failed' })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 500,
			data: { error: 'Er is iets misgegaan bij het opslaan van de samenwerking.' }
		})
		expect(ContentService.postContent).not.toHaveBeenCalled()
		expect(ContentService.publishContent).not.toHaveBeenCalled()
		expect(ContentService.deleteFile).not.toHaveBeenCalled()
	})

	it('returns create failure details and rolls back uploaded logo when content creation fails', async () => {
		const event = createActionEvent()
		ContentService.postFile.mockResolvedValue({ success: true, id: 'img-123' })
		ContentService.postContent.mockResolvedValue({
			success: false,
			status: 400,
			data: { error: 'Aanmaken mislukt: Name must be unique.' }
		})
		ContentService.deleteFile.mockResolvedValue({ success: true })

		const result = await actions.default(event)

		expect(result).toMatchObject({
			status: 400,
			data: { error: 'Aanmaken mislukt: Name must be unique.' }
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
			message: 'Samenwerking succesvol opgeslagen als concept.',
			cooperationId: 'coop-789'
		})
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})
})
