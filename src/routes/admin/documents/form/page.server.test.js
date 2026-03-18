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
		const cookies = { get: vi.fn().mockReturnValue('token-123') }

		// Act: execute the load function.
		const result = await load({ cookies })

		// Assert: load asks for categories with the provided token.
		expect(ContentService.fetchContent).toHaveBeenCalledWith('categories', 'token-123')
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
		const cookies = { get: vi.fn().mockReturnValue('token-123') }

		// Act: execute the load function.
		const result = await load({ cookies })

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
		const cookies = { get: vi.fn().mockReturnValue('token-123') }

		// Act: execute the load function.
		const result = await load({ cookies })

		// Assert: categories fall back to an empty array and no load error is shown.
		expect(result.categories).toEqual([])
		expect(result.loadError).toBeNull()
	})
})

describe('admin documents form actions.default', () => {
	it('returns 403 when access token is missing', async () => {
		// Arrange: provide valid form values but no access token cookie.
		// Why: content creation must be blocked for unauthorized requests.
		const formData = createFormData({
			title: 'Mijn document',
			description: 'Korte beschrijving',
			date: '2026-03-18',
			category: 'cat-1',
			image: new File(['image-bytes'], 'cover.png', { type: 'image/png' }),
			source_file: new File(['pdf-bytes'], 'source.pdf', { type: 'application/pdf' }),
			submitAction: 'save'
		})

		const event = {
			request: {
				formData: vi.fn().mockResolvedValue(formData)
			},
			cookies: {
				get: vi.fn().mockReturnValue(undefined)
			}
		}

		// Act: execute the default action.
		const result = await actions.default(event)

		// Assert: action returns 403 fail payload with generic create error message.
		expect(result).toMatchObject({
			status: 403,
			data: { error: 'Er is iets misgegaan bij het opslaan van het document.' }
		})
		// Assert: no mutation calls happen when request is unauthorized.
		expect(ContentService.postFile).not.toHaveBeenCalled()
		expect(ContentService.postContent).not.toHaveBeenCalled()
		expect(ContentService.publishContent).not.toHaveBeenCalled()
	})
})
