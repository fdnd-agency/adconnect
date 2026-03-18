<script>
	import PublicationDetails from '$lib/organisms/PublicationDetails.svelte'

	const { data } = $props()
</script>

<PublicationDetails {data} />
