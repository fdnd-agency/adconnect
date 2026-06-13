# Picture.svelte Component Documentation
## Overview
The Picture component (Picture.svelte) is a flexible image rendering component that handles modern image optimization. For static images, it uses `<enhanced:img>` to generate multiple image formats from a single source. For Directus images, it uses a `<picture>` element with AVIF and JPEG sources to provide similar optimized handling. Nothing renders when no `src` is provided.

---

## Component Structure
### Script
```svelte
<script lang="ts">
	type LoadingType = 'lazy' | 'eager' | undefined
	type FetchType = 'high' | 'low' | 'auto'
	let { isEnhanced = false, src = undefined, width, height, alt = undefined, fetchpriority = 'auto' as FetchType, loading = 'lazy' as LoadingType, ...props } = $props()
</script>
```
Props:
- `isEnhanced` (optional, default `false`) - Add to static images to automatically generate multiple image formats
- `src` - The image source URL; nothing renders if omitted
- `width` & `height` - Image dimensions (ignored by `enhanced:img`, which sets them automatically)
- `alt` (optional) - Alternative text for accessibility; use meaningful text describing the image
- `fetchpriority` (optional, default `'auto'`) - Set to `'high'` for hero images
- `loading` (optional, default `'lazy'`) - Set to `'eager'` for images in the initial viewport
- `...props` - All other HTML attributes (class, style, data-*, aria-*, etc.)

> Only use `isEnhanced` for images saved inside the repository (static images). Directus images go through the `<picture>` branch.

---

### HTML
The component conditionally renders one of two strategies based on `isEnhanced`, and renders nothing without a `src`.
```svelte
{#if src && isEnhanced}
	<enhanced:img
		{src}
		{alt}
		{loading}
		{fetchpriority}
		{...props}
	/>
{:else if src}
	<picture>
		<source
			type="image/avif"
			srcset={`${src}?format=avif`}
		/>
		<source
			type="image/jpeg"
			srcset={`${src}?format=jpeg`}
		/>
		<img
			{src}
			{width}
			{height}
			{alt}
			{loading}
			{fetchpriority}
			{...props}
		/>
	</picture>
{/if}
```
> `enhanced:img` adds width & height automatically and outputs multiple formats from the static source.
> The `<picture>` branch requests AVIF first, then falls back to JPEG, then to the plain `<img>`.
### Usage Examples
Example: an enhanced static image, sized by its parent container
```svelte
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

<style>
	.img-container {
		width: 20em;
		align-self: center;
	}
</style>
```
### CSS
The component fills its parent container; size and shape are controlled from the parent (as shown above).
```svelte
<style>
	picture,
	enhanced\:img {
		object-fit: cover;  /* fills container while keeping aspect ratio */
		display: block;     /* removes inline spacing */
		width: 100%;        /* takes full width of its container */
	}

	picture img {
		width: 100%;        /* image fills the picture element */
	}
</style>
```
