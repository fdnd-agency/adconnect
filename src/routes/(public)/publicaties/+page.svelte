<script>
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import DocumentCard from '$lib/molecules/DocumentCard.svelte'

	// Import images
	import { publicatie } from '$lib'

	// Import components
	import { Hero, RFilterButtons, RCardPublicaties } from '$lib'

	const { data } = $props()

	const documents = $derived(data.documents)
	const selectedCategory = $derived(data.selectedCategory)
	const categories = $derived(data.categories)

</script>

<svelte:head>
	<title>Documenten | Overlegplatform Associate Degrees</title>
</svelte:head>

<Hero
	title="Publicaties"
	description="Hier zijn alle publicaties over Associate degrees te vinden, van onderzoeken en richtlijnen tot praktijkvoorbeelden. Blijf op de hoogte van ontwikkelingen en best practices binnen het Ad-onderwijs."
>
	<img
		class="hero-image"
		src={publicatie}
		alt=""
		fetchpriority="high"
	/>
</Hero>

<RFilterButtons {categories} {selectedCategory} {documents}/>

<div class="section-documents">

	<div class="documents-container">
		<ul>
			{#each documents as document (document.id)}
				<li><RCardPublicaties {document} /></li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.section-documents {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 90%;
		padding: 3em 0;
		margin: auto;

		@media (min-width: 768px) {
			padding: 5em 0;
			max-width: 1400px;
		}
	}

	.documents-container {
		container-type: inline-size;
		container-name: docs-container;
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	ul li {
		list-style-type: none;
	}

	@container docs-container (min-width: 720px) {
		ul {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(22em, 1fr));
			gap: 1em;
		}
	}
</style>
