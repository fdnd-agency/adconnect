import { redirect } from '@sveltejs/kit'
import { AuthService } from '$lib/server/authService.js'

export async function load({ cookies }) {
	const refreshToken = cookies.get('refresh_token')

	if (refreshToken) {
		AuthService.logout(refreshToken, cookies)
	}

	throw redirect(303, '/admin/login')
}
