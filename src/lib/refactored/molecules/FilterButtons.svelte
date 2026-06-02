<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/state'

	const { filterCategories, selectedCategory, documents } = $props()

	const normalized = $derived(selectedCategory?.toLowerCase() ?? '')

	let lastValue = $state<string | null>(null)

	function selectCategory(value: string) {
		const url = new URL(page.url)
		url.searchParams.set('category', value)
		goto(url, { noScroll: true, keepFocus: true })
	}
</script>

{#snippet categoryRadio(category)}
	<label class="button-outline-blue category-filter__button">
		<input
			class="visually-hidden"
			type="radio"
			name="category"
			value={category.value}
			checked={normalized === category.value}
			onclick={() => selectCategory(category.value)}
		/>
		<span>{category.label}</span>
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
				<li>
					{@render categoryRadio({ value: 'alle-publicaties', label: 'Alle publicaties' })}
				</li>

				{#each filterCategories as category (category.id)}
					<li>
						{@render categoryRadio({ value: category.title.toLowerCase(), label: category.title })}
					</li>
				{/each}
			</ul>

			<button
				id="submit"
				type="submit"
				class="button-outline-blue"
			>
				Submit
			</button>
		</fieldset>
	</form>

	<div
		class="filter-info"
		aria-live="polite"
	>
		<p>Categorie: {selectedCategory}</p>
		<p>Aantal artikelen: {documents.length}</p>
	</div>
</section>

<!-- Only when JavaScript is disabled, use different styling for the button -->
<noscript>
	<style>
		#submit {
			/* Without !important you can't override the previous styling */
			display: block !important;
		}
	</style>
</noscript>

<style>
	.filter-section {
		display: flex;
		flex-direction: column;
	}

	.category-filter {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 1em;
		margin-bottom: 1em;

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
		}

		.category-filter__button {
			display: block;

			&:has(input:checked) {
				background-color: var(--primary-blue);
			}
		}
	}

	#submit {
		display: none;
	}

	.filter-info {
		display: flex;
		gap: 1.5em;

		p {
			text-wrap: balance;
		}
	}
</style>
