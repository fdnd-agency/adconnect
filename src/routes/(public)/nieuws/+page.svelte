<script>
	import { Nieuwshero, NewsGridContainer, SectionHero } from '$lib'

	const props = $props()
	const data = $derived(props.data)
	const newsPage = $derived(data.newsPage ?? {})
</script>

<svelte:head>
	<title>Nieuws | Overlegplatform Associate Degrees</title>
</svelte:head>

<SectionHero
	sectionInfo={{ title: newsPage.hero_heading, description: newsPage.hero_body }}
	picture={{
		isEnhanced: true,
		src: Nieuwshero,
		alt: '',
		fetchpriority: 'high',
		loading: 'eager'
	}}
/>

<NewsGridContainer
	sectionInfo={{ title: 'Laatste nieuws' }}
	newsItems={data.latest3}
/>

<NewsGridContainer
	sectionInfo={{
		title: 'Alle nieuws',
		totalArticles: data.news.length
	}}
	newsItems={data.news}
	itemsPerPage={9}
/>
