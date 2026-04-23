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

	const lados = $derived(data.lados ? [...data.lados.values()] : [])

	const searchFields = ['title']

	const filtered = $derived(
		lados
			.filter((doc) => {
				if (filter === 'draft') return doc.status === 'draft'
				if (filter === 'published') return doc.status === 'published'
				return true
			})
			.filter((doc) => searchFields.some((field) => doc[field]?.toLowerCase().includes(search.toLowerCase())))
	)
</script>

<svelte:head>
	<title>Lado's | ADConnect Admin</title>
</svelte:head>

{#if data.loadError}
	<Error message={data.loadError} />
{/if}

<AdminHeader
	title="Lado's"
	{directusBase}
	contentType="adconnect_lados"
	breadcrumb="Lado's"
	addHref="/admin/lados/create"
/>

<AdminToolbar
	{filter}
	{search}
	onFilterChange={(v) => (filter = v)}
	onSearchChange={(v) => (search = v)}
	labels={{ all: `Alle lado's`, draft: 'Concept', published: 'Gepubliceerd' }}
/>

<Count count={filtered.length} />

<AdminContentList
	{filtered}
	{directusBase}
	contentType="adconnect_lados"
	editHrefBuilder={(doc) => `/admin/lados/${doc.id}/edit`}
	labels={{
		single: 'lado',
		multiple: `lado's`,
		title: 'title',
		gender: 'deze'
	}}
/>
