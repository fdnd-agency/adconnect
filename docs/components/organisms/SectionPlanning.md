# SectionPlanning.svelte Component Documentation

## Overview

The SectionPlanning component (SectionPlanning.svelte) renders a centered CardSection followed by a responsive grid of cards. Each card shows a heading, body text, and a call-to-action link, making it suitable for presenting a programme alongside related content like workshops.

<details>
	<summary>Example</summary>

<img width="1396" height="1112" alt="image" src="https://github.com/user-attachments/assets/9b7af774-265d-4cdf-b68d-07dda5c24153" />

</details>

---

## Component Structure

### Script

```svelte
<script>
	import { CardSection, Link } from '$lib'
	import { IconDots } from '$lib/icons'

	const { sectionInfo, cardsData } = $props()
</script>
```

Props:

- `sectionInfo` - Object holding the title and description for the section card
- `cardsData` - Array of card objects rendered into the grid
  - `title` - The card heading
  - `content` - The card body text (line breaks are preserved)
  - `link` - Object for the card's link, with `label` and `href`

We use a JavaScript object to send data through.  
For example, the `CardSection` needs a title and description, instead of making 2 props, you send them together as `sectionInfo`.  
Each card bundles its heading, body, and link together as one object in `cardsData`.

---

### HTML

```svelte
<section class="card-section">
	<CardSection
		title={sectionInfo.title}
		description={sectionInfo.description}
		centered
	/>

	<div class="card-section__list">
		<!-- one card per entry -->
		{#each cardsData as card (card.title)}
			<article class="card">
				<div class="card__header">
					<IconDots variant="heading-three" />
					<h3 class="card__title">{card.title}</h3>
				</div>

				<p class="card__text">{card.content}</p>

				<Link
					class="button-outline-blue"
					href={card.link.href}
				>
					{card.link.label}
				</Link>
			</article>
		{/each}
	</div>
</section>
```

> The section card is always `centered`; the card list is a single column on mobile and a two-column grid at 1024px and above.

### Usage Examples

The parent builds the section header and the card array from page data:

```svelte
sectionInfo = { title, description }
card        = { title, content, link: { label, href } }
```

Example: a planning section with a programme card and a workshops card

```svelte
<SectionPlanning
	sectionInfo={{ title: adDayPage.planning_heading, description: adDayPage.planning_body }}
	cardsData={[
		{
			title: adDayPage.program_heading,
			content: adDayPage.program_body,
			link: { label: adDayPage.program_button_text, href: adDayPage.program_button_url }
		},
		{
			title: adDayPage.workshops_heading,
			content: adDayPage.workshops_body,
			link: { label: adDayPage.workshops_button_text, href: adDayPage.workshops_button_url }
		}
	]}
/>
```

### CSS

The dynamic styling is the card hover state; the rest is standard layout. The card text also preserves line breaks from the data.

```svelte
<style>
	.card {
		--_border-color: hsl(0, 0%, 80%);
		transition: 0.2s ease-in-out;

		&:hover {
			/* on hover: blue border, soft shadow, slight lift */
			--_border-color: #00408d;
			box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
			translate: 0 -1%;
		}
	}

	.card__text {
		white-space: pre-line;  /* keeps line breaks from the content text */
	}
</style>
```
