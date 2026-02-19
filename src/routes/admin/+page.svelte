<script>
	/** @type {{ data: { user: any } }} */
	const { data } = $props()
</script>

<svelte:head>
	<title>Dashboard | ADConnect Admin</title>
</svelte:head>

<div class="dashboard">
	<h1>Welkom, {data.user?.first_name ?? 'Beheerder'}</h1>
	<p class="subtitle">Dit is het admin portaal van ADConnect.</p>
</div>

<style>
	.dashboard h1 {
		font-family: 'ClashDisplay', sans-serif;
		font-size: 1.75rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
		color: #111;
	}

	.subtitle {
		color: #666;
		font-size: 1rem;
		margin: 0;
	}
</style>
