<script>
	// Import components
	import { MultipleFaq, SingleFaq, DividerText, Divider, LogoSection, Hero, NewsCardSection, Information, InformationCards, FeatureSplit, Link } from '$lib'

	// Import images
	import { zaal } from '$lib'

	const { data } = $props()
	const news = $derived(data.news ?? [])
	const cooperation = $derived(data.cooperation ?? [])
	const homePage = $derived(data.homePage ?? {})

	const informationCards = $derived([
		{
			title: homePage.card_1_title,
			description: homePage.card_1_body,
			buttonText: homePage.card_1_button_text,
			buttonLink: homePage.card_1_button_url
		},
		{
			title: homePage.card_2_title,
			description: homePage.card_2_body,
			buttonText: homePage.card_2_button_text,
			buttonLink: homePage.card_2_button_url
		},
		{
			title: homePage.card_3_title,
			description: homePage.card_3_body,
			buttonText: homePage.card_3_button_text,
			buttonLink: homePage.card_3_button_url
		}
	])
</script>

<svelte:head>
	<title>Home | Overlegplatform Associate Degrees</title>
</svelte:head>

<Hero
	title={homePage.hero_heading}
	description={homePage.hero_body}
>
	<Link
		slot="secondary"
		href={homePage.hero_secondary_button_url}
		class="button-outline-white">{homePage.hero_secondary_button_text}</Link
	>
	<Link
		slot="primary"
		href={homePage.hero_primary_button_url}
		class="button-outline-blue">{homePage.hero_primary_button_text}</Link
	>
	<img
		class="hero-image"
		src={zaal}
		alt=""
		fetchpriority="high"
		width="300"
		height="210"
	/>
</Hero>

<NewsCardSection news={news.slice(0, 3)} />

<Information
	title={homePage.intro_heading}
	description={homePage.intro_body}
	buttonText={homePage.intro_button_text}
	buttonLink={homePage.intro_button_url}
	imageAlt="Studenten ontvangen award"
/>

<InformationCards
	heading={homePage.cards_heading}
	intro={homePage.cards_intro}
	items={informationCards}
/>

<section class="logo-section">
	<DividerText text="Partijen waarmee wij samenwerken" />
	<LogoSection {cooperation} />
	<Divider />
</section>

<FeatureSplit
	title={homePage.why_heading}
	intro={homePage.why_body}
	bullets={['Praktijkgericht leren en direct vaardigheden toepassen', 'Korte studieduur van 2 jaar', 'Doorstromen naar een bacheloropleiding mogelijk']}
	ctaText={homePage.why_button_text}
	ctaLink={homePage.why_button_url}
	imageSrc="/images/award.jpg"
	imageAlt="Studenten bij AdTalent award"
/>

<section
	class="faq-section"
	id="faq"
>
	<h2>Veelgestelde vragen</h2>

	<MultipleFaq>
		<SingleFaq
			open={true}
			question="Wat is een Associate degree?"
			answer="Een Associate Degree is een praktijkgerichte, tweejarige opleiding op hbo-niveau. De opleiding combineert theoretische kennis met praktische ervaring, zodat studenten snel inzetbaar zijn in het werkveld en de mogelijkheid hebben om door te stromen naar een bacheloropleiding."
		/>

		<SingleFaq
			question="Hoe lang duurt een Associate degree?"
			answer="Een Ad duurt doorgaans twee jaar bij een voltijdopleiding. Bij deeltijd kan dit langer zijn, afhankelijk van de persoonlijke planning en werkervaring."
		/>

		<SingleFaq
			question="Wat is het verschil tussen een Associate degree en een Bachelor?"
			answer="Een bacheloropleiding duurt meestal vier jaar en richt zich breder op theorie en verdieping, terwijl een Ad intensief, praktijkgericht en korter is, met direct toepasbare vaardigheden voor het werkveld."
		/>

		<SingleFaq
			question="Welke voordelen heeft het behalen van een Associate degree?"
			answer="Met een Ad-diploma ben je snel inzetbaar in de praktijk, heb je een erkend hbo-kwalificatieniveau en kun je doorstromen naar een bachelor. Daarnaast vergroot het je carrièremogelijkheden en professionele netwerk."
		/>
	</MultipleFaq>
</section>

<style>
	.hero-image {
		display: block;
		width: 100%;
		max-height: 416px;
		object-fit: cover;
		border-radius: 30px 30px 0 0;
	}

	@media (min-width: 768px) {
		.hero-image {
			border-radius: 24px;
			max-width: 604px;
			margin-left: auto;
		}
	}

	@media (min-width: 1024px) {
		.hero-image {
			max-width: 640px;
		}
	}

	.logo-section {
		display: flex;
		gap: 2em;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 0 0 3em 0;
		@media (min-width: 768px) {
			gap: 3em;
			padding: 0 0 5em 0;
		}
	}

	.faq-section {
		display: flex;
		flex-direction: column;
		gap: 2em;
		padding: 3em 5%;
		box-sizing: border-box;
		position: relative;

		@media (min-width: 768px) {
			padding: 2em 5em 5em 5em;
		}
	}

	.faq-section h2 {
		text-align: center;
	}

	#faq {
		scroll-margin-top: 150px;
	}
</style>
