import { AuthService } from '$lib/server/authService.js'
import { redirect, fail } from '@sveltejs/kit'

export async function load({ locals }) {
	if (locals.user) throw redirect(303, '/admin')
}

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData()
		const email = form.get('email')
		const password = form.get('password')
		const result = await AuthService.login(email, password, cookies)

		if (!result.success) return fail(401, { error: result.error })
		throw redirect(303, '/admin')
	}
}
