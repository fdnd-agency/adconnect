<script>
	import PublicationDetails from '$lib/organisms/PublicationDetail.svelte'

	const { data } = $props()
</script>

<PublicationDetails {data} />
