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
		class="button-outline-white"
		id="user-btn"
	>
		{data.user?.email ?? ''}
	</button>

	<div
		popover
		id="my-popover"
		class="button-outline-white "
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
@media (max-width: 999px) {
  .container-nav {
    display: none;
  }
}

@media (min-width: 1000px) {
  .container-nav {
    display: flex;
    justify-content: end;
    position: relative;
  }

  #my-popover {
    padding: 1em;
    border-radius: 8px;
    position-area: bottom;

  }

  #user-btn::after {
    content: url('/static/chevon-down.svg');
    padding: 0.05em 0.7em;
    transition: transform 0.3s;
  }
}

.logout-btn{
	color: var(--button-blue-text);

	&:hover{
	    color: var(--primary-blue);
	}
}

</style>
