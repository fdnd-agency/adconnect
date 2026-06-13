# DetailsPublicaties.svelte Component Documentation

## Overview

The DetailsPublicaties component (DetailsPublicaties.svelte) renders a publication detail page: the publication content (via the TextSection component) in the main column and a sticky "Ad-dag" call-to-action card alongside it. The sidebar content is static; everything data-driven is delegated to TextSection.


<details>
	<summary>Example</summary>

<img width="2396" height="1220" alt="image" src="https://github.com/user-attachments/assets/c5004758-2457-4891-8bde-6a5956ff523c" />
</details>

---

## Component Structure

### Script

```svelte
<script>
	import { TextSection } from '$lib'

	const { data } = $props()
</script>
```

Props:

- `data` - Object holding the publication; passed straight through to `TextSection`, which reads `data.document`

> This component is mostly a layout wrapper; it doesn't read `data` itself but forwards it to `TextSection`.

---

### HTML

```svelte
<div class="detail-layout">
	<!-- publication content (description + optional file preview) -->
	<TextSection {data} />

	<!-- sticky call-to-action sidebar (static content) -->
	<section class="ad-day">
		<h2 class="ad-day__title">Kom naar de Ad-dag!</h2>
		<p class="ad-day__text">Ontdek alles over Associate Degrees...</p>
		<a href="/ad-dag" class="button-outline-white ad-day__link">Meer weten over de Ad-dag</a>
	</section>
</div>
```

> The sidebar is static; only `TextSection` is data-driven.

### Usage Examples

The component receives the page's `data` object directly and forwards it:

```svelte
data = { document: { title, description, source_file } }
```

Example: a publication detail page

```svelte
<DetailsPublicaties {data} />
```

### CSS

The notable styling is the sticky sidebar and its link hover; the rest is standard responsive layout.

```svelte
<style>
	.ad-day {
		/* sidebar card sticks while scrolling on wider screens */
		@media (min-width: 1025px) {
			position: sticky;
			top: 10em;
			align-self: start;
		}
	}

	.ad-day__link:hover {
		/* invert colors on hover */
		color: var(--text-darkblue);
		background-color: var(--text-white);
	}
</style>
```
