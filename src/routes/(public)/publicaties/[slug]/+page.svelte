<script>
	import PublicationDetails from '$lib/organisms/PublicationDetail.svelte'

	import { RTextSection } from '$lib';

	const { data } = $props()
</script>

<!-- <PublicationDetails {data} /> -->

<RTextSection {data}/>
