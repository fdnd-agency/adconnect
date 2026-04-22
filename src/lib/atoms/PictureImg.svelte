<script lang="ts">
	type LoadingType = 'lazy' | 'eager' | undefined
	let { srcset = undefined, width = undefined, height = undefined, alt = undefined, loading = 'lazy' as LoadingType, ...props } = $props()

	let attributes = []
	Object.entries(props).map(([key, value]) => {
		attributes.push(`${key}: ${value};`)
	})
	let style = attributes.join(' ')
</script>

{#if srcset}
	<picture>
		<source
			type="image/avif"
			{srcset}
		/>
		<source
			type="image/webp"
			{srcset}
		/>
		<img
			src={srcset}
			{width}
			{height}
			{alt}
			{loading}
			{style}
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
