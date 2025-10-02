<script>
	import favicon from '$lib/assets/favicon-adc.svg';
	import logodark from '$lib/assets/logo-dark.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
