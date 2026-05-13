<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import AdminToolbar from '$lib/organisms/AdminToolbar.svelte'
	import Count from '$lib/atoms/Count.svelte'
	import AdminContentList from '$lib/organisms/AdminContentList.svelte'
	import Error from '$lib/atoms/Error.svelte'

	const { data } = $props()

	const directusBase = `${DIRECTUS_URL}/admin/content`

	let search = $state('')

	const sectoralAdvisoryBoards = $derived(data.sectoralAdvisoryBoards ? [...data.sectoralAdvisoryBoards.values()] : [])

	const searchFields = ['title']

	function boardEditHref(doc) {
		return `/admin/sectoral-advisory-boards/${encodeURIComponent(doc.id)}/edit`
	}

	const filtered = $derived(sectoralAdvisoryBoards.filter((doc) => searchFields.some((field) => doc[field]?.toLowerCase().includes(search.toLowerCase()))))
</script>

<svelte:head>
	<title>Sectorale adviescolleges | ADConnect Admin</title>
</svelte:head>

{#if data.loadError}
	<Error message={data.loadError} />
{/if}

<AdminHeader
	title="Sectorale adviescolleges"
	{directusBase}
	contentType="adconnect_sectoral_advisory_boards"
	breadcrumb="Sectorale adviescolleges"
	addHref="/admin/sectoral-advisory-boards/create"
/>

<AdminToolbar
	{search}
	onSearchChange={(v) => (search = v)}
	showFilter={false}
/>

<Count count={filtered.length} />

<AdminContentList
	{filtered}
	{directusBase}
	contentType="adconnect_sectoral_advisory_boards"
	editHrefBuilder={boardEditHref}
	showStatus={false}
	labels={{
		single: 'sectoraal adviescollege',
		multiple: 'sectorale adviescolleges',
		title: 'title',
		gender: 'dit'
	}}
/>
