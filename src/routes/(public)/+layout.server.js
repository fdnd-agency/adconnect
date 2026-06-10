import { ContentService } from '$lib/server/contentService.js'

const MAX_FOOTER_THEMES = 5

export async function load({ cookies, url }) {
	const isAuthenticated = cookies.get('gate_authenticated') === 'true'
	const gateError = url.searchParams.get('gateError') === '1'

	let themaLinks = []
	if (isAuthenticated) {
		const { data } = await ContentService.fetchContent('themes', null, 'id,title,slug', null, false)
		themaLinks = (data.themes ?? []).slice(0, MAX_FOOTER_THEMES).map((theme) => ({
			label: theme.title,
			href: `/over-ad/${theme.slug}`
		}))
	}

	return { isAuthenticated, gateError, themaLinks }
}
