<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import NewsForm from '$lib/organisms/forms/NewsForm.svelte'

	const { form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Nieuwsartikel toevoegen | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Nieuwsartikelen"
	{directusBase}
	contentType="adconnect_news"
	breadcrumb="Nieuwsartikelen › Formulier"
	addHref="/admin/news/create"
/>

<NewsForm
	{form}
	showPublishButton={true}
	resetOnSuccess={true}
	requireImage={true}
/>
