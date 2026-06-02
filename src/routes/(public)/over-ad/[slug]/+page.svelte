<script>
	import { RSectionHero, RDetailsOverOns, RSectionThemes, Rseparator } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'

	const { data } = $props()
	const theme = $derived(data.theme)
	const themes = $derived(data.themes)

	const visibleThemes = $derived(themes.length ? themes : [data])
	// console.log(theme.description)
</script>

<RSectionHero
	sectionInfo={{ title: theme.title, description: theme.description }}
	picture={{
		isEnhanced: true,
		src: `${DIRECTUS_URL}/assets/${theme.hero}`,
		alt: '',
		width: '300',
		height: '210',
		fetchpriority: 'high',
		loading: 'eager'
	}}
/>

<RDetailsOverOns documentData={theme} />

<Rseparator />

<RSectionThemes
	sectionInfo={{
		title: "Bekijk ook andere thema's"
	}}
	themes={visibleThemes.slice(0, 3)}
	backgroundBlue
/>
