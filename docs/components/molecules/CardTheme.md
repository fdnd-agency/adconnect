# CardTheme.svelte Component Documentation

## Overview

The CardTheme component (CardTheme.svelte) renders a single theme card with a title, description, decorative dots icon, and an optional link with an arrow. The whole card is clickable, titles and descriptions are truncated, and the heading layout adapts based on the card's own width via a container query.


<details>
	<summary>Example</summary>

<img width="810" height="532" alt="image" src="https://github.com/user-attachments/assets/dab69831-36ef-492d-818d-65c7ecc1a5f8" />
</details>

---

## Component Structure

### Script

```svelte
<script>
	import { Link } from '$lib'
	import { IconDots, IconCalendar, IconLabel } from '$lib/icons'
	const { title, description, link, children } = $props()
</script>
```

Props:
- `title` - The theme heading, truncated to one line
- `description` - The supporting text, truncated to multiple lines
- `link` (optional) - Object for the link, styled as a clickable-container blue button
  - `label` - The button text
  - `href` - The link destination
  - `screenReaderText` - Hidden text for screen readers

> The truncation classes clamp the title and description so cards stay a consistent height.

---

### HTML

```svelte
<article class="info-card">
	<div class="info-card__heading">
		<h3 class="info-card__title truncate single">{title}</h3>
		<IconDots variant="heading-three" />
	</div>

	<p class="info-card__description truncate two">{description}</p>

	{#if link}
		<div class="info-card__link">
			<Link
				href={link.href}
				class="button-outline-blue clickable-container"
				screenReaderText={link.screenReaderText}
			>
				{link.label}
				<span
					class="info-card__cta-arrow"
					aria-hidden="true">→</span
				>
			</Link>
		</div>
	{/if}
</article>
```

> The link only renders when a `link` object is passed.
> The `clickable-container` class makes the whole card clickable.

### Usage Examples

The parent section maps over its themes and builds a `link` object per card. `title` and `description` come straight from the theme:

```svelte
theme = { title, description, slug }
link  = { label, href, screenReaderText }
```

Example: rendering a list of themes into cards

```svelte
{#each themes as theme (theme.title)}
	<CardTheme
		title={theme.title}
		description={theme.description}
		link={{ label: 'Meer informatie', href: `${theme.slug}`, screenReaderText: `over ${theme.title}` }}
	/>
{/each}
```

### CSS

The dynamic styling is the card hover state, the container query that reflows the heading, and the line-clamp truncation; the rest is standard layout.

```svelte
<style>
	/* clamps text to a set number of lines with an ellipsis */
	.truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	.truncate.single {
		white-space: nowrap;
		-webkit-line-clamp: 1;  /* one line */
	}

	.truncate.two {
		-webkit-line-clamp: 3;  /* multi-line clamp */
	}
</style>
```
