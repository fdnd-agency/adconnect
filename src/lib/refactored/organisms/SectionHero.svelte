<script>
	import { RCardHero, RLink, RPicture } from '$lib'
	const { sectionInfo, primaryLink, secondaryLink, picture, backgroundColor } = $props()
</script>

<section class={`hero ${backgroundColor ? `hero--${backgroundColor}` : ''}`}>
	<RCardHero
		title={sectionInfo.title}
		description={sectionInfo.description}
	>
		{#if primaryLink}
			<RLink
				href={primaryLink.href}
				class="button-outline-white">{primaryLink.label}</RLink
			>
		{/if}

		{#if secondaryLink}
			<RLink
				href={secondaryLink.href}
				class="button-outline-blue">{secondaryLink.label}</RLink
			>
		{/if}
	</RCardHero>

	{#if picture}
		<section class="hero__media">
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
	.hero {
		--_background: light-dark(var(--primary-blue), hsl(210, 30%, 8%));

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2em;
		padding: 3em 5% 0;
		width: 100%;
		background-color: var(--_background);

		@media (min-width: 1024px) {
			flex-direction: row;
			justify-content: center;
			gap: 5em;
			padding-top: 5em;
		}
	}

	.hero--blue {
		--_background: light-dark(var(--text-white), var(--blue-800));
	}

	.hero__media {
		width: 100%;
		max-width: 640px;
		max-height: 400px;
		border-radius: 1em 1em 0 0;
		overflow: hidden;
	}
</style>
