<script>
	import TopNav from '$lib/components/TopNav.svelte';
	import NavPros from '$lib/components/NavPros.svelte';
	let { children } = $props();
</script>

<header>
<TopNav />
</header>

<main>
{@render children?.()}
</main>

