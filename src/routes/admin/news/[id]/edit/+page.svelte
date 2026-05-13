<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'
	import NewsForm from '$lib/organisms/forms/NewsForm.svelte'

	const { data, form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Nieuwsartikel bewerken | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Nieuwsartikelen"
	{directusBase}
	contentType="adconnect_news"
	breadcrumb="Nieuwsartikelen › Bewerken"
	addHref="/admin/news/create"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

<NewsForm
	{form}
	article={data?.article}
	showPublishButton={false}
	resetOnSuccess={false}
	requireImage={false}
/>
