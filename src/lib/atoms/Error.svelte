<script>
	const { message } = $props()
</script>

<section
	class="fetch-error"
	role="alert"
>
	<p>{message}</p>
</section>

<style>
	.fetch-error {
		background: hsl(0 80% 95%);
		border: 1px solid hsl(0 80% 80%);
		color: hsl(0 65% 30%);
		padding: 0.75rem 1rem;
		border-radius: 6px;
		margin-bottom: 1rem;
		font-family: var(--font-body);
	}

	.fetch-error p {
		margin: 0;
	}
</style>
