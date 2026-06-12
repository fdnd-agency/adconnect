<script>
	import { Breadcrumb } from '$lib'
	const { title, description, children } = $props()
</script>

<div>
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
</div>

<style>
	h1, p {
		color: var(--text-white);
	}

	.page-header {
		--_color: white;

		display: flex;
		flex-direction: column;
		align-self: end;
		gap: 1em;
		width: 100%;
		max-width: 75ch;
		margin-top: 1em;
	}

	.page-header, .page-header__title {
		color: var(--_color);
	}

	.page-header__buttons {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		flex-wrap: wrap;
	}
</style>
