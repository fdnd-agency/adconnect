<script>
	import Form from '$lib/organisms/forms/Form.svelte'

	const { form, document = null, categories = [], showPublishButton = false, resetOnSuccess = true, onSuccess = null, requireFiles = true } = $props()

	const initialTitle = $derived(document?.title ?? '')
	const initialDescription = $derived(document?.description ?? '')
	const initialDate = $derived(typeof document?.date === 'string' ? document.date.slice(0, 10) : '')
	const initialCategory = $derived(typeof document?.category === 'object' ? (document?.category?.id ?? '') : (document?.category ?? ''))

	const currentHeroImageId = $derived(typeof document?.hero_image === 'object' ? (document?.hero_image?.id ?? '') : (document?.hero_image ?? ''))
	const currentSourceFileId = $derived(typeof document?.source_file === 'object' ? (document?.source_file?.id ?? '') : (document?.source_file ?? ''))

	const titleValue = $derived(form?.title ?? initialTitle)
	const descriptionValue = $derived(form?.description ?? initialDescription)
	const dateValue = $derived(form?.date ?? initialDate)
	const categoryValue = $derived(form?.category ?? initialCategory)
</script>

<Form
	{form}
	{showPublishButton}
	{resetOnSuccess}
	{onSuccess}
	hasFileFields={true}
	formClass="document-form"
>
	{#if currentHeroImageId}
		<input
			type="hidden"
			name="currentHeroImageId"
			value={currentHeroImageId}
		/>
	{/if}

	{#if currentSourceFileId}
		<input
			type="hidden"
			name="currentSourceFileId"
			value={currentSourceFileId}
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
			value={titleValue}
			required
		/>
	</div>

	<div class="field-group">
		<label for="description">Omschrijving</label>
		<textarea
			id="description"
			name="description"
			placeholder="Voer een korte omschrijving in"
			required>{descriptionValue}</textarea
		>
	</div>

	<div class="field-group">
		<label for="image">Afbeelding</label>
		<input
			id="image"
			name="image"
			type="file"
			accept="image/*"
			required={requireFiles}
		/>
	</div>

	<div class="field-group field-group-half">
		<label for="date">Datum</label>
		<input
			id="date"
			name="date"
			type="date"
			value={dateValue}
			required
		/>
	</div>

	<div class="field-group field-group-half">
		<label for="category">Categorie</label>
		<select
			id="category"
			name="category"
			value={categoryValue}
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
			required={requireFiles}
		/>
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

	input,
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
</style>
