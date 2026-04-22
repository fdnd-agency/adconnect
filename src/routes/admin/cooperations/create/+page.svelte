<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import CooperationForm from '$lib/organisms/forms/CooperationForm.svelte'

	const { form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Samenwerking toevoegen | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Samenwerkingen"
	{directusBase}
	contentType="adconnect_cooperations"
	breadcrumb="Samenwerkingen › Formulier"
	addHref="/admin/cooperations/create"
/>

<CooperationForm
	{form}
	showPublishButton={true}
	resetOnSuccess={true}
	requireLogo={true}
/>
