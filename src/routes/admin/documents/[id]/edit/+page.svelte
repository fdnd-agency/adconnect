<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'
	import DocumentForm from '$lib/organisms/forms/DocumentForm.svelte'

	const { data, form } = $props()
	const categories = $derived(data?.categories ?? [])
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Document bewerken | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Documenten"
	{directusBase}
	contentType="adconnect_documents"
	breadcrumb="Documenten › Bewerken"
	addHref="/admin/documents/create"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

<DocumentForm
	{form}
	document={data?.document}
	{categories}
	showPublishButton={false}
	resetOnSuccess={false}
	requireFiles={false}
/>
