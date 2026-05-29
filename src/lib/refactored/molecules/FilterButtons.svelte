<script>
	const { categories, selectedCategory, documents } = $props()

	const normalized = $derived(selectedCategory?.toLowerCase() ?? '')
</script>

{#snippet categoryButton(categorie)}
	<button
		type="submit"
		name="category"
		value={categorie.value}
		class="button-outline-blue category-filter__button"
		aria-current={normalized === categorie.value ? 'true' : undefined}
	>
		{categorie.label}
	</button>
{/snippet}

<section>
	<form
		class="category-filter"
		method="GET"
		data-sveltekit-noscroll
	>
		<legend
			id="filter-label"
			class="category-filter__label"
		>
			Filter op categorie:
		</legend>

		<ul
			class="category-filter__list"
			aria-labelledby="filter-label"
		>
			<li class="category-filter__item">
				{@render categoryButton({ value: 'alle-publicaties', label: 'Alle publicaties' })}
			</li>

			{#each categories as categorie (categorie.id)}
				<li class="category-filter__item">
					{@render categoryButton({ value: categorie.title.toLowerCase(), label: categorie.title })}
				</li>
			{/each}
		</ul>
	</form>

	<div class="filter-info">
		<p class="filter-info__category">Categorie: {selectedCategory}</p>
		<p class="filter-info__count">Aantal artikelen: {documents.length}</p>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
	}

	.category-filter {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 1em;
		width: 90%;
		padding: 3em 0 0 0;
		margin: auto;

		/* @media (min-width: 768px) {
			padding: 5em 0 0 0;
			max-width: 1400px;
		} */

		.category-filter__label {
			font-family: var(--font-body);
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
				font-family: var(--font-body);
			}
		}
	}

	.filter-info {
		display: flex;
		gap: 1.5em;
		/* margin: 1em 0 0 12em; */
	}

	.category-filter__button[aria-current='true'] {
		background-color: var(--primary-blue);
	}
</style>
