<script>
	import { page } from '$app/stores'
	$: pathname = $page.url.pathname
	import { enhance } from '$app/forms'

	// Import components Atomic Design
	import { Breadcrumb, ErrorState, SuccesState, LoadingState, RContactForm } from '$lib'

	// Import images Atomic Design
	import { mail, map, phone, lightcircle, darkcircle, birdcheck, loading, wrong } from '$lib'

	const breadcrumb = ''

	function handleFormSubmit(resultType) {
		console.log('Form submitted with result:', resultType)
	}
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
		<section class="contact-info">
			<h2 class="white">Contactgegevens</h2>
			<p class="white">Heb je vragen? Vul het contactformulier in of neem contact op via de onderstaande contactgegevens.</p>
			<ul>
				<li>
					<a
						href="/"
						class="white"
						><img
							src={phone}
							alt=""
						/>Telefoonnummer</a
					>
				</li>
				<li>
					<a
						href="mailto:platformassociatedegrees@outlook.com"
						class="white"
						><img
							src={mail}
							alt=""
						/>platformads@outlook.com</a
					>
				</li>
			</ul>

			<img
				class="circle-info"
				src={lightcircle}
				alt=""
			/>
		</section>

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

		h2 {
			font-size: 25px;
		}
	}

	@media (min-width: 875px) {
		.contact-wrapper {
			flex-direction: row;
			gap: 2em;
			max-width: 1400px;
		}
	}

	.contact-form {
		width: 100%;
	}

	.contact-info {
		background-color: var(--primary-blue);
		color: var(--text-white);
		display: flex;
		flex-direction: column;
		padding: 1.5em;
		border-radius: 1em;
		gap: 0.7em;
		position: relative;
		overflow: hidden;

		ul {
			list-style-type: none;
			display: flex;
			flex-direction: column;
			gap: 0.5em;
		}

		h2 {
			font-size: clamp(1.1875rem, 1.0237rem + 0.6897vw, 1.5625rem);
		}

		a {
			display: flex;
			align-items: center;
			gap: 0.5em;
			color: var(--text-white);
			word-break: break-all;
			position: relative;
			z-index: 1;
		}
	}

	@media (min-width: 875px) {
		.contact-info {
			width: 40%;
		}
	}

	.circle-info {
		display: none;

		@media (min-width: 768px) {
			width: 17em;
			right: -10%;
			bottom: -10%;
			display: block;
			position: absolute;
		}
	}

	/* FAQ */

	.white {
		color: var(--text-white);
	}
</style>
