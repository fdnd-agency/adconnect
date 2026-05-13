<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'
	import { LadosForm } from '$lib'

	const { data, form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Lado bewerken | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Lado's"
	{directusBase}
	contentType="adconnect_lados"
	breadcrumb="Lado's › Bewerken"
	addHref="/admin/lados/create"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

<LadosForm
	{form}
	lado={data?.lado}
	courses={data?.courses ?? []}
	sectoralAdvisoryBoards={data?.sectoralAdvisoryBoards ?? []}
	sectoralAdvisoryBoardId={data?.sectoralAdvisoryBoardId ?? ''}
	{directusBase}
	showPublishButton={false}
	resetOnSuccess={false}
/>
