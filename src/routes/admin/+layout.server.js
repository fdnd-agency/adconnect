import { redirect } from '@sveltejs/kit'

export function load({ locals, url }) {
	if (!locals.user && !url.pathname.startsWith('/admin/login')) {
		throw redirect(303, '/admin/login')
	}
	return { user: locals.user?.data ?? null }
}
