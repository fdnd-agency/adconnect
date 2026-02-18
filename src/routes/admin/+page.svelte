<script>
	/** @type {{ data: { user: any } }} */
	let { data } = $props()
</script>

<svelte:head>
	<title>Dashboard | ADConnect Admin</title>
</svelte:head>

<div class="container-nav">
	<button
		popovertarget="my-popover"
		class="button-outline-blue"
		id="user-btn"
	>
		{data.user?.email ?? ''} 
	</button>

	<div
		popover
		id="my-popover"
	>
		<a
			href="/admin/logout"
			class="logout-btn"
			data-sveltekit-reload
		>
			Uitloggen 
		</a>
	</div>
</div>

<div class="dashboard">
	<h1>Welkom, {data.user?.first_name ?? 'Beheerder'}</h1>
</div>

<style>
	.container-nav {
		display: flex;
		justify-content: end;
		position: relative;
		anchor-name: --userbtn;
	}

	#my-popover {
		background: white;
		padding: 10px 14px;
		border-radius: 8px;
		border: 1px solid #ddd;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		position-area: bottom;
	}
</style>
