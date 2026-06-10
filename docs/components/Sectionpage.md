# Sectionpage.svelte Component Documentation
## Overview
The SectionHero component (SectionHero.svelte) renders a responsive section that pairs a CardSection component with an optional image (Picture component). It supports a mirrored layout, an optional dark backgroundand a vertical layout, making it suitable for alternating content sections across a page.

---
## Component Structure
### Script
```svelte
<script>
	import { RCardSection, RLink, RPicture } from '$lib'
	import { IconBackgroundCircle } from '$lib/icons'
	const { sectionInfo, primaryLink, picture, mirrored, backgroundBlack, vertical } = $props()
</script>
```
Props:
- `sectionInfo` - Object holding the title and description for the card
- `primaryLink` - Object for the link, passed to `RCardSection`
- `picture` (optional) - Object describing for every prop that the picture component uses
- `mirrored` (optional) - Reverses the layout direction on desktop, placing the image before the text
- `backgroundBlack` (optional) - Applies a dark background color to the section
- `vertical` (optional) - Stacks the card and image vertically on all breakpoints and widens the image

We use a JavaScript object to send data through.  
For example, the `CardSection` needs a title and description, instead of making 2 props, you send them together as `sectionInfo`.  
The same goes for the Picture component: every prop the Picture component might need is sent together instead of separately.

---
### HTML
```svelte
<section
	class="media-section"
	class:media-section--mirrored={mirrored}
	class:media-section--background-black={backgroundBlack}
    class:media-section--vertical={vertical}
>
	<RCardSection
		title={sectionInfo.title}
		description={sectionInfo.description}
		link={primaryLink}
	/>

	{#if picture}
		<div class="media-section__media-wrapper">
			<section class="media-section__media">
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
		</div>
	{/if}
</section>
```
> The layout stacks vertically on mobile and switches to a row at 1024px and above.  
> `mirrored` only takes effect at desktop breakpoints; `backgroundBlack` toggles the `--_background` custom property.  
> `vertical` keeps the column layout at all breakpoints.  

### Usage Examples
Example: a mirrored section with a dark background and an enhanced static image
```svelte
<SectionHero
	mirrored
	backgroundBlack
	sectionInfo={{
		title: 'Doorstroom Ad-bachelor',
		description: 'Met een Ad-diploma kun je rechtstreeks doorstromen naar een bacheloropleiding...'
	}}
	primaryLink={{ label: 'Kom naar de Ad-dag', href: '/ad-dag' }}
	picture={{
		isEnhanced: true,
		src: doorstroom,
		alt: 'Doorstroom Ad-bachelor'
	}}
/>
```

Example: a vertical section with a wider image
```svelte
<SectionHorizontal
	vertical
	sectionInfo={{
		title: 'Wat zijn Associate degrees en hoe sluit het aan bij jou wensen?',
		description: 'Associate degrees zijn tweejarige hbo-opleidingen die sterk praktijkgericht zijn...'
	}}
	primaryLink={{ label: "Meer info over Ad's", href: '#' }}
	picture={{
		isEnhanced: true,
		src: overad,
		alt: 'Een zaal met tafels in een cirkel, waar studenten luisteren naar hun docent die een presentatie geeft.'
	}}
/>
```

### CSS
classes for mirrored and black background.

```svelte
<section
	class="media-section"
	<!-- toggled by the mirrored prop -->
	class:media-section--mirrored={mirrored}
	<!-- toggled by the backgroundBlack prop -->
	class:media-section--background-black={backgroundBlack}
	<!-- toggled by the vertical prop -->
	class:media-section--vertical={vertical}
>

<style>
	.media-section--mirrored {
		@media (min-width: 1024px) {
			/* swaps image and text order on desktop */
			flex-direction: row-reverse;
		}
	}

	.media-section--background-black {
		/* dark background: primary blue in light mode, near-black in dark mode */
		--_background: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
	}

	.media-section--vertical {
         /* keeps the column layout at all breakpoints */
		flex-direction: column; 
		padding: 5em 2em;

		.media-section__media {
           /* widens the image in vertical layout */
			max-width: 1000px; 
		}
	}
</style>
```
