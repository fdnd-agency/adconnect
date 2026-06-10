# SectionHero.svelte Component Documentation
## Overview
The SectionHero component (SectionHero.svelte) renders a responsive hero section that pairs a `CardHero` component with an optional image (`Picture` component). It supports up to two  links and an optional alternate background color, making it suitable as the top section of a page.

---

## Component Structure
### Script
```svelte
<script>
	import { RCardHero, RLink, RPicture } from '$lib'
	const { sectionInfo, primaryLink, secondaryLink, picture, backgroundBlue } = $props()
</script>
```
Props:
- `sectionInfo` - Object holding the title and description for the card
- `primaryLink` (optional) - Object for the primary link, styled as an outlined white button
- `secondaryLink` (optional) - Object for the secondary link, styled as an outlined blue button
- `picture` (optional) - Object holding every prop the Picture component uses
- `backgroundBlue` (optional) - Applies the alternate background color to the section

We use a JavaScript object to send data through.  
For example, the `CardHero` needs a title and description, instead of making 2 props, you send them together as `sectionInfo`.  
The same goes for the Picture component: every prop the Picture component might need is sent together instead of separately.

---

### HTML
```svelte
<section
	class="container"
	class:backgroundBlue
>
	<RCardHero
		title={sectionInfo.title}
		description={sectionInfo.description}
	>
		{#if primaryLink}
			<RLink
				href={primaryLink.href}
				class="button-outline-white">{primaryLink.label}</RLink
			>
		{/if}

		{#if secondaryLink}
			<RLink
				href={secondaryLink.href}
				class="button-outline-blue">{secondaryLink.label}</RLink
			>
		{/if}
	</RCardHero>

	{#if picture}
		<section class="hero-media">
			<RPicture
				isEnhanced={picture.isEnhanced}
				src={picture.src}
				alt={picture.alt}
				width={picture.width}
				height={picture.height}
				fetchpriority={picture.fetchpriority}
				loading={picture.loading}
			/>
		</section>
	{/if}
</section>

```
> Both links are optional and only render when their object is passed
> `backgroundBlue` toggles the alternate background color.

### Usage Examples
Example: a hero section with two links, an enhanced static image, and the alternate background

```svelte
<SectionHero
	sectionInfo={section}
	primaryLink={{ label: "Meer over Ad's", href: '/over-ad' }}
	secondaryLink={{ label: 'Kom naar de Ad-dag', href: '/ad-dag' }}
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
### CSS
The only dynamic/optional styling is the alternate background, toggled by the `backgroundBlue` prop.

```svelte
<section
	class="container"
	<!-- toggled by the backgroundBlue prop -->
	class:backgroundBlue
>

<style>
	.backgroundBlue {
        /* alternate background: white in light mode, blue-800 in dark mode */
		background-color: light-dark(var(--text-white), var(--blue-800)); 
	}
</style>
```
