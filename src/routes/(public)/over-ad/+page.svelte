<script>
	// Import images
	import { doorstroom, overleggen, awards, overad } from '$lib'

	// Import components
	import { SectionHero, SectionPage, Carousel, Separator, SectionThemes, AboutOverAD } from '$lib'

	const props = $props()
	const data = $derived(props.data)
	// const themes = $derived(data.themes)
	const cooperations = $derived(data.cooperations)
	const aboutAdPage = $derived(data.aboutAdPage ?? {})

	const benefitData = $derived([
		{ title: aboutAdPage.why_card_1_title, excerpt: aboutAdPage.why_card_1_body },
		{ title: aboutAdPage.why_card_2_title, excerpt: aboutAdPage.why_card_2_body },
		{ title: aboutAdPage.why_card_3_title, excerpt: aboutAdPage.why_card_3_body }
	])

	const themes = $derived(
		(data.themes ?? []).map((theme) => ({
			...theme,
			slug: `over-ad/${theme.slug}`
		}))
	)
</script>

<svelte:head>
	<title>Over Ad's | Overlegplatform Associate Degrees</title>
</svelte:head>

<SectionHero
	sectionInfo={{ title: aboutAdPage.hero_heading, description: aboutAdPage.hero_body }}
	primaryLink={{ label: "aboutAdPage.hero_button_text", href: aboutAdPage.hero_button_url }}
	picture={{
		isEnhanced: true,
		src: overad,
		alt: '',
		fetchpriority: 'high'
	}}
/>

<AboutOverAD {benefitData} anchor="benefit" />

<SectionPage
	mirrored
	backgroundBlack
	sectionInfo={{ title: aboutAdPage.bachelor_heading, description: aboutAdPage.bachelor_body }}
	primaryLink={{ label: aboutAdPage.bachelor_button_text, href: aboutAdPage.bachelor_button_url }}
	picture={{
		isEnhanced: true,
		src: doorstroom,
		alt: 'Doorstroom Ad-bachelor'
	}}
/>

<Carousel
	logos
	carouselItems={cooperations}
	dividerText="Partijen waarmee wij samenwerken"
	backgroundBlack
	noMargin
/>

<SectionThemes
	sectionInfo={{ title: "Thema's binnen Associate degrees" }}
	{themes}
/>

<SectionPage
	sectionInfo={{ title: aboutAdPage.profiles_heading, description: aboutAdPage.profiles_body }}
	primaryLink={{ label: aboutAdPage.profiles_button_text, href: aboutAdPage.profiles_button_url }}
	picture={{
		isEnhanced: true,
		src: overleggen,
		alt: ''
	}}
/>

<Separator />

<SectionPage
	mirrored
	sectionInfo={{ title: aboutAdPage.awards_heading, description: aboutAdPage.awards_body }}
	primaryLink={{ label: aboutAdPage.awards_button_text, href: aboutAdPage.awards_button_url }}
	picture={{
		isEnhanced: true,
		src: awards,
		alt: '2 vrouwen die genomineerd waren voor de Ad Talent Awards, beiden met een abnormaal grote cheque van 250 euro en een trofee.'
	}}
/>
