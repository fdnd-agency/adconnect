<script>
	import Form from '$lib/organisms/forms/Form.svelte'

	const { form, cooperation = null, showPublishButton = false, resetOnSuccess = true, onSuccess = null, requireLogo = true } = $props()

	const currentLogoId = $derived(typeof cooperation?.logo === 'object' ? (cooperation?.logo?.id ?? '') : (cooperation?.logo ?? ''))

	let name = $state('')
	let url = $state('')

	$effect(() => {
		name = String(form?.name ?? cooperation?.name ?? '')
		url = String(form?.url ?? cooperation?.url ?? '')
	})

	async function handleSuccess(result) {
		if (resetOnSuccess) {
			name = ''
			url = ''
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
	formClass="cooperation-form"
>
	{#if currentLogoId}
		<input
			type="hidden"
			name="currentLogoId"
			value={currentLogoId}
		/>
	{/if}

	<div class="field-group">
		<label for="name">Naam</label>
		<input
			id="name"
			name="name"
			type="text"
			autocomplete="off"
			placeholder="Voer een naam in"
			bind:value={name}
			required
		/>
	</div>

	<div class="field-group">
		<label for="logo">Logo</label>
		<input
			id="logo"
			name="logo"
			type="file"
			accept="image/*"
			required={requireLogo}
		/>
	</div>

	<div class="field-group">
		<label for="url">URL</label>
		<input
			id="url"
			name="url"
			type="url"
			autocomplete="off"
			placeholder="https://voorbeeld.nl"
			bind:value={url}
			required
		/>
	</div>
</Form>

<style>
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
</style>
