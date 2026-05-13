<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'
	import LadosForm from '$lib/organisms/forms/LadosForm.svelte'

	const { data, form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Lado toevoegen | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Lado's"
	{directusBase}
	contentType="adconnect_lados"
	breadcrumb="Lado's › Formulier"
	addHref="/admin/lados/create"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

<LadosForm
	{form}
	courses={data?.courses ?? []}
	sectoralAdvisoryBoards={data?.sectoralAdvisoryBoards ?? []}
	{directusBase}
	showPublishButton={true}
	resetOnSuccess={true}
/>
