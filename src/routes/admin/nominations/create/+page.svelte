<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'
	import NominationForm from '$lib/organisms/forms/NominationForm.svelte'

	const { data, form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Nominatie toevoegen | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Nominaties"
	{directusBase}
	contentType="adconnect_nominations"
	breadcrumb="Nominaties › Formulier"
	addHref="/admin/nominations/create"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

<NominationForm
	{form}
	events={data?.events ?? []}
	showPublishButton={true}
	resetOnSuccess={true}
	requireProfilePicture={true}
/>
