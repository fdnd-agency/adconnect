<script>
	import { enhance } from '$app/forms'
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'

	const { data, form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
	const existingFaq = $derived(data?.faq ?? null)
	const isEditMode = $derived(data?.isEditMode === true)
	const currentFaqId = $derived(existingFaq?.id ?? '')
	const initialQuestion = $derived(existingFaq?.question ?? '')
	const initialAnswer = $derived(existingFaq?.answer ?? '')
	const initialImportant = $derived(existingFaq?.important === true)
	const questionValue = $derived(form?.question ?? initialQuestion)
	const answerValue = $derived(form?.answer ?? initialAnswer)
	const importantValue = $derived(form?.important ?? initialImportant)

	let isSubmitting = $state(false)

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
</script>

<svelte:head>
	<title>{isEditMode ? 'Faq bewerken' : 'Faq toevoegen'} | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Faqs"
	{directusBase}
	contentType="adconnect_faqs"
	breadcrumb={isEditMode ? 'Faqs › Bewerken' : 'Faqs › Formulier'}
	addHref="/admin/faqs/form"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

{#if form?.error}
	<Error message={form.error} />
{/if}

{#if form?.success && form?.message}
	<p class="success-message">{form.message}</p>
{/if}

<form
	method="POST"
	class="faq-form"
	use:enhance={() => {
		isSubmitting = true
		return async ({ result, update }) => {
			await update({ reset: !isEditMode })
			isSubmitting = false

			if (result.type === 'success') {
				scrollToTop()
			}
		}
	}}
>
	{#if isEditMode && currentFaqId}
		<input
			type="hidden"
			name="faqId"
			value={currentFaqId}
		/>
	{/if}

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

	.faq-form {
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
