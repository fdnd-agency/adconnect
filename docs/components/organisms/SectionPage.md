# SectionPage.svelte Component Documentation

## Overview

The SectionPage component (SectionPage.svelte) renders a responsive section that pairs a CardSection component with an optional image (Picture component). It supports a mirrored layout, a dark background, a vertical layout, and a centered card, making it the flexible building block for alternating content sections across a page.

<details>
	<summary>Example</summary>

<img width="2392" height="892" alt="image" src="https://github.com/user-attachments/assets/6c4da049-f617-42c7-8aba-a1c55dadbb06" />
<img width="2514" height="850" alt="image" src="https://github.com/user-attachments/assets/c09807f9-6250-4d4a-9dce-2cbfd7276fc7" />
<img width="1158" height="1116" alt="image" src="https://github.com/user-attachments/assets/aa73c599-22af-429a-9097-5475fff4246d" />

</details>

---

## Component Structure

### Script

```svelte
<script>
	import { CardSection, Picture } from '$lib'
	import { IconBackgroundCircle } from '$lib/icons'
	const { sectionInfo, primaryLink, picture, mirrored, backgroundBlack, vertical, centered } = $props()
</script>
```

Props:

- `sectionInfo` - Object holding the title and description for the card
- `primaryLink` (optional) - Object for the link, passed to `CardSection` (`label`, `href`)
- `picture` (optional) - Object holding every prop the Picture component uses
- `mirrored` (optional) - Reverses the layout direction on desktop, placing the image before the text
- `backgroundBlack` (optional) - Applies a dark background color to the section
- `vertical` (optional) - Stacks the card and image vertically on all breakpoints and widens the image
- `centered` (optional) - Passed to `CardSection` to center its title and icon

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
	<CardSection
		title={sectionInfo.title}
		description={sectionInfo.description}
		link={primaryLink}
		{centered}
	/>

	<!-- image is optional -->
	{#if picture}
		<div class="media-section__media-wrapper">
			<section class="media-section__media">
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
		</div>
	{/if}
</section>
```

> The layout stacks vertically on mobile and switches to a row at 1024px and above.
> `mirrored`, `backgroundBlack`, and `vertical` each toggle a modifier class; `centered` is forwarded to `CardSection`.

### Usage Examples

Example: a plain section with just a title, description, and image

```svelte
<SectionPage
	sectionInfo={{ title: adDayPage.about_heading, description: adDayPage.about_body }}
	picture={{
		isEnhanced: true,
		src: addag3,
		alt: '...',
		width: '450',
		fetchpriority: 'high',
		loading: 'eager'
	}}
/>
```

Example: a vertical, centered section with a link and a wider image

```svelte
<SectionPage
	vertical
	centered
	sectionInfo={{ title: homePage.intro_heading, description: homePage.intro_body }}
	primaryLink={{ label: homePage.intro_button_text, href: homePage.intro_button_url }}
	picture={{
		isEnhanced: true,
		src: overad,
		alt: 'Een zaal met tafels in een cirkel, waar studenten luisteren naar hun docent die een presentatie geeft.'
	}}
/>
```

Example: a mirrored section with a dark background

```svelte
<SectionPage
	mirrored
	backgroundBlack
	sectionInfo={{ title: aboutAdPage.bachelor_heading, description: aboutAdPage.bachelor_body }}
	primaryLink={{ label: aboutAdPage.bachelor_button_text, href: aboutAdPage.bachelor_button_url }}
	picture={{
		isEnhanced: true,
		src: doorstroom,
		alt: 'Doorstroom Ad-bachelor'
	}}
/>
```

### CSS

The dynamic styling is the three modifier classes; the rest is standard responsive layout.

```svelte
<section
	class="media-section"
	// toggled by the mirrored prop
	class:media-section--mirrored={mirrored}
	// toggled by the backgroundBlack prop
	class:media-section--background-black={backgroundBlack}
	// toggled by the vertical prop
	class:media-section--vertical={vertical}
>

<style>
	.media-section--mirrored {
		@media (min-width: 1024px) {
			flex-direction: row-reverse;  /* swaps image and text order on desktop */
		}
	}

	.media-section--background-black {
		/* dark background: primary blue in light mode, near-black in dark mode */
		--_background: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
		/* force CardSection's text to white for enough contrast on the dark background */
		--_main-color: white;
	}

	.media-section--vertical {
		flex-direction: column;  /* keeps the column layout at all breakpoints */
		padding: 5em 2em;

		.media-section__media {
			max-width: 1000px;  /* widens the image in vertical layout */
		}
	}
</style>
```
