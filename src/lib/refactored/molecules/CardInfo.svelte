<script>
	import { RLink } from '$lib'
	import { IconDots, IconCalendar, IconLabel } from '$lib/icons'
	const { title, description, link, children } = $props()
</script>

<article class="info-card">
	<div class="info-card__heading">
		<h3 class="info-card__title">{title}</h3>
		<IconDots variant="heading-three" />
	</div>

	<p class="info-card__description">{description}</p>

	{#if link}
		<div class="info-card__link">
			<RLink
				href={link.href}
				class="button-outline-blue clickable-container"
			>
				{link.label}
				<span
					class="info-card__cta-arrow"
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
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		width: 100%;
		max-width: 55ch;
		position: relative;

		.info-card__heading {
			display: flex;
			flex-direction: row-reverse;
			gap: 0.75rem;
			justify-self: start;
			align-items: center;
		}

		.info-card__title {
			grid-row: 1;
			grid-column: 2;
		}

		.info-card__description {
			grid-row: 2;
			grid-column: 1/-1;
			margin-bottom: 1rem;
		}

		.info-card__link {
			grid-row: 3;
			grid-column: 1/-1;
		}
	}
</style>