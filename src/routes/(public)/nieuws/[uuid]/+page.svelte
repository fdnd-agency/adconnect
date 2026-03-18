<script>
	import NewsDetail from '$lib/organisms/NewsDetail.svelte'

	const { data } = $props()
</script>

<NewsDetail {data} />
