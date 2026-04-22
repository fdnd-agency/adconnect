<script lang="ts">
	type LoadingType = 'lazy' | 'eager' | undefined
	let { srcset = undefined, width = undefined, height = undefined, alt = undefined, loading = 'lazy' as LoadingType, ...props } = $props()

	let attributes = []
	Object.entries(props).map(([key, value]) => {
		attributes.push(`${key}: ${value};`)
	})
	let style = attributes.join(' ')

	// let style = []
	// Object.entries(props).map(([key, value]) => {
	// 	let allStyles = style.push(`${key}: ${value};`)

	// 	console.log(`pair: ${key}: ${value};`)
	// })

	// style = style.join(" ")

	// let style = undefined
	// styles.forEach((attribute) => {
	// 	style = `${attribute}`
	// 	// console.log(`attr: ${attribute}`)
	// })
	// style.forEach

	// let style = undefined
	// if (props) {
	// 	// style = `border-radius: ${props.borderRadius};`

	// 	props.forEach((attribute) => {
	// 		style = `border-radius: ${attribute};`
	// 	})

	// 	console.log(props)
	// }
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
