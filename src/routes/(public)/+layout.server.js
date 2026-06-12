import { ContentService } from '$lib/server/contentService.js'

const MAX_FOOTER_THEMES = 5
const NAV_BUTTON_FIELDS = 'id,nav_button_text,nav_button_url'

export async function load({ cookies, url }) {
	const isAuthenticated = cookies.get('gate_authenticated') === 'true'
	const gateError = url.searchParams.get('gateError') === '1'

	let themaLinks = []
	let navButton = {}
	if (isAuthenticated) {
		const [themesResponse, navButtonResponse] = await Promise.all([
			ContentService.fetchContent('themes', null, 'id,title,slug', null, false),
			ContentService.fetchContent('navButton', null, NAV_BUTTON_FIELDS, null, false)
		])

		themaLinks = (themesResponse.data.themes ?? []).slice(0, MAX_FOOTER_THEMES).map((theme) => ({
			label: theme.title,
			href: `/over-ad/${theme.slug}`
		}))
		navButton = navButtonResponse.data.navButton?.[0] ?? {}
	}

	return { isAuthenticated, gateError, themaLinks, navButton }
}
