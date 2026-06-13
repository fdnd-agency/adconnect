# ContactForm.svelte Component Documentation

## Overview

The ContactForm component (ContactForm.svelte) renders a contact form that submits via a SvelteKit form action with progressive enhancement. It tracks a submission status and swaps the form out for loading, success, and error states accordingly. It takes no data props and is rendered as-is.

<details>
	<summary>Example</summary>

<img width="1616" height="770" alt="image" src="https://github.com/user-attachments/assets/df14615b-8a18-4c45-9742-b4eac6c0feed" />

</details>

---

## Component Structure

### Script

```svelte
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
```

Props:
- none - The component is self-contained; submission is handled internally.

> `status` drives which view is shown: `''`/`'error'` show the form, `'submitting'` shows the loading state, `'success'` shows the success state. `formSubmit` is the `use:enhance` callback that updates `status` based on the action result.

---

### HTML

```svelte
<section class="contact-form-wrapper">
	<!-- form is shown on first load and after an error -->
	{#if status === '' || status === 'error'}
		<h2>Contactformulier</h2>
		<form
			class="contact-form"
			method="POST"
			action="?/contactSubmit"
			use:enhance={formSubmit}
		>
			<!-- hidden fields: API key + email metadata sent with the submission -->
			<input type="hidden" name="access_key" value="..." />
			<input type="hidden" name="subject" value="Nieuwe inzending contactformulier" />
			<input type="hidden" name="from_name" value="Overlegplatform Ad" />

			<!-- visible fields, all required -->
			<label for="name" class="contact-form__field contact-form__field--name">
				<p>Naam + Achternaam<span>*</span></p>
				<input type="text" name="name" id="name" required />
			</label>
			<label for="email" class="contact-form__field contact-form__field--email">
				<p>E-mailadres<span>*</span></p>
				<input type="email" name="email" id="email" required pattern="..." />
			</label>
			<label for="message" class="contact-form__field contact-form__field--message">
				<p>Jouw vraag<span>*</span></p>
				<textarea name="message" id="message" required></textarea>
			</label>

			<button class="button-outline-white" type="submit">Formulier verzenden</button>

			<!-- inline error message, shown when status is 'error' -->
			<ErrorState {status} />
		</form>
	{/if}

	<!-- replaces the form while submitting -->
	<LoadingState {status} />

	<!-- replaces the form on success -->
	<SuccesState {status} />
</section>
```

> All three visible fields are required; the email field also validates against a pattern.
> The hidden inputs carry the submission key and email metadata; `ErrorState`, `LoadingState`, and `SuccesState` each react to `status`.

### Usage Examples

The component takes no props; just place it where the form should appear. The matching `?/contactSubmit` form action must exist on the page.

```svelte
<div class="contact-wrapper">
	<ContactCard />
	<ContactForm />
</div>
```

### CSS

The dynamic styling is the live validation feedback on the inputs; the rest is standard layout.

```svelte
<style>
	/* red outline once a field has input but is still invalid */
	input:invalid:not(:placeholder-shown),
	textarea:invalid:not(:placeholder-shown) {
		outline: 2px solid red;
	}

	/* green outline once a field is valid */
	input:valid,
	textarea:valid {
		outline: 2px solid rgb(1, 213, 5);
	}
</style>
```
