<script lang="ts">
	type LoadingType = 'lazy' | 'eager' | undefined
	type FetchType = 'high' | 'low' | 'auto'
	let { isEnhanced = false, src = undefined, width, height, alt = undefined, fetchpriority = 'auto' as FetchType, loading = 'lazy' as LoadingType, ...props } = $props()
</script>

{#if src && isEnhanced}
	<enhanced:img
		class="enhanced-img"
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

<style>
	picture,
	enhanced\:img {
		object-fit: cover;
		display: block;
		width: 100%;
	}

	picture img {
		width: 100%;
	}
</style>
