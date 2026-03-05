<script>
	/** @type {{ data: { user: any }, children: import('svelte').Snippet }} */
	const { data, children } = $props()
	import AdminSidebar from '$lib/organisms/AdminSidebar.svelte'
</script>

<AdminSidebar user={data.user} />

<main class="admin-content">
	{@render children()}
</main>

<style>
	@media (min-width: 1000px) {
		.admin-content {
			margin-left: 260px;
			padding: 2em 3em;
			position: relative;
		}
	}
</style>
