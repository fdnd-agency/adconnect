<script>
	import Form from '$lib/organisms/forms/Form.svelte'

	const { form, nomination = null, events = [], showPublishButton = false, resetOnSuccess = true, onSuccess = null, requireProfilePicture = true } = $props()

	function extractEventIdFromNomination(rawEventLinks) {
		if (!Array.isArray(rawEventLinks)) return ''

		for (const link of rawEventLinks) {
			if (link === null || link === undefined) continue

			if (typeof link === 'string' || typeof link === 'number') {
				const value = String(link).trim()
				if (value) return value
				continue
			}

			if (typeof link !== 'object') continue

			const relatedEvent = link.adconnect_events_id
			if (typeof relatedEvent === 'object' && relatedEvent !== null) {
				const value = String(relatedEvent.id ?? '').trim()
				if (value) return value
				continue
			}

			if (relatedEvent !== null && relatedEvent !== undefined) {
				const value = String(relatedEvent).trim()
				if (value) return value
			}
		}

		return ''
	}

	let title = $state('')
	let header = $state('')
	let date = $state('')
	let excerpt = $state('')
	let body = $state('')
	let institution = $state('')
	let course = $state('')
	let previousCourse = $state('')
	let educationVariant = $state('')
	let alumnus = $state('')
	let eventId = $state('')

	const currentProfilePictureId = $derived(typeof nomination?.profile_picture === 'object' ? (nomination?.profile_picture?.id ?? '') : (nomination?.profile_picture ?? ''))

	$effect(() => {
		title = String(form?.title ?? nomination?.title ?? '')
		header = String(form?.header ?? nomination?.header ?? '')
		date = String(form?.date ?? (typeof nomination?.date === 'string' ? nomination.date.slice(0, 10) : '') ?? '')
		excerpt = String(form?.excerpt ?? nomination?.excerpt ?? '')
		body = String(form?.body ?? nomination?.body ?? '')
		institution = String(form?.institution ?? nomination?.institution ?? '')
		course = String(form?.course ?? nomination?.course ?? '')
		previousCourse = String(form?.previous_course ?? nomination?.previous_course ?? '')
		educationVariant = String(form?.education_variant ?? nomination?.education_variant ?? '')
		alumnus = String(form?.alumnus ?? nomination?.alumnus ?? '')
		eventId = String(form?.event_id ?? extractEventIdFromNomination(nomination?.event_id) ?? '')
	})

	async function handleSuccess(result) {
		if (resetOnSuccess) {
			title = ''
			header = ''
			date = ''
			excerpt = ''
			body = ''
			institution = ''
			course = ''
			previousCourse = ''
			educationVariant = ''
			alumnus = ''
			eventId = ''
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
	formClass="nomination-form"
>
	{#if currentProfilePictureId}
		<input
			type="hidden"
			name="currentProfilePictureId"
			value={currentProfilePictureId}
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
		<label for="header">Header</label>
		<input
			id="header"
			name="header"
			type="text"
			autocomplete="off"
			placeholder="Voer een header in"
			bind:value={header}
			required
		/>
	</div>

	<div class="field-group">
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
				bind:value={eventId}
				required
			>
				<option value="">Kies een event</option>
				{#each events as eventItem (eventItem.id)}
					<option value={String(eventItem.id)}>{eventItem.title ?? `Event ${eventItem.id}`}</option>
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
			bind:value={institution}
			required
		/>
	</div>

	<div class="field-group">
		<label for="course">Opleiding</label>
		<input
			id="course"
			name="course"
			type="text"
			autocomplete="off"
			placeholder="Voer een opleiding in"
			bind:value={course}
			required
		/>
	</div>

	<div class="field-group">
		<label for="previous_course">Vorige opleiding</label>
		<input
			id="previous_course"
			name="previous_course"
			type="text"
			autocomplete="off"
			placeholder="Voer de vorige opleiding in"
			bind:value={previousCourse}
			required
		/>
	</div>

	<div class="field-group">
		<label for="education_variant">Onderwijsvariant</label>
		<input
			id="education_variant"
			name="education_variant"
			type="text"
			autocomplete="off"
			placeholder="Voer een onderwijsvariant in"
			bind:value={educationVariant}
			required
		/>
	</div>

	<div class="field-group">
		<label for="alumnus">Alumnis</label>
		<input
			id="alumnus"
			name="alumnus"
			type="text"
			autocomplete="off"
			placeholder="Voer alumnis in"
			bind:value={alumnus}
			required
		/>
	</div>

	<div class="field-group">
		<label for="profile_picture">Profielfoto</label>
		<input
			id="profile_picture"
			name="profile_picture"
			type="file"
			accept="image/*"
			required={requireProfilePicture}
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
</style>
