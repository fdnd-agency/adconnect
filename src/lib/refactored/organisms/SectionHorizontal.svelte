<script>
	import { RCardSection, RLink, RPicture } from '$lib'
	import { IconBackgroundCircle } from '$lib/icons'
	const { sectionInfo, primaryLink, picture } = $props()
</script>

<section class="container">
	<RCardSection
		title={sectionInfo.title}
		description={sectionInfo.description}
		link={primaryLink}
	/>

	{#if picture}
		<div class="background-img">
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
		</div>
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
		overflow: hidden;
		justify-content: center;

		@media (min-width: 1024px) {
			flex-direction: row;
			gap: 3em;
			padding: 5em 2em;
		}

		@media (min-width: 1375px) {
			gap: 5em;
			padding: 5em 0;
		}
	}

	.hero-media {
		width: 100%;
		max-width: 640px;
		max-height: 400px;
		border-radius: 1em 1em 0 0;
		overflow: hidden;
		z-index: 10;
		position: relative;
	}

	.background-img {
		position: relative;
	}

	.background-img::after {
		content: '';
		position: absolute;
		z-index: 1;

		height: 220px;
		width: 220px;
		border-radius: 50%;
		background-color: hsl(217deg 16.74% 84.58% / 15%);
		top: 16em;
		left: -5em;
	}
</style>
