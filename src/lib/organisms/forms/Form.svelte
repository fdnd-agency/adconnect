<script>
	import { enhance } from '$app/forms'

	const { form, showPublishButton = false, resetOnSuccess = true, onSuccess = null, hasFileFields = false, formClass = 'form-shell', children } = $props()

	let isSubmitting = $state(false)

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
</script>

{#if form?.error}
	<p class="error-message">{form.error}</p>
{/if}

{#if form?.success && form?.message}
	<p class="success-message">{form.message}</p>
{/if}

<form
	method="POST"
	enctype={hasFileFields ? 'multipart/form-data' : undefined}
	class={formClass}
	use:enhance={() => {
		isSubmitting = true
		return async ({ result, update }) => {
			await update({ reset: result.type === 'success' && resetOnSuccess })
			isSubmitting = false

			if (result.type === 'success') {
				scrollToTop()
				if (typeof onSuccess === 'function') {
					await onSuccess(result)
				}
			}
		}
	}}
>
	{@render children?.()}

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
		{#if showPublishButton}
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
		{/if}
	</div>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1.25em;
		max-width: 820px;
	}

	.error-message {
		font-family: var(--font-body);
		font-size: 0.95rem;
		background-color: hsl(0, 60%, 30%);
		color: var(--text-white);
		border-radius: 10px;
		padding: 0.7em 1em;
		margin: 0.75em 0 1em;
		width: fit-content;
	}

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
