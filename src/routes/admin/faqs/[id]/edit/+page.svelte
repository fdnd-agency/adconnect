<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'
	import FaqForm from '$lib/organisms/forms/FaqForm.svelte'

	const { data, form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Faq bewerken | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Faqs"
	{directusBase}
	contentType="adconnect_faqs"
	breadcrumb="Faqs › Bewerken"
	addHref="/admin/faqs/create"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

<FaqForm
	{form}
	faq={data?.faq}
	showPublishButton={false}
	resetOnSuccess={false}
/>
