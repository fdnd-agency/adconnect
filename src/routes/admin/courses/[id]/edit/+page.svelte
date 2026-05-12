<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import Error from '$lib/atoms/Error.svelte'
	import { CourseForm } from '$lib'

	const { data, form } = $props()
	const directusBase = `${DIRECTUS_URL}/admin/content`
</script>

<svelte:head>
	<title>Opleiding bewerken | ADConnect Admin</title>
</svelte:head>

<AdminHeader
	title="Opleidingen"
	{directusBase}
	contentType="adconnect_courses"
	breadcrumb="Opleidingen › Bewerken"
	addHref="/admin/courses/create"
/>

{#if data?.loadError}
	<Error message={data.loadError} />
{/if}

<CourseForm
	{form}
	course={data?.course}
	showPublishButton={false}
	resetOnSuccess={false}
/>
