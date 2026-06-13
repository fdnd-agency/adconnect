# CardSection.svelte Component Documentation

## Overview

The CardSection component (CardSection.svelte) renders a section header with a title, description, a decorative dots icon, and an optional link. An optional `centered` prop centers the title and icon, making it reusable across both left-aligned and centered section layouts.

---

## Component Structure

### Script

```svelte
<script>
	import { Link } from '$lib'
	import { IconDots } from '$lib/icons'
	const { title, description, link, children, centered } = $props()
</script>
```

Props:
- `title` - The section heading
- `description` - The supporting text below the heading
- `link` (optional) - Object for the link, styled as an outlined white button
  - `label` - The button text
  - `href` - The link destination
- `centered` (optional) - Centers the title and the dots icon

> The title and description are reordered via CSS grid rows, so the visual order differs from the markup order.

---

### HTML

```svelte
<article class="section-header">
	<h2 class="section-header__title" class:centered>{title}</h2>
	<p class="section-header__description">{description}</p>

	<div class:centered>
		<IconDots variant="heading-two" />
	</div>

	{#if link}
		<Link
			href={link.href}
			class="button-outline-white">{link.label}</Link
		>
	{/if}
</article>
```

> The link only renders when a `link` object is passed.
> `centered` is applied to both the title and the icon wrapper.

### Usage Examples

The parent (e.g. SectionHorizontal) passes its bundled data straight through. `link` matches the same `{ label, href }` shape used elsewhere:

```svelte
sectionInfo = { title, description }
primaryLink = { label, href }
```

Example: a section card passed data from its parent section

```svelte
<CardSection
	title={sectionInfo.title}
	description={sectionInfo.description}
	link={primaryLink}
	{centered}
/>
```

### CSS

The only dynamic styling is the `centered` toggle; the rest is standard grid layout.

```svelte
<style>
	.centered {
		/* centers the title and dots icon */
		justify-self: center;
		text-align: center;
	}
</style>
```
