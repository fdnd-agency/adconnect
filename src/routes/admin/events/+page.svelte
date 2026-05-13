<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import { enhance } from '$app/forms'
	import AdminHeader from '$lib/organisms/AdminHeader.svelte'
	import AdminToolbar from '$lib/organisms/AdminToolbar.svelte'
	import Count from '$lib/atoms/Count.svelte'
	import AdminContentList from '$lib/organisms/AdminContentList.svelte'
	import Error from '$lib/atoms/Error.svelte'

	const { data } = $props()

	const directusBase = `${DIRECTUS_URL}/admin/content`

	let filter = $state('all')

	let search = $state('')

	const events = $derived(data.events ? [...data.events.values()] : [])

	function eventEditHref(eventItem) {
		return `/admin/events/${encodeURIComponent(eventItem.id)}/edit`
	}

	const filtered = $derived(
		events
			.filter((doc) => {
				if (filter === 'draft') return doc.status === 'draft'
				if (filter === 'published') return doc.status === 'published'
				return true
			})
			.filter((doc) => doc.title?.toLowerCase().includes(search.toLowerCase()))
	)
</script>

<svelte:head>
	<title>Events | ADConnect Admin</title>
</svelte:head>

{#if data.loadError}
	<Error message={data.loadError} />
{/if}

<AdminHeader
	title="Events"
	{directusBase}
	contentType="adconnect_events"
	breadcrumb="Events"
	addHref="/admin/events/create"
/>

<AdminToolbar
	{filter}
	{search}
	onFilterChange={(v) => (filter = v)}
	onSearchChange={(v) => (search = v)}
	labels={{ all: 'Alle events', draft: 'Concept', published: 'Gepubliceerd' }}
/>

<Count count={filtered.length} />

<AdminContentList
	{filtered}
	{directusBase}
	contentType="adconnect_events"
	editHrefBuilder={eventEditHref}
	labels={{
		single: 'event',
		multiple: 'events'
	}}
/>
