# CardSection.svelte Component Documentation
## Overview

This is the card component for horizontal sections on the page.  
It includes a logo, an h2 title, and a description, with an optional link. There is either one link or none.

<details>
<summary>Examples:</summary>

<img width="1167" height="777" alt="Image" src="https://github.com/user-attachments/assets/82277bac-6d85-44bd-bf26-300a251e9bce" />
<img width="1129" height="628" alt="Image" src="https://github.com/user-attachments/assets/5921eae4-5df0-4c30-a663-b5a29acd2943" />
</details>

---

## Component Structure
```svelte
<script>
	import { RLink } from '$lib'
	import { IconDots } from '$lib/icons'
	const { title, description, link, children } = $props()
</script>

<article class="section-header">
	<h2 class="section-header__title">{title}</h2>
	<p class="section-header__description">{description}</p>

	<IconDots variant="heading-two" />

	{#if link}
		<RLink href={link.href} class="button-outline-white">{link.label}</RLink>
	{/if}
</article>
```

Props are used for title, description and link

### Usage Examples
```svelte
<CardSection
	title="Wat zijn Associate degrees en hoe sluit het aan bij jou wensen?"
	{description}
	link={{ label: "Meer over Ad's", href: '/over-ad' }}
/>
```


