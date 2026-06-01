<script>
	import { RCardSection, RLink, RPicture } from '$lib'
	import { IconBackgroundCircle } from '$lib/icons'
	const { sectionInfo, primaryLink, picture, mirrored, backgroundBlack, vertical } = $props()
</script>

<section
	class="media-section"
	class:media-section--mirrored={mirrored}
	class:media-section--background-black={backgroundBlack}
	class:media-section--vertical={vertical}
>
	<RCardSection
		title={sectionInfo.title}
		description={sectionInfo.description}
		link={primaryLink}
	/>

	{#if picture}
		<div class="media-section__media-wrapper">
			<section class="media-section__media">
				<RPicture
					isEnhanced={picture.isEnhanced}
					src={picture.src}
					alt={picture.alt}
					width={picture.width}
					height={picture.height}
					fetchpriority={picture.fetchpriority}
					loading={picture.loading}
					style="height:auto;"
				/>
			</section>
		</div>
	{/if}
</section>

<style>
	.media-section {
		--_background: transparent;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2em;
		padding: 3em 5% 0;
		width: 100%;
		overflow: hidden;
		background-color: var(--_background);

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

	.media-section--mirrored {
		@media (min-width: 1024px) {
			flex-direction: row-reverse;
		}
	}

	.media-section--background-black {
		--_background: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
	}

	.media-section--vertical {
		flex-direction: column;
		padding: 5em 2em;

		.media-section__media {
			max-width: 1000px;
		}
	}

	.media-section__media-wrapper {
		position: relative;

		&::after {
			content: '';
			position: absolute;
			z-index: 1;
			top: 16em;
			left: -5em;
			width: 220px;
			height: 220px;
			border-radius: 50%;
			background-color: hsl(217deg 16.74% 84.58% / 15%);
		}
	}

	.media-section__media {
		position: relative;
		z-index: 10;
		width: 100%;
		max-width: 640px;
		max-height: 400px;
		border-radius: 1em;
		overflow: hidden;
	}
</style>
