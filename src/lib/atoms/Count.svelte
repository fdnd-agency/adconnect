<script>
	const { count } = $props()
</script>

<p class="count">Aantal: {count}</p>

<style>
	.count {
		font-family: var(--font-body);
		font-weight: var(--weight-medium);
		margin-bottom: 1em;
	}
</style>
