<script>
	import { enhance } from '$app/forms'
	import { ErrorState, SuccesState, LoadingState } from '$lib'

	// Variable to check the status of the form
	let status = $state('')

	function formSubmit() {
		status = 'submitting'

		return async ({ result, update }) => {
			if (result.type === 'success') {
				status = 'success'
			} else if (result.type === 'failure') {
				status = 'error'
			}

			await update()
		}
	}
</script>

<section class="contact-form-wrapper">
	{#if status === '' || status === 'error'}
		<h2>Contactformulier</h2>
		<form
			class="contact-form"
			method="POST"
            action='?/contactSubmit'
			use:enhance={formSubmit}
		>
			<p class="contact-form__required-note">Velden met een '<span class="contact-form__required-indicator">*</span>' zijn verplicht</p>

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
				class="contact-form__field contact-form__field--name"
			>
				<p>Naam + Achternaam<span>*</span></p>
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
				class="contact-form__field contact-form__field--email"
			>
				<p>E-mailadres<span>*</span></p>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Bijv. janvanhuizen@gmail.com"
					required
					pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
				/>
			</label>
			<label for="message" class="contact-form__field contact-form__field--message">
				<p>Jouw vraag<span>*</span></p>
				<textarea
					name="message"
					id="message"
					placeholder="Beste Overlegplatform Ad's, ik heb een vraag over.."
					required
				></textarea>
			</label>

			<button
				class="button-outline-white"
				type="submit"
			>
				Formulier verzenden
			</button>

			<ErrorState {status} />
		</form>
	{/if}

	<LoadingState {status} />

	<SuccesState {status} />
</section>

<style>
	.contact-form-wrapper {
		width: 100%;
		background-color: light-dark(var(--text-white), var(--primary-blue));
		border: 1px solid var(--neutral-300);
		border-radius: 1em;
		padding: 1.5em;
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: center;
		gap: 1em;
	}

	@media (min-width: 768px) {
		.contact-form {
			width: 100%;
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1em;
		}

		.contact-form__field:nth-child(7) {
			grid-column: 1 / -1;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.8em;
	}

	.contact-form__field {
		display: flex;
		flex-direction: column;
		font-family: var(--font-body);
		font-weight: var(--text-font-weight);
		font-size: var(--p-s-size);
	}

	.contact-form__field--name {
		grid-column: 1/2;
	}

	.contact-form__field--email {
		grid-column: 2/3;
	}

	.contact-form__field p {
		display: flex;
		gap: 0.5em;

		span {
			color: var(--primary-orange);
		}
	}

	.contact-form__field input,
	.contact-form__field textarea {
		font-family: var(--font-body);
		font-weight: var(--text-font-weight);
		font-size: var(--p-s-size);
		color: var(--blue-800);
		padding: 0.9em;
		background-color: #f2f2f2;
		border: 1px solid var(--neutral-300);
		border-radius: 0.5em;
		margin: 0.5em 0 0 0;

		&::-webkit-input-placeholder {
			color: var(--blue-800);
		}
	}

	.contact-form__field textarea {
		height: 7em;
	}

	.contact-form__required-note {
		grid-row: 3;
		grid-column: 2/3;
		background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
		padding: 0.5em 1em;
		width: fit-content;
		height: fit-content;
		border-radius: 0.5em;

		@media (min-width: 768px) {
			order: -1;
		}
	}

	.contact-form__required-indicator {
		color: var(--primary-orange);
	}

	input:invalid:not(:placeholder-shown),
	textarea:invalid:not(:placeholder-shown) {
		outline: 2px solid red;
	}

	input:valid,
	textarea:valid {
		outline: 2px solid rgb(1, 213, 5);
	}
</style>
