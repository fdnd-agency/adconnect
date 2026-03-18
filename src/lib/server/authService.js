import { DIRECTUS_URL } from '$lib/server/directus.js'

export class AuthService {
	static #cache = new Map()
	static #CACHE_TTL = 5 * 60 * 1000 // 5 minutes

	static async login(email, password, cookies) {
		const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		})
		if (!res.ok) return { success: false, error: 'Invalid credentials' }

		const { data } = await res.json()
		cookies.set('access_token', data.access_token, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 15
		})
		cookies.set('refresh_token', data.refresh_token, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7
		})

		return { success: true }
	}

	static async logout(refreshToken, cookies) {
		// Tell Directus to invalidate the refresh token
		await fetch(`${DIRECTUS_URL}/auth/logout`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh_token: refreshToken })
		}).catch((error) => {
			console.error('Failed to log out from Directus:', error)
		})

		cookies.delete('access_token', { path: '/' })
		cookies.delete('refresh_token', { path: '/' })
	}

	/**
	 * Fetches user data, returning cached result if available.
	 * @param {string} accessToken
	 * @returns {Promise<object | null>}
	 */
	static async getUser(accessToken) {
		const cached = this.#cache.get(accessToken)
		if (cached && cached.expiresAt > Date.now()) {
			return cached.data
		}

		const res = await fetch(`${DIRECTUS_URL}/users/me`, {
			headers: { Authorization: `Bearer ${accessToken}` }
		})
		if (!res.ok) return null

		const data = await res.json()
		this.#cache.set(accessToken, { data, expiresAt: Date.now() + this.#CACHE_TTL })
		return data
	}

	/**
	 * Refreshes the session using a refresh token.
	 * @param {import('@sveltejs/kit').Cookies} cookies
	 * @param {string} refreshToken
	 * @returns {Promise<object | null>} The user data, or null if refresh failed.
	 */
	static async refreshSession(cookies, refreshToken) {
		const res = await fetch(`${DIRECTUS_URL}/auth/refresh`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh_token: refreshToken, mode: 'json' })
		})
		if (!res.ok) return null

		const { data } = await res.json()

		cookies.set('access_token', data.access_token, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 60 * 15
		})
		cookies.set('refresh_token', data.refresh_token, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7
		})

		return this.getUser(data.access_token)
	}

	/** Clears expired entries from the cache. */
	static pruneCache() {
		const now = Date.now()
		for (const [key, value] of this.#cache) {
			if (value.expiresAt <= now) this.#cache.delete(key)
		}
	}
}

setInterval(() => AuthService.pruneCache(), 10 * 60 * 1000).unref()
