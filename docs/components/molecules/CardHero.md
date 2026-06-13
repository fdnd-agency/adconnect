# CardHero.svelte Component Documentation
## Overview
The CardHero component (CardHero.svelte) renders a page header with a breadcrumb, title, and description. It optionally accepts child content (typically buttons or links) rendered in a wrapping row below the text.

<details>
	<summary>Example</summary>

<img width="1050" height="480" alt="image" src="https://github.com/user-attachments/assets/31d609b5-df4a-4c65-b28a-7c8418cb477e" />
<img width="1056" height="548" alt="image" src="https://github.com/user-attachments/assets/93a04dab-d709-483e-b368-11180b8bb30f" />

</details>

---

## Component Structure
### Script
```svelte
<script>
	import { Breadcrumb } from '$lib'
	const { title, description, children } = $props()
</script>
```
Props:
- `title` - The page heading
- `description` - The supporting text below the heading
- `children` (optional) - Slot content rendered in a button row; omitted when not passed

---

### HTML
```svelte
<div>
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
</div>
```
> The button row only renders when children are passed.
### Usage Examples
The data is passed down from SectionHero, which bundles it into objects.  
`label` is the button text; `screenReaderText` is hidden text for screen readers; the rest are self-explanatory.
```svelte
sectionInfo = { title, description }
primaryLink = { label, href, screenReaderText }
secondaryLink = { label, href, screenReaderText }
```
Example: a hero card with two links as children
```svelte
<CardHero
	title="Landelijke Ad-dag 2025"
	description="Een dag vol inspiratie, ontmoetingen en praktijkvoorbeelden rondom de Associate degree."
>
	<Link
		href="/ad-dag"
		class="button-outline-white"
		screenReaderText="Meld je aan voor de Landelijke Ad-dag"
	>
		Kom naar de Ad-dag
	</Link>

	<Link
		href="/over-ad"
		class="button-outline-blue"
		screenReaderText="Lees meer over Associate degrees"
	>
		Meer over Ad's
	</Link>
</CardHero>
```
