<script>
	import { enhance } from '$app/forms'
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'

	const { form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`

	let isSubmitting = $state(false)
	let tags = $state([])
	let tagInput = $state('')

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	function addTag() {
		const value = tagInput.trim()
		if (!value) return
		if (!tags.includes(value)) {
			tags = [...tags, value]
		}
		tagInput = ''
	}

	function removeTag(index) {
		tags = tags.filter((_, i) => i !== index)
	}

	function onTagKeydown(event) {
		if (event.key === 'Enter') {
			event.preventDefault()
			addTag()
		}
	}
</script>

<svelte:head>
	<title>Nieuwsartikel toevoegen | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Nieuwsartikelen"
	{directusBase}
	contentType="adconnect_news"
	breadcrumb="Nieuwsartikelen › Formulier"
	addHref="/admin/news/form"
/>

{#if form?.error}
	<Error message={form.error} />
{/if}

{#if form?.success && form?.message}
	<p class="success-message">{form.message}</p>
{/if}

<form
	method="POST"
	enctype="multipart/form-data"
	class="news-form"
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

	<div class="field-group">
		<label for="author">Auteur</label>
		<input
			id="author"
			name="author"
			type="text"
			autocomplete="off"
			placeholder="Voer een auteur in"
			required
		/>
	</div>

	<div class="field-group">
		<label for="tags">Tags</label>
		<div class="tags-input-wrap">
			{#each tags as tag, index (tag)}
				<span class="tag-chip">
					{tag}
					<button
						type="button"
						class="tag-remove"
						onclick={() => removeTag(index)}
						aria-label="Verwijder tag {tag}"
					>
						×
					</button>
				</span>
			{/each}
			<input
				id="tags"
				type="text"
				autocomplete="off"
				placeholder="Voer een tag in en druk Enter"
				bind:value={tagInput}
				onkeydown={onTagKeydown}
			/>
		</div>
		<input
			type="hidden"
			name="tags"
			value={JSON.stringify(tags)}
		/>
		{#if tags.length === 0}
			<p class="field-help">Voeg minimaal 1 tag toe met Enter.</p>
		{/if}
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

	.news-form {
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

	.field-help {
		font-family: var(--font-body);
		font-size: 0.9rem;
		color: var(--neutral-600);
		margin: 0;
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

	.tags-input-wrap {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5em;
		border-radius: 12px;
		border: 1.5px solid var(--primary-orange);
		padding: 0.5em;
		background: light-dark(var(--text-white), hsl(210, 30%, 12%));
	}

	.tags-input-wrap input {
		border: none;
		height: 36px;
		padding: 0 0.35em;
		min-width: 220px;
		flex: 1 1 220px;
		background: transparent;
	}

	.tags-input-wrap input:focus {
		outline: none;
	}

	.tag-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.35em;
		font-family: var(--font-body);
		font-size: 0.9rem;
		padding: 0.25em 0.55em;
		border-radius: 999px;
		background: hsl(230, 65%, 64%);
		color: var(--text-white);
	}

	.tag-remove {
		border: none;
		background: transparent;
		color: inherit;
		font-size: 1rem;
		line-height: 1;
		cursor: pointer;
		padding: 0;
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
