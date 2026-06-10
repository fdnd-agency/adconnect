<script>
	import { page } from '$app/state'
	import { NavPros, TopNav, bird, Footer, Picture } from '$lib'

	const {
		title = `Error ${page.status} | Overlegplatform Associate Degrees`,
		heading = `Oeps ${page.status} error`,
		description = "De pagina die je probeert te bereiken lijkt niet te bestaan. Navigeer naar een van onze werkende pagina's hieronder."
	} = $props()
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<header class="general-header">
	<TopNav />
</header>

<NavPros />

<div
	class="wrapper-error"
	id="main"
>
	<section>
		<h1>{heading}</h1>
		<p>{description}</p>

		<ul>
			<li><a href="/over-ad">Over Ad's</a></li>
			<li><a href="/publicaties">Publicaties</a></li>
			<li><a href="/talent-award">Talent Award</a></li>
			<li><a href="/nieuws">Nieuws</a></li>
			<li><a href="/talent-award/nominaties">Nominaties</a></li>
			<li><a href="/over-ons">Over ons</a></li>
			<li><a href="/contact">Contact</a></li>
		</ul>
	</section>

	<div class="img-container">
		<Picture
			isEnhanced
			src={bird}
			alt="Een vogel in een pak met een bril die een boek vasthoud"
			width="300px"
			height="300px"
			fetchpriority="high"
			loading="eager"
			style="height:auto;"
		/>
	</div>
</div>

<Footer />

<style>
	/* ongewijzigd t.o.v. je huidige ErrorPage */
	.wrapper-error {
		display: flex;
		flex-direction: column-reverse;
		gap: 1em;
		margin: auto;
		width: 90%;
		max-width: 1400px;
		padding: 3em 0;
		padding-top: 9em;

		@media (min-width: 768px) {
			padding: 5em 0;
			padding-top: 10em;
			flex-direction: row-reverse;
		}

		.img-container {
			width: 20em;
			align-self: center;

			@media (min-width: 768px) {
				width: 25em;
			}
		}

		section {
			display: flex;
			flex-direction: column;
			align-self: center;
			gap: 1em;
			margin: auto;
		}

		h1,
		p {
			@media (min-width: 768px) {
				text-align: left;
				max-width: 30em;
			}
		}

		ul {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0.5em 1.5em;
			justify-content: start;
			align-self: center;
			list-style-position: inside;
		}

		a {
			color: light-dark(hsl(210, 30%, 8%), var(--text-white));

			&:hover {
				color: var(--primary-orange);
			}
		}
	}
</style>
