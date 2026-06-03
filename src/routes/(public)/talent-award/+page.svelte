<script>
	import logomobile from '$lib/assets/logomobile.svg'
	import logodark from '$lib/assets/logomobiledark.svg'
	import Talent from '$lib/assets/ad-talent-awards.jpg'

	const { data } = $props()

	import { Hero, Divider, DividerText, NominationsCarousel } from '$lib'

	import { DIRECTUS_URL } from '$lib/constants.js'

	const talentAwardPage = $derived(data.talentAwardPage ?? {})
	const imageUrl = (id) => `${DIRECTUS_URL}/assets/${id}`
</script>

<svelte:head>
	<title>Talent Award| Overlegplatform Associate Degrees</title>
</svelte:head>

<Hero
	title={talentAwardPage.hero_heading}
	description={talentAwardPage.hero_body}
>
	<img
		class="hero-image"
		src={Talent}
		alt=""
		fetchpriority="high"
	/>
	<a
		slot="primary"
		href={talentAwardPage.hero_button_url}
		class="button-outline-white"
		id="benefit"
		>{talentAwardPage.hero_button_text} <span aria-hidden="true">→</span> <span class="visually-hidden">over aadee talent award</span>
	</a>
</Hero>

<section class="intro">
	<img
		class="logo"
		src={logomobile}
		alt="Logo"
		aria-hidden="true"
		width="50"
		height="50"
	/>
	<h2>{talentAwardPage.about_heading}</h2>
	<p>{talentAwardPage.about_body}</p>
</section>

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

<section>
	<DividerText text="Voorgaande talent award winnaars" />

	<section class="previous-winners">
		<ul>
			{#each data.nominations.filter((item) => item.header?.toLowerCase() === 'winnaar' && item.profile_picture) as winner (winner.id)}
				<li>
					<section>
						<h3>{winner.title}</h3>
						<p>{winner.excerpt}</p>
					</section>
					<img
						src={imageUrl(winner.profile_picture)}
						alt="{winner.title} met krullend haar, glimlachend naar de camera"
						height="200px"
						width="200px"
					/>
				</li>
			{/each}
		</ul>
	</section>
</section>

<section class="nominate">
	<img
		class="logo"
		aria-hidden="true"
		src={logomobile}
		alt="Logo"
		width="50"
		height="50"
	/>
	<h2>{talentAwardPage.nominations_heading}</h2>
	<p>{talentAwardPage.nominations_body}</p>
</section>

<section>
	<DividerText text="Voorgaande nominaties" />
</section>

<NominationsCarousel
	nominations={data.nominations}
	cooperations={data.cooperations}
	{imageUrl}
/>

<style>
	.intro,
	.nominate {
		text-align: left;
		margin: 0 auto;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: min(900px, 92vw);

		.logo {
			display: block;
			margin: 1rem auto;
		}

		h2 {
			text-align: center;
			margin-bottom: 1em;
		}

		p {
			max-width: 500px;
			margin: 0 auto;
			text-align: left;
		}
	}

	.nominate {
		align-items: center;
		gap: 1em;
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
		margin-bottom: 2rem;
		margin-top: 1rem;
	}

	.previous-winners {
		background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
		padding: 2rem;
		border-radius: 15px;
		width: 90%;
		max-width: 1000px;

		li {
			display: flex;
			flex-direction: column-reverse;
			gap: 2em;
			align-items: flex-start;

			section {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
			}

			@media (min-width: 768px) {
				flex-direction: row-reverse;
				align-items: center;
			}
		}
	}

	.previous-winners img {
		border-radius: 15px;
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

	:global(main) {
		overflow-x: hidden;
	}
</style>
