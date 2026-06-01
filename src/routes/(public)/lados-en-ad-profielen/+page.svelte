<script>
	import { Hero, LadoInfoCard, LadosOverview, overleggen } from '$lib'

	const { data } = $props()
	const ladoPage = $derived(data.ladoPage ?? {})

	const infoCards = $derived([
		{
			title: ladoPage.lado_card_1_title,
			description: ladoPage.lado_card_1_body
		},
		{
			title: ladoPage.lado_card_2_title,
			description: ladoPage.lado_card_2_body
		},
		{
			title: ladoPage.lado_card_3_title,
			description: ladoPage.lado_card_3_body
		},
		{
			title: ladoPage.lado_card_4_title,
			description: ladoPage.lado_card_4_body
		}
	])
</script>

<svelte:head>
	<title>LAdO's en Ad-profielen | Overlegplatform Associate Degrees</title>
</svelte:head>

<Hero
	title={ladoPage.hero_heading}
	description={ladoPage.hero_body}
>
	<a
		slot="primary"
		href={ladoPage.hero_primary_button_url}
		class="button-outline-white">{ladoPage.hero_primary_button_text}</a
	>
	<a
		slot="secondary"
		href={ladoPage.hero_secondary_button_url}
		class="button-outline-white">{ladoPage.hero_secondary_button_text}</a
	>
	<img
		class="hero-image"
		src={overleggen}
		alt="Mensen tijdens een landelijk overleg over Associate degree-opleidingen"
		fetchpriority="high"
	/>
</Hero>

<section
	class="lado-info"
	id="over-lados"
>
	<div class="inner-wrapper">
		<h2>{ladoPage.lado_section_heading}</h2>

		<div class="card-grid">
			{#each infoCards as card (card.title)}
				<LadoInfoCard {...card} />
			{/each}
		</div>
	</div>
</section>

{#if data.loadError}
	<section class="load-error">
		<p>{data.loadError}</p>
	</section>
{/if}

<LadosOverview lados={data.lados} />

<style>
	.hero-image {
		display: block;
		width: 100%;
		height: 20em;
		object-fit: cover;
		border-radius: 1em 1em 0 0;
	}

	.lado-info {
		background: light-dark(var(--text-white), var(--blue-800));
		padding: 3em 5%;
	}

	.inner-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.25em;
		max-width: 1400px;
		margin: 0 auto;
	}

	h2 {
		color: light-dark(var(--blue-800), var(--text-white));
	}

	.card-grid {
		display: grid;
		align-items: start;
		gap: 1.5em;
	}

	.load-error {
		background: light-dark(var(--text-white), var(--blue-800));
		padding: 0 5%;
	}

	.load-error p {
		max-width: 1400px;
		margin: 0 auto;
		border: 1px solid var(--primary-orange);
		border-radius: 0.5em;
		padding: 1em;
		color: light-dark(var(--blue-900), var(--text-white));
	}

	@media (min-width: 768px) {
		.hero-image {
			height: 25em;
			border-radius: 1em;
		}

		.card-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
