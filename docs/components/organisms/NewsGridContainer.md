# NewsGridContainer.svelte Component Documentation

## Overview

The NewsGridContainer component (NewsGridContainer.svelte) renders a titled, responsive grid of news cards (CardNews component). When given an `itemsPerPage`, it paginates the list with previous/next controls; without it, all items are shown. The grid columns respond to the container's own width.

---

## Component Structure

### Script

```svelte
<script>
	import { CardNews } from '$lib'
	import { IconCalendar } from '$lib/icons'
	import { formatDateNL } from '$lib/molecules/date'

	const { sectionInfo, newsItems, itemsPerPage } = $props()

	let currentPage = $state(1)

	const totalPages = $derived(itemsPerPage ? Math.ceil(newsItems.length / itemsPerPage) : 1)

	const visibleItems = $derived(itemsPerPage ? newsItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : newsItems)

	function nextPage() {
		if (currentPage < totalPages) currentPage += 1
	}

	function previousPage() {
		if (currentPage > 1) currentPage -= 1
	}
</script>
```

Props:

- `sectionInfo` - Object holding the section header
  - `title` - The section heading
  - `totalArticles` (optional) - Shown as an article count when present
- `newsItems` - Array of news items; each has a `uuid` and is passed to `CardNews`
- `itemsPerPage` (optional) - Enables pagination at this page size; omit to show every item

> `currentPage` is local state; `totalPages` and `visibleItems` derive from it and `itemsPerPage`. Without `itemsPerPage`, pagination is disabled and all items render.

---

### HTML

```svelte
<section class="news">
	<div>
		<h2>{sectionInfo.title}</h2>
		<!-- optional article count -->
		{#if sectionInfo.totalArticles}
			<p>Aantal artikelen: {sectionInfo.totalArticles}</p>
		{/if}
	</div>

	<section class="news-container">
		<ul>
			<!-- only the items for the current page -->
			{#each visibleItems as item (item.uuid)}
				<li>
					<CardNews {item} />
				</li>
			{/each}
		</ul>
	</section>

	<!-- pagination only when paging is on and there's more than one page -->
	{#if itemsPerPage && totalPages > 1}
		<div class="button-container">
			<button
				class="button-outline-blue"
				onclick={previousPage}
				disabled={currentPage === 1}
			>
				←
			</button>

			<p>Pagina {currentPage} van {totalPages}</p>

			<button
				class="button-outline-blue"
				onclick={nextPage}
				disabled={currentPage === totalPages}
			>
				→
			</button>
		</div>
	{/if}
</section>
```

> The prev/next buttons disable at the first and last page; the controls only appear when paging is enabled and more than one page exists.

### Usage Examples

The parent passes the section header and the items, optionally enabling pagination:

```svelte
sectionInfo = { title, totalArticles }
newsItem    = { uuid, ... }
```

Example: a simple "latest news" grid without pagination

```svelte
<NewsGridContainer
	sectionInfo={{ title: 'Laatste nieuws' }}
	newsItems={data.latest3}
/>
```

Example: a full, paginated news grid with an article count

```svelte
<NewsGridContainer
	sectionInfo={{
		title: 'Alle nieuws',
		totalArticles: data.news.length
	}}
	newsItems={data.news}
	itemsPerPage={9}
/>
```

### CSS

The dynamic styling is the container query driving the column count; the grid responds to the container's width rather than the viewport.

```svelte
<style>
	.news-container {
		/* establishes a query container named "news-container" */
		container: news-container / inline-size;
	}

	/* 2 columns from 768px, 3 from 1024px — based on container width */
	@container news-container (min-width: 768px) {
		ul {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@container news-container (min-width: 1024px) {
		ul {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
```
