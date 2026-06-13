# AboutOverAD.svelte Component Documentation

## Overview

The AboutOverAD component (AboutOverAD.svelte) renders a "why choose Associate Degrees" section: an intro heading and text followed by a responsive grid of benefit cards. Each card pairs a check icon with a title and excerpt, and reflows its layout based on the card's own width via a container query. The section takes an anchor id for in-page linking.

<details>
	<summary>Example</summary>

<img width="2082" height="1014" alt="image" src="https://github.com/user-attachments/assets/6aef7de5-7472-4faa-bc49-6394f2976a6e" />

</details>

---

## Component Structure

### Script

```svelte
<script>
	import { check } from '$lib'

	const { benefitData, anchor } = $props()
</script>
```

Props:
- `benefitData` - Array of benefit objects rendered into the grid
  - `title` - The benefit heading
  - `excerpt` - The benefit description, truncated to two lines
- `anchor` (optional) - Sets the section's `id` so it can be targeted by an in-page link

> The benefit entries are passed as a single array; `anchor` only sets the element id and has no visual effect.

---

### HTML

```svelte
<!-- one benefit card: check icon + title + excerpt -->
{#snippet benefitCard(benefit)}
	<article class="benefit-card">
		<div class="benefit-card__inner">
			<!-- decorative icon, empty alt -->
			<img class="benefit-card__icon" src={check} alt="" />
			<div class="benefit-card__info">
				<h3 class="benefit-card__title">{benefit.title}</h3>
				<p class="benefit-card__excerpt truncate two">{benefit.excerpt}</p>
			</div>
		</div>
	</article>
{/snippet}

<!-- anchor id makes the section linkable -->
<section class="benefits-section" id="{anchor}">
	<section class="benefits-section__intro">
		<h2>Waarom kiezen voor Associate Degree's?</h2>
		<p>Associate Degrees combineren praktijk en theorie...</p>
	</section>

	<!-- one card per benefit -->
	<div class="benefits-section__list">
		{#each benefitData as benefit}
			{@render benefitCard(benefit)}
		{/each}
	</div>
</section>
```

> The icon's `alt` is intentionally empty since it's decorative.
> The intro heading and text are static; only the cards come from `benefitData`.

### Usage Examples

The parent builds the `benefitData` array from page data and passes an anchor:

```svelte
benefit = { title, excerpt }
```

Example: the benefits section with an anchor id

```svelte
<AboutOverAD
	{benefitData}
	anchor="benefit"
/>
```

### CSS

The dynamic styling is the container query that reflows each card; the rest is standard responsive layout.

```svelte
<style>
	.benefit-card {
		/* each card is its own query container, named "benefit" */
		container: benefit / inline-size;
	}

	.benefit-card__inner {
		flex-direction: column;

		/* icon moves beside the text once the card is wider than 300px */
		@container benefit (width > 300px) {
			flex-direction: row;
			align-items: start;
		}
	}
</style>
```
