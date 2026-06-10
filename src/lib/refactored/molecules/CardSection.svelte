<script>
	import { Link } from '$lib'
	import { IconDots } from '$lib/icons'
	const { title, description, link, children, centered } = $props()
</script>

<article class="section-header">
	<h2 class="section-header__title" class:centered>{title}</h2>
	<p class="section-header__description">{description}</p>

	<div class:centered>
		<IconDots variant="heading-two" />
	</div>

	{#if link}
		<Link
			href={link.href}
			class="button-outline-white">{link.label}</Link
		>
	{/if}
</article>

<style>
	.section-header {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1em;
		width: 100%;
		max-width: 85ch;
		padding: 0 min(5%, 3em);

		.section-header__title {
			grid-row: 2;
		}

		.section-header__description {
			grid-row: 3;
		}
	}

	.centered {
		justify-self: center;
		text-align: center;
	}
</style>
