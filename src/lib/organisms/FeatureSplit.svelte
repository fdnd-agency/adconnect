<script>
	import dots from '$lib/assets/dots.svg'
	import imageSrc from '$lib/assets/doorstroom-ad-dag.webp?enhanced'
	import { PictureImg } from '$lib'

	export let title = ''
	export let intro = ''
	/** @type {string[]} */
	export let bullets = []
	export let ctaText = ''
	export let ctaLink = '#'
	export let imageAlt = ''
</script>

<section class="feature">
	<div class="feature-content">
		<PictureImg
			src={dots}
			isIcon="true"
			width="80"
			height="60"
		/>

		<h2 class="feature-title">{title}</h2>

		{#if intro}
			<p class="feature-intro">{intro}</p>
		{/if}

		{#if bullets?.length}
			<ul class="feature-list">
				{#each bullets as item, i (i)}
					<li class="feature-list-item">
						<PictureImg
							src="/check-circle.svg"
							isIcon="true"
							width="17"
							height="17"
						/>
						<p>{item}</p>
					</li>
				{/each}
			</ul>
		{/if}

		{#if ctaText}
			<a
				href={ctaLink}
				class="button-outline-white">{ctaText}</a
			>
		{/if}
	</div>

	<div class="feature-media">
		{#if imageSrc}
			<PictureImg
				isEnhanced="true"
				src={imageSrc}
				alt={imageAlt}
				border-radius="33px"
			/>
		{/if}
	</div>
</section>

<style>
	.feature {
		display: flex;
		flex-direction: row;
		text-align: center;
		align-items: stretch;
		justify-content: center;
		padding-bottom: 5rem;
		max-width: 1400px;
		margin: auto;
		width: 90%;
	}

	.feature-content {
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 100%;
		gap: 1rem;

		h2,
		p {
			text-align: left;
		}
	}

	.feature-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.feature-list-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.75rem;
	}

	.feature-media {
		display: none;
		flex: 1;
		height: 100%;
	}

	@media (min-width: 768px) {
		.feature {
			gap: 3em;
		}
		.feature-content {
			width: 50%;
		}

		.feature-media {
			display: block;
			padding: 2rem;
			width: 50%;
		}

		.feature-img {
			max-height: 455px;
			width: 100%;
			border-radius: 33px;
			object-fit: cover;
		}
	}
</style>
