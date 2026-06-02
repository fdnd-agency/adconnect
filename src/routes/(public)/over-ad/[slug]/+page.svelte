<script>
	import ThemeDetail from '$lib/organisms/ThemeDetail.svelte'

	import { RSectionHero } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'

	const { data } = $props()
	const theme = $derived(data.theme)
	const themes = $derived(data.themes)

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

<!-- <Hero
	title={theme.title}
	description={theme.description}
>
	<img
		class="hero-image"
		src={`${DIRECTUS_URL}/assets/${theme.hero}`}
		alt={theme.title}
		aria-hidden="true"
		fetchpriority="high"
	/>
</Hero> -->

<!-- <ThemeDetail
	data={data.theme}
	themes={data.themes}
/> -->
