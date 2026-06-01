<script>
	import PublicationDetails from '$lib/organisms/PublicationDetail.svelte'
	import Hero from '$lib/organisms/Hero.svelte';

	import { RTextSection } from '$lib';

	const { data } = $props()
</script>

<!-- <PublicationDetails {data} /> -->

<Hero/>
<RTextSection {data}/>
