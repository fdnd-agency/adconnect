<script>
	const { children } = $props()
</script>

<main class="preview-main">
	{@render children?.()}
</main>

<style>
	.preview-main {
		background-color: light-dark(var(--text-white), var(--blue-800));
		min-height: 100vh;
	}
</style>
