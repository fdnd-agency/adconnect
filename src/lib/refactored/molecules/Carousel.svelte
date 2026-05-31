<script>
	import { RLink, RPicture } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'
	const { carouselItems } = $props()
</script>

{#snippet logoItem(logo)}
	<li class="carousel__item">
		<RLink
			target="_blank"
			href={logo.url}
		>
			<div class="carousel__logo">
				<RPicture
					src="{DIRECTUS_URL}/assets/{logo.logo}"
					alt={logo.name}
					width="350"
					height="65"
					style="object-fit: contain;"
				/>
			</div>
		</RLink>
	</li>
{/snippet}

<div class="carousel">
	<ul class="carousel__track">
		{#each carouselItems as logo (logo.id)}
			{@render logoItem(logo)}
		{/each}
	</ul>
</div>

<style>
	.carousel {
		width: 90%;
		max-width: 1400px;
		overflow: hidden;
	}

	.carousel__track {
		display: flex;
		animation: scroll 10s linear infinite;
	}

	.carousel__item {
		flex: 0 0 33.3%;
		display: flex;
		justify-content: center;
		align-items: center;

		@media (min-width: 768px) {
			flex: 0 0 25%;
		}
	}

	.carousel__logo {
		--_filter: grayscale(100%) brightness(0.8);
		--_opacity: 0.8;

		width: 350px;
		height: 65px;
		filter: var(--_filter);
		opacity: var(--_opacity);
		transition:
			filter 0.3s ease,
			opacity 0.3s ease;

		&:hover {
			--_filter: grayscale(0%) brightness(1);
			--_opacity: 1;
		}
	}

	@media (prefers-color-scheme: dark) {
		.carousel__logo {
			--_filter: grayscale(100%) brightness(0) invert(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.carousel__track {
			animation: none;
		}
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-25%);
		}
	}
</style>
