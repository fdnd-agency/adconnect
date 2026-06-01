<script>
	// Import images
	import { doorstroom, overleggen, awards, dots, placeholder, overad } from '$lib'

	// Import components
	import { BenefitsCard, ThemeCard, ImageTextSection, Divider, DividerText, LogoSection, Hero } from '$lib'

	const props = $props()
	const data = $derived(props.data)
	const themes = $derived(data.themes)
	const cooperations = $derived(data.cooperations)
	const aboutAdPage = $derived(data.aboutAdPage ?? {})
</script>

<svelte:head>
	<title>Over Ad's | Overlegplatform Associate Degrees</title>
</svelte:head>

<Hero
	title={aboutAdPage.hero_heading}
	description={aboutAdPage.hero_body}
>
	<img
		class="hero-image"
		src={overad}
		alt=""
		fetchpriority="high"
	/>
	<a
		slot="primary"
		href={aboutAdPage.hero_button_url}
		class="button-outline-white"
		aria-label="Lees meer over Associate Degree's"
		id="benefit">{aboutAdPage.hero_button_text}</a
	>
</Hero>

<section class="about-ad-hero">
	<section class="intro">
		<h2>{aboutAdPage.why_heading}</h2>
		<p>{aboutAdPage.why_body}</p>
	</section>

	<section class="benefits">
		<BenefitsCard
			title={aboutAdPage.why_card_1_title}
			excerpt={aboutAdPage.why_card_1_body}
		></BenefitsCard>

		<BenefitsCard
			title={aboutAdPage.why_card_2_title}
			excerpt={aboutAdPage.why_card_2_body}
		></BenefitsCard>

		<BenefitsCard
			title={aboutAdPage.why_card_3_title}
			excerpt={aboutAdPage.why_card_3_body}
		></BenefitsCard>
	</section>
</section>

<ImageTextSection
	image={doorstroom}
	alt="Doorstroom Ad-bachelor"
	{dots}
	title={aboutAdPage.bachelor_heading}
	text={aboutAdPage.bachelor_body}
	link={aboutAdPage.bachelor_button_url}
	linkText={aboutAdPage.bachelor_button_text}
	imagePosition="left"
/>

<section class="logo-section">
	<DividerText text="Partijen waarmee wij samenwerken" />
	<LogoSection {cooperations} />
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
	alt=""
	{dots}
	title={aboutAdPage.profiles_heading}
	text={aboutAdPage.profiles_body}
	link={aboutAdPage.profiles_button_url}
	linkText={aboutAdPage.profiles_button_text}
	imagePosition="right"
	background="white"
/>

<Divider />

<ImageTextSection
	image={awards}
	alt="2 vrouwen die genomineerden waren voor de Ad-talent Awards. beide met een abnormaal groote check van 250 euro en een trofee "
	{dots}
	title={aboutAdPage.awards_heading}
	text={aboutAdPage.awards_body}
	link={aboutAdPage.awards_button_url}
	linkText={aboutAdPage.awards_button_text}
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
