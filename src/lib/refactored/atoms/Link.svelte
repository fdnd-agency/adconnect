# Link.svelte Component Documentation
## Overview
The Link component (Link.svelte) renders an anchor that automatically marks itself as active when its `href` matches the current page. It forwards any class and HTML attributes through to the anchor, and supports optional screen-reader-only text for accessibility, making it a shared link primitive used across navigation, footer, buttons, and more.
---
## Component Structure
### Script
```svelte
<script>
	import { page } from '$app/state'
	const { href, children, screenReaderText, class: className = '', ...props } = $props()
	let isCurrent = $derived(page.url.pathname === href)
</script>
```
Props:
- `href` - The link destination; also compared against the current path to set the active state
- `children` - Slot content rendered inside the link (the visible label)
- `screenReaderText` (optional) - Visually hidden text for screen readers, appended after the children
- `class` (optional) - Class string forwarded to the anchor; selects a style variant (e.g. `nav-link`, `footer-link`, `button-outline-white`)
- `...props` - All other HTML attributes (target, rel, aria-*, etc.) spread onto the anchor

> `isCurrent` compares `href` to the current pathname; when they match, the `active` class and `aria-current="page"` are added automatically.
---
### HTML
```svelte

	{href}
	{...props}
	class="{className}{isCurrent ? ' active' : ''}"
	aria-current={isCurrent ? 'page' : undefined}
>
	{@render children?.()}
	{#if screenReaderText}
		<span class="visually-hidden">{screenReaderText}</span>
	{/if}
</a>
```
> The `active` class is appended to whatever class is passed in; `aria-current` is only set on the current page.
> `screenReaderText` renders in a visually hidden span, so it's announced by screen readers but not shown.
### Usage Examples
Example: a button-styled link with screen-reader text
```svelte
<Link
	href={primaryLink.href}
	class="button-outline-white"
	screenReaderText={primaryLink.screenReaderText}
>
	{primaryLink.label}
</Link>
```
### CSS
The component ships several style variants selected via the `class` prop. The dynamic bit is the animated underline, driven by the `--_underline-width` custom property on hover and active state.
```svelte
<style>
	.nav-link {
		/* underline grows from 0 to full width on hover/active */
		--_underline-width: 0;

		&.desktop {
			/* desktop nav variant */
		}
		&.hamburger {
			/* mobile menu variant, underline disabled */
			&::after {
				all: unset;
			}
		}
		&::after {
			/* the animated underline */
			width: var(--_underline-width);
		}
		&:hover {
			--_underline-width: 100%;
		}
	}

	.active {
		/* current-page link keeps the underline fully expanded */
		--_underline-width: 100%;
	}

	.clickable-container::before {
		/* add position:relative to the link's container to make the whole container clickable */
		content: '';
		position: absolute;
		inset: 0;
		z-index: 10;
	}
</style>
```
