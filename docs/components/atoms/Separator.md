# Separator.svelte Component Documentation
## Overview
The Separator component (Separator.svelte) renders a horizontal divider line. When given text, it centers the label between two lines; without text, it shows a single full-width line. An optional `noMargin` prop removes the default vertical spacing.

<details>
	<summary>Example</summary>

<img width="1920" height="144" alt="image" src="https://github.com/user-attachments/assets/e799bffc-8a2f-4424-bb0d-33fbcdd5d6b8" />
<img width="2394" height="224" alt="image" src="https://github.com/user-attachments/assets/1e5fa49f-0bb3-4b17-a8a7-de76dec2ee71" />

</details>

---

## Component Structure
### Script
```svelte
<script lang="ts">
	const { dividerText, noMargin } = $props()
</script>
```
Props:
- `dividerText` (optional) - Label shown centered between two lines; without it, a single line is rendered
- `noMargin` (optional) - Removes the default vertical margin around the separator

---

### HTML
```svelte
<section class:noMargin>
	<hr />
	{#if dividerText}
		<p>{dividerText}</p>
		<span></span>
	{/if}
</section>
```
> Without `dividerText`, only the `<hr />` renders as a single line.
> With `dividerText`, the text sits between the `<hr />` and the `<span>`, giving a line–label–line layout.
### Usage Examples
Example: a separator with a centered label
```svelte
<Separator dividerText="Het laatste nieuws" />
```
Example: a plain separator without vertical margin
```svelte
<Separator noMargin />
```
Example: a plain full-width separator
```svelte
<Separator />
```
### CSS
The only dynamic styling is the `noMargin` toggle; the rest is standard layout.
```svelte
<section
	class="..."
	<!-- toggled by the noMargin prop -->
	class:noMargin
>

<style>
	.noMargin {
		margin: 0;  /* removes the default 3em vertical margin */
	}
</style>
```
