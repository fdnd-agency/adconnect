<script>
	/** @type {{ data: { user: any } }} */
	const { data } = $props()
	import dots from '$lib/assets/dots.svg'
	import { bird, CupStar, Document, GraduationHat, NewsPaper, Collaborate, Events, Question } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminUserMenu from '$lib/molecules/AdminUserMenu.svelte'
	import AdminStatItem from '$lib/molecules/AdminStatItem.svelte'
	import AdminItemCard from '$lib/molecules/AdminItemCard.svelte'

	const directusBase = `${DIRECTUS_URL}/admin/content`

	const stats = $derived([
		{ label: "Thema's", count: data.themeCount },
		{ label: 'Events', count: data.eventCount },
		{ label: 'Documenten', count: data.documentCount },
		{ label: 'Nominaties', count: data.nominationCount },
		{ label: 'Nieuws', count: data.newsCount },
		{ label: 'Samenwerkingen', count: data.cooperationCount },
		{ label: "FAQ's", count: data.faqCount }
	])

	const items = [
		{ icon: GraduationHat, label: "Thema's", collection: 'adconnect_themes' },
		{ icon: Events, label: 'Events', collection: 'adconnect_events' },
		{ icon: Document, label: 'Documenten', collection: 'adconnect_documents' },
		{ icon: CupStar, label: 'Nominaties', collection: 'adconnect_nominations' },
		{ icon: NewsPaper, label: 'Nieuws', collection: 'adconnect_news' },
		{ icon: Collaborate, label: 'Samenwerkingen', collection: 'adconnect_collaborations', iconHeight: '50px' },
		{ icon: Question, label: "FAQ's", collection: 'adconnect_faqs', iconHeight: '50px' }
	]
</script>

<svelte:head>
	<title>Dashboard | ADConnect Admin</title>
</svelte:head>

<AdminUserMenu email={data.user?.email ?? ''} />

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
			alt="Mascotte van ADConnect"
		/>
	</div>
</div>

<div class="items-wrapper">
	<ul class="container-info-list">
		{#each stats as stat (stat.label)}
			<AdminStatItem
				label={stat.label}
				count={stat.count}
			/>
		{/each}
	</ul>

	<ul class="item-list">
		{#each items as item (item.collection)}
			<AdminItemCard
				icon={item.icon}
				label={item.label}
				href={item.collection === 'adconnect_documents'
					? '/admin/documents/create'
					: item.collection === 'adconnect_nominations'
						? '/admin/nominations/form'
						: item.collection === 'adconnect_themes'
							? '/admin/themes/create'
							: item.collection === 'adconnect_faqs'
								? '/admin/faqs/create'
								: item.collection === 'adconnect_news'
									? '/admin/news/create'
									: item.collection === 'adconnect_collaborations'
										? '/admin/cooperations/create'
										: item.collection === 'adconnect_events'
											? '/admin/events/create'
											: `${directusBase}/${item.collection}/+`}
				iconHeight={item.iconHeight}
			/>
		{/each}
	</ul>
</div>

<style>
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

	.item-list {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: 1 / -1;
		gap: 1em;
		padding: 0;
		margin: 0;
		font-family: var(--font-body);
	}
</style>
