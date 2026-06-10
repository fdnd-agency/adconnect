# Carousel.svelte Component Documentation
## Overview
The Carousel component (Carousel.svelte) renders an auto-scrolling horizontal carousel between two separators. It works in two modes: a `logos` mode that shows clickable, linked partner logos, and a `nominations` mode that shows names with a profile photo that appears on hover. Both modes pull their images from Directus.

---

## Component Structure
### Script
```svelte
<script>
	import { RLink, RPicture, Rseparator } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'
	const { carouselItems, logos, nominations, dividerText, backgroundBlack } = $props()
	const imageUrl = (id) => `${DIRECTUS_URL}/assets/${id}`
</script>
```

Props:
- `carouselItems` - list of items to render
  - logos mode: each item has `id`, `url`, `logo` (asset id), and `name`
  - nominations mode: each item has `id`, `title`, and optional `profile_picture`
- `logos` - uses the logo snippet inside the carousel
- `nominations` - uses the nominations snippet
- `dividerText` (optional) - Label shown in the top separator
- `backgroundBlack` (optional) - Applies a dark background color to the section

---

### HTML
```svelte
{#snippet logoItem(logo)}
	<li class="carousel__item">
		<RLink
			target="_blank"
			href={logo.url}
		>
			<div class="carousel__logo">
				<RPicture
					src="{DIRECTUS_URL}/assets/{logo.logo}"
					alt={logo.name}
					width="350"
					height="65"
					style="object-fit: contain;"
				/>
			</div>
		</RLink>
	</li>
{/snippet}

{#snippet nominationItem(item)}
	<li class="carousel__item nomination">
		<p class="nomination__name">{item.title}</p>

		{#if item.profile_picture}
			<div class="nomination__photo">
				<RPicture
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
>
	<Rseparator {dividerText} />

	<div class="carousel">
		<ul class="carousel__track">
        <!-- depending on the prop, make a carousel for partner logo's, or for nominations -->
			{#each carouselItems as item (item.id)}
				{#if logos}
					{@render logoItem(item)}
				{:else if nominations}
					{@render nominationItem(item)}
				{/if}
			{/each}
		</ul>
	</div>

	<Rseparator />
</section>
```
-  each item is rendered through a snippet based on the prop
- Logos are links and open in a new tab
- nomination photos are hidden until their item is hovered.

### Usage Examples
Example: a logo carousel of partners
```svelte
<Carousel
	logos
	carouselItems={cooperation}
	dividerText="Partijen waarmee wij samenwerken"
/>
```
Example: a nominations carousel
```svelte
<Carousel
	nominations
	carouselItems={data.nominations}
	dividerText="Voorgaande nominaties"
/>
```

### CSS
The dynamic/optional styling: the dark background toggled by `backgroundBlack`, plus the hover and motion behaviours that aren't standard layout.
```svelte
<section
	class="logo-section"
	<!-- toggled by the backgroundBlack prop -->
	class:logo-section--background-black={backgroundBlack}
>

<style>
	.logo-section--background-black {
		/* dark background: blue-100 in light mode, near-black in dark mode */
		--_background: light-dark(var(--blue-100), hsl(210, 30%, 8%));
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
