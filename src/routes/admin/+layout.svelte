<script>
	const { data, children } = $props()
	import AdminSidebar from '$lib/organisms/AdminSidebar.svelte'
	import LoadingOverlay from '$lib/molecules/LoadingOverlay.svelte'
	import { beforeNavigate, afterNavigate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { loading } from '$lib/stores/loadingStore'

	// Show the loading overlay during client-side navigations.
	onMount(() => {
		beforeNavigate(() => loading.set(true))
		afterNavigate(() => loading.set(false))
	})
</script>

<LoadingOverlay />

<AdminSidebar user={data.user} />

<main class="admin-content">
	{@render children()}
</main>

<style>
	.admin-content {
		min-height: 100vh;
		padding: 1.5em 1.25em;
		box-sizing: border-box;
	}

	@media (min-width: 1000px) {
		.admin-content {
			margin-left: 260px;
			padding: 2em 3em;
			position: relative;
		}
	}
</style>
