<script>
	import { Breadcrumb } from '$lib'
	const { title, description, children } = $props()
</script>

<Breadcrumb />
<article class="page-header">
	<h1 class="page-header__title">{title}</h1>
	<p class="page-header__description">{description}</p>

	{#if children}
		<div class="page-header__buttons">
			{@render children()}
		</div>
	{/if}
</article>

<style>
	.page-header {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 100%;
		max-width: 65ch;
	}

	.page-header__buttons {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		flex-wrap: wrap;
	}
</style>