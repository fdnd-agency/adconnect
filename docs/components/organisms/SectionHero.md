# SectionHero.svelte Component Documentation

## Overview

The SectionHero component (SectionHero.svelte) renders a responsive hero section that pairs a CardHero component with an optional image (Picture component). It supports up to two call-to-action links and an optional alternate background color, making it suitable as the top section of a page.

---

## Component Structure

### Script

```svelte
<script>
	import { CardHero, Link, Picture } from '$lib'
	const { sectionInfo, primaryLink, secondaryLink, picture, backgroundBlue } = $props()
</script>
```

Props:

- `sectionInfo` - Object holding the title and description for the card
- `primaryLink` (optional) - Object for the primary link, styled as an outlined white button
  - `label` - The button text
  - `href` - The link destination
  - `screenReaderText` - Hidden text for screen readers
- `secondaryLink` (optional) - Object for the secondary link, styled as an outlined blue button (same shape as `primaryLink`)
- `picture` (optional) - Object holding every prop the Picture component uses
- `backgroundBlue` (optional) - Applies the alternate background color to the section

We use a JavaScript object to send data through.  
For example, the `CardHero` needs a title and description, instead of making 2 props, you send them together as `sectionInfo`.  
The same goes for the Picture component: every prop the Picture component might need is sent together instead of separately.

---

### HTML

```svelte
<section
	id="main"
	class="hero"
	class:backgroundBlue
>
	<CardHero
		title={sectionInfo.title}
		description={sectionInfo.description}
	>
		<!-- both links are optional; each renders only when its object is passed -->
		{#if primaryLink}
			<Link
				href={primaryLink.href}
				class="button-outline-white"
				screenReaderText={primaryLink.screenReaderText}
				>{primaryLink.label}
			</Link>
		{/if}

		{#if secondaryLink}
			<Link
				href={secondaryLink.href}
				class="button-outline-blue"
				screenReaderText={secondaryLink.screenReaderText}
				>{secondaryLink.label}
			</Link>
		{/if}
	</CardHero>

	<!-- image is optional -->
	{#if picture}
		<section class="hero__media">
			<Picture
				isEnhanced={picture.isEnhanced}
				src={picture.src}
				alt={picture.alt}
				width={picture.width}
				height={picture.height}
				fetchpriority={picture.fetchpriority}
				loading={picture.loading}
				style="height:auto;"
			/>
		</section>
	{/if}
</section>
```

> `backgroundBlue` toggles the alternate background color via the `--_background` custom property.

### Usage Examples

Page data is bundled into objects and passed in. The text and buttons come from page data, while the image is set inline.

Example: a home hero with two links and the alternate background

```svelte
<SectionHero
	sectionInfo={{ title: homePage.hero_heading, description: homePage.hero_body }}
	primaryLink={{ label: homePage.hero_primary_button_text, href: homePage.hero_primary_button_url }}
	secondaryLink={{ label: homePage.hero_secondary_button_text, href: homePage.hero_secondary_button_url }}
	picture={{
		isEnhanced: true,
		src: zaal,
		alt: 'Een grote zaal vol mensen die op stoelen zitten en luisteren naar een spreker.',
		width: '300',
		height: '210',
		fetchpriority: 'high',
		loading: 'eager'
	}}
	backgroundBlue
/>
```

Example: a minimal hero with just a title, description, and image (no links)

```svelte
<SectionHero
	sectionInfo={{ title: theme?.title, description: theme?.description }}
	picture={{
		isEnhanced: true,
		src: `${DIRECTUS_URL}/assets/${theme?.hero}`,
		alt: '',
		width: '300',
		height: '210',
		fetchpriority: 'high',
		loading: 'eager'
	}}
/>
```

### CSS

The only dynamic/optional styling is the alternate background, toggled by the `backgroundBlue` prop.

```svelte
<section
	class="hero"
	// toggled by the backgroundBlue prop
	class:backgroundBlue
>

<style>
	.backgroundBlue {
		/* alternate background: shifts the dark-mode color to blue-800 */
		--_background: light-dark(var(--primary-blue), var(--blue-800));
	}
</style>
```
