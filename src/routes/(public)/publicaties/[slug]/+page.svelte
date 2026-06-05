<script>
	import { RSectionHero, RDetailsPublicaties } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'

	const props = $props()
	const data = $derived(props.data)
</script>

<svelte:head>
	<title>Documenten | Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={{ title: data.document.title }}
	picture={{
		isEnhanced: true,
		src: `${DIRECTUS_URL}/assets/${data.document.hero_image}?format=webp`,
		alt: data.document.title,
		width: '300',
		height: '210',
		fetchpriority: 'high',
		loading: 'eager'
	}}
/>

<RDetailsPublicaties {data} />
