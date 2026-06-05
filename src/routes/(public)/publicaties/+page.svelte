<script>
	// Import images
	import { publicatie } from '$lib'

	// Import components
	import { RSectionHero, RSectionFilter } from '$lib'

	const props = $props()
	const data = $derived(props.data)
	const documents = $derived(data.documents)
	const categories = $derived(data.categories)
	const selectedCategory = $derived(data.selectedCategory)
	const publicationsPage = $derived(data.publicationsPage ?? {})
</script>

<svelte:head>
	<title>Documenten | Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={{ title: publicationsPage.hero_heading, description: publicationsPage.hero_body }}
	picture={{
		isEnhanced: true,
		src: publicatie,
		alt: '',
		fetchpriority: 'high'
	}}
/>

<RSectionFilter
	filterResults={documents}
	filterCategories={categories}
	{selectedCategory}
/>
