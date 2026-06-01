<script>
	import { RFilterButtons, RCardPublicaties } from '$lib'
	// import { IconDots } from '$lib/icons'

	const { documents, categories, selectedCategory } = $props()
</script>

<RFilterButtons
	{categories}
	{selectedCategory}
	{documents}
/>

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
