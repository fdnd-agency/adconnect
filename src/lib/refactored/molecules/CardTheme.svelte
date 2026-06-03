<script>
	import { RLink } from '$lib'
	import { IconDots, IconCalendar, IconLabel } from '$lib/icons'
	const { title, description, link, children } = $props()
</script>

<article class="info-card">
	<div class="info-card__heading">
		<h3 class="info-card__title truncate single">{title}</h3>
		<IconDots variant="heading-three" />
	</div>

	<p class="info-card__description truncate two">{description}</p>

	{#if link}
		<div class="info-card__link">
			<RLink
				href={link.href}
				class="button-outline-blue clickable-container"
				screenReaderText={link.screenReaderText}
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
		container-type: inline-size;
		container-name: info-card;

		background: light-dark(var(--text-white), var(--blue-800));
		border: 1px solid #cccccc;
		border-radius: 1em;
		padding: 2em;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1em;
		width: 100%;
		position: relative;
		flex: 1;
		transition: 0.2s ease-in-out;

		&:hover {
			border: 1px solid #00408d;
			box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
			translate: 0 -1%;
			transition: 0.2s ease-in-out;
		}

		.info-card__heading {
			display: flex;
			flex-direction: column-reverse;
			gap: 0.5em;
			justify-self: start;

			@container info-card (min-width: 360px) {
				flex-direction: row-reverse;
				align-items: center;
			}
		}

		.info-card__title {
			grid-row: 1;
			grid-column: 2;
			font-size: 23px;
			text-wrap: balance !important;
		}

		.info-card__description {
			grid-row: 2;
			grid-column: 1/-1;
			text-wrap: wrap;
		}

		.info-card__link {
			grid-row: 3;
			grid-column: 1/-1;
			text-wrap: nowrap;
			justify-self: start;
			margin: 2em 0 1em 0;
		}
	}

	.truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	/* Truncate one sentence */
	.truncate.single {
		white-space: nowrap;
		-webkit-line-clamp: 1;
	}

	/* Truncate two sentences */
	.truncate.two {
		-webkit-line-clamp: 3;
	}
</style>
