# DetailsOverOns.svelte Component Documentation

## Overview

The DetailsOverOns component (DetailsOverOns.svelte) renders a theme detail page: the theme's rich-text body in the main column and a sticky "Ad-dag" call-to-action card in the sidebar. The body is injected as raw HTML, with `:global` styles handling the elements that come from it. The page title is set from the theme.

---

## Component Structure

### Script

```svelte
<script>
	import { Link } from '$lib'

	const { documentData } = $props()

	const theme = $derived(documentData)
</script>
```

Props:

- `documentData` - Object holding the theme
  - `title` - Used in the page `<title>`
  - `body` - Rich-text HTML rendered into the main column via `{@html}`

> `body` is trusted HTML coming from the CMS; it's injected with `{@html}`, so its inner elements are styled with `:global` rules rather than scoped classes.

---

### HTML

```svelte
<svelte:head>
	<title>{theme.title} | Overlegplatform Associate Degrees</title>
</svelte:head>

<section class="detail-layout">
	<!-- rich-text body injected as raw HTML -->
	<div class="detail-layout__content">
		{@html theme.body}
	</div>

	<!-- sticky call-to-action sidebar (static content) -->
	<div class="detail-layout__sidebar">
		<section class="ad-day">
			<h2 class="ad-day__title">Kom naar de Ad-dag!</h2>
			<p class="ad-day__text">Ontdek alles over Associate Degrees...</p>
			<Link href="/ad-dag" class="button-outline-white">Meer weten over de Ad-dag</Link>
		</section>
	</div>
</section>
```

> The sidebar content is static; only the main column is data-driven.

### Usage Examples

The parent resolves the theme (handling array vs single) and passes it in:

```svelte
documentData = { title, body }
```

Example: a theme detail page

```svelte
<DetailsOverOns documentData={theme} />
```

### CSS

The notable styling is the `:global` rules targeting the injected HTML, plus the sticky sidebar; the rest is standard responsive layout.

```svelte
<style>
	/* Content uit {@html}: geen scoped class, dus via :global */
	/* styles images that come from the rich-text body */
	:global(.detail-layout__content img) {
		width: 100%;
		border-radius: 1em;
		object-fit: cover;

		@media (min-width: 768px) {
			max-width: 70%;
		}
	}

	:global(.detail-layout__content p) {
		@media (min-width: 768px) {
			max-width: unset;
		}
	}

	.ad-day {
		/* sidebar card sticks while scrolling on wider screens */
		@media (min-width: 768px) {
			position: sticky;
			top: 10em;
		}
	}
</style>
```
