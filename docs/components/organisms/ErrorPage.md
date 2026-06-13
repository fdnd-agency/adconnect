# ErrorPage.svelte Component Documentation

## Overview

The ErrorPage component (ErrorPage.svelte) renders a full error/fallback page with its own header, navigation, footer, and a list of links to the working pages, alongside an illustration. All text defaults to error messaging built from the current `page.status`, but every piece can be overridden via props, so it doubles as a generic "page unavailable" screen.

---

## Component Structure

### Script

```svelte
<script>
	import { page } from '$app/state'
	import { NavPros, TopNav, bird, Footer, Picture } from '$lib'

	const {
		title = `Error ${page.status} | Overlegplatform Associate Degrees`,
		heading = `Oeps ${page.status} error`,
		description = "De pagina die je probeert te bereiken lijkt niet te bestaan. Navigeer naar een van onze werkende pagina's hieronder."
	} = $props()
</script>
```

Props:

- `title` (optional) - Document `<title>`; defaults to an error title built from `page.status`
- `heading` (optional) - The visible page heading; defaults to an error heading built from `page.status`
- `description` (optional) - The supporting text; defaults to the "page not found" message

> All three props default to status-based error text, so calling `<ErrorPage />` with no props yields a complete error screen; passing them overrides it for other uses (e.g. a "page in development" screen).

---

### HTML

```svelte
<svelte:head>
	<title>{title}</title>
</svelte:head>

<header class="general-header">
	<TopNav />
</header>

<NavPros />

<div class="wrapper-error" id="main">
	<section>
		<h1>{heading}</h1>
		<p>{description}</p>

		<!-- static links to the working pages -->
		<ul>
			<li><a href="/over-ad">Over Ad's</a></li>
			<li><a href="/publicaties">Publicaties</a></li>
			<li><a href="/talent-award">Talent Award</a></li>
			<li><a href="/nieuws">Nieuws</a></li>
			<li><a href="/talent-award/nominaties">Nominaties</a></li>
			<li><a href="/over-ons">Over ons</a></li>
			<li><a href="/contact">Contact</a></li>
		</ul>
	</section>

	<!-- illustration -->
	<div class="img-container">
		<Picture
			isEnhanced
			src={bird}
			alt="Een vogel in een pak met een bril die een boek vasthoudt"
			width="300px"
			height="300px"
			fetchpriority="high"
			loading="eager"
			style="height:auto;"
		/>
	</div>
</div>

<Footer />
```

> This is a full page, not a fragment: it brings its own `TopNav`, `NavPros`, and `Footer`.
> The link list is hardcoded to the site's main working pages.

### Usage Examples

Example: the default error page (used as the route fallback)

```svelte
<ErrorPage />
```

Example: reused as a "page in development" screen by overriding the text

```svelte
<ErrorPage
	title="Pagina in ontwikkeling | Overlegplatform Associate Degrees"
	heading="Deze pagina is in ontwikkeling"
	description="De pagina die je probeert te bereiken is op dit moment in ontwikkeling. Navigeer naar een van onze werkende pagina's hieronder."
/>
```

### CSS

This component is standard responsive layout with no dynamic or conditional styling; the only notable rule is the link hover color.

```svelte
<style>
	.wrapper-error a:hover {
		color: var(--primary-orange);  /* links turn orange on hover */
	}
</style>
```
