<script>
	// Import images
	import { addag2, addag3, locationImage, Addag } from '$lib'

	import { SectionHero, SectionPage, SectionPlanning, FaqSection, Picture, Separator  } from '$lib'

	const props = $props()
	const data = $derived(props.data)
	const adDayPage = $derived(data.adDayPage ?? {})
</script>

<svelte:head>
	<title>Ad dag | Overlegplatform Associate Degrees</title>
</svelte:head>

<SectionHero
	sectionInfo={{ title: adDayPage.hero_heading, description: adDayPage.hero_body }}
	picture={{
		isEnhanced: true,
		src: Addag,
		alt: '',
		fetchpriority: 'high',
		loading: 'eager'
	}}
/>

<SectionPage
	sectionInfo={{ title: adDayPage.about_heading, description: adDayPage.about_body }}
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
	<FaqSection
		title={adDayPage.faq_heading}
		faqData={{
			faqs: [
				{ question: adDayPage.faq_1_heading, answer: adDayPage.faq_1_body },
				{ question: adDayPage.faq_2_heading, answer: adDayPage.faq_2_body },
				{ question: adDayPage.faq_3_heading, answer: adDayPage.faq_3_body },
				{ question: adDayPage.faq_4_heading, answer: adDayPage.faq_4_body }
			]
		}}
		backgroundBlack
	/>

	<div class="faq-addag__image">
		<Picture
			isEnhanced
			src={addag2}
			alt=""
			width="600"
			height="300"
			style="height: auto;"
		/>
	</div>
</section>

<SectionPlanning
	sectionInfo={{ title: adDayPage.planning_heading, description: adDayPage.planning_body }}
	cardsData={[
		{
			title: adDayPage.program_heading,
			content: adDayPage.program_body,
			link: { label: adDayPage.program_button_text, href: adDayPage.program_button_url }
		},
		{
			title: adDayPage.workshops_heading,
			content: adDayPage.workshops_body,
			link: { label: adDayPage.workshops_button_text, href: adDayPage.workshops_button_url }
		}
	]}
/>

<div class="location">
	<Separator dividerText={adDayPage.location_heading} />

	<p class="location__text">{adDayPage.location_body}</p>

	<div class="location__image">
		<Picture
			isEnhanced
			src={locationImage}
			alt="Locatie van de Ad-dag"
			width="600"
			height="300"
			loading="eager"
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
