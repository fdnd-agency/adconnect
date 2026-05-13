<script>
	import Form from '$lib/organisms/forms/Form.svelte'

	const { form, lado = null, courses = [], sectoralAdvisoryBoards = [], sectoralAdvisoryBoardId = '', directusBase = '', showPublishButton = false, resetOnSuccess = true, onSuccess = null } = $props()

	let title = $state('')
	let nationalAdProfile = $state('')
	let ladoStatus = $state('')
	let tags = $state([])
	let tagInput = $state('')
	let tagsInputElement = $state()
	let selectedCourseIds = $state([])
	let selectedSectoralAdvisoryBoard = $state('')
	let courseSearch = $state('')
	let titleSource = $state('')
	let nationalAdProfileSource = $state('')
	let ladoStatusSource = $state('')
	let contactPersonsSource = $state('')
	let selectedCourseIdsSource = $state('')
	let selectedSectoralAdvisoryBoardSource = $state('')

	const courseAddHref = '/admin/courses/create'
	const sectoralAdvisoryBoardAddHref = '/admin/sectoral-advisory-boards/create'
	const normalizedCourseSearch = $derived(courseSearch.trim().toLowerCase())
	const filteredCourses = $derived(normalizedCourseSearch ? courses.filter((course) => (course.title ?? `Opleiding ${course.id}`).toLowerCase().includes(normalizedCourseSearch)) : courses)

	function normalizeStringList(value) {
		if (Array.isArray(value)) {
			return value.map((item) => String(item ?? '').trim()).filter(Boolean)
		}

		if (value === null || value === undefined || value === '') return []

		return [String(value).trim()].filter(Boolean)
	}

	function isCourseSelected(courseId) {
		return selectedCourseIds.includes(String(courseId))
	}

	function toggleCourseSelection(courseId) {
		const normalizedId = String(courseId)
		if (selectedCourseIds.includes(normalizedId)) {
			selectedCourseIds = selectedCourseIds.filter((id) => id !== normalizedId)
			return
		}

		selectedCourseIds = [...selectedCourseIds, normalizedId]
	}

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
		tags = tags.filter((_, currentIndex) => currentIndex !== index)
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
		const pendingTag = tagInput.trim()
		tagsInputElement.setCustomValidity(tags.length === 0 && !pendingTag ? 'Voeg minimaal 1 tag toe met Enter.' : '')
	}

	function getContactPersonsValue() {
		const pendingTag = tagInput.trim()
		if (!pendingTag || tags.includes(pendingTag)) {
			return tags
		}

		return [...tags, pendingTag]
	}

	async function handleSuccess(result) {
		if (resetOnSuccess) {
			title = ''
			nationalAdProfile = ''
			ladoStatus = ''
			tags = []
			tagInput = ''
			selectedCourseIds = []
			courseSearch = ''
		}

		if (typeof onSuccess === 'function') {
			await onSuccess(result)
		}
	}

	$effect(() => {
		const nextTitle = String(form?.title ?? lado?.title ?? '')
		if (nextTitle !== titleSource) {
			titleSource = nextTitle
			title = nextTitle
		}

		const nextNationalAdProfile = String(form?.nationalAdProfile ?? lado?.national_ad_profile ?? '')
		if (nextNationalAdProfile !== nationalAdProfileSource) {
			nationalAdProfileSource = nextNationalAdProfile
			nationalAdProfile = nextNationalAdProfile
		}

		const nextLadoStatus = String(form?.ladoStatus ?? lado?.lado_status ?? '')
		if (nextLadoStatus !== ladoStatusSource) {
			ladoStatusSource = nextLadoStatus
			ladoStatus = nextLadoStatus
		}

		const nextSource = JSON.stringify(form?.contactPersons ?? lado?.contact_persons ?? [])
		if (nextSource === contactPersonsSource) return
		contactPersonsSource = nextSource
		tags = normalizeStringList(form?.contactPersons ?? lado?.contact_persons ?? [])
	})

	$effect(() => {
		tags
		syncTagsValidity()
	})

	$effect(() => {
		const nextSource = Array.isArray(form?.courses)
			? JSON.stringify(form.courses)
			: `${String(lado?.id ?? '')}|${courses.map((course) => (String(course?.lado?.id ?? course?.lado ?? '') === String(lado?.id ?? '') ? course.id : '')).join(',')}`

		if (nextSource === selectedCourseIdsSource) return
		selectedCourseIdsSource = nextSource

		if (Array.isArray(form?.courses)) {
			selectedCourseIds = normalizeStringList(form.courses)
			return
		}

		const ladoId = String(lado?.id ?? '')
		selectedCourseIds = ladoId ? courses.filter((course) => String(course?.lado?.id ?? course?.lado ?? '') === ladoId).map((course) => String(course.id)) : []
	})

	$effect(() => {
		const nextSource = String(form?.sectoralAdvisoryBoard ?? sectoralAdvisoryBoardId ?? lado?.sectoral_advisory_board?.id ?? lado?.sectoral_advisory_board ?? '')
		if (nextSource === selectedSectoralAdvisoryBoardSource) return
		selectedSectoralAdvisoryBoardSource = nextSource
		selectedSectoralAdvisoryBoard = nextSource
	})
</script>

<Form
	{form}
	{showPublishButton}
	{resetOnSuccess}
	onSuccess={handleSuccess}
	formClass="lados-form"
>
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
		<label for="contactPersons">Contactpersonen</label>
		<div class="tags-input-wrap">
			{#each tags as tag, index (tag)}
				<span class="tag-chip">
					{tag}
					<button
						type="button"
						class="tag-remove"
						onclick={() => removeTag(index)}
						aria-label="Verwijder contactpersoon {tag}"
					>
						×
					</button>
				</span>
			{/each}
			<input
				id="tags"
				type="text"
				autocomplete="off"
				placeholder="Voer een contactpersoon in en druk Enter"
				bind:this={tagsInputElement}
				bind:value={tagInput}
				onkeydown={onTagKeydown}
			/>
		</div>
		<input
			type="hidden"
			name="contactPersons"
			value={JSON.stringify(getContactPersonsValue())}
		/>
		{#if tags.length === 0}
			<p class="field-help">Voeg minimaal 1 contactpersoon toe met Enter.</p>
		{/if}
	</div>

	<div class="field-group">
		<label for="nationalAdProfile">Landelijk AD-profiel</label>
		<input
			id="nationalAdProfile"
			name="nationalAdProfile"
			type="text"
			autocomplete="off"
			placeholder="Voer een nationaal ad-profiel in"
			bind:value={nationalAdProfile}
			required
		/>
	</div>

	<div class="field-group">
		<label for="ladoStatus">Lado-status</label>
		<input
			id="ladoStatus"
			name="ladoStatus"
			type="text"
			autocomplete="off"
			placeholder="Voer een ladostatus in"
			bind:value={ladoStatus}
			required
		/>
	</div>

	<div class="field-group">
		<div class="field-heading-row">
			<p class="field-label">Sectoraal adviescollege</p>
			<a
				href={sectoralAdvisoryBoardAddHref}
				target="_blank"
				rel="noreferrer"
				class="add-link"
			>
				Sectoraal adviescollege toevoegen
			</a>
		</div>
		{#if sectoralAdvisoryBoards.length === 0}
			<p class="field-help">Geen sectorale adviescolleges gevonden om te koppelen.</p>
			<select
				id="sectoralAdvisoryBoard"
				name="sectoralAdvisoryBoard"
				disabled
			>
				<option value="">Geen sectorale adviescolleges beschikbaar</option>
			</select>
		{:else}
			<select
				id="sectoralAdvisoryBoard"
				name="sectoralAdvisoryBoard"
				bind:value={selectedSectoralAdvisoryBoard}
				required
			>
				<option value="">Kies een sectoraal adviescollege</option>
				{#each sectoralAdvisoryBoards as board (board.id)}
					<option value={String(board.id)}>{board.title ?? `Sectoraal adviescollege ${board.id}`}</option>
				{/each}
			</select>
		{/if}
	</div>

	<div class="field-group">
		<div class="field-heading-row">
			<label for="courses">Opleidingen</label>
			<a
				href={courseAddHref}
				target="_blank"
				rel="noreferrer"
				class="add-link"
			>
				Opleiding toevoegen
			</a>
		</div>
		{#if courses.length === 0}
			<p class="field-help">Geen opleidingen gevonden om te koppelen.</p>
			<div class="courses-picker courses-picker-disabled">
				<p class="field-help">Geen opleidingen beschikbaar</p>
			</div>
		{:else}
			<div class="courses-picker">
				<div class="courses-toolbar">
					<input
						id="courses"
						type="text"
						class="course-search"
						placeholder="Zoek opleidingen"
						autocomplete="off"
						bind:value={courseSearch}
					/>
					<p class="courses-count">{selectedCourseIds.length} geselecteerd</p>
				</div>

				<div
					class="courses-list"
					role="listbox"
					aria-multiselectable="true"
					aria-label="Selecteer opleidingen"
				>
					{#if filteredCourses.length === 0}
						<p class="field-help courses-empty">Geen opleidingen gevonden voor deze zoekterm.</p>
					{:else}
						{#each filteredCourses as course (course.id)}
							<label
								class="course-option"
								class:course-option-selected={isCourseSelected(course.id)}
							>
								<input
									type="checkbox"
									checked={isCourseSelected(course.id)}
									onchange={() => toggleCourseSelection(course.id)}
								/>
								<span>{course.title ?? `Opleiding ${course.id}`}</span>
							</label>
						{/each}
					{/if}
				</div>

				{#each selectedCourseIds as courseId (courseId)}
					<input
						type="hidden"
						name="courses"
						value={courseId}
					/>
				{/each}
			</div>

			{#if selectedCourseIds.length === 0}
				<p class="field-help">Selecteer minimaal een opleiding.</p>
			{/if}
			<p class="field-help">Selecteer een of meer opleidingen. Je kunt zoeken en meerdere vakjes aanvinken.</p>
		{/if}
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

	select:disabled {
		opacity: 0.8;
	}

	.courses-picker {
		border: 1.5px solid var(--primary-orange);
		border-radius: 14px;
		padding: 0.7em;
		background: light-dark(hsl(38, 95%, 97%), hsl(210, 24%, 15%));
		box-shadow: light-dark(0 8px 18px hsl(28, 78%, 80%, 0.25), 0 8px 18px hsl(210, 35%, 6%, 0.35));
	}

	.courses-picker-disabled {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 120px;
	}

	.courses-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75em;
		margin-bottom: 0.75em;
	}

	.course-search {
		flex: 1;
		min-width: 0;
	}

	.courses-count {
		margin: 0;
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-weight: var(--weight-medium);
		color: var(--neutral-700);
		white-space: nowrap;
	}

	.courses-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 0.65em;
		max-height: 320px;
		overflow-y: auto;
		padding-right: 0.2em;
	}

	.course-option {
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

	.course-option-selected {
		border-color: var(--primary-blue);
		box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary-blue) 35%, transparent);
	}

	.course-option input[type='checkbox'] {
		width: 18px;
		height: 18px;
		accent-color: var(--primary-blue);
		border-radius: 4px;
		padding: 0;
		margin: 0;
	}

	.course-option span {
		line-height: 1.25;
	}

	.field-heading-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75em;
	}

	.field-label {
		margin: 0;
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

	.tags-input-wrap {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5em;
		min-height: 48px;
		padding: 0.35em;
		border-radius: 12px;
		border: 1.5px solid var(--primary-orange);
		background: light-dark(var(--text-white), hsl(210, 30%, 12%));
	}

	.tags-input-wrap input {
		flex: 1 1 220px;
		height: 40px;
		border: none;
		padding-left: 0.35em;
		background: transparent;
	}

	.tag-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.45em;
		padding: 0.45em 0.65em;
		border-radius: 999px;
		background: color-mix(in srgb, var(--primary-orange) 16%, transparent);
		font-family: var(--font-body);
		font-size: 0.92rem;
	}

	.tag-remove {
		width: 22px;
		height: 22px;
		border: none;
		border-radius: 999px;
		background: var(--primary-blue);
		color: var(--text-white);
		font-size: 1rem;
		line-height: 1;
		cursor: pointer;
	}

	@media (max-width: 800px) {
		.courses-toolbar,
		.field-heading-row {
			flex-direction: column;
			align-items: stretch;
		}

		.add-link {
			width: fit-content;
		}
	}
</style>
