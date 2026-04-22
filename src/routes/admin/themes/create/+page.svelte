<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import ThemeForm from '$lib/organisms/forms/ThemeForm.svelte'

	const { form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Thema toevoegen | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Thema's"
	{directusBase}
	contentType="adconnect_themes"
	breadcrumb="Thema's › Formulier"
	addHref="/admin/themes/create"
/>

<ThemeForm
	{form}
	showPublishButton={true}
	resetOnSuccess={true}
	requireImage={true}
/>
