<script>
	import { Breadcrumb } from '$lib'
	const { title, description, children } = $props()
</script>

<Breadcrumb />
<article>
	<h1>{title}</h1>
	<p>{description}</p>

	{#if children}
		<div class="buttons">
			{@render children()}
		</div>
	{/if}
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 100%;
		max-width: 65ch;
	}

	.buttons {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		flex-wrap: wrap;
	}
</style>
