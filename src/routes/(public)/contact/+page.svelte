<script>
	// Import components Atomic Design
	import { Breadcrumb, RContactForm, RContactCard } from '$lib'
</script>

<svelte:head>
	<title>Contact | Overlegplatform Associate degrees</title>
</svelte:head>

<section
	class="contact-hero"
	id="main"
>
	<!-- Breadcrumbs -->
	<div class="breadcrumbs">
		<Breadcrumb />
	</div>

	<h1>Vragen? Neem contact op</h1>
	<p class="intro">Heb je vragen of wil je meer weten over Associate Degrees neem dan via het onderstaande formulier contact met ons op.</p>

	<div class="contact-wrapper">
		<RContactCard />
		<RContactForm />
	</div>
</section>

<style>
	.contact-hero {
		box-sizing: border-box;
		background-color: light-dark(var(--blue-100), var(--blue-800));
		width: 100%;
		padding: 3em 5%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;

		@media (min-width: 768px) {
			padding: 5em 5%;
			gap: 1.5em;
		}
	}

	.breadcrumbs {
		margin: 0 0 -1em 0;
		:global(a) {
			color: light-dark(var(--blue-800), var(--text-white));
		}
	}

	h1,
	.intro {
		text-align: center;
	}

	.contact-wrapper {
		display: flex;
		flex-direction: column-reverse;
		gap: 1em;
		width: 100%;
	}

	@media (min-width: 875px) {
		.contact-wrapper {
			flex-direction: row;
			gap: 2em;
			max-width: 1400px;
		}
	}
</style>
