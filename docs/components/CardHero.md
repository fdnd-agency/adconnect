# CardHero.svelte Component Documentation
## Overview
This is the first title, description, and text you see on every page.  
The component consists of a breadcrumb menu that shows which page the user is currently on. Below that is an h1 element with the page title, followed by a description.  
In some cases, one or more buttons are needed; these are optional.


<details>
<summary>Examples:</summary>

<img width="996" height="420" alt="Image" src="https://github.com/user-attachments/assets/ed5c5acd-93d8-4f67-94f9-941bd4c46ec3" />
<img width="955" height="441" alt="Image" src="https://github.com/user-attachments/assets/21aa74c0-9c8c-4f9a-a6a5-bbb2e495ad0e" />
<img width="1015" height="453" alt="Image" src="https://github.com/user-attachments/assets/fccfed12-b873-4b2f-acc1-639e756d55db" />
</details>


---

## Component Structure
```svelte
<script>
	import { Breadcrumb } from '$lib'
	const { title, description, children } = $props()
</script>

<Breadcrumb />
<article class="page-header">
	<h1 class="page-header__title">{title}</h1>
	<p class="page-header__description">{description}</p>

	{#if children}
		<div class="page-header__buttons">
			{@render children()}
		</div>
	{/if}
</article>
```
- with props you decide the title and description when using the component
- The optional links are added when the component is called. They are rendered using `{@render children()}`
  - you write them using the `Link.svelte` component, usage example bellow

### Usage Examples
```svelte
<CardHero
	title="Wat zijn Associate degrees en hoe sluit het aan bij jou wensen?"
	{description}
>
	<RLink
		href="/over-ad"
		class="button-outline-blue same-width">Meer over Ad's</RLink
	>
	<RLink
		href="/ad-dag"
		class="button-outline-white same-width">Kom naar de Ad-dag</RLink
	>
</CardHero>
```

