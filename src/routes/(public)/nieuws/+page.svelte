<script>
	import { Nieuwshero, RNewsGridContainer, RSectionHero } from '$lib'

	const props = $props()
	const data = $derived(props.data)
	const newsPage = $derived(data.newsPage ?? {})
</script>

<svelte:head>
	<title>Nieuws | Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={{ title: newsPage.hero_heading, description: newsPage.hero_body }}
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
