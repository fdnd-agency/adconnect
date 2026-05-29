<script lang="ts">
	import { onMount } from 'svelte'

	const { categories, selectedCategory, documents } = $props()
	const normalized = $derived(selectedCategory?.toLowerCase() ?? '')

	onMount(() => {
		document.querySelector('.category-filter__list')?.addEventListener('change', (e) => {
			const target = e.target as HTMLInputElement

			target.form?.requestSubmit()
		})
	})
</script>

{#snippet categoryRadio(categorie)}
	<label class="button-outline-blue category-filter__button">
		<input
			class="visually-hidden"
			type="radio"
			name="category"
			value={categorie.value}
			checked={normalized === categorie.value}
		/>
		<span>{categorie.label}</span>
	</label>
{/snippet}

<section class="filter-section">
	<form
		class="category-filter"
		method="GET"
		data-sveltekit-noscroll
	>
		<fieldset class="category-filter__group">
			<legend class="category-filter__label">Filter op categorie:</legend>

			<ul class="category-filter__list">
				<li class="category-filter__item">
					{@render categoryRadio({ value: 'alle-publicaties', label: 'Alle publicaties' })}
				</li>

				{#each categories as categorie (categorie.id)}
					<li class="category-filter__item">
						{@render categoryRadio({ value: categorie.title.toLowerCase(), label: categorie.title })}
					</li>
				{/each}
			</ul>

			<button
				id="submit"
				type="submit"
				class="button-outline-blue category-filter__submit"
			>
				Submit
			</button>
		</fieldset>
	</form>

	<div
		class="filter-info"
		aria-live="polite"
	>
		<p class="filter-info__category">Categorie: {selectedCategory}</p>
		<p class="filter-info__count">Aantal artikelen: {documents.length}</p>
	</div>
</section>

<noscript>
	<style>
		#submit {
			display: block !important;
		}
	</style>
</noscript>

<style>
	#submit {
		display: none;
	}

	.filter-section {
		display: flex;
		flex-direction: column;
	}

	.category-filter {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 1em;
		padding: 3em 0 0 0;

		.category-filter__group {
			border: none;
			display: flex;
			flex-direction: column;
			gap: 1em;
		}

		.category-filter__label {
			margin-bottom: 1em;
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

		.category-filter__button {
			display: block;

			&:has(input:checked) {
				background-color: var(--primary-blue);
			}
		}
	}

	.filter-info {
		display: flex;
		gap: 1.5em;
	}
</style>
