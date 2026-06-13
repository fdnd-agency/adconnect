# SectionFilter.svelte Component Documentation

## Overview

The SectionFilter component (SectionFilter.svelte) renders a set of filter buttons (FilterButtons component) above a responsive grid of publication cards (CardPublicaties component). It displays the already-filtered results for the selected category, making it suitable for a filterable document or publication overview.

---

## Component Structure

### Script

```svelte
<script>
	import { FilterButtons, CardPublicaties } from '$lib'

	const { filterResults, filterCategories, selectedCategory } = $props()
</script>
```

Props:

- `filterResults` - Array of documents to display; each has an `id` and is passed to `CardPublicaties`
- `filterCategories` - Array of categories passed to `FilterButtons` to build the filter options
- `selectedCategory` - The currently active category, passed to `FilterButtons` to mark it as selected

> Filtering itself happens upstream (in the page load); this component receives the already-filtered `filterResults` and only renders them.

---

### HTML

```svelte
<div class="section-documents">
	<FilterButtons
		{filterCategories}
		{selectedCategory}
		documents={filterResults}
	/>

	<div class="section-documents__container">
		<ul class="section-documents__list">
			<!-- one card per result -->
			{#each filterResults as document (document.id)}
				<li class="section-documents__item"><CardPublicaties {document} /></li>
			{/each}
		</ul>
	</div>
</div>
```

> Each result is rendered as a `CardPublicaties` inside a list item.

### Usage Examples

The parent passes the filtered documents, the categories, and the active category straight through:

```svelte
document = { id, ... }
category = { id, title }
```

Example: a document overview wired up from page data

```svelte
<SectionFilter
	filterResults={documents}
	filterCategories={categories}
	{selectedCategory}
/>
```

### CSS

The only non-standard styling is the container query driving the grid; the list responds to its container's width rather than the viewport.

```svelte
<style>
	.section-documents__container {
		/* establishes a query container named "documents" */
		container: documents / inline-size;
	}

	.section-documents__list {
		display: flex;
		flex-direction: column;

		/* grid kicks in when the container (not the viewport) is at least 720px wide */
		@container documents (min-width: 720px) {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(22em, 1fr));
		}
	}
</style>
```
