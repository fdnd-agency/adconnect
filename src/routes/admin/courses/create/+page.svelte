<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'
	import { CourseForm } from '$lib'

	const { data, form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Opleiding toevoegen | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Opleidingen"
	{directusBase}
	contentType="adconnect_courses"
	breadcrumb="Opleidingen › Formulier"
	addHref="/admin/courses/create"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

<CourseForm
	{form}
	cooperations={data?.cooperations ?? []}
	showPublishButton={false}
	resetOnSuccess={true}
/>
