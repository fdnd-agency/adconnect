<script>
	/** @type {{ data: { user: any } }} */
	const { data } = $props()
	import dots from '$lib/assets/dots.svg'
	import { bird, CupStar, Document, GraduationHat, NewsPaper, Collaborate, Events, Question } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'

	const directusBase = `${DIRECTUS_URL}/admin/content`
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

<div class="items-wrapper">
	<ul class="container-info-list">
		<li class="info-list">Thema's: {data.themeCount}</li>
		<li class="info-list">Events: {data.eventCount}</li>
		<li class="info-list">Documenten: {data.documentCount}</li>
		<li class="info-list">Nominaties: {data.nominationCount}</li>
		<li class="info-list">Nieuws: {data.newsCount}</li>
		<li class="info-list">Samenwerkingen: {data.cooperationCount}</li>
	<li class="info-list">FAQ's: {data.faqCount}</li>
	</ul>

<ul class="item-list">
	<li class="item-card">
		<img
			class="item-img"
			src={GraduationHat}
			alt=""
			height="60px"
			width="90px"
		/>
		<p>Thema's</p>
		<a
			class="button-outline-white"
			href="{directusBase}/adconnect_themes/+">+Toevoegen</a
		>
	</li>
	<li class="item-card">
		<img
			class="item-img"
			src={Events}
			alt=""
			height="60px"
			width="90px"
		/>
		<p>Events</p>
		<a
			class="button-outline-white"
			href="{directusBase}/adconnect_events/+">+Toevoegen</a
		>
	</li>
	<li class="item-card">
		<img
			class="item-img"
			src={Document}
			alt=""
			height="60px"
			width="90px"
		/>
		<p>Documenten</p>
		<a
			class="button-outline-white"
			href="{directusBase}/adconnect_documents/+">+Toevoegen</a
		>
	</li>
	<li class="item-card">
		<img
			class="item-img"
			src={CupStar}
			alt=""
			height="60px"
			width="90px"
		/>
		<p>Nominaties</p>
		<a
			class="button-outline-white"
			href="{directusBase}/adconnect_nominations/+">+Toevoegen</a
		>
	</li>
	<li class="item-card">
		<img
			class="item-img"
			src={NewsPaper}
			alt=""
			height="60px"
			width="90px"
		/>
		<p>Nieuws</p>
		<a
			class="button-outline-white"
			href="{directusBase}/adconnect_news/+">+Toevoegen</a
		>
	</li>
	<li class="item-card">
		<img
			class="item-img"
			src={Collaborate}
			alt=""
			height="50px"
			width="90px"
		/>
		<p>Samenwerkingen</p>
		<a
			class="button-outline-white"
			href="{directusBase}/adconnect_collaborations/+">+Toevoegen</a
		>
	</li>
	<li class="item-card">
		<img
			class="item-img"
			src={Question}
			alt=""
			height="50px"
			width="90px"
		/>
		<p>FAQ's</p>
		<a
			class="button-outline-white"
			href="{directusBase}/adconnect_faqs/+">+Toevoegen</a
		>
	</li>
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
			position: absolute;
			top: 1em;
			right: 1em;
			z-index: 10;
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

	h1 {
		margin: 0;
	}

	.container-user {
		background-color: var(--background);
		padding: 2em;
		border: var(--button-outline-border);
		border-radius: var(--button-outline-radius);
		margin: 1em;

		@media (min-width: 1000px) {
			padding: 2em 3em;
			flex: 1;
			max-width: 500px;
		}
	}

	.container-welcome {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;

		@media (min-width: 1000px) {
			flex-direction: row;
			align-items: center;
			gap: 2em;
		}
	}

	.container-welcome img {
		max-width: 250px;
		height: auto;
	}

	.items-wrapper {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1em;
		margin: 2em 1em;
		max-width: 100%;
		overflow: hidden;

		@media (min-width: 500px) {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		@media (min-width: 768px) {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}

		@media (min-width: 1250px) {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
	}

	.container-info-list {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: 1 / -1;
		gap: 1em;
		padding: 0;
		margin: 0;
		font-family: var(--font-body);
	}

	.info-list {
		background-color: var(--background);
		padding: 1em;
		border: var(--button-outline-border);
		border-radius: var(--button-outline-radius);
		list-style: none;
		min-width: 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.item-list {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: 1 / -1;
		gap: 1em;
		padding: 0;
		margin: 0;
		font-family: var(--font-body);
	}

	.item-card {
		background-color: var(--background);
		padding: 1.5em;
		border: var(--button-outline-border);
		border-radius: var(--button-outline-radius);
		text-align: center;
		list-style: none;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		min-width: 0;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75em;
		justify-content: space-between;
	}

	.item-card p {
		margin: 0;
	}

	.item-card :global(.button-outline-white) {
		width: 50%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.item-img {
		display: flex;
		align-self: center;
	}
</style>
