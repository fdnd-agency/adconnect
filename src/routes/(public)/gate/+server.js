import { dev } from '$app/environment'
import { redirect } from '@sveltejs/kit'

const GATE_PASSWORD = 'adconnect2026'

const withGateError = (referer) => {
	if (!referer) {
		return '/?gateError=1'
	}

	try {
		const url = new URL(referer)
		url.searchParams.set('gateError', '1')
		return `${url.pathname}${url.search}`
	} catch {
		return '/?gateError=1'
	}
}

const getSafePath = (referer) => {
	if (!referer) {
		return '/'
	}

	try {
		return new URL(referer).pathname
	} catch {
		return '/'
	}
}

export async function POST({ request, cookies }) {
	const formData = await request.formData()
	const password = `${formData.get('password') ?? ''}`
	const referer = request.headers.get('referer')

	if (password === GATE_PASSWORD) {
		cookies.set('gate_authenticated', 'true', {
			path: '/',
			httpOnly: true,
			secure: !dev,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 30
		})

		const target = getSafePath(referer)
		throw redirect(303, target)
	}

	throw redirect(303, withGateError(referer))
}
