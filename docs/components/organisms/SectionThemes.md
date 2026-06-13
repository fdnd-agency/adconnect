# SectionThemes.svelte Component Documentation

## Overview

The SectionThemes component (SectionThemes.svelte) renders a titled section with an optional description above a responsive grid of theme cards (CardTheme component). It builds each card's link from the theme data, and supports an optional alternate background color.

---

## Component Structure

### Script

```svelte
<script>
	import { CardTheme } from '$lib'
	const { sectionInfo, themes, backgroundBlue } = $props()
</script>
```

Props:

- `sectionInfo` - Object holding the section header
  - `title` - The section heading
  - `description` (optional) - Intro text, only rendered when present
- `themes` - Array of theme objects rendered into the grid
  - `title` - The theme heading
  - `description` - The theme body text
  - `slug` - Used as the card link's `href`
- `backgroundBlue` (optional) - Applies the alternate background color to the section

> The card's `link` object is assembled here from each theme's `slug` and `title`, so `CardTheme` receives a ready-made `{ label, href, screenReaderText }`.

---

### HTML

```svelte
<section
	class="themes"
	class:themes--background-blue={backgroundBlue}
>
	<h2 class="themes__title">{sectionInfo.title}</h2>

	<!-- description is optional -->
	{#if sectionInfo.description}
		<p class="themes__description">{sectionInfo.description}</p>
	{/if}

	<div class="themes__list">
		<!-- one card per theme; the link is built from the theme data -->
		{#each themes as theme (theme.title)}
			<CardTheme
				title={theme.title}
				description={theme.description}
				link={{ label: 'Meer informatie', href: `${theme.slug}`, screenReaderText: `over ${theme.title}` }}
				infoCard
			/>
		{/each}
	</div>
</section>
```

> The description only renders when present; each card's link label and screen-reader text are generated here.

### Usage Examples

The parent builds the `themes` array from page data:

```svelte
sectionInfo = { title, description }
theme       = { title, description, slug }
```

Example: a themes section built from page cards

```svelte
<SectionThemes
	sectionInfo={{ title: homePage.cards_heading, description: homePage.cards_intro }}
	{themes}
/>
```

### CSS

The only dynamic/optional styling is the alternate background, toggled by the `backgroundBlue` prop.

```svelte
<section
	class="themes"
	// toggled by the backgroundBlue prop
	class:themes--background-blue={backgroundBlue}
>

<style>
	.themes--background-blue {
		/* alternate background: white in light mode, blue-800 in dark mode */
		--_background: light-dark(var(--text-white), var(--blue-800));
	}
</style>
```
