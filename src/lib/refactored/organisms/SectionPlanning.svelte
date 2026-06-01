<script>
	import { RCardSection, RTimeTable, RLink } from '$lib'
	import { IconDots } from '$lib/icons'

	const { sectionInfo, cardsData } = $props()
</script>

<section class="card-section">
	<RCardSection
		title={sectionInfo.title}
		description={sectionInfo.description}
	/>

	<div class="card-section__list">

		{#each cardsData as card (card.id)}
			<article class="card">
				<div class="card__header">
					<IconDots variant="heading-three" />
					<h3 class="card__title">{card.title}</h3>
				</div>

				{#if card.description}
					<p class="card__text">{card.description}</p>
				{:else if card.schedule}
					<RTimeTable scheduleData={card.schedule} />
				{/if}

				<RLink
					class="button-outline-blue"
					href={card.link.href}
				>
					{card.link.label}
				</RLink>
			</article>
		{/each}

	</div>
</section>

<style>
	.card-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 5em min(5%, 3em);
	}

	.card-section__list {
		display: grid;
		grid-template-columns: 1fr;
		gap: 5em;
		margin: 5em 0;

		@media (min-width: 1024px) {
			grid-template-columns: repeat(2, 1fr);
			gap: 5em;
		}
	}

	.card {
		--_border-color: #cccccc;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
		padding: 2em;
		border: 1px solid var(--_border-color);
		border-radius: 1em;
		background-color: light-dark(var(--text-white), hsl(210, 30%, 8%));
		color: light-dark(var(--primary-blue), var(--text-white));
		max-width: 600px;

		transition: 0.2s ease-in-out;

		&:hover {
			--_border-color: #00408d;
			box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
			translate: 0 -1%;
		}
	}

	.card__header {
		display: flex;
		gap: 2em;
		align-self: start;
	}

	.card__text {
		max-width: 500px;
		margin-bottom: auto;
	}
</style>
