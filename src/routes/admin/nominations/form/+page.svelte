<script>
	import { enhance } from '$app/forms'
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'

	const { form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`

	let isSubmitting = $state(false)

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
</script>

<svelte:head>
	<title>Nominatie toevoegen | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Nominaties"
	{directusBase}
	contentType="adconnect_nominations"
	breadcrumb="Nominaties › Formulier"
	addHref="/admin/nominations/form"
/>

{#if form?.error}
	<Error message={form.error} />
{/if}

{#if form?.success && form?.message}
	<p class="success-message">{form.message}</p>
{/if}

<form
	method="POST"
	class="nomination-form"
	use:enhance={() => {
		isSubmitting = true
		return async ({ result, update }) => {
			await update()
			isSubmitting = false

			if (result.type === 'success') {
				scrollToTop()
			}
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

	<div class="field-group">
		<label for="header">Header</label>
		<input
			id="header"
			name="header"
			type="text"
			autocomplete="off"
			placeholder="Voer een header in"
			required
		/>
	</div>

	<div class="field-group">
		<label for="date">Datum</label>
		<input
			id="date"
			name="date"
			type="date"
			required
		/>
	</div>

	<div class="actions">
		<button
			type="submit"
			name="submitAction"
			value="save"
			class="button-outline-blue"
			disabled={isSubmitting}
		>
			{isSubmitting ? 'Opslaan...' : 'Opslaan'}
		</button>
		<button
			type="submit"
			name="submitAction"
			value="publish"
			class="button-outline-blue"
			disabled={isSubmitting}
			title="Publiceren"
		>
			{isSubmitting ? 'Publiceren...' : 'Publiceer'}
		</button>
	</div>
</form>

<style>
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

	.nomination-form {
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
