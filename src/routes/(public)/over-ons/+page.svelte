<script>
	// Import images
	import { doorstroom } from '$lib'

	// Import components
	import { RSectionHero, RCardSection, Rseparator, RCarousel } from '$lib'

	const props = $props()
	const data = $derived(props.data)
	const cooperations = $derived(data.cooperations)
	const aboutUsPage = $derived(data.aboutUsPage ?? {})

	const originText = $derived([
		{
			title: aboutUsPage.origin_heading,
			paragraphs: [aboutUsPage.origin_body]
		},
		{
			title: aboutUsPage.founding_letter_heading,
			paragraphs: [aboutUsPage.founding_letter_body]
		}
	])
</script>

<svelte:head>
	<title>Over ons | Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={{ title: aboutUsPage.hero_heading, description: aboutUsPage.hero_body }}
	picture={{
		isEnhanced: true,
		src: doorstroom,
		alt: 'Waarom AdConnect?',
		fetchpriority: 'high'
	}}
/>

<div class="center">
	<RCardSection
		title={aboutUsPage.why_heading}
		description={aboutUsPage.why_body}
	/>
</div>

<RCarousel
	logos
	carouselItems={cooperations}
	dividerText="Partijen waarmee wij samenwerken"
/>

<div class="origins">
	{#each originText as section}
		<section>
			<h2>{section.title}</h2>
			{#each section.paragraphs as paragraph}
				<p>{paragraph}</p>
			{/each}
		</section>
	{/each}
</div>

<Rseparator />

<div class="center">
	<RCardSection
		title={aboutUsPage.advice_heading}
		description={aboutUsPage.advice_body}
	/>
</div>

<style>
	.origins {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 2.5em;
		padding: min(5%, 5em);
		@media (min-width: 1000px) {
			flex-direction: row;
			justify-content: space-evenly;
		}
		h2 {
			padding-bottom: 1em;
		}
	}
	.center {
		justify-self: center;
		padding: 5em 0;
	}
</style>
