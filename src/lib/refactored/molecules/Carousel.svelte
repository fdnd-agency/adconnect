<script>
	import { Link, Picture, Separator } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'

	const { carouselItems = [], logos = false, nominations = false, dividerText, backgroundBlack = false, cooperations = [], nominationHrefBase = '/talent-award/nominaties', noMargin } = $props()

	const imageUrl = (id) => `${DIRECTUS_URL}/assets/${id}`

	const normalizeInstitutionKey = (value) =>
		String(value ?? '')
			.trim()
			.toLowerCase()

	const resolveCooperation = (institution) => {
		if (!institution) return null

		if (typeof institution === 'object') {
			if (institution.logo || institution.name || institution.id) return institution
			if (institution.adconnect_cooperation_id) return institution.adconnect_cooperation_id
		}

		const key = normalizeInstitutionKey(institution)
		if (!key) return null

		return (
			cooperations?.find((cooperation) => {
				const id = normalizeInstitutionKey(cooperation?.id)
				const name = normalizeInstitutionKey(cooperation?.name)
				return key === id || (name && key === name)
			}) ?? null
		)
	}
</script>

{#snippet logoItem(logo)}
	<li class="carousel__item">
		<Link
			target="_blank"
			href={logo.url}
		>
			<div class="carousel__logo">
				<Picture
					src="{DIRECTUS_URL}/assets/{logo.logo}"
					alt={logo.name}
					width="350"
					height="65"
					style="object-fit: contain;"
				/>
			</div>
		</Link>
	</li>
{/snippet}

{#snippet nominationItem(item)}
	{@const cooperation = resolveCooperation(item.institution)}
	{@const nominationHref = `${nominationHrefBase}/${item.slug ?? item.id}`}
	<li class="carousel__item nomination">
		<a
			class="nomination__link"
			href={nominationHref}
		>
			<p class="nomination__name">{item.title}</p>

			{#if cooperation?.logo}
				<img
					class="nomination__institution-logo"
					src={imageUrl(cooperation.logo?.id ?? cooperation.logo)}
					alt={cooperation?.name ?? 'Institution logo'}
				/>
			{/if}
		</a>

		{#if item.profile_picture}
			<div class="nomination__photo">
				<Picture
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
	class:logo-section--background-black={backgroundBlack}
	class:noMargin
>
	<Separator
		{dividerText}
		noMargin
	/>

	<div class="carousel">
		<ul
			class="carousel__track"
			style={`--item-count: ${carouselItems?.length ?? 0}`}
		>
			{#each [...(carouselItems ?? []), ...(carouselItems ?? [])] as item, index (`${item.id}-${index}`)}
				{#if logos}
					{@render logoItem(item)}
				{:else if nominations}
					{@render nominationItem(item)}
				{/if}
			{/each}
		</ul>
	</div>

	<Separator noMargin />
</section>

<style>
	.logo-section {
		--_background: transparent;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2em;
		width: 100%;
		padding: 0 0 3em 0;
		background-color: var(--_background);
		margin: 4em 0;

		@media (min-width: 768px) {
			gap: 3em;
			padding: 2.5em 0 2.5em 0;
		}
	}

	.noMargin {
		margin: 0;
	}

	.logo-section--background-black {
		--_background: light-dark(var(--blue-100), hsl(210, 30%, 8%));
	}

	.carousel {
		width: 90%;
		max-width: 1400px;
		overflow-x: clip;
		overflow-y: visible;
	}

	.carousel__track {
		display: flex;
		align-items: center;
		gap: 2rem;
		width: max-content;
		animation: scroll calc(max(var(--item-count, 1), 1) * 5s) linear infinite;
	}

	.carousel:hover .carousel__track {
		animation-play-state: paused;
	}

	.carousel__item {
		flex: 0 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
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
	}

	.nomination__link {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
		text-decoration: none;
		color: inherit;
		text-align: center;
		padding: 0.2rem 0.4rem;
		border-radius: 8px;
	}

	.nomination__link:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 3px;
	}

	.nomination__name {
		min-width: 200px;
		text-wrap: nowrap;
		font-size: var(--h3-size);
		line-height: var(--h3-line-height);
		max-width: var(--h3-max-width);
		font-weight: var(--heading-font-weight);
	}

	.nomination__institution-logo {
		height: 28px;
		max-width: 140px;
		width: auto;
		filter: grayscale(100%) brightness(0.85);
		opacity: 0.85;
	}

	.nomination__photo {
		--_opacity: 0;
		--_translate-y: 10px;

		position: absolute;
		bottom: 100%;
		left: 50%;
		width: 150px;
		opacity: var(--_opacity);
		transform: translateX(-50%) translateY(var(--_translate-y));
		pointer-events: none;
		transition: 0.2s ease;
		z-index: 2;
	}

	.nomination:hover .nomination__photo {
		--_opacity: 1;
		--_translate-y: 0;
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
			transform: translateX(-50%);
		}
	}
</style>
