<script>
	const { categories, selectedCategory } = $props()
</script>

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
				class="button-outline-blue {selectedCategory.toLowerCase() === categorie.title.toLowerCase() ? 'active' : ''}"
				>{categorie.title}
			</a>
		{/each}
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
</style>
