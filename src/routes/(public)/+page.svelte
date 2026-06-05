<script>
	// Import components
	import { FeatureSplit, RFaqSection, RSectionHero, RSectionPage, RCarousel, RSectionThemes, RSectionNewsCard } from '$lib'

	// Import images
	import { zaal, overad } from '$lib'

	const props = $props()
	const data = $derived(props.data)
	const news = $derived(data.news)
	const cooperations = $derived(data.cooperations)
	const faqs = $derived(data.faqs)
	const homePage = $derived(data.homePage ?? {})

	const themes = $derived([
		{
			title: homePage.card_1_title,
			description: homePage.card_1_body,
			slug: homePage.card_1_button_url
		},
		{
			title: homePage.card_2_title,
			description: homePage.card_2_body,
			slug: homePage.card_2_button_url
		},
		{
			title: homePage.card_3_title,
			description: homePage.card_3_body,
			slug: homePage.card_3_button_url
		}
	])
</script>

<svelte:head>
	<title>Home | Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={{ title: homePage.hero_heading, description: homePage.hero_body }}
	primaryLink={{ label: homePage.hero_primary_button_text, href: homePage.hero_primary_button_url }}
	secondaryLink={{ label: homePage.hero_secondary_button_text, href: homePage.hero_secondary_button_url }}
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

<RSectionNewsCard news={news.slice(0, 3)} />

<RSectionPage
	vertical
	sectionInfo={{ title: homePage.intro_heading, description: homePage.intro_body }}
	primaryLink={{ label: homePage.intro_button_text, href: homePage.intro_button_url }}
	picture={{
		isEnhanced: true,
		src: overad,
		alt: 'Een zaal met tafels in een cirkel, waar studenten luisteren naar hun docent die een presentatie geeft.'
	}}
/>

<RSectionThemes
	sectionInfo={{ title: homePage.cards_heading, description: homePage.cards_intro }}
	{themes}
/>

<RCarousel
	logos
	carouselItems={cooperations}
	dividerText="Partijen waarmee wij samenwerken"
/>

<FeatureSplit
	title={homePage.why_heading}
	intro={homePage.why_body}
	ctaText={homePage.why_button_text}
	ctaLink={homePage.why_button_url}
	imageSrc="/images/award.jpg"
	imageAlt="Studenten bij AdTalent award"
/>

<RFaqSection
	title="Veelgestelde vragen"
	faqData={{ faqs }}
/>
