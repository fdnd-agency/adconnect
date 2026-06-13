# Footer.svelte Component Documentation

## Overview

The Footer component (Footer.svelte) renders the site-wide footer: a logo, an about blurb, and collapsible columns for Menu, Thema's, and Contact links. On mobile the columns are `<details>` accordions; from 768px up they're always expanded. Only the Thema's column is data-driven; the rest are defined in the component.

<details>
	<summary>Example</summary>

<img width="2338" height="808" alt="image" src="https://github.com/user-attachments/assets/248734bc-b977-4c09-b9a5-c873baa5edc5" />

</details>

---

## Component Structure

### Script

```svelte
<script>
	import { logowhite, Link } from '$lib'
	import { IconLogo } from '$lib/icons'

	const { themaLinks = [] } = $props()

	const menuLinks = [ /* ...static menu links... */ ]
	const contactLinks = [ /* ...static contact links... */ ]
</script>
```

Props:

- `themaLinks` (default `[]`) - Array of `{ label, href }` link objects for the Thema's column, loaded from the database

> The `miniNavList` snippet is reused for every column, so any of the other lists (`menuLinks`, `contactLinks`) can later be swapped to come from the database the same way `themaLinks` does, when needed.

---

### HTML

```svelte
<!-- reusable link list, used by every footer column -->
{#snippet miniNavList(links)}
	<ul class="footer__list">
		{#each links as link (link.label)}
			<li class="footer__item">
				<Link target="_blank" href={link.href} class="footer-link">
					{link.label}
				</Link>
			</li>
		{/each}
	</ul>
{/snippet}

<footer class="footer">
	<div class="footer__inner">
		<a href="/" class="footer__logo" aria-label="Home">
			<IconLogo />
		</a>

		<!-- static about column -->
		<section class="footer__column footer__column--about">
			<h2 class="footer__heading">Overlegplatform Ad's</h2>
			<p>Het Overlegplatform Associate degrees brengt Ad-opleidingen samen...</p>
		</section>

		<!-- each column is a collapsible accordion on mobile -->
		<section class="footer__column">
			<details>
				<summary><h2 class="footer__heading">Menu</h2></summary>
				{@render miniNavList(menuLinks)}
			</details>
		</section>

		<!-- data-driven column -->
		<section class="footer__column">
			<details>
				<summary><h2 class="footer__heading">Thema's</h2></summary>
				{@render miniNavList(themaLinks)}
			</details>
		</section>

		<section class="footer__column">
			<details>
				<summary><h2 class="footer__heading">Contact</h2></summary>
				{@render miniNavList(contactLinks)}
			</details>
		</section>

		<div class="footer__divider"></div>

		<div class="footer__bottom">
			<p>© Overlegplatform Associate degrees. Alle rechten voorbehouden</p>
			<p>Ontwikkeld door studenten FDND</p>
		</div>
	</div>
</footer>
```

> Each column reuses the same `miniNavList` snippet, so adding a database driven list to Menu or Contact later only means passing in an array.  

### Usage Examples

The parent passes the database-loaded theme links:

```svelte
themaLink = { label, href }
```

```svelte
<Footer themaLinks={data.themaLinks} />
```
> The menuLinks & the contactLinks are hardcoded list inside the component for now, only themaLinks come from the database


### CSS

The dynamic styling is the accordion behaviour: columns collapse on mobile and are forced open from 768px up.

```svelte
<style>
	/* mobile: animate the column open/closed */
	::details-content {
		height: 0;
		overflow: clip;
		transition:
			height 0.5s ease,
			content-visibility 0.5s ease allow-discrete;
	}

	[open]::details-content {
		height: auto;
	}

	/* chevron flips between down and up when open */
	summary::after {
		content: url('/static/chevon-down.svg');
	}

	details[open] summary::after {
		content: url('/static/chevron-up.svg');
	}

	/* desktop: disable the accordion, always show every column */
	@media (min-width: 768px) {
		summary {
			pointer-events: none;
			cursor: default;
		}

		summary::after,
		details[open] summary::after {
			content: none;
		}

		::details-content {
			height: auto;
			content-visibility: visible;
			transition: none;
		}
	}
</style>
```
