<script>
	import { Form } from '$lib'

	const { form, course = null, cooperations = null, selectedCooperationIds: selectedCooperationIdsProp = [], showPublishButton = false, resetOnSuccess = true, onSuccess = null } = $props()

	let title = $state('')
	let selectedCooperationIds = $state([])
	let cooperationSearch = $state('')
	let titleSource = $state('')
	let selectedCooperationIdsSource = $state('')

	const cooperationAddHref = '/admin/cooperations/create'
	const normalizedCooperationSearch = $derived(cooperationSearch.trim().toLowerCase())
	const cooperationItems = $derived(Array.isArray(cooperations) ? cooperations : [])
	const filteredCooperations = $derived(
		normalizedCooperationSearch
			? cooperationItems.filter((cooperation) => (cooperation.name ?? `Samenwerking ${cooperation.id}`).toLowerCase().includes(normalizedCooperationSearch))
			: cooperationItems
	)

	function normalizeStringList(value) {
		if (Array.isArray(value)) {
			return value.map((item) => String(item ?? '').trim()).filter(Boolean)
		}

		if (value === null || value === undefined || value === '') return []

		return [String(value).trim()].filter(Boolean)
	}

	function isCooperationSelected(cooperationId) {
		return selectedCooperationIds.includes(String(cooperationId))
	}

	function toggleCooperationSelection(cooperationId) {
		const normalizedId = String(cooperationId)
		if (selectedCooperationIds.includes(normalizedId)) {
			selectedCooperationIds = selectedCooperationIds.filter((id) => id !== normalizedId)
			return
		}

		selectedCooperationIds = [...selectedCooperationIds, normalizedId]
	}

	async function handleSuccess(result) {
		if (resetOnSuccess) {
			title = ''
			selectedCooperationIds = []
			cooperationSearch = ''
		}

		if (typeof onSuccess === 'function') {
			await onSuccess(result)
		}
	}

	$effect(() => {
		const nextTitle = String(form?.title ?? course?.title ?? '')
		if (nextTitle !== titleSource) {
			titleSource = nextTitle
			title = nextTitle
		}
	})

	$effect(() => {
		const nextSource = Array.isArray(form?.cooperations) ? JSON.stringify(form.cooperations) : JSON.stringify(selectedCooperationIdsProp ?? [])

		if (nextSource === selectedCooperationIdsSource) return
		selectedCooperationIdsSource = nextSource
		selectedCooperationIds = normalizeStringList(Array.isArray(form?.cooperations) ? form.cooperations : selectedCooperationIdsProp)
	})
</script>

<Form
	{form}
	{showPublishButton}
	{resetOnSuccess}
	onSuccess={handleSuccess}
	formClass="course-form"
>
	<div class="field-group">
		<label for="question">Titel</label>
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

	{#if Array.isArray(cooperations)}
		<div class="field-group">
			<div class="field-heading-row">
				<label for="cooperations">Hogescholen</label>
				<a
					href={cooperationAddHref}
					target="_blank"
					rel="noreferrer"
					class="add-link"
				>
					Samenwerking toevoegen
				</a>
			</div>
			{#if cooperationItems.length === 0}
				<p class="field-help">Geen samenwerkingen gevonden om te koppelen.</p>
				<div class="cooperations-picker cooperations-picker-disabled">
					<p class="field-help">Geen samenwerkingen beschikbaar</p>
				</div>
			{:else}
				<div class="cooperations-picker">
					<div class="cooperations-toolbar">
						<input
							id="cooperations"
							type="text"
							class="cooperation-search"
							placeholder="Zoek hogescholen"
							autocomplete="off"
							bind:value={cooperationSearch}
						/>
						<p class="cooperations-count">{selectedCooperationIds.length} geselecteerd</p>
					</div>

					<div
						class="cooperations-list"
						role="listbox"
						aria-multiselectable="true"
						aria-label="Selecteer hogescholen"
					>
						{#if filteredCooperations.length === 0}
							<p class="field-help cooperations-empty">Geen hogescholen gevonden voor deze zoekterm.</p>
						{:else}
							{#each filteredCooperations as cooperation (cooperation.id)}
								<label
									class="cooperation-option"
									class:cooperation-option-selected={isCooperationSelected(cooperation.id)}
								>
									<input
										type="checkbox"
										checked={isCooperationSelected(cooperation.id)}
										onchange={() => toggleCooperationSelection(cooperation.id)}
									/>
									<span>{cooperation.name ?? `Samenwerking ${cooperation.id}`}</span>
								</label>
							{/each}
						{/if}
					</div>

					{#each selectedCooperationIds as cooperationId (cooperationId)}
						<input
							type="hidden"
							name="cooperations"
							value={cooperationId}
						/>
					{/each}
				</div>

				<p class="field-help">Selecteer een of meer hogescholen. Je kunt zoeken en meerdere vakjes aanvinken.</p>
			{/if}
		</div>
	{/if}
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

	.cooperations-picker {
		border: 1.5px solid var(--primary-orange);
		border-radius: 14px;
		padding: 0.7em;
		background: light-dark(hsl(38, 95%, 97%), hsl(210, 24%, 15%));
		box-shadow: light-dark(0 8px 18px hsl(28, 78%, 80%, 0.25), 0 8px 18px hsl(210, 35%, 6%, 0.35));
	}

	.cooperations-picker-disabled {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 120px;
	}

	.cooperations-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75em;
		margin-bottom: 0.75em;
	}

	.cooperation-search {
		flex: 1;
		min-width: 0;
	}

	.cooperations-count {
		margin: 0;
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-weight: var(--weight-medium);
		color: var(--neutral-700);
		white-space: nowrap;
	}

	.cooperations-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 0.65em;
		max-height: 320px;
		overflow-y: auto;
		padding-right: 0.2em;
	}

	.cooperation-option {
		display: flex;
		align-items: center;
		gap: 0.65em;
		border-radius: 12px;
		border: 1px solid transparent;
		padding: 0.75em 0.9em;
		background: light-dark(var(--text-white), hsl(210, 30%, 12%));
		cursor: pointer;
		font-family: var(--font-body);
		font-size: 1rem;
		font-weight: var(--weight-regular);
	}

	.cooperation-option-selected {
		border-color: var(--primary-blue);
		box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary-blue) 35%, transparent);
	}

	.cooperation-option input[type='checkbox'] {
		width: 18px;
		height: 18px;
		accent-color: var(--primary-blue);
		border-radius: 4px;
		padding: 0;
		margin: 0;
	}

	.cooperation-option span {
		line-height: 1.25;
	}

	.field-heading-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75em;
	}

	.add-link {
		font-family: var(--font-body);
		font-size: 0.95rem;
		font-weight: var(--weight-medium);
		color: light-dark(var(--primary-blue), var(--text-white));
		text-decoration: underline;
		text-underline-offset: 0.18em;
	}

	.add-link:hover {
		color: light-dark(var(--primary-orange), var(--text-white));
	}

	.field-help {
		margin: 0;
		font-family: var(--font-body);
		font-size: 0.9rem;
		color: light-dark(var(--neutral-700), var(--neutral-200));
	}

	@media (max-width: 800px) {
		.cooperations-toolbar,
		.field-heading-row {
			flex-direction: column;
			align-items: stretch;
		}

		.add-link {
			width: fit-content;
		}
	}
</style>
