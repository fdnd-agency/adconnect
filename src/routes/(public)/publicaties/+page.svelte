<script>
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import DocumentCard from '$lib/molecules/DocumentCard.svelte'

	// Import images
	import { publicatie } from '$lib'

	// Import components
	import { Hero } from '$lib'
	import { RSectionHero, RFilterButtons, RCardPublicaties, RSectionFilter } from '$lib'

	const { data } = $props()

	const documents = $derived(data.documents)
	const selectedCategory = $derived(data.selectedCategory)
	const categories = $derived(data.categories)
</script>

<svelte:head>
	<title>Documenten | Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={{
		title: 'Publicaties',
		description:
			'Hier zijn alle publicaties over Associate degrees te vinden, van onderzoeken en richtlijnen tot praktijkvoorbeelden. Blijf op de hoogte van ontwikkelingen en best practices binnen het Ad-onderwijs.'
	}}
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
