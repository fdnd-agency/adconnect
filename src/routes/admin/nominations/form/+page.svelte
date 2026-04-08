<script>
	import { enhance } from '$app/forms'
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'

	const { data, form } = $props()
	const events = $derived(data?.events ?? [])
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

{#if data?.loadError}
	<Error message={data.loadError} />
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

	<div class="field-group">
		<label for="excerpt">Samenvatting</label>
		<textarea
			id="excerpt"
			name="excerpt"
			placeholder="Voer een samenvatting in"
			required
		></textarea>
	</div>

	<div class="field-group">
		<label for="body">Body</label>
		<textarea
			id="body"
			name="body"
			placeholder="Voer de body in"
			required
		></textarea>
	</div>

	<div class="field-group">
		<label for="event_id">Event</label>
		{#if events.length === 0}
			<p class="field-help">Geen events gevonden om te koppelen.</p>
			<select
				id="event_id"
				name="event_id"
				disabled
			>
				<option value="">Geen events beschikbaar</option>
			</select>
		{:else}
			<select
				id="event_id"
				name="event_id"
				required
			>
				<option value="">Kies een event</option>
				{#each events as event (event.id)}
					<option value={event.id}>{event.title ?? `Event ${event.id}`}</option>
				{/each}
			</select>
		{/if}
	</div>

	<div class="field-group">
		<label for="institution">Instelling</label>
		<input
			id="institution"
			name="institution"
			type="text"
			autocomplete="off"
			placeholder="Voer een instelling in"
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

	.field-help {
		font-family: var(--font-body);
		font-size: 0.9rem;
		color: var(--neutral-600);
		margin: 0;
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
