# Picture.svelte Component Documentation
## Overview
The Image component (Image.svelte) is a flexible image rendering component that handles modern image optimization.

For static images, it uses `<enhanced:img>` to generate multiple image formats from a single source image. For Directus images, it uses a `<picture>` element to provide similar optimized image handling.

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
- `isEnhanced` (optional, default is `false`)
  - Add `isEnhanced` to static images to automatically generate multiple image formats
- `src` - The image source URL
- `width` & `height` - Image width and height attributes
- `alt` (optional) - Alternative text for accessibility
  - Use meaningful alt text that describes the image content
- `fetchpriority` (optional, default is `'auto'`)
  - Set to `'high'` for hero images
- `loading` (optional, default is `'lazy'`)
  - Set to `'eager'` for images visible in the viewport on initial page load
- `...props` - All other HTML attributes (class, data-*, aria-*, etc.)
  - example: `style="border: 2px solid red; border-radius: 15px;"`
  - > considering to remove this, because we do this via containers when callinf this component

---

### HTML
The component uses conditional rendering to choose between two strategies:

Enhanced imaghes (when `isEnhanced` is true):
```svelte
<enhanced:img
	class="enhanced-img"
	{src}
	{alt}
	{loading}
	{fetchpriority}
	{...props}
/>
```
> Only use `isEnhanced` for images that are saved inside the repository (static images)
> Enhanced:img adds height & width automatically

Picture element:
```svelte
<picture>
	<source type="image/avif" srcset={`${src}?format=avif`} />
	<source type="image/jpeg" srcset={`${src}?format=jpeg`} />
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
```
> For images fetched from directus


### Usage Examples

Example: an image from directus outside of the viewport
```svelte
<Picture
	src="..."
	alt="..."
	width="1200"
	height="600"
/>
```

Example: an image inside the hero section
```svelte
<Picture
	isEnhanced
	src="..."
	alt="..."
	width="1200"
	height="600"
	fetchpriority="high"
	loading="eager"
/>
```

---

## CSS

### Component Styling
The component includes CSS to ensure that it fills its parent container.

```css
picture,
enhanced\:img {
	object-fit: cover;      /* Ensures image fills container while maintaining aspect ratio */
	display: block;         /* Removes inline spacing */
	width: 100%;            /* Picture element takes full width of the container it is in */
}

picture img {
	width: 100%;            /* Image element takes full width of the container it is in */
}
```

### Parent Styling
Style the Image component through its parent container when you need additional styling like rounded corners:
```svelte
<section class="hero-media">
	<Picture
		slot="media"
		isEnhanced
		src={zaal}
		alt="Een grote zaal vol mensen die op stoelen zitten en luisteren naar een spreker."
		fetchpriority="high"
		loading="eager"
		width="300"
		height="210"
	/>
</section>

<style>
	.hero-media {
		border-radius: 0.5em;
		overflow: hidden;
	}
</style>
```
- The `hero-media` container has rounded corners
- `overflow: hidden` clips the image to the rounded corners


