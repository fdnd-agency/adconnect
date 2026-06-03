<script>
	// Import images
	import { doorstroom, overleggen, awards, dots, placeholder, overad } from '$lib'
	import logomobile from '$lib/assets/logomobile.svg'

	// Import components
	import { BenefitsCard, ThemeCard, ImageTextSection, Divider, DividerText, LogoSection, Hero } from '$lib'

	const props = $props()
	const data = $derived(props.data)
	const themes = $derived(data.themes)
	const cooperations = $derived(data.cooperations)
	const aboutUsPage = $derived(data.aboutUsPage ?? {})
</script>

<svelte:head>
	<title>Over ons | Overlegplatform Associate Degrees</title>
</svelte:head>

<Hero
	title={aboutUsPage.hero_heading}
	description={aboutUsPage.hero_body}
>
	<img
		class="hero-image"
		src={doorstroom}
		alt="Waarom AdConnect?"
		aria-hidden="true"
		fetchpriority="high"
	/>
</Hero>

<section class="intro">
	<img
		class="logo"
		src={logomobile}
		alt="Ad Talent Award Logo"
		aria-hidden="true"
		width="50"
		height="50"
	/>
	<h2>{aboutUsPage.why_heading}</h2>
	<p>{aboutUsPage.why_body}</p>
</section>

<section class="logo-section">
	<DividerText text="Partijen waarmee wij samenwerken" />
	<LogoSection {cooperations} />
	<Divider />
</section>

<div class="origins">
	<section class="origin-text">
		<h2>{aboutUsPage.origin_heading}</h2>
		<p>{aboutUsPage.origin_body}</p>
	</section>
	<section class="origin-letter">
		<h2>{aboutUsPage.founding_letter_heading}</h2>
		<p>{aboutUsPage.founding_letter_body}</p>
	</section>
</div>

<Divider />

<section class="advice">
	<img
		class="logo"
		src={logomobile}
		alt="Ad Talent Award Logo"
		aria-hidden="true"
		width="50"
		height="50"
	/>
	<h2>{aboutUsPage.advice_heading}</h2>
	<p>{aboutUsPage.advice_body}</p>
</section>

<style>
	.intro {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
		padding: 5em;

		h2 {
			padding-bottom: 1em;
		}
	}

	.origins {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 2.5em;
		padding: 5em;

		@media (min-width: 1000px) {
			flex-direction: row;
			justify-content: space-evenly;
		}

		.origin-text,
		.origin-letter {
			h2 {
				padding-bottom: 1em;
			}
		}
	}

	.advice {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
		padding: 5em;

		h2 {
			padding-bottom: 1em;
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
</style>
