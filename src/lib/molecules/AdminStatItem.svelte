<script>
	/** @type {{ label?: string, count?: number }} */
	const { label = '', count = 0 } = $props()
</script>

<li class="stat-item">{label}: {count}</li>

<style>
	.stat-item {
		background-color: var(--background);
		padding: 1em 0.75em;
		border: var(--button-outline-border);
		border-radius: var(--button-outline-radius);
		list-style: none;
		min-width: 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: clamp(0.65rem, 1.2vw, 1rem);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
