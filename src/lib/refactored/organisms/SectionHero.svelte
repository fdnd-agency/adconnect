<script>
	import { RCardHero, RLink, RPicture } from '$lib'
	const { sectionInfo, primaryLink, secondaryLink, picture, backgroundBlue } = $props()
</script>

<section class="container" class:backgroundBlue>
	<RCardHero
		title={sectionInfo.title}
		description={sectionInfo.description}
	>
		{#if primaryLink}
			<RLink
				href={primaryLink.href}
				class="button-outline-white">{primaryLink.label}</RLink
			>{/if}

		{#if secondaryLink}
			<RLink
				href={secondaryLink.href}
				class="button-outline-blue">{secondaryLink.label}</RLink
			>{/if}
	</RCardHero>

	{#if picture}
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
	{/if}
</section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2em;
		padding: 3em 5% 0;
		width: 100%;
		background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));

		@media (min-width: 1024px) {
			flex-direction: row;
			justify-content: center;
			gap: 5em;
			padding-top: 5em;
		}
	}

	.backgroundBlue {
		background-color: light-dark(var(--text-white), var(--blue-800));
	}

	.hero-media {
		width: 100%;
		max-width: 640px;
		max-height: 400px;
		border-radius: 1em 1em 0 0;
		overflow: hidden;
	}
</style>
