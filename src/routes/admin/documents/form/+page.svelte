<script>
	import { enhance } from '$app/forms'
	import dots from '$lib/assets/dots.svg'
	import Error from '$lib/atoms/Error.svelte'

	const { form } = $props()

	let isSubmitting = $state(false)
</script>

<svelte:head>
	<title>Document toevoegen | ADConnect Admin</title>
</svelte:head>

<section class="page-header">
	<img
		src={dots}
		alt=""
		class="header-dots"
		width="80"
		height="60"
	/>
	<h1>Documenten</h1>
</section>

{#if form?.error}
	<Error message={form.error} />
{/if}

{#if form?.success && form?.message}
	<p class="success-message">{form.message}</p>
{/if}

<form
	method="POST"
	class="document-form"
	use:enhance={() => {
		isSubmitting = true
		return async ({ update }) => {
			await update()
			isSubmitting = false
		}
	}}
>
	<div class="field-group">
		<label for="title">Titel</label>
		<input
			id="title"
			name="title"
			type="text"
			autocomplete="off"
			placeholder="Voer een titel in"
			required
		/>
	</div>

	<div class="actions">
		<button
			type="submit"
			class="button-outline-blue"
			disabled={isSubmitting}
		>
			{isSubmitting ? 'Opslaan...' : 'Opslaan'}
		</button>
		<button
			type="submit"
			class="button-outline-blue"
			disabled
			title="Publiceren koppelen we in een volgende stap"
		>
			Publiceer
		</button>
	</div>
</form>

<style>
	.page-header {
		margin-bottom: 1em;
	}

	.header-dots {
		margin-bottom: 0.5em;
	}

	h1 {
		margin: 0;
	}

	.success-message {
		font-family: var(--font-body);
		font-size: 0.95rem;
		background-color: hsl(140, 45%, 18%);
		color: var(--text-white);
		border-radius: 10px;
		padding: 0.7em 1em;
		margin: 0.75em 0 1em;
		width: fit-content;
	}

	.document-form {
		display: flex;
		flex-direction: column;
		gap: 1.25em;
		max-width: 820px;
	}

	.field-group {
		display: flex;
		flex-direction: column;
		gap: 0.45em;
	}

	label {
		font-family: var(--font-heading);
		font-size: 1.15rem;
		line-height: 1.2;
		font-weight: var(--weight-semibold);
	}

	input {
		height: 48px;
		border-radius: 12px;
		border: 1.5px solid var(--primary-orange);
		padding: 0 0.9em;
		font-family: var(--font-body);
		font-size: 1rem;
		background: light-dark(var(--text-white), hsl(210, 30%, 12%));
		color: light-dark(var(--text-darkblue), var(--text-white));
	}

	input::placeholder {
		color: var(--neutral-600);
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.75em;
		margin-top: 0.5em;
	}

	button[disabled] {
		opacity: 0.65;
		cursor: not-allowed;
	}

	@media (max-width: 800px) {
		.actions {
			justify-content: flex-start;
			flex-wrap: wrap;
		}
	}
</style>
