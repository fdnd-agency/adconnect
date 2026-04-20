<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import FaqForm from '$lib/organisms/forms/FaqForm.svelte'

	const { form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Faq toevoegen | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Faqs"
	{directusBase}
	contentType="adconnect_faqs"
	breadcrumb="Faqs › Formulier"
	addHref="/admin/faqs/create"
/>

<FaqForm
	{form}
	showPublishButton={true}
	resetOnSuccess={true}
/>
