# FilterButtons.svelte Component Documentation

## Overview

The FilterButtons component (FilterButtons.svelte) renders a category filter as a group of radio buttons styled as buttons. Selecting a category updates the URL's `category` search param (driving the filtering upstream), and a live region shows the active category and result count. It works as a plain GET form when JavaScript is disabled.

---

## Component Structure

### Script

```svelte
<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/state'

	const { filterCategories, selectedCategory, documents } = $props()

	const normalized = $derived(selectedCategory?.toLowerCase() ?? '')

	function selectCategory(value: string) {
		const url = new URL(page.url)
		url.searchParams.set('category', value)
		goto(url, { noScroll: true, keepFocus: true })
	}
</script>
```

Props:
- `filterCategories` - Array of category objects, each with an `id` and `title`; rendered as filter options
- `selectedCategory` - The currently active category, used to mark the matching radio as checked
- `documents` - The (already filtered) results; only its `length` is shown in the info bar

> `selectCategory` updates the `category` URL param via `goto` without scrolling or losing focus; the actual filtering happens upstream from that param.

---

### HTML

```svelte
<!-- one styled radio button per category -->
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
	<form class="category-filter" method="GET" data-sveltekit-noscroll>
		<fieldset class="category-filter__group">
			<legend class="category-filter__label">Filter op categorie:</legend>

			<ul class="category-filter__list">
				<!-- static "all" option, always first -->
				<li>
					{@render categoryRadio({ value: 'alle-publicaties', label: 'Alle publicaties' })}
				</li>

				<!-- one option per category from the data -->
				{#each filterCategories as category (category.id)}
					<li>
						{@render categoryRadio({ value: category.title.toLowerCase(), label: category.title })}
					</li>
				{/each}
			</ul>

			<!-- only shown when JS is disabled (see noscript below) -->
			<button id="submit" type="submit" class="button-outline-blue">Submit</button>
		</fieldset>
	</form>

	<!-- live region announcing the active filter and result count -->
	<div class="filter-info" aria-live="polite">
		<p>Categorie: {selectedCategory}</p>
		<p>Aantal artikelen: {documents.length}</p>
	</div>
</section>

<!-- JS disabled: reveal the submit button so the GET form still works -->
<noscript>
	<style>
		#submit {
			display: block !important;
		}
	</style>
</noscript>
```

> The radios are visually hidden; the `label` styling provides the button appearance.
> With JS, clicking a radio navigates immediately; without JS, the visible submit button posts the GET form instead.

### Usage Examples

The parent section passes the categories, the active category, and the filtered results straight through:

```svelte
category = { id, title }
```

Example: filter buttons above a document list

```svelte
<FilterButtons
	{filterCategories}
	{selectedCategory}
	documents={filterResults}
/>
```

### CSS

The dynamic styling is the checked-button highlight and the JS/no-JS submit button toggle.

```svelte
<style>
	.category-filter__button {
		/* highlight the button whose radio is checked */
		&:has(input:checked) {
			background-color: var(--primary-blue);
		}
	}

	#submit {
		display: none;  /* hidden when JS is enabled; the noscript block reveals it otherwise */
	}
</style>
```
