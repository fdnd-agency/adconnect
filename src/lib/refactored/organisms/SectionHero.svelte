<script>
	import { RCardHero, RLink, RPicture } from '$lib'
	const { sectionInfo, primaryLink, secondaryLink, picture } = $props()
</script>

<section>
	<RCardHero
		title={sectionInfo.title}
		description={sectionInfo.description}
	>
		{#if primaryLink}
			<RLink
				href={primaryLink.href}
				class="button-outline-blue">{primaryLink.label}</RLink
			>{/if}

		{#if secondaryLink}
			<RLink
				href={secondaryLink.href}
				class="button-outline-white">{secondaryLink.label}</RLink
			>{/if}
	</RCardHero>

	<RPicture
		isEnhanced={picture.isEnhanced}
		src={picture.src}
		alt={picture.alt}
		width={picture.width}
		height={picture.height}
		fetchpriority={picture.fetchpriority}
		loading={picture.loading}
	/>
</section>
