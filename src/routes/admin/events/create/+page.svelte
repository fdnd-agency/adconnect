<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'
	import EventForm from '$lib/organisms/forms/EventForm.svelte'

	const { data, form } = $props()
	const nominations = $derived(data?.nominations ?? [])
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Event toevoegen | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Events"
	{directusBase}
	contentType="adconnect_events"
	breadcrumb="Events › Formulier"
	addHref="/admin/events/create"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

<EventForm
	{form}
	{nominations}
	showPublishButton={true}
	resetOnSuccess={true}
	requireImage={true}
/>
