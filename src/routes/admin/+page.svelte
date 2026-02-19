<script>
	/** @type {{ data: { user: any } }} */
	let { data } = $props()
	import dots from '$lib/assets/dots.svg'
	import { bird } from '$lib'
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
		class="button-outline-white"
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

<section class="dashboard">
	<img
		src={dots}
		alt=""
		class="information-dots"
		width="80"
		height="60"
	/>
	<h1>Dashboard</h1>
</section>

<div class="container-welcome">
	<section class="container-user">
		<h2>Welkom, {data.user?.first_name ?? 'Beheerder'}</h2>
	</section>

	<div>
		<img
			src={bird}
			alt=""
		/>
	</div>
</div>

<ul class="info-list">
	<li>Thema's:0</li>
	<li>Events:0</li>
	<li>Documenten:0</li>
	<li>Nominaties:0</li>
	<li>Nieuws:0</li>
	<li>Samenwerken:0</li>
</ul>

<ul>
	<li></li>
</ul>

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

	.logout-btn {
		color: var(--button-blue-text);

		&:hover {
			color: var(--primary-blue);
		}
	}

	.dashboard {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75em;
		margin: 1em;

		@media (min-width: 1000px) {
			align-items: unset;
		}
	}

	h1{
		margin: 0;
	}

	.container-user {
		background-color: var(--background);
		padding: 4em;
		border: var(--button-outline-border);
		border-radius: var(--button-outline-radius);
		margin: 1em;
	}

	.container-welcome {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;

		@media (min-width: 1000px) {
			flex-direction: row;
		}
	}

	.info-list {
		display: flex;
		flex-direction: column;
		justify-self: center;
		align-items: center;
		gap: 1em;
		padding: 0em;
		font-family: var(--font-body);

		@media (min-width: 400px) {
			display: grid;
			grid-template-columns: max-content max-content;
			justify-content: center;
			justify-items: center;
		}

		@media (min-width: 900px) {
			display: flex;
			flex-direction: row;
			justify-content: unset;
			justify-items: unset;
		}

		@media (min-width: 1000px) {
			display: grid;
			grid-template-columns: max-content max-content max-content;
			justify-content: center;
			justify-items: center;
		}

		@media (min-width: 1200px) {
			display: flex;
			flex-direction: row;
			justify-content: unset;
			justify-items: unset;
		}
	}

	li {
		background-color: var(--background);
		padding: 1em;
		border: var(--button-outline-border);
		border-radius: var(--button-outline-radius);
		width: fit-content;
		list-style: none;
	}
</style>
