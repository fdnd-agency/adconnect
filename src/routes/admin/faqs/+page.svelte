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

	const faqs = $derived(data.faqs ? [...data.faqs.values()] : [])

	const searchFields = ['question']

	function faqEditHref(doc) {
		return `/admin/faqs/form?id=${encodeURIComponent(doc.id)}`
	}

	const filtered = $derived(
		faqs
			.filter((doc) => {
				if (filter === 'draft') return doc.status === 'draft'
				if (filter === 'published') return doc.status === 'published'
				return true
			})
			.filter((doc) => searchFields.some((field) => doc[field]?.toLowerCase().includes(search.toLowerCase())))
	)
</script>

<svelte:head>
	<title>Faqs | ADConnect Admin</title>
</svelte:head>

{#if data.loadError}
	<Error message={data.loadError} />
{/if}

<AdminHeader
	title="Faqs"
	{directusBase}
	contentType="adconnect_faqs"
	breadcrumb="Faqs"
	addHref="/admin/faqs/form"
/>

<AdminToolbar
	{filter}
	{search}
	onFilterChange={(v) => (filter = v)}
	onSearchChange={(v) => (search = v)}
	labels={{ all: 'Alle faqs', draft: 'Concept', published: 'Gepubliceerd' }}
/>

<Count count={filtered.length} />

<AdminContentList
	{filtered}
	{directusBase}
	contentType="adconnect_faqs"
	editHrefBuilder={faqEditHref}
	labels={{
		single: 'faq',
		multiple: 'faqs',
		title: 'question',
		gender: 'deze'
	}}
/>
