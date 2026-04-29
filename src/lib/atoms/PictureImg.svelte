<script lang="ts">
	type LoadingType = 'lazy' | 'eager' | undefined
	type FetchType = 'high' | 'low' | 'auto'
	let {
		isEnhanced = false,
		isIcon = false,
		src = undefined,
		width = undefined,
		height = undefined,
		alt = undefined,
		fetchpriority = 'auto' as FetchType,
		loading = 'lazy' as LoadingType,
		...props
	} = $props()

	let hidden = alt === undefined ? true : undefined

	let attributes = []
	Object.entries(props).map(([key, value]) => {
		attributes.push(`${key}: ${value};`)
	})
	let style = attributes.join(' ')
</script>

{#if src && isEnhanced}
	<enhanced:img class="enhanced-img"
		{src}
		{alt}
		{loading}
		{style}
		{fetchpriority}
		aria-hidden={hidden}
	/>
{:else if src && isIcon}
	<img class="icon"
		{src}
		{alt}
		{width}
		{height}
	/>
{:else if src}
	<picture class="picture-img">
		<source
			type="image/avif"
			srcset={`${src}?format=avif`}
		/>
		<source
			type="image/webp"
			srcset={`${src}?format=webp`}
		/>
		<img
			{src}
			{width}
			{height}
			{alt}
			{loading}
			{style}
			{fetchpriority}
			aria-hidden={hidden}
		/>
	</picture>
{/if}

<style>
	.picture-img img {
		display: block;
		width: 100%;
	}

	.picture-img img, .enhanced-img {
		object-fit: cover;
	}
</style>
