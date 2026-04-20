<script>
	import { Hero } from '$lib'

	import { DIRECTUS_URL } from '$lib/constants.js'

	export let data

	const sourceFileId = data?.document?.source_file?.id ?? data?.document?.source_file ?? null
</script>

<svelte:head>
	<title>Documenten | Overlegplatform Associate Degrees</title>
</svelte:head>

<Hero
	title={data.document.title}
>
	<img
		class="hero-image"
		src={`${DIRECTUS_URL}/assets/${data.document.hero_image}?format=webp`}
		alt={data.document.title}
		aria-hidden="true"
		fetchpriority="high"
	/>
</Hero>

<div class="wrapper-detail">
	<div class="detail">
		<p>{data.document.description}</p>
		{#if sourceFileId}
			<div class="file">
				<p>
					Hieronder een preview van het document of bekijk <a
						target="_blank"
						href={`${DIRECTUS_URL}/assets/${sourceFileId}`}>hier</a
					> het hele document
				</p>
				<iframe
					title={data.document.title}
					src={`${DIRECTUS_URL}/assets/${sourceFileId}`}
				></iframe>
			</div>
		{/if}
	</div>

	<div class="wrapper-ad-day">
		<section class="ad-day">
			<h2>Kom naar de Ad-dag!</h2>
			<p>Ontdek alles over Associate Degrees en laat je inspireren tijdens workshops en presentaties op de Landelijke Ad-dag.</p>
			<a
				href="/ad-dag"
				class="button-outline-white">Meer weten over de Ad-dag</a
			>
		</section>
	</div>
</div>

<style>
	.wrapper-detail {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 90%;
		padding: 3em 0;
		max-width: 1400px;
		margin: auto;
	}

	.detail {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	@media (min-width: 768px) {
		.wrapper-detail {
			flex-direction: row;
			gap: 2em;
			padding: 5em 0;
		}

		.detail {
			width: 55%;

			:global(p) {
				max-width: unset;
			}

			@media (min-width: 1024px) {
				width: 65%;
			}
		}
	}

	.file {
		display: flex;
		flex-direction: column;
		align-items: baseline;
		gap: 1em;

		iframe {
			height: 30em;
		}
	}

	@media (min-width: 1024px) {
		.wrapper-detail {
			gap: 5em;
		}
	}

	:global(.detail img) {
		width: 100%;
		max-width: 70%;
		object-fit: cover;
		border-radius: 1em;
	}

	@media (min-width: 768px) {
		.wrapper-ad-day {
			width: 50%;
		}
	}

	@media (min-width: 1024px) {
		.wrapper-ad-day {
			width: 30%;
		}
	}

	.ad-day {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 2em;
		background-color: var(--primary-blue);
		@media (prefers-color-scheme: dark) {
			background-color: hsl(210, 30%, 8%);
		}
		@supports (color-scheme: light-dark(red, blue)){
			background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
		}
		color: var(--text-white);
		border-radius: 1em;

		h2 {
			color: var(--text-white);
			font-size: var(--h4-size);
		}

		a:hover {
			color: var(--text-darkblue);
			background-color: var(--text-white);
		}
	}

	@media (min-width: 768px) {
		.ad-day {
			position: sticky;
			top: 10em;
		}
	}
</style>
