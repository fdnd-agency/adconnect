<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'
	import { SectoralAdvisoryBoardForm } from '$lib'

	const { data, form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Sectoraal adviescollege bewerken | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Sectorale adviescolleges"
	{directusBase}
	contentType="adconnect_sectoral_advisory_boards"
	breadcrumb="Sectorale adviescolleges › Bewerken"
	addHref="/admin/sectoral-advisory-boards/create"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

<SectoralAdvisoryBoardForm
	{form}
	sectoralAdvisoryBoard={data?.sectoralAdvisoryBoard}
	showPublishButton={false}
	resetOnSuccess={false}
/>
