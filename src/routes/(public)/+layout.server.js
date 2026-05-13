export async function load({ cookies, url }) {
	const isAuthenticated = cookies.get('gate_authenticated') === 'true'
	const gateError = url.searchParams.get('gateError') === '1'

	return { isAuthenticated, gateError }
}
