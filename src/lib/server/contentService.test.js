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
