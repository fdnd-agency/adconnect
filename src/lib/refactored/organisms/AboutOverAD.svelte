<script>
	// Import img
	import { check } from '$lib'

	const { benefitData } = $props()
</script>

{#snippet benefitCard(benefit)}
	<article class="benefit-card">
		<div class="benefit-card__inner">
			<img
				class="benefit-card__icon"
				src={check}
				alt=""
			/>
			<div class="benefit-card__info">
				<h3 class="benefit-card__title">{benefit.title}</h3>
				<p class="benefit-card__excerpt truncate two">{benefit.excerpt}</p>
			</div>
		</div>
	</article>
{/snippet}

<section class="benefits-section">
	<section class="benefits-section__intro">
		<h2>Waarom kiezen voor Associate Degree's?</h2>
		<p>Associate Degrees combineren praktijk en theorie in een korte, intensieve opleiding. Ze bereiden studenten effectief voor op actuele beroepen en geven een stevige basis voor verdere studie.</p>
	</section>

	<div class="benefits-section__list">
		{#each benefitData as benefit}
			{@render benefitCard(benefit)}
		{/each}
	</div>
</section>

<style>
	.benefits-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3em;
		max-width: 1400px;
		margin: auto;
		padding: 3em 5%;
		background-color: light-dark(var(--text-white), var(--blue-800));

		@media (min-width: 1024px) {
			gap: 4em;
			padding: 5em 5%;
		}
	}

	.benefits-section__list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
		gap: 2.5em;
		width: 100%;
	}

	.benefit-card {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 2.5em;
		border: 1px solid var(--neutral-300);
		border-radius: 1em;
		container: benefit / inline-size;
	}

	.benefit-card__inner {
		display: flex;
		flex-direction: column;
		align-items: baseline;
		gap: 1.3em;

		@container benefit (width > 300px) {
			flex-direction: row;
			align-items: start;
		}
	}

	.benefit-card__icon {
		padding: 0.8em;
		border-radius: 0.5em;
		background-color: var(--orange-500);
	}

	.benefit-card__info {
		display: flex;
		flex-direction: column;
		gap: 0.7em;
	}

	.benefit-card__title {
		font-size: 1.25rem;
	}
</style>
