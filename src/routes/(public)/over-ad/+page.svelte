<script>
	// Import images
	import { doorstroom, overleggen, awards, overad } from '$lib'

	// Import components
	import { ThemeCard, Divider } from '$lib'
	import { RSectionHero, RSectionPage, RCarousel, RAboutOverAD } from '$lib'

	const { data } = $props()

	const { themes } = data
	const { cooperation } = data

	// TODO move to directus
	const benefitData = [
		{
			title: 'Doorstroom mogelijkheid',
			excerpt: 'Met een Ad-opleiding stroom je gemakkelijk door naar een bachelor. Kennis en vaardigheden sluiten direct aan op vervolgopleidingen en het werkveld.'
		},
		{
			title: 'Korte studieduur',
			excerpt: 'Ad-opleidingen duren doorgaans twee jaar. Hierdoor kan je snel aan de slag in het werkveld, terwijl je tegelijkertijd een erkend diploma haalt dat je carrièrekansen vergroot.'
		},
		{
			title: 'Persoonlijk & kleinschalig',
			excerpt: 'De opleidingen zijn kleinschalig en persoonlijk ingericht. Docenten kennen de studenten goed, waardoor begeleiding op maat mogelijk is en studenten optimaal kunnen groeien.'
		}
	]
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

<RAboutOverAD {benefitData} />

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

<section class="themes">
	<h2>Thema's binnen Associate degrees</h2>
	<section class="themes-section">
		<ThemeCard {themes} />
	</section>
</section>

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
