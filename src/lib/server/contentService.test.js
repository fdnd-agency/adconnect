import fc from 'fast-check'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ContentService } from './contentService'

describe('ContentService property-based tests', () => {
	beforeEach(() => {
		vi.restoreAllMocks()
	})

	it('normalizes news items and deduplicates by uuid', async () => {
		const newsItemArb = fc.record({
			uuid: fc.string({ minLength: 1, maxLength: 32 }),
			id: fc.option(fc.string({ maxLength: 32 }), { nil: undefined }),
			title: fc.string({ maxLength: 120 }),
			description: fc.string({ maxLength: 240 })
		})

		await fc.assert(
			fc.asyncProperty(fc.array(newsItemArb, { maxLength: 30 }), async (items) => {
				globalThis.fetch = vi.fn().mockResolvedValue({
					ok: true,
					json: async () => ({ data: items })
				})

				const response = await ContentService.fetchContent('news', null, null, null, false, 'access-token')

				const normalized = items.map((item) => (item.id === undefined ? { ...item, id: item.uuid } : item))
				const expectedMap = new Map(normalized.map((item) => [item.uuid, item]))
				const expected = Array.from(expectedMap.values())

				expect(response.errors).toEqual([])
				expect(response.data.news).toEqual(expected)
			})
		)
	})

	it('returns a Map for category content when asMap=true with last-write wins by id', async () => {
		const categoryItemArb = fc.record({
			id: fc.oneof(fc.string({ minLength: 1, maxLength: 32 }), fc.integer()),
			name: fc.string({ maxLength: 80 })
		})

		await fc.assert(
			fc.asyncProperty(fc.array(categoryItemArb, { maxLength: 30 }), async (items) => {
				globalThis.fetch = vi.fn().mockResolvedValue({
					ok: true,
					json: async () => ({ data: items })
				})

				const response = await ContentService.fetchContent('categories', null, null, null, true, 'access-token')

				expect(response.errors).toEqual([])
				expect(response.data.categories).toBeInstanceOf(Map)

				const expected = new Map(items.map((item) => [item.id, item]))
				expect(Array.from(response.data.categories.entries())).toEqual(Array.from(expected.entries()))
			})
		)
	})

	it('rejects unknown content types for any non-whitelisted string', async () => {
		const knownTypes = new Set(['documents', 'categories', 'themes', 'events', 'cooperations', 'news', 'nominations', 'faqs'])

		await fc.assert(
			fc.asyncProperty(
				fc.string({ minLength: 1, maxLength: 30 }).filter((value) => !knownTypes.has(value)),
				async (unknownType) => {
					await expect(ContentService.fetchContent(unknownType)).rejects.toThrow(`Onbekend content type: '${unknownType}'`)
				}
			)
		)
	})

	it('rejects files whose mime type is outside allowedMimePrefixes', async () => {
		const disallowedMimeInputArb = fc
			.array(fc.constantFrom('image/', 'text/', 'audio/'), {
				minLength: 1,
				maxLength: 3,
				unique: true
			})
			.chain((prefixes) =>
				fc
					.string({ minLength: 1, maxLength: 30 })
					.filter((mimeType) => !prefixes.some((prefix) => mimeType.startsWith(prefix)))
					.map((mimeType) => ({ prefixes, mimeType }))
			)

		await fc.assert(
			fc.asyncProperty(disallowedMimeInputArb, async ({ prefixes, mimeType }) => {
				globalThis.fetch = vi.fn()
				const file = new File(['x'], 'example.bin', { type: mimeType })

				const result = await ContentService.postFile(file, 'access-token', {
					allowedMimePrefixes: prefixes,
					invalidTypeError: 'Invalid file type for this endpoint.'
				})

				expect(result.status).toBe(400)
				expect(result.data.error).toBe('Invalid file type for this endpoint.')
				expect(globalThis.fetch).not.toHaveBeenCalled()
			})
		)
	})
})

describe('ContentService.updateContent', () => {
	beforeEach(() => {
		vi.restoreAllMocks()
	})

	it('returns 400 when item id is missing', async () => {
		globalThis.fetch = vi.fn()

		const result = await ContentService.updateContent('', { title: 'Nieuwe titel' }, 'documents', 'access-token')

		expect(result.status).toBe(400)
		expect(result.data.error).toBe('Bijwerken mislukt: Geen item id.')
		expect(globalThis.fetch).not.toHaveBeenCalled()
	})

	it('patches content and returns updated item id', async () => {
		globalThis.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({ data: { id: 'doc-1' } })
		})

		const result = await ContentService.updateContent('doc-1', { title: 'Nieuwe titel' }, 'documents', 'access-token')

		expect(globalThis.fetch).toHaveBeenCalledWith(
			expect.stringContaining('/items/adconnect_documents/doc-1'),
			expect.objectContaining({
				method: 'PATCH',
				headers: expect.objectContaining({
					'Content-Type': 'application/json',
					Authorization: 'Bearer access-token'
				}),
				body: JSON.stringify({ title: 'Nieuwe titel' })
			})
		)
		expect(result).toEqual({ success: true, id: 'doc-1' })
	})

	it('falls back to input id when Directus response does not include primary key', async () => {
		globalThis.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({ data: {} })
		})

		const result = await ContentService.updateContent('news-uuid-1', { title: 'Nieuws' }, 'news', 'access-token')

		expect(result).toEqual({ success: true, id: 'news-uuid-1' })
	})

	it('returns parsed Directus error message when update fails', async () => {
		globalThis.fetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 400,
			json: async () => ({
				errors: [{ message: 'Value for slug has to be unique.' }]
			})
		})

		const result = await ContentService.updateContent('doc-1', { slug: 'test' }, 'documents', 'access-token')

		expect(result.status).toBe(400)
		expect(result.data.error).toBe('Value for slug has to be unique.')
	})

	it('returns fallback message when failed update response cannot be parsed as json', async () => {
		globalThis.fetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 502,
			json: async () => {
				throw new Error('Invalid JSON')
			}
		})

		const result = await ContentService.updateContent('doc-1', { title: 'Nieuwe titel' }, 'documents', 'access-token')

		expect(result.status).toBe(502)
		expect(result.data.error).toBe('Bijwerken mislukt (502).')
	})

	it('returns 500 when update request throws unexpectedly', async () => {
		globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network down'))

		const result = await ContentService.updateContent('doc-1', { title: 'Nieuwe titel' }, 'documents', 'access-token')

		expect(result.status).toBe(500)
		expect(result.data.error).toBe('Bijwerken mislukt.')
	})
})
