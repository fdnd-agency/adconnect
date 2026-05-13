<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'
	import CooperationForm from '$lib/organisms/forms/CooperationForm.svelte'

	const { data, form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Samenwerking bewerken | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Samenwerkingen"
	{directusBase}
	contentType="adconnect_cooperations"
	breadcrumb="Samenwerkingen › Bewerken"
	addHref="/admin/cooperations/create"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

<CooperationForm
	{form}
	cooperation={data?.cooperation}
	showPublishButton={false}
	resetOnSuccess={false}
	requireLogo={false}
/>
