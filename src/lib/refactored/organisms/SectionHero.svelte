<script>
	import { RCardHero, RLink, RPicture } from '$lib'
	const { sectionInfo, primaryLink, secondaryLink, picture } = $props()
</script>

<section class="container">
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

	<section class="hero-media">
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
</section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-self: center;
		justify-self: center;
		gap: 2em;
		padding-top: 3em;

		@media (min-width: 1024px) {
			flex-direction: row;
			gap: 5em;
			padding-top: 5em;
		}
	}

	.hero-media {
		width: 100%;
		max-width: 640px;
		height: 400px;
		border-radius: 1em 1em 0 0;
		overflow: hidden;
	}
</style>
