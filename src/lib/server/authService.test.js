import fc from 'fast-check'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { AuthService } from './authService'

function createCookiesMock({ accessToken = 'access', refreshToken = 'refresh' } = {}) {
	return {
		set: vi.fn(),
		delete: vi.fn(),
		get: vi.fn((name) => {
			if (name === 'access_token') return accessToken
			if (name === 'refresh_token') return refreshToken
			return undefined
		})
	}
}

describe('AuthService property-based tests', () => {
	beforeEach(() => {
		vi.restoreAllMocks()
	})

	afterEach(() => {
		// Flush internal cache so tests remain isolated across property runs.
		const nowSpy = vi.spyOn(Date, 'now').mockReturnValue(Number.MAX_SAFE_INTEGER)
		AuthService.pruneCache()
		nowSpy.mockRestore()
	})

	it('login sets both cookies when credentials are accepted', async () => {
		await fc.assert(
			fc.asyncProperty(
				fc.emailAddress(),
				fc.string({ minLength: 1, maxLength: 40 }),
				fc.string({ minLength: 1, maxLength: 40 }),
				fc.string({ minLength: 1, maxLength: 40 }),
				async (email, password, accessToken, refreshToken) => {
					const cookies = createCookiesMock()
					globalThis.fetch = vi.fn().mockResolvedValue({
						ok: true,
						json: async () => ({ data: { access_token: accessToken, refresh_token: refreshToken } })
					})

					const result = await AuthService.login(email, password, cookies)

					expect(result).toEqual({ success: true })
					expect(globalThis.fetch).toHaveBeenCalledTimes(1)
					const [, fetchOptions] = globalThis.fetch.mock.calls[0]
					expect(fetchOptions.method).toBe('POST')
					expect(JSON.parse(fetchOptions.body)).toEqual({ email, password })

					expect(cookies.set).toHaveBeenCalledWith('access_token', accessToken, expect.objectContaining({ path: '/', httpOnly: true, sameSite: 'lax', maxAge: 60 * 15 }))
					expect(cookies.set).toHaveBeenCalledWith('refresh_token', refreshToken, expect.objectContaining({ path: '/', httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 7 }))
				}
			)
		)
	})

	it('getUser caches successful responses per token until TTL expires', async () => {
		await fc.assert(
			fc.asyncProperty(fc.uuid(), fc.uuid(), async (accessToken, userId) => {
				const nowSpy = vi.spyOn(Date, 'now').mockReturnValue(1_000)
				const userPayload = { data: { id: userId } }
				globalThis.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => userPayload })

				const first = await AuthService.getUser(accessToken)
				const second = await AuthService.getUser(accessToken)

				expect(first).toEqual(userPayload)
				expect(second).toEqual(userPayload)
				expect(globalThis.fetch).toHaveBeenCalledTimes(1)
				nowSpy.mockRestore()
			})
		)
	})

	it('refreshSession writes refreshed cookies and returns fetched user', async () => {
		await fc.assert(
			fc.asyncProperty(fc.uuid(), fc.uuid(), fc.uuid(), async (incomingRefresh, newAccess, newRefresh) => {
				const cookies = createCookiesMock({ refreshToken: incomingRefresh })
				const userPayload = { data: { id: `user-${newAccess}` } }
				globalThis.fetch = vi
					.fn()
					.mockResolvedValueOnce({
						ok: true,
						json: async () => ({ data: { access_token: newAccess, refresh_token: newRefresh } })
					})
					.mockResolvedValueOnce({ ok: true, json: async () => userPayload })

				const result = await AuthService.refreshSession(cookies, incomingRefresh)

				expect(globalThis.fetch).toHaveBeenCalledTimes(2)
				expect(cookies.set).toHaveBeenCalledWith('access_token', newAccess, expect.objectContaining({ path: '/', httpOnly: true, sameSite: 'lax', maxAge: 60 * 15 }))
				expect(cookies.set).toHaveBeenCalledWith('refresh_token', newRefresh, expect.objectContaining({ path: '/', httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 7 }))
				expect(result).toEqual(userPayload)
			})
		)
	})

	it('logout always clears auth cookies, even if network logout fails', async () => {
		await fc.assert(
			fc.asyncProperty(fc.uuid(), fc.uuid(), async (accessToken, refreshToken) => {
				const cookies = createCookiesMock({ accessToken, refreshToken })
				const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
				globalThis.fetch = vi.fn().mockRejectedValue(new Error('network down'))

				await expect(AuthService.logout(cookies)).resolves.toBeUndefined()

				expect(cookies.delete).toHaveBeenCalledWith('access_token', { path: '/' })
				expect(cookies.delete).toHaveBeenCalledWith('refresh_token', { path: '/' })
				expect(consoleSpy).toHaveBeenCalled()
				consoleSpy.mockRestore()
			})
		)
	})
})
