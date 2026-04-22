<script>
	import Form from '$lib/organisms/forms/Form.svelte'

	const { form, theme = null, showPublishButton = false, resetOnSuccess = true, onSuccess = null, requireImage = false } = $props()

	let title = $state('')
	let description = $state('')
	let date = $state('')
	let excerpt = $state('')
	let body = $state('')

	const currentHeroId = $derived(typeof theme?.hero === 'object' ? (theme?.hero?.id ?? '') : (theme?.hero ?? ''))

	$effect(() => {
		title = String(form?.title ?? theme?.title ?? '')
		description = String(form?.description ?? theme?.description ?? '')
		date = String(form?.date ?? (typeof theme?.date === 'string' ? theme.date.slice(0, 10) : '') ?? '')
		excerpt = String(form?.excerpt ?? theme?.excerpt ?? '')
		body = String(form?.body ?? theme?.body ?? '')
	})

	async function handleSuccess(result) {
		if (resetOnSuccess) {
			title = ''
			description = ''
			date = ''
			excerpt = ''
			body = ''
		}

		if (typeof onSuccess === 'function') {
			await onSuccess(result)
		}
	}
</script>

<Form
	{form}
	{showPublishButton}
	{resetOnSuccess}
	onSuccess={handleSuccess}
	hasFileFields={true}
	formClass="theme-form"
>
	{#if currentHeroId}
		<input
			type="hidden"
			name="currentHeroId"
			value={currentHeroId}
		/>
	{/if}

	<div class="field-group">
		<label for="title">Titel</label>
		<input
			id="title"
			name="title"
			type="text"
			autocomplete="off"
			placeholder="Voer een titel in"
			bind:value={title}
			required
		/>
	</div>

	<div class="field-group">
		<label for="description">Omschrijving</label>
		<textarea
			id="description"
			name="description"
			placeholder="Voer een korte omschrijving in"
			bind:value={description}
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
			required={requireImage}
		/>
	</div>

	<div class="field-group field-group-half">
		<label for="date">Datum</label>
		<input
			id="date"
			name="date"
			type="date"
			bind:value={date}
			required
		/>
	</div>

	<div class="field-group">
		<label for="excerpt">Samenvatting</label>
		<textarea
			id="excerpt"
			name="excerpt"
			placeholder="Voer een samenvatting in"
			bind:value={excerpt}
			required
		></textarea>
	</div>

	<div class="field-group">
		<label for="body">Body</label>
		<textarea
			id="body"
			name="body"
			placeholder="Voer de body in"
			bind:value={body}
			required
		></textarea>
	</div>
</Form>

<style>
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
</style>
