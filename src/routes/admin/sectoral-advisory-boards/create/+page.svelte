<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import { SectoralAdvisoryBoardForm } from '$lib'

	const { form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Sectoraal adviescollege toevoegen | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Sectorale adviescolleges"
	{directusBase}
	contentType="adconnect_sectoral_advisory_boards"
	breadcrumb="Sectorale adviescolleges › Formulier"
	addHref="/admin/sectoral-advisory-boards/create"
/>

<SectoralAdvisoryBoardForm
	{form}
	showPublishButton={false}
	resetOnSuccess={true}
/>
