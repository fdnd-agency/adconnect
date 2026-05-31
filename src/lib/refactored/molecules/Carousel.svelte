<script>
	import { RLink, RPicture, Rseparator } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'
	const { carouselItems, logos, nominations, dividerText, backgroundBlack } = $props()
	const imageUrl = (id) => `${DIRECTUS_URL}/assets/${id}`
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

{#snippet nominationItem(item)}
	<li class="carousel__item nomination">
		<h3>{item.title}</h3>

		{#if item.profile_picture}
			<div class="profile-photo">
				<RPicture
					src={imageUrl(item.profile_picture.id ?? item.profile_picture)}
					alt={item.title}
					width="150"
					height="150"
				/>
			</div>
		{/if}
	</li>
{/snippet}

<section
	class="logo-section"
	class:background-black={backgroundBlack}
>
	<Rseparator {dividerText} />

	<div class="carousel">
		<ul class="carousel__track">
			{#each carouselItems as item (item.id)}
				{#if logos}
					{@render logoItem(item)}
				{:else if nominations}
					{@render nominationItem(item)}
				{/if}
			{/each}
		</ul>
	</div>

	<Rseparator />
</section>

<style>
	.background-black {
		background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
	}

	.logo-section {
		display: flex;
		gap: 2em;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 0 0 3em 0;

		@media (min-width: 768px) {
			gap: 3em;
			padding: 0 0 5em 0;
		}
	}

	.carousel {
		width: 90%;
		max-width: 1400px;
		overflow-x: clip;
		overflow-y: visible;
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
		cursor: pointer;

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

	.nomination {
		position: relative;
		margin-bottom: 3rem;
	}

	.nomination h3 {
		min-width: 200px;
		text-wrap: nowrap;
	}

	.profile-photo {
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%) translateY(10px);
		width: 150px;
		opacity: 0;
		pointer-events: none;
		transition: 0.2s ease;
	}

	.nomination:hover .profile-photo {
		opacity: 1;
		transform: translateX(-50%) translateY(0);
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
