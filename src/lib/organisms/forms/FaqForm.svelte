<script>
	import Form from '$lib/organisms/forms/Form.svelte'

	const { form, faq = null, showPublishButton = false, resetOnSuccess = true, onSuccess = null } = $props()

	const initialQuestion = $derived(faq?.question ?? '')
	const initialAnswer = $derived(faq?.answer ?? '')
	const initialImportant = $derived(faq?.important === true)
	const questionValue = $derived(form?.question ?? initialQuestion)
	const answerValue = $derived(form?.answer ?? initialAnswer)
	const importantValue = $derived(form?.important ?? initialImportant)
</script>

<Form
	{form}
	{showPublishButton}
	{resetOnSuccess}
	{onSuccess}
	formClass="faq-form"
>
	<div class="field-group">
		<label for="question">Vraag</label>
		<input
			id="question"
			name="question"
			type="text"
			autocomplete="off"
			placeholder="Voer een vraag in"
			value={questionValue}
			required
		/>
	</div>

	<div class="field-group">
		<label for="answer">Antwoord</label>
		<textarea
			id="answer"
			name="answer"
			placeholder="Voer een antwoord in"
			required>{answerValue}</textarea
		>
	</div>

	<div class="field-group toggle-group">
		<label for="important">Belangrijk</label>
		<label
			class="toggle-row"
			for="important"
		>
			<input
				id="important"
				name="important"
				type="checkbox"
				checked={importantValue}
			/>
			<span>Markeer als belangrijk</span>
		</label>
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

	.toggle-group {
		gap: 0.55em;
	}

	.toggle-row {
		display: inline-flex;
		align-items: center;
		gap: 0.65em;
		font-family: var(--font-body);
		font-size: 1rem;
		font-weight: var(--weight-regular);
	}

	.toggle-row input[type='checkbox'] {
		width: 18px;
		height: 18px;
		accent-color: var(--primary-blue);
		border-radius: 4px;
		padding: 0;
		margin: 0;
	}
</style>
