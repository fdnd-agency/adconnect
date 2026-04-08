import { beforeEach, describe, expect, it, vi } from 'vitest'
import { load } from './[type]/[id]/+page.server.js'
import { ContentService } from '$lib/server/contentService'

vi.mock('$lib/server/contentService', () => ({
	ContentService: {
		fetchContent: vi.fn()
	}
}))

describe('preview load', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns draft data using an authenticated admin session', async () => {
		ContentService.fetchContent.mockResolvedValue({
			data: {
				news: [
					{
						uuid: 'draft-1',
						title: 'Concept nieuws',
						status: 'draft'
					}
				]
			},
			errors: []
		})

		const result = await load({
			params: { type: 'news', id: 'draft-1' },
			locals: { user: { data: { id: 'admin-1' } } },
			cookies: { get: vi.fn().mockReturnValue('token-123') }
		})

		expect(ContentService.fetchContent).toHaveBeenCalledWith('news', 'draft-1', null, null, false, 'token-123')
		expect(result).toEqual({
			type: 'news',
			content: [
				{
					uuid: 'draft-1',
					title: 'Concept nieuws',
					status: 'draft'
				}
			],
			loadError: null
		})
	})
})
