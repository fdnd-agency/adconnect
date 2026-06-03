<script>
	import placeholder from '$lib/assets/placeholder-hero.webp'

	// Import components
	import { MultipleFaq, SingleFaq, DividerText, Divider, LogoSection, Hero, NewsCardSection, Information, InformationCards, FeatureSplit } from '$lib'
	import { RLink, Rseparator, RFaqSection, RPicture, RCardHero, RCardSection, RCardTheme, RSectionHero, RSectionPage, RCarousel, RSectionThemes, RCardInfo, RSectionNewsCard } from '$lib'

	// Import images
	import { zaal, overad } from '$lib'

	const { data } = $props()
	const { news } = data
	const { cooperation } = data

	const section = {
		title: 'Het landelijke platform voor Associate degrees',
		description: 'Ad-netwerk samen om kennis te delen, samen te werken en de kwaliteit en zichtbaarheid van Associate degrees te versterken.'
	}

	const themes = [
		{
			title: 'Doorstroom Ad',
			description: 'Met een Associate degree stroom je door naar het derde jaar van een bachelor. Zo combineer je praktijk met een diploma.',
			slug: 'doorstroom-ad-bachelor'
		},
		{
			title: 'Ad-dag',
			description: 'De jaarlijkse Ad‑dag brengt studenten, docenten en werkveldpartners samen. Tijdens workshops staat kennisdeling en netwerken centraal.',
			slug: '../ad-dag'
		},
		{
			title: 'Ad-talent Award',
			description: 'Jaarlijks wordt door het Overlegplatform de Ad Talent Award uitgereikt, waarmee 2 Associate degree-talenten verkozen worden.',
			slug: '../talent-award'
		}
	]
</script>

<svelte:head>
	<title>Home | Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={section}
	primaryLink={{ label: "Meer over Ad's", href: '/over-ad' }}
	secondaryLink={{ label: 'Kom naar de Ad-dag', href: '/ad-dag' }}
	picture={{
		isEnhanced: true,
		src: zaal,
		alt: 'Een grote zaal vol mensen die op stoelen zitten en luisteren naar een spreker.',
		width: '300',
		height: '210',
		fetchpriority: 'high',
		loading: 'eager'
	}}
	backgroundBlue
/>

<RSectionNewsCard news={data.news.slice(0, 3)} />

<RSectionPage
	vertical
	sectionInfo={{
		title: 'Wat zijn Associate degrees en hoe sluit het aan bij jou wensen?',
		description:
			'Associate degrees zijn tweejarige hbo-opleidingen die sterk praktijkgericht zijn en direct aansluiten op de arbeidsmarkt. Ze combineren werken en leren en zijn bedoeld voor studenten die zich willen ontwikkelen op hbo-niveau, zonder direct een vierjarige bachelor te volgen. De opleidingen worden samen met het werkveld vormgegeven en spelen in op actuele beroepsvragen. Hierdoor doe je relevante kennis en vaardigheden op die je meteen kunt toepassen in de praktijk. Een Associate degree biedt daarnaast flexibiliteit: je behaalt een zelfstandig diploma en kunt, als je dat wilt, doorstromen naar een bacheloropleiding.'
	}}
	primaryLink={{ label: "Meer info over Ad's", href: '#' }}
	picture={{
		isEnhanced: true,
		src: overad,
		alt: 'Een zaal met tafels in een cirkel, waar studenten luisteren naar hun docent die een presentatie geeft.'
	}}
/>

<RSectionThemes
	sectionInfo={{
		title: 'Ontdek het Ad‑onderwijs',
		description: 'Leer alles over Associate degrees, doorstroommogelijkheden en netwerkevenementen. ' + 'Blijf op de hoogte van Ad‑opleidingen en activiteiten binnen het overlegplatform.'
	}}
	{themes}
/>

<RCarousel
	logos
	carouselItems={cooperation}
	dividerText="Partijen waarmee wij samenwerken"
/>

<FeatureSplit
	title="Waarom kiezen voor een Associate degree?"
	intro="Een Associate degree combineert praktijkgericht onderwijs met doorstroommogelijkheden, zodat je snel ervaring opdoet én een diploma haalt."
	bullets={['Praktijkgericht leren en direct vaardigheden toepassen', 'Korte studieduur van 2 jaar', 'Doorstromen naar een bacheloropleiding mogelijk']}
	ctaText="Meer over Associate degrees"
	ctaLink="/over-ad"
	imageSrc="/images/award.jpg"
	imageAlt="Studenten bij de Ad Talent Award die naast elkaar staan, allemaal met een certificaat in hun handen"
/>

<RFaqSection title="Veelgestelde vragen" />
