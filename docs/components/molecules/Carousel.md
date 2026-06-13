# Carousel.svelte Component Documentation

## Overview

The Carousel component (Carousel.svelte) renders an auto-scrolling, infinitely looping carousel between two separators. It works in two modes: a `logos` mode showing clickable partner logos, and a `nominations` mode showing linked names with a hover-revealed photo and an optional institution logo. Both modes pull their images from Directus, and the track pauses on hover.

---

## Component Structure

### Script

```svelte
<script>
	import { Link, Picture, Separator } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'

	const { carouselItems = [], logos = false, nominations = false, dividerText, backgroundBlack = false, cooperations = [], nominationHrefBase = '/talent-award/nominaties', noMargin } = $props()

	const imageUrl = (id) => `${DIRECTUS_URL}/assets/${id}`
	// ...resolveCooperation + helpers
</script>
```

Props:
- `carouselItems` (default `[]`) - Array of items to render; shape depends on the active mode
  - logos mode: each item has `id`, `url`, `logo` (asset id), and `name`
  - nominations mode: each item has `id`, `title`, `slug`, optional `institution`, and optional `profile_picture`
- `logos` (default `false`) - Renders each item as a linked logo
- `nominations` (default `false`) - Renders each item as a linked name with a hover photo
- `dividerText` (optional) - Label shown in the top separator
- `backgroundBlack` (default `false`) - Applies a dark background color to the section
- `cooperations` (default `[]`) - Lookup list used to resolve a nomination's institution to its logo and name
- `nominationHrefBase` (default `/talent-award/nominaties`) - Base path for nomination links (`{base}/{slug ?? id}`)
- `noMargin` (optional) - Removes the section's default vertical margin

> `logos` and `nominations` select the render mode; pass exactly one.
> `resolveCooperation` matches a nomination's `institution` against `cooperations` (by id or name) to find its logo; `imageUrl` builds the Directus asset URL from an id.

---

### HTML

```svelte
<!-- one logo: a linked image that opens in a new tab -->
{#snippet logoItem(logo)}
	<li class="carousel__item">
		<Link target="_blank" href={logo.url}>
			<div class="carousel__logo">
				<Picture
					src="{DIRECTUS_URL}/assets/{logo.logo}"
					alt={logo.name}
					width="350"
					height="65"
					style="object-fit: contain;"
				/>
			</div>
		</Link>
	</li>
{/snippet}

<!-- one nomination: name + optional institution logo, linking to its detail page -->
{#snippet nominationItem(item)}
	<!-- look up the institution's logo/name, and build the detail link -->
	{@const cooperation = resolveCooperation(item.institution)}
	{@const nominationHref = `${nominationHrefBase}/${item.slug ?? item.id}`}
	<li class="carousel__item nomination">
		<a class="nomination__link" href={nominationHref}>
			<p class="nomination__name">{item.title}</p>

			<!-- only shown when the institution was resolved -->
			{#if cooperation?.logo}
				<img
					class="nomination__institution-logo"
					src={imageUrl(cooperation.logo?.id ?? cooperation.logo)}
					alt={cooperation?.name ?? 'Institution logo'}
				/>
			{/if}
		</a>

		<!-- photo revealed on hover; only rendered when present -->
		{#if item.profile_picture}
			<div class="nomination__photo">
				<Picture
					src={imageUrl(item.profile_picture.id ?? item.profile_picture)}
					alt={item.title}
					width="150"
					height="150"
				/>
			</div>
		{/if}
	</li>
{/snippet}

<section
	class="logo-section"
	class:logo-section--background-black={backgroundBlack}
	class:noMargin
>
	<Separator {dividerText} noMargin />

	<div class="carousel">
		<!-- --item-count drives the scroll speed -->
		<ul
			class="carousel__track"
			style={`--item-count: ${carouselItems?.length ?? 0}`}
		>
			<!-- items are duplicated so the loop scrolls seamlessly -->
			{#each [...(carouselItems ?? []), ...(carouselItems ?? [])] as item, index (`${item.id}-${index}`)}
				<!-- pick the snippet based on the active mode -->
				{#if logos}
					{@render logoItem(item)}
				{:else if nominations}
					{@render nominationItem(item)}
				{/if}
			{/each}
		</ul>
	</div>

	<Separator noMargin />
</section>
```

### Usage Examples

The parent passes the data list and selects a mode. `data.nominations` and `cooperations` come from the page load:

```svelte
nomination = { id, title, slug, institution, profile_picture }
logo       = { id, url, logo, name }
```

Example: a nominations carousel

```svelte
<Carousel
	nominations
	carouselItems={data.nominations}
	dividerText="Voorgaande nominaties"
/>
```

Example: a logo carousel of partners

```svelte
<Carousel
	logos
	carouselItems={cooperations}
	dividerText="Partijen waarmee wij samenwerken"
/>
```

### CSS

The dynamic/optional styling: the dark background and `noMargin` toggles, the speed-driven scroll animation, plus the hover and motion behaviours that aren't standard layout.

```svelte
<section
	class="logo-section"
	<!-- toggled by the backgroundBlack prop -->
	class:logo-section--background-black={backgroundBlack}
	<!-- toggled by the noMargin prop -->
	class:noMargin
>

<style>
	.noMargin {
		margin: 0;  /* removes the default 4em vertical margin */
	}

	.logo-section--background-black {
		/* dark background: blue-100 in light mode, near-black in dark mode */
		--_background: light-dark(var(--blue-100), hsl(210, 30%, 8%));
	}

	.carousel__track {
		/* scroll duration scales with the number of items */
		animation: scroll calc(max(var(--item-count, 1), 1) * 5s) linear infinite;
	}

	.carousel:hover .carousel__track {
		animation-play-state: paused;  /* pause scrolling on hover */
	}

	.carousel__logo {
		/* logos start greyed out, full color on hover */
		--_filter: grayscale(100%) brightness(0.8);
		--_opacity: 0.8;

		&:hover {
			--_filter: grayscale(0%) brightness(1);
			--_opacity: 1;
		}
	}

	.nomination__photo {
		/* photo hidden by default, slides up into view on hover of its item */
		--_opacity: 0;
		--_translate-y: 10px;
	}

	.nomination:hover .nomination__photo {
		--_opacity: 1;
		--_translate-y: 0;
	}

	@media (prefers-color-scheme: dark) {
		/* invert logos so they stay visible on the dark background */
		.carousel__logo {
			--_filter: grayscale(100%) brightness(0) invert(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		/* stops the auto-scroll for users who prefer reduced motion */
		.carousel__track {
			animation: none;
		}
	}
</style>
```
