<script>
	import { Nieuwshero, RNewsGridContainer } from '$lib'
	import { RSectionHero } from '$lib'

	const { data } = $props()
</script>

<svelte:head>
	<title>Nieuws | Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={{
		title: 'Nieuws',
		description: 'Op deze pagina vind je updates en korte verslagen van georganiseerde evenementen.'
	}}
	picture={{
		isEnhanced: true,
		src: Nieuwshero,
		alt: '',
		fetchpriority: 'high',
		loading: 'eager'
	}}
/>

<RNewsGridContainer
	sectionInfo={{ title: 'Laatste nieuws' }}
	newsItems={data.latest3}
/>

<RNewsGridContainer
	sectionInfo={{
		title: 'Alle nieuws',
		totalArticles: data.news.length
	}}
	newsItems={data.news}
	itemsPerPage={9}
/>
