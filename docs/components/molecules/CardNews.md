# CardNews.svelte Component Documentation

## Overview

The CardNews component (CardNews.svelte) renders a single news card with a title, formatted date, description, and a link to the full article. The whole card is clickable via the `clickable-container` link. It's typically rendered in a list by a parent section that handles pagination.

<details>
	<summary>Example</summary>
	
<img width="794" height="664" alt="image" src="https://github.com/user-attachments/assets/3252a586-2ef4-451f-9601-916189417826" />
</details>

---

## Component Structure

### Script

```svelte
<script>
	import { Link } from '$lib'
	import { IconCalendar } from '$lib/icons'
	const { item, children } = $props()

	import { formatDateNL } from '$lib/molecules/date'
</script>
```

Props:
- `item` - Object holding the news data
  - `title` - The news headline
  - `date` - The date, formatted for display via `formatDateNL`
  - `description` - The news summary text
  - `uuid` - Used to build the article link (`/nieuws/{uuid}`)

> The date is run through `formatDateNL` to produce a Dutch-formatted date string.

---

### HTML

```svelte
<article class="news-card">
	<h3 class="news-card__title">{item.title}</h3>

	<section class="news-card__date">
		<IconCalendar />
		<p class="news-card__date-text">{formatDateNL(item.date)}</p>
	</section>

	<p class="news-card__description">{item.description}</p>

	<Link
		href={`/nieuws/${item.uuid}`}
		class="button-outline-blue clickable-container"
	>
		Meer informatie
		<span
			class="visually-hidden"
			aria-hidden="true">over {item.title}</span
		>
	</Link>
</article>
```

> The `clickable-container` class on the link makes the entire card clickable.
> The visually hidden span adds the article title to the link text for screen readers.

### Usage Examples

The parent section bundles the data and renders a card per item. `item` carries everything one card needs:

```svelte
item = { title, date, description, uuid }
```

Example: rendering paginated news items into cards

```svelte
{#each visibleItems as item (item.uuid)}
	<li>
		<CardNews {item} />
	</li>
{/each}
```

