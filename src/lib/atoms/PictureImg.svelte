<script lang="ts">
	type LoadingType = 'lazy' | 'eager' | undefined
	type FetchType = 'high' | 'low' | 'auto'
	let { enhance = false, src = undefined, width = undefined, height = undefined, alt = undefined, fetchpriority = 'auto' as FetchType, loading = 'lazy' as LoadingType, ...props } = $props()

	let hidden = alt === undefined ? true : undefined

	let attributes = []
	Object.entries(props).map(([key, value]) => {
		attributes.push(`${key}: ${value};`)
	})
	let style = attributes.join(' ')
</script>

{#if src && enhance}
	<enhanced:img
		{src}
		{alt}
		{loading}
		{style}
		{fetchpriority}
		aria-hidden={hidden}
	/>
{:else if src}
	<picture>
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
	picture,
	img {
		display: block;
		width: 100%;
	}

	img {
		object-fit: cover;
	}
</style>
