<script>
	import { page } from '$app/state'

	// Import Atomic Design
	import { NavPros, TopNav, bird, Footer, RPicture } from '$lib'
	const { item } = $props()
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
		<h1 class="error-section_header">Oeps {page.status} error</h1>
		<p class="error-section_description">De pagina die je probeert te bereiken lijkt niet te bestaan. Navigeer naar een van onze werkende pagina's hieronder.</p>

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

    <div class="image_container">
        <RPicture
            isEnhanced
            src={bird}
            style="height: auto; overflow:hidden;"
            width="100"
        />
    </div>

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
		
		section {
			display: flex;
			flex-direction: column;
			gap: 1em;
			margin: auto;
		}

		.error-section_header,
		.error-section_description {
			text-align: center;

			@media (min-width: 768px) {
				text-align: left;
				max-width: 30em;
			}
		}

		ul {
			display: flex;
			flex-direction: column;
			align-items: center;
			flex-wrap: wrap;
			gap: 1.5em;
			
			@media (min-width: 500px) {
				justify-content: left;
				flex-direction: row;
				gap: 0.5em 1.5em;
			}
		}

		a {
			color: light-dark(var(----text-darkblue), var(--text-white));

			&:hover {
				color: var(--primary-orange);
			}
		}
	} 

	.image_container {
		width: 400px;
		align-self: center;
	}
</style>
