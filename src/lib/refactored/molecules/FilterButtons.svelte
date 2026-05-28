<script>
	const { categories, selectedCategory, documents } = $props()

	const normalized = $derived(selectedCategory?.toLowerCase() ?? '')
</script>

<form
	class="category-filter"
	method="GET"
	data-sveltekit-noscroll
>
	<p
		id="filter-label"
		class="category-filter__label"
	>
		Filter op categorie:
	</p>
	<ul
		class="category-filter__list"
		aria-labelledby="filter-label"
	>
		<li class="category-filter__item">
			<button
				type="submit"
				name="category"
				value="alle-publicaties"
				class="button-outline-blue"
				aria-current={normalized === 'alle-publicaties' ? 'true' : undefined}
			>
				Alle publicaties
			</button>
		</li>

		{#each categories as categorie (categorie.id)}
			<li class="category-filter__item">
				<button
					type="submit"
					name="category"
					value={categorie.title.toLowerCase()}
					class="button-outline-blue"
					aria-current={normalized === categorie.title.toLowerCase() ? 'true' : undefined}
				>
					{categorie.title}
				</button>
			</li>
		{/each}
	</ul>
</form>

<div class="filter-info">
	<p class="filter-info__category">Categorie: {selectedCategory}</p>
	<p class="filter-info__count">Aantal artikelen: {documents.length}</p>
</div>

<style>
	.category-filter {
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

		.category-filter__list {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			gap: 1em;
			list-style: none;
			margin: 0;
			padding: 0;

			.category-filter__item {
				font-family: var(--button-outline-font-family);
			}
		}
	}

	.filter-info {
		display: flex;
		gap: 1.5em;
		margin: 1em 0 0 12em;
	}

	.button-outline-blue {
		font: inherit;
		cursor: pointer;
	}

	.button-outline-blue[aria-current='true'] {
		background-color: var(--primary-blue);
		color: white;
	}
</style>
