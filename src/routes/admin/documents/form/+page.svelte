<script>
	import { enhance } from '$app/forms'
	import dots from '$lib/assets/dots.svg'
	import Error from '$lib/atoms/Error.svelte'

	const { data, form } = $props()
	const categories = $derived(data?.categories ?? [])

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

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

{#if form?.success && form?.message}
	<p class="success-message">{form.message}</p>
	{#if form?.documentId}
		<p class="success-meta">Aangemaakt document-id: {form.documentId}</p>
	{/if}
{/if}

<form
	method="POST"
	enctype="multipart/form-data"
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

	<div class="field-group">
		<label for="description">Omschrijving</label>
		<textarea
			id="description"
			name="description"
			placeholder="Voer een korte omschrijving in"
			required
		></textarea>
	</div>

	<div class="field-group">
		<label for="image">Afbeelding</label>
		<input
			id="image"
			name="image"
			type="file"
			accept="image/*"
			required
		/>
	</div>

	<div class="field-group field-group-half">
		<label for="date">Datum</label>
		<input
			id="date"
			name="date"
			type="date"
			required
		/>
	</div>

	<div class="field-group field-group-half">
		<label for="category">Categorie</label>
		<select
			id="category"
			name="category"
			required
		>
			<option value="">Kies een categorie</option>
			{#each categories as category (category.id)}
				<option value={category.id}>{category.title}</option>
			{/each}
		</select>
	</div>

	<div class="field-group">
		<label for="source_file">Bronbestand</label>
		<input
			id="source_file"
			name="source_file"
			type="file"
			accept=".pdf,.doc,.docx"
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
			title="Publiceren"
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

	.success-meta {
		font-family: var(--font-body);
		font-size: 0.9rem;
		margin: -0.5em 0 1em;
		color: light-dark(var(--blue-800), var(--blue-150));
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

	.field-group-half {
		max-width: 280px;
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

	select {
		height: 48px;
		border-radius: 12px;
		border: 1.5px solid var(--primary-orange);
		padding: 0 0.9em;
		font-family: var(--font-body);
		font-size: 1rem;
		background: light-dark(var(--text-white), hsl(210, 30%, 12%));
		color: light-dark(var(--text-darkblue), var(--text-white));
	}

	input[type='file'] {
		height: auto;
		padding: 0.6em 0.75em;
	}

	input[type='file']::file-selector-button {
		font-family: var(--font-heading);
		font-size: 0.9rem;
		padding: 0.45em 0.9em;
		margin-right: 0.7em;
		border-radius: 10px;
		border: var(--button-outline-border);
		background: light-dark(var(--text-white), hsl(210, 30%, 16%));
		color: var(--button-outline-text);
		cursor: pointer;
	}

	textarea {
		min-height: 150px;
		resize: vertical;
		border-radius: 12px;
		border: 1.5px solid var(--primary-orange);
		padding: 0.75em 0.9em;
		font-family: var(--font-body);
		font-size: 1rem;
		background: light-dark(var(--text-white), hsl(210, 30%, 12%));
		color: light-dark(var(--text-darkblue), var(--text-white));
	}

	input::placeholder,
	textarea::placeholder {
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
