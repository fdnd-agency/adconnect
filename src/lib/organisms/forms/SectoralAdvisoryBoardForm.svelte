<script>
	import { Form } from '$lib'

	const { form, sectoralAdvisoryBoard = null, showPublishButton = false, resetOnSuccess = true, onSuccess = null } = $props()

	const initialTitle = $derived(sectoralAdvisoryBoard?.title ?? '')
	const titleValue = $derived(form?.title ?? initialTitle)
</script>

<Form
	{form}
	{showPublishButton}
	{resetOnSuccess}
	{onSuccess}
	formClass="sectoral-advisory-board-form"
>
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
</style>
