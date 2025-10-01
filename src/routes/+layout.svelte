<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	{@render children?.()}	
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center
	}
</style>
