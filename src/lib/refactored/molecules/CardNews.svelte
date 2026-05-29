<script>
	import { RLink } from '$lib'
	import { IconCalendar } from '$lib/icons'
	const { item, children } = $props()

	import { formatDateNL } from '$lib/molecules/date'
</script>

<article class="news-card">
	<h2 class="news-card__title">{item.title}</h2>

	<section class="news-card__date">
		<IconCalendar />
		<p class="news-card__date-text">{formatDateNL(item.date)}</p>
	</section>

	<p class="news-card__description">{item.description}</p>

	<RLink
		href={`/nieuws/${item.uuid}`}
		class="button-outline-blue clickable-container"
	>
		Meer informatie
		<span
			class="visually-hidden"
			aria-hidden="true">over {item.title}</span
		>
	</RLink>
</article>

<style>
	.news-card {
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		gap: 1.25em;
		border: 1px solid var(--neutral-700);
		border-radius: 1em;
		padding: 2em;
		background: light-dark(var(--text-white), hsl(210, 30%, 8%));
		transition: 0.2s ease-in-out;
		height: 100%;
		position: relative;

		&:hover {
			border-color: var(--blue-900);
			box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
			translate: 0 -1%;
		}

		.news-card__title {
			font-size: 25px;
			max-width: 30ch;
			grid-row: 2;
		}

		.news-card__date {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			gap: 0.75em;
		}

		.news-card__description {
			max-width: 60ch;
			line-height: 1.6;
		}
	}
</style>