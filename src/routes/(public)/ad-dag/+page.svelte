<script>
	// Import images
	import { addag2, addag3, locationImage, Addag } from '$lib'

	import { RSectionHero, RSectionPage, RSectionPlanning, RFaqSection, RPicture, Rseparator } from '$lib'

	// TODO: schedule data that needs to be added to directus
	const scheduleData = {
		schedule: [
			{
				startTime: '09:30',
				endTime: '10:00',
				event: 'Inloop met koffie/thee'
			},
			{
				startTime: '10:00',
				endTime: '13:00',
				event: 'Opening, keynote, gesprekken en Ad Talent Award'
			},
			{
				startTime: '13:00',
				endTime: '13:45',
				event: 'Lunch'
			},
			{
				startTime: '13:45',
				endTime: '15:30',
				event: 'Workshops en excursies'
			},
			{
				startTime: '15:30',
				endTime: '17:00',
				event: 'Borrel & ontmoeting'
			}
		]
	}

	// TODO: FAQ that needs to be added to directus
	const faqData = {
		faqs: [
			{
				question: 'Voor wie is de Ad-dag bedoeld?',
				answer:
					'De Landelijke Ad-dag is bedoeld voor iedereen die betrokken is bij of interesse heeft in Associate degree-onderwijs in Nederland. Dit omvat studenten, docenten, onderwijsprofessionals, werkveldpartners, onderwijsinstellingen en andere geïnteresseerden die willen zien hoe Ad-onderwijs impact maakt op onderwijs en arbeidsmarkt.'
			},
			{
				question: 'Wie komen er naar de Ad-dag?',
				answer:
					'De Landelijke Ad-dag brengt alle betrokkenen van Associate degree-onderwijs samen, zoals studenten en alumni, docenten en onderwijsprofessionals, werkveldpartners en werkgevers, en beleidsmakers en onderwijsorganisaties die kennis en ervaringen willen uitwisselen. Het is een dag vol inspiratie, netwerken en het delen van de impact van Ad-onderwijs.'
			},
			{
				question: 'Waarom zou ik naar de Ad-dag moeten gaan?',
				answer:
					'De Landelijke Ad-dag is dé gelegenheid om inspiratie op te doen, te netwerken met studenten, docenten, werkveldpartners en beleidsmakers, en te ontdekken hoe Associate degree-onderwijs impact maakt op zowel onderwijs als arbeidsmarkt. Je leert over innovatie, doorstroommogelijkheden en krijgt inzichten die je direct kunt toepassen in je studie, werk of organisatie.'
			},
			{
				question: 'Wanneer en waar vindt de Ad-dag plaats?',
				answer: 'De Landelijke Ad-dag 2026 vindt plaats op vrijdag 17 april 2026 in Groningen, georganiseerd bij de Hanzehogeschool.'
			}
		]
	}
</script>

<svelte:head>
	<title>Ad dag | Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={{
		title: 'Ad Dag',
		description:
			'De landelijke Ad-dag 2025 is hét moment waarop studenten, docenten en professionals uit het Ad-onderwijs samenkomen. Ontdek, leer en inspireer elkaar tijdens een dag vol sprekers, workshops en ontmoetingen. Ervaar hoe de Ad-professional als veranderaar impact maakt en vier samen de uitreiking van de Ad Talent Awards. Meld je aan voor de komende Ad-dag of blijf op de hoogte.'
	}}
	picture={{
		isEnhanced: true,
		src: Addag,
		alt: '',
		fetchpriority: 'high',
		loading: 'eager'
	}}
/>

<RSectionPage
	sectionInfo={{
		title: 'Wat is de landelijke Ad-dag?',
		description:
			'De Landelijke Ad-dag is het jaarlijkse moment waarop Associate degree (Ad)-onderwijs centraal staat. Studenten, docenten, coördinatoren, beleidsmakers en het werkveld komen samen om kennis te delen, inspiratie op te doen en elkaar te ontmoeten. Verwacht een mix van plenaire sessies, panelgesprekken, workshops en praktijkvoorbeelden waarin je ziet wat niveau 5 toevoegt aan het hbo en aan organisaties. Het is tegelijk een showcase en werkdag: je viert wat er al gebeurt én je neemt concrete ideeën mee om morgen toe te passen.'
	}}
	picture={{
		isEnhanced: true,
		src: addag3,
		alt: '...',
		width: '450',
		fetchpriority: 'high',
		loading: 'eager'
	}}
/>

<section class="faq-addag">
	<RFaqSection
		title="Alles wat je wilt weten over de Ad-dag?"
		{faqData}
		backgroundBlack
	/>

	<div class="faq-addag__image">
		<RPicture
			isEnhanced
			src={addag2}
			alt=""
			width="600"
			height="300"
			style="height: auto;"
		/>
	</div>
</section>

<RSectionPlanning
	sectionInfo={{
		title: 'Planning',
		description:
			'Beleef de Landelijke Ad‑dag! De Landelijke Ad‑dag belooft een bruisende dag vol inspiratie, ontmoetingen en praktijkvoorbeelden te worden. Geleid door Maikel van Duinen, radiotalent en docent, word je meegenomen in een energieke dag vol boeiende sessies, waaronder een keynote over de maatschappelijke en economische impact van de Ad, inspirerende gesprekken tussen onderwijs, werkveld en studenten, de feestelijke uitreiking van de Ad Talent Award, workshops en excursies om de impact van Ad‑studenten van dichtbij te ervaren, en optredens met volop gelegenheid om elkaar te ontmoeten.'
	}}
	cardsData={[
		{
			title: 'Programma',
			schedule: scheduleData,
			link: { label: 'Bekijk Programma', href: '#' }
		},
		{
			title: 'Workshops',
			description:
				'Tijdens de Landelijke Ad‑dag worden verschillende workshops georganiseerd waarin deelnemers samen leren, ervaringen delen en praktische handvatten krijgen op thema’s zoals diversiteit, professionalisering, inzet van technologie binnen Ad‑onderwijs, loopbaanontwikkeling, duurzaamheid en samenwerking met werkveld en onderwijs. De precieze workshoptitels en inhoud worden jaarlijks aangepast en zijn onderdeel van het programma',
			link: { label: 'Bekijk workshops', href: '#' }
		}
	]}
/>

<div class="location">
	<Rseparator dividerText="Locatie Ad Dag" />

	<p class="location__text">Addag is een programma dat meestal wordt aangeboden op en van Aeres scholen. Voor meer informatie over deelname of planning kun je contact met ons opnemen</p>

	<div class="location__image">
		<RPicture
			isEnhanced
			src={locationImage}
			alt="Locatie van de Ad-dag"
			width="600"
			height="300"
			loading='eager'
			style="height: auto;"
		/>
	</div>
</div>

<style>
	.faq-addag {
		display: flex;
		flex-direction: column;
		padding: 3em 5%;
		background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
		box-shadow: 0 0 0 100vmax var(--blue-100);
		clip-path: inset(0 -100vmax);
		overflow: hidden;

		.faq-addag__image {
			align-self: center;
			width: 100%;
			margin-top: 5em;
			border-radius: 5em;

			@media (min-width: 768px) {
				max-width: 1000px;
				height: 400px;
			}
		}
	}

	.location__text {
		max-width: 800px;
		margin: 2em auto;
		padding: 2em;
		font-size: 1.125rem;
	}

	.location__image {
		overflow: hidden;
		width: 90%;
		margin: auto;
		border-radius: 33px 33px 0 0;

		@media (min-width: 768px) {
			width: 60%;
		}
	}
</style>
