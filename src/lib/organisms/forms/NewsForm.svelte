<script>
	import Form from '$lib/organisms/forms/Form.svelte'

	const { form, article = null, showPublishButton = false, resetOnSuccess = true, onSuccess = null, requireImage = true } = $props()

	function parseTagsValue(rawValue) {
		if (Array.isArray(rawValue)) {
			return rawValue.map((tag) => String(tag).trim()).filter(Boolean)
		}

		const raw = String(rawValue ?? '').trim()
		if (!raw) return []

		try {
			const parsed = JSON.parse(raw)
			if (!Array.isArray(parsed)) return []
			return parsed.map((tag) => String(tag).trim()).filter(Boolean)
		} catch {
			return []
		}
	}

	const currentHeroId = $derived(typeof article?.hero === 'object' ? (article?.hero?.id ?? '') : (article?.hero ?? ''))

	let title = $state('')
	let description = $state('')
	let date = $state('')
	let author = $state('')
	let body = $state('')
	let tags = $state([])
	let tagInput = $state('')
	let tagsInputElement = $state()

	$effect(() => {
		title = String(form?.title ?? article?.title ?? '')
		description = String(form?.description ?? article?.description ?? '')
		date = String(form?.date ?? (typeof article?.date === 'string' ? article.date.slice(0, 10) : '') ?? '')
		author = String(form?.author ?? article?.author ?? '')
		body = String(form?.body ?? article?.body ?? '')
		tags = parseTagsValue(form?.tags ?? article?.tags)
	})

	$effect(() => {
		tags
		syncTagsValidity()
	})

	function addTag() {
		const value = tagInput.trim()
		if (!value) return
		if (!tags.includes(value)) {
			tags = [...tags, value]
		}
		tagInput = ''
		syncTagsValidity()
	}

	function removeTag(index) {
		tags = tags.filter((_, i) => i !== index)
		syncTagsValidity()
	}

	function onTagKeydown(event) {
		if (event.key === 'Enter') {
			event.preventDefault()
			addTag()
		}
	}

	function syncTagsValidity() {
		if (!tagsInputElement) return
		tagsInputElement.setCustomValidity(tags.length === 0 ? 'Voeg minimaal 1 tag toe met Enter.' : '')
	}

	async function handleSuccess(result) {
		if (resetOnSuccess) {
			title = ''
			description = ''
			date = ''
			author = ''
			body = ''
			tags = []
			tagInput = ''
			syncTagsValidity()
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
	formClass="news-form"
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
			required
			bind:value={description}
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
		<label for="author">Auteur</label>
		<input
			id="author"
			name="author"
			type="text"
			autocomplete="off"
			placeholder="Voer een auteur in"
			bind:value={author}
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
						x
					</button>
				</span>
			{/each}
			<input
				id="tags"
				type="text"
				autocomplete="off"
				placeholder="Voer een tag in en druk Enter"
				bind:this={tagsInputElement}
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
			bind:value={body}
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
</style>
