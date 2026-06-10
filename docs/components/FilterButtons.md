# FilterButtons.svelte Component Documentation
## Overview

This is a form component that creates a button (input with label) for each filter category.  
The buttons are placed inside a `ul`, so screen readers can announce how many buttons there are.  
Since it is a form, it also needs a submit button. This button is hidden when JavaScript is enabled, and the form is instead submitted via an onclick function on the input elements.  
If JavaScript is disabled, the submit button is visible by default.  
The component also includes an indicator that shows how many results are available.

---

## Component Structure

### Script
```svelte
<script lang="ts">
	const { categories, selectedCategory, documents } = $props()
	const normalized = $derived(selectedCategory?.toLowerCase() ?? '')

	function filterClick(e: Event) {
		// The element where the click event happens
		const target = e.target as HTMLInputElement

		//  find the nearest form element and submit it.
		target.form?.requestSubmit()
	}
</script>
```
> filterClick is the function that submits the form (when JavaScript is enabled) 

---

### HTML
In this component, the exact same HTML for the filter buttons used to appear multiple times.  
One button acted as a reset button to show all items, which was not provided by the database like the other buttons.  
Instead of duplicating the HTML twice, I used a snippet that can be reused. This proved very useful because afterward I only had to change one button instead of two whenever I made updates.

```svelte
<!-- snippet is a reusable piece of code that can be called again using {@render ...} -->
{#snippet categoryRadio(category)}
	<label class="button-outline-blue category-filter__button">
		<input
			class="visually-hidden"
			type="radio"
			name="category"
			value={category.value}
			checked={normalized === category.value}
			onclick={filterClick}
		/>
		<span>{category.label}</span>
	</label>
{/snippet}
```

```svelte
<ul class="category-filter__list">
	<li class="category-filter__item">
		<!-- use the snippet for a button to show all results -->
		{@render categoryRadio({ value: 'alle-publicaties', label: 'Alle publicaties' })}
	</li>

	{#each categories as category (category.id)}
		<li class="category-filter__item">
			<!-- use database categories to create all filter options/buttons -->
			{@render categoryRadio({ value: category.title.toLowerCase(), label: category.title })}
		</li>
	{/each}
</ul>
```

### Usage Examples
For this component, you need to pass the `documents` data to indicate how many items there are per filter,  
the `categories` data to show all filter options,  
and the `selectedCategory` prop to show the current category.

```svelte
<RFilterButtons {categories} {selectedCategory} {documents}/>
```

---

### Expected Data Structures

All three props come straight from Directus and are only passed through — the component does not transform them.

### filterCategories
An array of category objects from Directus.

```js
const filterCategories = [
	{ id: 4, title: 'Externe publicaties' },
	{ id: 5, title: 'Interne publicaties' }
]
```

**Used by this component:** only `id` (as the `{#each}` key) and `title` (the button label, lowercased for matching). Any other fields Directus returns are ignored here.

### documents
An array of document objects from Directus. A single item looks like this:

```js
const documents = [
	{
		title: 'Beschrijving niveau 5 Associate degree (2022)',
		id: 7,
		description: 'In de landelijke Beschrijving niveau 5 Associate degree ...',
		slug: 'beschrijving-niveau-5-associate-degree-2022',
		hero_image: '4776665d-fcf9-469c-9775-6fe8532edfba',
		source_file: 'ec009a53-b3f9-4794-ba83-7d00262e453c',
		date: '2022-01-17',
		category: { id: 4, title: 'Externe publicaties' }
	}
	// ...more documents
]
```

**Used by this component:** only `documents.length`, to show the result count ("Aantal artikelen"). None of the individual fields (`title`, `description`, `hero_image`, etc.) are read inside `RFilterButtons` — they are passed through to `RCardPublicaties`, which renders them.

### selectedCategory
A single string with the currently active category. It is lowercased internally and compared against `category.title.toLowerCase()` (or `'alle-publicaties'` for the show-all button).

```js
const selectedCategory = 'externe publicaties'
// or 'alle-publicaties'
// or undefined when no filter is active
```

**Used by this component:** the whole string — normalized to lowercase for matching the checked button, and shown as-is in the info panel ("Categorie:").



