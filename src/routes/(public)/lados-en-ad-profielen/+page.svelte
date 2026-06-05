<script>
	import { LadoInfoCard, LadosOverview, overleggen, RSectionHero } from '$lib'

	const props = $props()
	const data = $derived(props.data)
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

<RSectionHero
	sectionInfo={{ title: ladoPage.hero_heading, description: ladoPage.hero_body }}
	primaryLink={{ label: ladoPage.hero_primary_button_text, href: ladoPage.hero_primary_button_url }}
	secondaryLink={{ label: ladoPage.hero_secondary_button_text, href: ladoPage.hero_secondary_button_url }}
	picture={{
		isEnhanced: true,
		src: overleggen,
		alt: 'Mensen tijdens een landelijk overleg over Associate degree-opleidingen',
		fetchpriority: 'high'
	}}
/>

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
		.card-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
