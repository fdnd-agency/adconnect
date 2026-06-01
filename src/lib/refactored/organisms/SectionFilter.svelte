<script>
	import { RFilterButtons, RCardPublicaties } from '$lib'

	const { filterResults, filterCategories, selectedCategory } = $props()
</script>

<div class="section-documents">
	<RFilterButtons
		{filterCategories}
		selectedCategory={selectedCategory}
		documents={filterResults}
	/>

	<div class="section-documents__container">
		<ul class="section-documents__list">
			{#each filterResults as document (document.id)}
				<li class="section-documents__item"><RCardPublicaties {document} /></li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.section-documents {
		display: flex;
		flex-direction: column;
		gap: 5em;
		width: 90%;
		margin: auto;
		padding: 3em 0;

		@media (min-width: 768px) {
			max-width: 1400px;
			padding: 5em 0;
		}
	}

	.section-documents__container {
		container: documents / inline-size;
	}

	.section-documents__list {
		display: flex;
		flex-direction: column;
		gap: 1em;
		margin: 0;
		padding: 0;
		list-style: none;

		@container documents (min-width: 720px) {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(22em, 1fr));
		}
	}
</style>
