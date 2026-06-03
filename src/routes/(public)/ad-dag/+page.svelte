<script>
	import logomobile from '$lib/assets/logomobile.svg'
	import addag1 from '$lib/assets/addag-1.png'
	import addag2 from '$lib/assets/addag-2.png'
	import addag3 from '$lib/assets/addag-3.webp'

	import { MultipleFaq, SingleFaq, Hero, Addag, Location, Schedule } from '$lib'

	const { data } = $props()
	const adDayPage = $derived(data.adDayPage ?? {})
</script>

<svelte:head>
	<title>Ad dag | Overlegplatform Associate Degrees</title>
</svelte:head>

<Hero
	title={adDayPage.hero_heading}
	description={adDayPage.hero_body}
>
	<img
		class="hero-image"
		src={Addag}
		alt=""
		fetchpriority="high"
	/>
</Hero>

<section class="intro">
	<article>
		<h2>{adDayPage.about_heading}</h2>
		<p>{adDayPage.about_body}</p>
	</article>
	<img
		src={addag3}
		alt=""
		width="450px"
	/>
</section>

<section class="info-addag">
	<img
		class="logo"
		src={logomobile}
		alt=""
	/>
	<h2>{adDayPage.faq_heading}</h2>

	<MultipleFaq>
		<SingleFaq
			open={true}
			question={adDayPage.faq_1_heading}
			answer={adDayPage.faq_1_body}
		/>

		<SingleFaq
			question={adDayPage.faq_2_heading}
			answer={adDayPage.faq_2_body}
		/>

		<SingleFaq
			question={adDayPage.faq_3_heading}
			answer={adDayPage.faq_3_body}
		/>

		<SingleFaq
			question={adDayPage.faq_4_heading}
			answer={adDayPage.faq_4_body}
		/>
	</MultipleFaq>

	<img
		class="addag-2"
		src={addag2}
		alt=""
		width="600"
		height="300"
	/>
</section>
<Schedule
	planningHeading={adDayPage.planning_heading}
	planningBody={adDayPage.planning_body}
	programHeading={adDayPage.program_heading}
	programBody={adDayPage.program_body}
	programButtonText={adDayPage.program_button_text}
	programButtonUrl={adDayPage.program_button_url}
	workshopsHeading={adDayPage.workshops_heading}
	workshopsBody={adDayPage.workshops_body}
	workshopsButtonText={adDayPage.workshops_button_text}
	workshopsButtonUrl={adDayPage.workshops_button_url}
/>
<Location
	heading={adDayPage.location_heading}
	body={adDayPage.location_body}
/>

<style>
	.intro {
		display: flex;
		flex-direction: column;
		padding: 3em 5%;
		max-width: 1400px;
		align-items: center;
		gap: 4em;
		align-self: center;
		margin: auto;

		img {
			width: 100%;
			border-radius: 1em;
		}

		article {
			max-width: 600px;

			p {
				margin-top: 1em;
			}
		}
	}

	@media (min-width: 768px) {
		.intro {
			flex-direction: row;
			gap: 2em;
			align-items: center;
			padding: 5em 5%;
			gap: 4em;

			img {
				width: 600px;
			}
		}
	}

	.info-addag {
		display: flex;
		flex-direction: column;
		background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
		gap: 2em;
		padding: 3em 5%;
		box-sizing: border-box;
		position: relative;
		box-shadow: 0 0 0 100vmax var(--blue-100);
		clip-path: inset(0 -100vmax);

		.logo {
			margin-top: 2em;
			align-self: center;
		}

		h2 {
			text-align: center;
			margin: auto;
			max-width: 350px;
		}
	}

	.addag-2 {
		margin-top: 5em;
		align-self: center;
		object-fit: cover;
		width: 100%;
		border-radius: 5em;
	}

	@media (min-width: 768px) {
		.addag-2 {
			height: 400px;
			width: 1000px;
		}
	}
</style>
