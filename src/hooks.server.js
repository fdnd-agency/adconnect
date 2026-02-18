import { AuthService } from '$lib/server/auth.js'

export async function handle({ event, resolve }) {
	const accessToken = event.cookies.get('access_token')
	const refreshToken = event.cookies.get('refresh_token')

	if (accessToken) {
		event.locals.user = await AuthService.getUser(accessToken)
	}

	if (!event.locals.user && refreshToken) {
		event.locals.user = await AuthService.refreshSession(event.cookies, refreshToken)
	}

	return resolve(event)
}
