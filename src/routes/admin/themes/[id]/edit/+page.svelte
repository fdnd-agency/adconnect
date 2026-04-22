<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'
	import ThemeForm from '$lib/organisms/forms/ThemeForm.svelte'

	const { data, form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Thema bewerken | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Thema's"
	{directusBase}
	contentType="adconnect_themes"
	breadcrumb="Thema's › Bewerken"
	addHref="/admin/themes/create"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

<ThemeForm
	{form}
	theme={data?.theme}
	showPublishButton={false}
	resetOnSuccess={false}
	requireImage={false}
/>
