<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'
	import NominationForm from '$lib/organisms/forms/NominationForm.svelte'

	const { data, form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Nominatie bewerken | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Nominaties"
	{directusBase}
	contentType="adconnect_nominations"
	breadcrumb="Nominaties › Bewerken"
	addHref="/admin/nominations/create"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

{#if data?.nomination}
	<NominationForm
		{form}
		nomination={data.nomination}
		events={data?.events ?? []}
		showPublishButton={false}
		resetOnSuccess={false}
		requireProfilePicture={false}
	/>
{/if}
