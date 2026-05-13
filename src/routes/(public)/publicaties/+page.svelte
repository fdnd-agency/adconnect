<script>
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import DocumentCard from '$lib/molecules/DocumentCard.svelte'

	// Import images
	import { publicatie } from '$lib'

	// Import components
	import { Hero } from '$lib'

	// Haal data op uit page.server.js via props
	const { data } = $props()
	let documents = $state(data.documents)
	let categories = $state(data.categories)
	let selectedCategory = $state(data.selectedCategory)

	// Effect om de state te synchroniseren als props veranderen
	$effect(() => {
		documents = data.documents
		categories = data.categories
		selectedCategory = data.selectedCategory
	})

	// Update selectedCategory en URL bij wijziging
	function handleChange(event) {
		const { value } = event.target
		selectedCategory = value

		const url = new URL($page.url)
		url.searchParams.set('category', value)
		goto(url.toString(), { replaceState: true })
	}
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

<div class="filter-buttons">
	<p>Filter op categorie:</p>
	<div class="filter">
		<a
			href="?category=alle-publicaties"
			class="button-outline-blue {selectedCategory === 'alle-publicaties' ? 'active' : ''}"
			data-sveltekit-noscroll
		>
			Alle publicaties</a
		>

		{#each categories as categorie (categorie.id)}
			<a
				href={`?category=${categorie.title.toLowerCase()}`}
				data-sveltekit-noscroll
				class="button-outline-blue {selectedCategory.toLowerCase() === categorie.title.toLowerCase() ? 'active' : ''}">{categorie.title}
				
			</a>
		{/each}
	</div>
</div>

<div class="section-documents">
	<div class="filter-info">
		<p>Categorie: {selectedCategory}</p>
		<p>Aantal artikelen: {documents.length}</p>
	</div>
	<div class="documents-container">
		<ul>
			{#each documents as document (document.id)}
				<li><DocumentCard {document} /></li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.filter-buttons {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 1em;
		width: 90%;
		padding: 3em 0 0 0;
		margin: auto;

		@media (min-width: 768px) {
			padding: 5em 0 0 0;
			max-width: 1400px;
		}

		.filter {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			gap: 1em;
		}
	}

	.button-outline-blue.active {
		background-color: var(--primary-blue);
		color: white;
	}

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

		.filter-info {
			display: flex;
			gap: 1.5em;
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
