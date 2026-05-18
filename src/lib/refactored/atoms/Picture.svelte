<script lang="ts">
	type LoadingType = 'lazy' | 'eager' | undefined
	type FetchType = 'high' | 'low' | 'auto'
	let { isEnhanced = false, src = undefined, width, height, alt = undefined, fetchpriority = 'auto' as FetchType, loading = 'lazy' as LoadingType, ...props } = $props()

	let hidden = alt === undefined ? true : undefined
</script>

{#if src && isEnhanced}
	<enhanced:img
		class="enhanced-img"
		{src}
		{alt}
		{loading}
		{fetchpriority}
		{...props}
		aria-hidden={hidden}
	/>
{:else if src}
	<picture class="picture-img">
		<source
			type="image/avif"
			srcset={`${src}?format=avif`}
		/>
		<img
			{src}
			{width}
			{height}
			{alt}
			{loading}
			{fetchpriority}
			{...props}
			aria-hidden={hidden}
		/>
	</picture>
{/if}

<style>
	.picture-img,
	.enhanced-img {
		display: block;
		width: 100%;
		object-fit: cover;
	}

	.picture-img img {
		width: 100%;
	}
</style>
