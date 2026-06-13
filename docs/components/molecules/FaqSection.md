# FaqSection.svelte Component Documentation

## Overview

The FaqSection component (FaqSection.svelte) renders a titled list of FAQ items as native `<details>` accordions, with the first item open by default. Each item animates open/closed with a rotating chevron, and a decorative background circle sits behind the section. It adapts to dark mode, reduced motion, high contrast, and inverted colors.


<details>
	<summary>Example</summary>

<img width="1414" height="1016" alt="image" src="https://github.com/user-attachments/assets/62ad0b04-dded-49ee-9fa4-981283f94f20" />
</details>

---

## Component Structure

### Script

```svelte
<script>
	import { IconChevronDown, IconBackgroundCircle, IconDots } from '$lib/icons'

	const { title, faqData } = $props()
</script>
```

Props:
- `title` - The section heading
- `faqData` - Object holding the FAQ entries
  - `faqs` - Array of `{ question, answer }` objects, each rendered as one accordion item

> The questions and answers are bundled into a single `faqData` object instead of being passed as separate arrays.

---

### HTML

```svelte
<section class="faq">
	<div class="faq__title">
		<h2>{title}</h2>
		<IconDots variant="heading-two" />
	</div>

	<!-- one accordion per FAQ; the first one starts open -->
	{#each faqData.faqs as faq, i}
		<details
			class="faq-item adaptive"
			open={i === 0 ? true : undefined}
		>
			<summary class="faq-item__trigger">
				{faq.question}
				<!-- chevron rotates when the item is open -->
				<div class="faq-item__icon"><IconChevronDown /></div>
			</summary>
			<p class="faq-item__content">{faq.answer}</p>
		</details>
	{/each}

	<!-- decorative background circle -->
	<div class="faq__background-circle">
		<IconBackgroundCircle />
	</div>
</section>
```

> Uses native `<details>`/`<summary>`, so it works without JavaScript; only the first item gets `open`.

### Usage Examples

The parent builds the `faqData` object from page data, pairing each heading with its body:

```svelte
faqData = { faqs: [ { question, answer }, ... ] }
```

Example: a FAQ section built from page data

```svelte
<FaqSection
	title={adDayPage.faq_heading}
	faqData={{
		faqs: [
			{ question: adDayPage.faq_1_heading, answer: adDayPage.faq_1_body },
			{ question: adDayPage.faq_2_heading, answer: adDayPage.faq_2_body },
			{ question: adDayPage.faq_3_heading, answer: adDayPage.faq_3_body },
			{ question: adDayPage.faq_4_heading, answer: adDayPage.faq_4_body }
		]
	}}
/>
```

### CSS

The dynamic styling is the open/close animation, the chevron rotation, and the accessibility/preference media queries.

```svelte
<style>
	/* animates the panel height when opening/closing */
	::details-content {
		transition:
			height 0.5s ease,
			content-visibility 0.5s ease allow-discrete;
		height: 0;
		overflow: clip;
	}

	[open]::details-content {
		height: auto;
	}

	/* chevron flips when its item is open */
	details[open] .faq-item__icon {
		transform: rotate(180deg);
	}

	@media (prefers-reduced-motion: reduce) {
		/* no animations for users who prefer reduced motion */
		::details-content,
		.faq-item__icon {
			transition: none;
		}
	}

	@media (prefers-contrast: more) {
		/* stronger outline in high-contrast mode */
		.faq-item {
			outline: 2px solid var(--primary-blue);
		}
	}

	@media (prefers-color-scheme: dark) {
		/* dark variant for items marked .adaptive */
		.faq-item.adaptive {
			background-color: var(--primary-blue);
			color: var(--text-white);
		}
	}

	@media (inverted-colors: inverted) {
		/* keeps items readable when colors are inverted */
		.faq-item {
			background-color: var(--primary-orange);
			color: var(--text-white);
		}
	}
</style>
```
