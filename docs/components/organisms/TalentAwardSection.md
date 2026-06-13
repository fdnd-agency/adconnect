# TalentAwardSection.svelte Component Documentation

## Overview

The TalentAwardSection component (TalentAwardSection.svelte) composes the Talent Award overview: a separator, the previous winners (TalentWinner component), a centered intro card (CardSection component), and a carousel of previous nominations (Carousel component). It's mostly a layout wrapper that passes the page `data` down to its children.

<details>
	<summary>Example</summary>

<img width="1930" height="1052" alt="image" src="https://github.com/user-attachments/assets/77ef1af7-3ed9-46df-8b47-5efcd3fdc90a" />

</details>

---

## Component Structure

### Script

```svelte
<script>
	import { TalentWinner, Separator, CardSection, Carousel } from '$lib'
	const { data } = $props()
</script>
```

Props:

- `data` - Object holding the page data, forwarded to the children
  - `nominations` - Array of nomination objects, passed to `Carousel` (and read by `TalentWinner`)
  - `cooperations` - Lookup list passed to `Carousel` to resolve institution logos

> This component reads little itself; it hands `data` to `TalentWinner` and pulls `nominations` and `cooperations` out for the `Carousel`.

---

### HTML

```svelte
<section>
	<Separator dividerText="Voorgaande talent award winnaars" />

	<!-- previous winners, filtered internally from data.nominations -->
	<TalentWinner {data} />

	<!-- static intro card -->
	<CardSection
		title="Voorgaande nominaties"
		description="Ontdek de talentvolle studenten die zijn genomineerd voor de AD Talent Award..."
		centered
	/>

	<!-- carousel of all nominations -->
	<Carousel
		nominations
		carouselItems={data.nominations}
		cooperations={data.cooperations}
		dividerText="Voorgaande nominaties"
	/>
</section>
```

> The `CardSection` content is static; the winners and the carousel are data-driven.
> `Carousel` runs in `nominations` mode and uses `cooperations` to resolve each nomination's institution logo.

### Usage Examples

The component receives the page's `data` object directly and distributes it:

```svelte
data = { nominations: [...], cooperations: [...] }
```

Example: the Talent Award overview page

```svelte
<TalentAwardSection {data} />
```

### CSS

This component is a simple centered column with no dynamic styling.

```svelte
<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
	}
</style>
```
