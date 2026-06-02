<script>
	// Import images
	import { doorstroom, overleggen, awards, dots, placeholder, overad } from '$lib'

	// Import components
	import { BenefitsCard, ThemeCard, ImageTextSection, Divider, DividerText, LogoSection, Hero } from '$lib'
	import { RSectionHero, RSectionPage, RCarousel, Rseparator, RSectionThemes } from '$lib'

	const { data } = $props()

	const { themes } = data
	const { cooperation } = data
</script>

<svelte:head>
	<title>Over Ad's | Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={{
		title: "Over Associate Degree's",
		description: 'Associate Degrees zijn praktijkgerichte opleidingen van twee jaar die studenten voorbereiden op het werkveld en doorstroom naar een bachelor.'
	}}
	primaryLink={{ label: 'Lees meer →', href: '#benefit' }}
	picture={{
		isEnhanced: true,
		src: overad,
		alt: '',
		fetchpriority: 'high'
	}}
/>

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

<RSectionPage
	mirrored
	backgroundBlack
	sectionInfo={{
		title: 'Doorstroom Ad-bachelor',
		description:
			'Met een Ad-diploma kun je rechtstreeks doorstromen naar een bacheloropleiding. Het programma is zo opgebouwd dat de kennis en vaardigheden aansluiten op de vervolgopleiding en de beroepspraktijk, zodat studenten soepel verder kunnen bouwen aan hun carrière.'
	}}
	primaryLink={{ label: 'Kom naar de Ad-dag', href: '/ad-dag' }}
	picture={{
		isEnhanced: true,
		src: doorstroom,
		alt: 'Doorstroom Ad-bachelor'
	}}
/>

<RCarousel
	logos
	carouselItems={cooperation}
	dividerText="Partijen waarmee wij samenwerken"
	backgroundBlack
/>

<RSectionThemes {themes} />

<RSectionPage
	sectionInfo={{
		title: 'Landelijke Ad-overleggen en Ad-profielen',
		description:
			'Het Overlegplatform organiseert regelmatig landelijke overleggen waarin vertegenwoordigers van alle Ad-opleidingen samenkomen. Tijdens deze bijeenkomsten worden nieuwe Ad-profielen besproken, kwaliteitsrichtlijnen gedeeld en best practices uitgewisseld. Zo blijven opleidingen actueel en goed afgestemd op het werkveld.'
	}}
	primaryLink={{ label: 'Meer weten? Neem contact op', href: '/contact' }}
	picture={{
		isEnhanced: true,
		src: overleggen,
		alt: ''
	}}
/>

<Divider />

<RSectionPage
	mirrored
	sectionInfo={{
		title: 'Ad Talent Awards',
		description:
			'De Ad Talent Awards vieren de prestaties van studenten, docenten en opleidingen binnen het Associate Degree-onderwijs. De awards zetten talenten in het zonnetje die met hun inzet, creativiteit en innovatieve aanpak een positieve impact maken in het werkveld en de samenleving. Door deelname en nominaties worden best practices gedeeld en wordt de waarde van Ad-opleidingen zichtbaar voor een breed publiek.'
	}}
	primaryLink={{ label: 'Meer over Ad talent Awards', href: '/talent-award' }}
	picture={{
		isEnhanced: true,
		src: awards,
		alt: '2 vrouwen die genomineerd waren voor de Ad Talent Awards, beiden met een abnormaal grote cheque van 250 euro en een trofee.'
	}}
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
</style>
