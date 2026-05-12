import { AuthService } from '$lib/server/authService'

export async function handle({ event, resolve }) {
	if (process.env.E2E_TEST_MODE === '1') {
		const sessionState = event.cookies.get('e2e_admin_session')
		event.locals.user = sessionState === 'active' ? { data: { id: 'e2e-admin', role: 'administrator' } } : null
		return resolve(event)
	}

	const accessToken = event.cookies.get('access_token')
	const refreshToken = event.cookies.get('refresh_token')

	if (accessToken) {
		event.locals.user = await AuthService.getUser(accessToken)
	}

	if (!event.locals.user && refreshToken) {
		event.locals.user = await AuthService.refreshSession(event.cookies, refreshToken)
	}

	event.locals.gateAuthenticated = event.cookies.get('gate_authenticated') === 'true'

	return resolve(event)
}
