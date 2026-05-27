<script>
	import { Breadcrumb, RLink } from '$lib'
	import { IconDots, IconCalendar, IconLabel } from '$lib/icons'
	const { title, description, link, children } = $props()
</script>

<article>
	<h2>{title}</h2>
	<p>{description}</p>

	<IconDots variant="heading-two" />

	{#if link}
		<RLink
			href={link.href}
			class="button-outline-white">{link.label}</RLink
		>
	{/if}
</article>

<style>
	article {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1em;
		width: 100%;
		max-width: 75ch;

		h2 {
			grid-row: 2;
		}

		p {
			grid-row: 3;
		}
	}
</style>
