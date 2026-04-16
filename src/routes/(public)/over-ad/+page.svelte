<script>
	// Import images
	import { doorstroom, overleggen, awards, dots, placeholder, overad } from '$lib'

	// Import components
	import { BenefitsCard, ThemeCard, ImageTextSection, Divider, DividerText, LogoSection, Hero } from '$lib'

	const { data } = $props()

	const { themes } = data
	const { cooperation } = data
</script>

<svelte:head>
	<title>Over Ad's | Overlegplatform Associate Degrees</title>
</svelte:head>

<Hero
	title="Over Associate Degree's"
	description="Associate Degrees zijn praktijkgerichte opleidingen van twee jaar die studenten voorbereiden op het werkveld en doorstroom naar een bachelor."
>
	<img
		class="hero-image"
		src={overad}
		alt=""
		fetchpriority="high"
	/>
	<a
		slot="primary"
		href="#benefit"
		class="button-outline-white"
		aria-label="Lees meer over Associate Degree's"
		id="benefit">Lees meer →</a
	>
</Hero>

<section class="about-ad-hero">
	<section class="intro">
		<h2>Waarom kiezen voor Associate Degree's?</h2>
		<p>Associate Degrees combineren praktijk en theorie in een korte, intensieve opleiding. Ze bereiden studenten effectief voor op actuele beroepen en geven een stevige basis voor verdere studie.</p>
	</section>

	<section class="benefits">
		<BenefitsCard
			title="Doorstroom mogelijkheid"
			excerpt="Met een Ad-opleiding stroom je gemakkelijk door naar een bachelor. Kennis en vaardigheden sluiten direct aan op vervolgopleidingen en het werkveld."
		></BenefitsCard>

		<BenefitsCard
			title="Korte studieduur"
			excerpt="Ad-opleidingen duren doorgaans twee jaar. Hierdoor kan je snel aan de slag in het werkveld, terwijl je tegelijkertijd een erkend diploma haalt dat je carrièrekansen vergroot."
		></BenefitsCard>

		<BenefitsCard
			title="Persoonlijk & kleinschalig"
			excerpt="De opleidingen zijn kleinschalig en persoonlijk ingericht. Docenten kennen de studenten goed, waardoor begeleiding op maat mogelijk is en studenten optimaal kunnen groeien."
		></BenefitsCard>
	</section>
</section>

<ImageTextSection
	image={doorstroom}
	alt="Doorstroom Ad-bachelor"
	{dots}
	title="Doorstroom Ad-bachelor"
	text="Met een Ad-diploma kun je rechtstreeks doorstromen naar een bacheloropleiding. Het programma is zo opgebouwd dat de kennis en vaardigheden aansluiten op de vervolgopleiding en de beroepspraktijk, zodat studenten soepel verder kunnen bouwen aan hun carrière."
	link="/ad-dag"
	linkText="Kom naar de Ad-dag"
	imagePosition="left"
/>

<section class="logo-section">
	<DividerText text="Partijen waarmee wij samenwerken" />
	<LogoSection {cooperation} />
	<Divider />
</section>

<section class="themes">
	<h2>Thema's binnen Associate degrees</h2>
	<section class="themes-section">
		<ThemeCard {themes} />
	</section>
</section>

<ImageTextSection
	image={overleggen}
	alt="Ad-overleggen en Ad-profielen"
	{dots}
	title="Landelijke Ad-overleggen en Ad-profielen"
	text="Het Overlegplatform organiseert regelmatig landelijke overleggen waarin vertegenwoordigers van alle Ad-opleidingen samenkomen. Tijdens deze bijeenkomsten worden nieuwe Ad-profielen besproken, kwaliteitsrichtlijnen gedeeld en best practices uitgewisseld. Zo blijven opleidingen actueel en goed afgestemd op het werkveld."
	link="/contact"
	linkText="Meer weten? Neem contact op"
	imagePosition="right"
	background="white"
/>

<Divider />

<ImageTextSection
	image={awards}
	alt="Ad-talent Awards genomineerden"
	{dots}
	title="Ad Talent Awards"
	text="De Ad Talent Awards vieren de prestaties van studenten, docenten en opleidingen binnen het Associate Degree-onderwijs. De awards zetten talenten in het zonnetje die met hun inzet, creativiteit en innovatieve aanpak een positieve impact maken in het werkveld en de samenleving. Door deelname en nominaties worden best practices gedeeld en wordt de waarde van Ad-opleidingen zichtbaar voor een breed publiek."
	link="/talent-award"
	linkText="Meer over Ad talent Awards"
	imagePosition="left"
	background="white"
/>

<style>
	.about-ad-hero {
		padding: 3em 5%;
		max-width: 1400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3em;
		align-self: center;
		margin: auto;
		background-color: light-dark(var(--text-white), var(--blue-800));

		@media (min-width: 1024px) {
			padding: 5em 5%;
			gap: 4em;
		}
	}

	.benefits {
		display: grid;
		gap: 2.5em;
		width: 100%;
		grid-template-columns: 1fr;
	}

	@media (min-width: 640px) {
		.benefits {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.benefits {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* Logo section */
	.logo-section {
		display: flex;
		gap: 2em;
		flex-direction: column;
		align-items: center;
		width: 100%;
		background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
		padding: 0 0 3em 0;

		@media (min-width: 768px) {
			gap: 3em;
			padding: 0 0 5em 0;
		}
	}

	/* Themes section */
	.themes {
		background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5em;
		padding: 0 0 3em 0;

		@media (min-width: 768px) {
			padding: 0 0 5em 0;
		}
	}

	.themes h2 {
		text-align: center;
	}

	.themes-section {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 90%;

		@media (min-width: 768px) {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(22em, 1fr));
			max-width: 1400px;
		}
	}
</style>
