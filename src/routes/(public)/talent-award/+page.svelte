<script>
	import logomobile from '$lib/assets/logomobile.svg'
	import logodark from '$lib/assets/logomobiledark.svg'

	// Import images
	import { Talent } from '$lib'

	// Import components
	import { RSectionHero, RCardSection, RTalentAwardSection } from '$lib'

	const props = $props()
	const data = $derived(props.data)
	const talentAwardPage = $derived(data.talentAwardPage ?? {})
</script>

<svelte:head>
	<title>Talent Award| Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={{ title: talentAwardPage.hero_heading, description: talentAwardPage.hero_body }}
	primaryLink={{ label: talentAwardPage.hero_button_text, href: talentAwardPage.hero_button_url }}
	picture={{
		isEnhanced: true,
		src: Talent,
		alt: '',
		fetchpriority: 'high'
	}}
/>

<div class="intro">
	<RCardSection
		title={talentAwardPage.about_heading}
		description={talentAwardPage.about_body}
	/>
</div>

<section class="cards-ta">
	<article class="light">
		<img
			class="logo"
			aria-hidden="true"
			src={logomobile}
			alt="Logo"
			width="50"
			height="50"
		/>
		<h2>{talentAwardPage.info_card_1_title}</h2>
		<p>{talentAwardPage.info_card_1_body}</p>
	</article>

	<article class="dark">
		<img
			class="logo"
			aria-hidden="true"
			src={logodark}
			alt="Logo"
			width="50"
			height="50"
		/>
		<h2>{talentAwardPage.info_card_2_title}</h2>
		<p>{talentAwardPage.info_card_2_body}</p>
	</article>

	<article class="light">
		<img
			class="logo"
			aria-hidden="true"
			src={logomobile}
			alt="Logo"
			width="50"
			height="50"
		/>
		<h2>{talentAwardPage.info_card_3_title}</h2>
		<p>{talentAwardPage.info_card_3_body}</p>
	</article>
</section>

<RTalentAwardSection {data} />

<style>
	.intro {
		justify-self: center;
		padding: 4rem 2rem
	}

	.cards-ta {
		container-type: inline-size;
		container-name: cards;

		display: grid;
		gap: 2rem;
		padding: 0 1rem;
		margin: 2rem auto 5rem;
		width: 90%;
		max-width: 1400px;

	}

	@container cards (min-width: 1024px) {
		.cards-ta {
			grid-template-columns: repeat(3, 1fr);
		}

		.cards-ta article:nth-child(3) {
			grid-column: auto;
			justify-self: stretch;
			max-width: none;
		}
	}

	.cards-ta article {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 3;

		padding: 2rem;
		border-radius: 20px;
	}

	.cards-ta article .logo {
		justify-self: center;
		margin-bottom: 1rem;
	}

	.cards-ta article h2 {
		max-width: 36ch;
		margin: 0 auto 1rem;
		text-align: left;
	}

	.cards-ta article p {
		max-width: 50ch;
		margin: 0 auto;
		text-align: left;
	}

	.cards-ta article.dark {
		background-color: var(--primary-blue);
		color: var(--text-white);
	}

	.cards-ta article.dark h2 {
		color: var(--text-white);
	}

	.cards-ta article.light {
		background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
		border: 1.5px solid var(--primary-blue);
		color: light-dark(var(--blue-800), var(--text-white));
	}

	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	@media (min-width: 768px) {
		.cards-ta {
			gap: 2rem;
			margin-bottom: 5em;
		}
	}

	@media (min-width: 1024px) {
		.cards-ta {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
			gap: 2rem;
			justify-content: center;
			max-width: 1500px;
			margin: 0 auto;
			margin-bottom: 5em;
		}
	}
</style>
