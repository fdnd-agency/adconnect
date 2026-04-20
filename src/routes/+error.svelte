<script>
	import { page } from '$app/state'

	// Import Atomic Design
	import { NavPros, TopNav, bird, Footer } from '$lib'
</script>

<svelte:head>
	<title>Error {page.status} | Overlegplatform Associate Degrees</title>
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
		<h1>Oeps {page.status} error</h1>
		<p>De pagina die je probeert te bereiken lijkt niet te bestaan. Navigeer naar een van onze werkende pagina's hieronder.</p>

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

	<img
		src={bird}
		alt="Een vogel in een pak met een bril die een boek vasthoud"
	/>
</div>

<Footer />

<style>
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

		img {
			width: 20em;
			align-self: center;

			@media (min-width: 768px) {
				width: 25em;
			}
		}

		section {
			display: flex;
			flex-direction: column;
			gap: 1em;
			margin: auto;
		}

		h1,
		p {
			text-align: center;

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
			justify-content: center;

			@media (min-width: 768px) {
				justify-content: left;
			}
		}

		li:first-of-type {
			list-style-type: none;
		}

		a {
			color: var(--blue-800);

			@media (prefers-color-scheme: dark) {
				color: var(--text-white);
			}

			@supports (color-scheme: light-dark(red, blue)) {
				color: light-dark(var(--blue-800), var(--text-white))
			}

			&:hover {
				color: var(--primary-orange);
			}
		}
	}
</style>
