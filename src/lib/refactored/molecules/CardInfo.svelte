<script>
	import { RLink } from '$lib'
	import { IconDots, IconCalendar, IconLabel } from '$lib/icons'
	const { title, description, link, children } = $props()
</script>

<article class="info-card">
	<div class="heading">
		<h3>{title}</h3>
		<IconDots variant="heading-three" />
	</div>

	<p>{description}</p>

	{#if link}
		<div class="link">
			<RLink
				href={link.href}
				class="button-outline-blue clickable-container"
			>
				{link.label}
				<span
					class="info-card-cta-arrow"
					aria-hidden="true">→</span
				>
			</RLink>
		</div>
	{/if}
</article>

<style>
	.info-card {
		background: light-dark(var(--background), var(--blue-800));
		border-radius: 20px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		/* position: relative; */

		h3 {
			grid-row: 1;
			grid-column: 2;
		}

		.heading {
			display: flex;
			flex-direction: row-reverse;
			gap: 0.75rem;
			align-self: start;
			align-items: center;
		}

		p {
			grid-row: 2;
			grid-column: 1/-1;
			margin-bottom: 1rem;
		}

		.link {
			grid-row: 3;
			grid-column: 1/-1;
		}
	}

	article {
		border: 1px solid red;

		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		width: 100%;
		max-width: 55ch;
	}
</style>
