<script>
	import { RSectionHero, RDetailsOverOns, RSectionThemes, Rseparator } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'

	const props = $props()
	const data = $derived(props.data)

	const theme = $derived(Array.isArray(data.theme) ? data.theme[0] : data.theme)
	const themes = $derived(data.themes ?? [])

	const visibleThemes = $derived(themes.length ? themes : Array.isArray(data.theme) ? data.theme : [])
</script>

<svelte:head>
	<title>{theme?.title} | Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={{ title: theme?.title, description: theme?.description }}
	picture={{
		isEnhanced: true,
		src: `${DIRECTUS_URL}/assets/${theme?.hero}`,
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
	sectionInfo={{ title: "Bekijk ook andere thema's" }}
	themes={visibleThemes.slice(0, 3)}
	backgroundBlue
/>
