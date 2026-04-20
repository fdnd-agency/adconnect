<script>
	import { page } from '$app/stores'
	$: pathname = $page.url.pathname
	import { enhance } from '$app/forms'

	// Import components Atomic Design
	import { Breadcrumb, ErrorState, SuccesState, LoadingState } from '$lib'

	// Import images Atomic Design
	import { mail, map, phone, lightcircle, darkcircle, birdcheck, loading, wrong } from '$lib'

	const breadcrumb = ''

	// Variable to check the status of the form
	let status = ''

	// Function when form is submitting
	function formSubmit() {
		// When submitting show the loading UI state
		status = 'submitting'

		return async ({ result, update }) => {
			// When the form is correct submitted then show succes UI state
			if (result.type === 'success') {
				status = 'success'
				// When the form isn't correct submitted then show error UI state
			} else if (result.type === 'failure') {
				status = 'error'
			}

			// Update the form to see the correct UI state
			await update()
		}
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

		<div class="wrapper-form">
			{#if (status === '') | (status === 'error')}
				<h2>Contactformulier</h2>
				<form
					class="contact-form"
					method="POST"
					use:enhance={formSubmit}
				>
					<p class="strict">Velden met een '<span class="orange">*</span>' zijn verplicht</p>

					<input
						type="hidden"
						name="access_key"
						value="6195e1b0-246a-4f48-ad4a-36914847623b"
					/>
					<input
						type="hidden"
						name="subject"
						value="Nieuwe inzending contactformulier"
					/>
					<input
						type="hidden"
						name="from_name"
						value="Overlegplatform Ad"
					/>
					<label
						for="name"
						class="name"
						><p>Naam + Achternaam<span>*</span></p>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Bijv. Jan van Huizen"
							required
						/>
					</label>
					<label
						for="email"
						class="email"
						><p>E-mailadres<span>*</span></p>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Bijv. janvanhuizen@gmail.com"
							required
							pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
						/>
					</label>
					<label for="message"
						><p>Jouw vraag<span>*</span></p>
						<textarea
							name="message"
							id="message"
							placeholder="Beste Overlegplatform Ad's, ik heb een vraag over.."
							required
						></textarea>
					</label>

					<button
						class="button-outline-white"
						type="submit">Formulier verzenden</button
					>

					<!-- Error state -->
					<ErrorState {status} />
				</form>
			{/if}

			<!-- Loading state -->
			<LoadingState {status} />

			<!-- Succes state -->
			<SuccesState {status} />
		</div>
	</div>
</section>

<style>
	.contact-hero {
		box-sizing: border-box;
		background-color: var(--blue-100);
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

		@media (prefers-color-scheme: dark) {
			background-color: var(--blue-800);
		}
		
		@supports (color-scheme: light-dark(red, blue)) {
			background-color: light-dark(var(--blue-100), var(--blue-800));
		}
	}

	.breadcrumbs {
		margin: 0 0 -1em 0;
		:global(a) {
			color: var(--blue-800);

			@media (prefers-color-scheme: dark) {
				color: var(--text-white);
			}

			@supports (color-scheme: light-dark(red, blue)) {
				color: light-dark(var(--blue-800), var(--text-white));
			}
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

	.wrapper-form {
		width: 100%;
		background-color: var(--text-white);
		border: 1px solid var(--neutral-300);
		border-radius: 1em;
		padding: 1.5em;
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: center;
		gap: 1em;

		@media (prefers-color-scheme: dark) {
			background-color: var(--primary-blue);
		}

		@supports (color-scheme: light-dark(red, blue)) {
			background-color: light-dark(var(--text-white), var(--primary-blue));
		}
	}

	@media (min-width: 768px) {
		.contact-form {
			width: 100%;
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1em;
		}

		.contact-form label:nth-child(7) {
			grid-column: 1 / -1;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.8em;

		.name {
			grid-column: 1/2;
		}

		.email {
			grid-column: 2/3;
		}

		.strict {
			grid-row: 3;
			grid-column: 2/3;
			background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
			padding: 0.5em 1em;
			width: fit-content;
			height: fit-content;
			border-radius: 0.5em;

			@media (prefers-color-scheme: dark) {
				background-color: hsl(210 30% 8%);
			}

			@supports (color-scheme: light-dark(red, blue)) {
				background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
			}
			@media (min-width: 768px) {
				order: -1;
			}

			.orange {
				color: var(--primary-orange);
			}
		}
	}

	label {
		display: flex;
		flex-direction: column;
		font-family: var(--font-body);
		font-weight: var(--text-font-weight);
		font-size: var(--p-s-size);

		p {
			display: flex;
			gap: 0.5em;

			span {
				color: var(--primary-orange);
			}
		}

		input,
		textarea {
			font-family: var(--font-body);
			font-weight: var(--text-font-weight);
			font-size: var(--p-s-size);
			color: var(--blue-800);
			padding: 0.9em;
			background-color: hsl(0 0% 94.9%);
			border: 1px solid var(--neutral-300);
			border-radius: 0.5em;
			margin: 0.5em 0 0 0;

			&::-webkit-input-placeholder {
				color: var(--blue-800);
			}
		}

		textarea {
			height: 7em;
		}
	}

	input:invalid:not(:placeholder-shown),
	textarea:invalid:not(:placeholder-shown) {
		outline: 2px solid hsl(0 100% 50%);
	}

	input:valid,
	textarea:valid {
		outline: 2px solid hsl(121 99.1% 42%);
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
