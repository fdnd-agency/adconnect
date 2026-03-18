<script>
	import ThemeDetail from '$lib/organisms/ThemeDetail.svelte'

	const { data } = $props()
</script>

<ThemeDetail
	data={data.theme}
	themes={data.themes}
/>
