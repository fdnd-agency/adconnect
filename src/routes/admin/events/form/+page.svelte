<script>
	import { enhance } from '$app/forms'
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'

	const { data, form } = $props()
	const nominations = $derived(data?.nominations ?? [])
	const directusBase = `${DIRECTUS_URL}/admin/content`

	let isSubmitting = $state(false)
	let selectedNominationIds = $state([])
	const selectedNominationsText = $derived(selectedNominationIds.length === 0 ? 'Kies nominaties' : `${selectedNominationIds.length} geselecteerd`)

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
</script>

<svelte:head>
	<title>Event toevoegen | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Events"
	{directusBase}
	contentType="adconnect_events"
	breadcrumb="Events › Formulier"
	addHref="/admin/events/form"
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
	enctype="multipart/form-data"
	class="event-form"
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
		<label for="time_duration">Tijdsduur</label>
		<input
			id="time_duration"
			name="time_duration"
			type="text"
			autocomplete="off"
			placeholder="Bijv. 19:00 - 21:00"
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
		<div class="field-heading-row">
			<p class="field-label">Nominaties (optioneel)</p>
			<a
				href="/admin/nominations/form"
				target="_blank"
				class="add-link"
			>
				Nominatie toevoegen
			</a>
		</div>
		{#if nominations.length === 0}
			<p class="field-help">Geen bestaande nominaties gevonden om te koppelen.</p>
		{:else}
			<details class="checkbox-dropdown">
				<summary>{selectedNominationsText}</summary>
				<div class="checkbox-list">
					{#each nominations as nomination (nomination.id)}
						<label
							class="checkbox-item"
							for={`nomination-${nomination.id}`}
						>
							<input
								id={`nomination-${nomination.id}`}
								type="checkbox"
								name="nomination_ids"
								value={nomination.id}
								bind:group={selectedNominationIds}
							/>
							<span>{nomination.title ?? `Nominatie ${nomination.id}`}</span>
						</label>
					{/each}
				</div>
			</details>
			<p class="field-help">Je kunt meerdere nominaties aanvinken, of dit veld leeg laten.</p>
		{/if}
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

	.event-form {
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

	input:not([type='checkbox']) {
		height: 48px;
		border-radius: 12px;
		border: 1.5px solid var(--primary-orange);
		padding: 0 0.9em;
		font-family: var(--font-body);
		font-size: 1rem;
		background: light-dark(var(--text-white), hsl(210, 30%, 12%));
		color: light-dark(var(--text-darkblue), var(--text-white));
	}

	input:not([type='checkbox'])::placeholder {
		color: var(--neutral-600);
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

	textarea::placeholder {
		color: var(--neutral-600);
	}

	.field-help {
		font-family: var(--font-body);
		font-size: 0.9rem;
		color: var(--neutral-600);
		margin: 0;
	}

	.field-label {
		font-family: var(--font-heading);
		font-size: 1.15rem;
		line-height: 1.2;
		font-weight: var(--weight-semibold);
		margin: 0;
	}

	.field-heading-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1em;
		flex-wrap: wrap;
	}

	.add-link {
		font-family: var(--font-body);
		font-size: 0.95rem;
		color: var(--reds-600);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.add-link:hover {
		color: var(--primary-orange);
	}

	.checkbox-dropdown {
		border: 1.5px solid var(--primary-orange);
		border-radius: 12px;
		background: light-dark(var(--text-white), hsl(210, 30%, 12%));
	}

	.checkbox-dropdown summary {
		list-style: none;
		cursor: pointer;
		padding: 0.75em 0.9em;
		font-family: var(--font-body);
		font-size: 1rem;
		color: light-dark(var(--text-darkblue), var(--text-white));
	}

	.checkbox-dropdown summary::-webkit-details-marker {
		display: none;
	}

	.checkbox-list {
		display: grid;
		gap: 0.35em;
		padding: 0 0.8em 0.8em;
		max-height: 220px;
		overflow-y: auto;
	}

	.checkbox-item {
		display: flex;
		align-items: center;
		gap: 0.55em;
		font-family: var(--font-body);
		font-size: 0.97rem;
		font-weight: var(--weight-regular);
		line-height: 1.35;
	}

	.checkbox-item input {
		width: 16px;
		height: 16px;
		margin: 0;
		accent-color: var(--primary-orange);
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
