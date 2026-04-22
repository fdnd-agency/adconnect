<script>
	import Form from '$lib/organisms/forms/Form.svelte'

	const { form, event = null, nominations = [], selectedNominationIds: initialSelectedNominationIds = [], showPublishButton = false, resetOnSuccess = true, onSuccess = null, requireImage = true } = $props()

	function normalizeNominationIds(rawValue) {
		if (Array.isArray(rawValue)) {
			return rawValue.map((value) => String(value ?? '').trim()).filter(Boolean)
		}

		const value = String(rawValue ?? '').trim()
		return value ? [value] : []
	}

	function extractNominationIdsFromEvent(rawNominationLinks) {
		if (!Array.isArray(rawNominationLinks)) return []

		return rawNominationLinks
			.map((link) => {
				if (typeof link === 'string' || typeof link === 'number') {
					return String(link).trim()
				}

				if (!link || typeof link !== 'object') {
					return ''
				}

				const relatedNomination = link.adconnect_nominations_id
				if (typeof relatedNomination === 'object' && relatedNomination !== null) {
					return String(relatedNomination.id ?? '').trim()
				}

				if (typeof relatedNomination === 'string') {
					return relatedNomination.trim()
				}

				if (relatedNomination !== null && relatedNomination !== undefined) {
					return String(relatedNomination).trim()
				}

				return ''
			})
			.filter(Boolean)
	}

	const initialTitle = $derived(event?.title ?? '')
	const initialDescription = $derived(event?.description ?? '')
	const initialDate = $derived(typeof event?.date === 'string' ? event.date.slice(0, 10) : '')
	const initialTimeDuration = $derived(event?.time_duration ?? '')
	const initialExcerpt = $derived(event?.excerpt ?? '')
	const initialBody = $derived(event?.body ?? '')
	const currentHeroId = $derived(typeof event?.hero === 'object' ? (event?.hero?.id ?? '') : (event?.hero ?? ''))

	const titleValue = $derived(form?.title ?? initialTitle)
	const descriptionValue = $derived(form?.description ?? initialDescription)
	const dateValue = $derived(form?.date ?? initialDate)
	const timeDurationValue = $derived(form?.time_duration ?? initialTimeDuration)
	const excerptValue = $derived(form?.excerpt ?? initialExcerpt)
	const bodyValue = $derived(form?.body ?? initialBody)
	const hasSubmittedNominationState = $derived(form != null && typeof form === 'object' && 'nomination_ids' in form)
	const submittedNominationIds = $derived(normalizeNominationIds(form?.nomination_ids))
	const nominationSeedIds = $derived(hasSubmittedNominationState ? submittedNominationIds : normalizeNominationIds(initialSelectedNominationIds))

	let selectedNominationIds = $state([])
	let lastNominationSeedKey = $state('')

	const selectedNominationsText = $derived(selectedNominationIds.length === 0 ? 'Kies nominaties' : `${selectedNominationIds.length} geselecteerd`)

	async function handleSuccess(result) {
		if (resetOnSuccess) {
			selectedNominationIds = []
		}

		if (typeof onSuccess === 'function') {
			await onSuccess(result)
		}
	}

	$effect(() => {
		const normalizedSeed = normalizeNominationIds(nominationSeedIds)
		const nextSeedKey = normalizedSeed.join('|')

		if (nextSeedKey !== lastNominationSeedKey) {
			selectedNominationIds = [...normalizedSeed]
			lastNominationSeedKey = nextSeedKey
		}
	})
</script>

<Form
	{form}
	{showPublishButton}
	{resetOnSuccess}
	onSuccess={handleSuccess}
	hasFileFields={true}
	formClass="event-form"
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
			required={requireImage}
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
		<label for="time_duration">Tijdsduur</label>
		<input
			id="time_duration"
			name="time_duration"
			type="text"
			autocomplete="off"
			placeholder="Bijv. 19:00 - 21:00"
			value={timeDurationValue}
			required
		/>
	</div>

	<div class="field-group">
		<label for="excerpt">Samenvatting</label>
		<textarea
			id="excerpt"
			name="excerpt"
			placeholder="Voer een samenvatting in"
			required>{excerptValue}</textarea
		>
	</div>

	<div class="field-group">
		<label for="body">Body</label>
		<textarea
			id="body"
			name="body"
			placeholder="Voer de body in"
			required>{bodyValue}</textarea
		>
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
								value={String(nomination.id)}
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
</style>
