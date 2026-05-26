<script>
	const { question, answer } = $props()

	import { IconChevronDown, IconBackgroundCircle } from '$lib/icons'
	import Faq from '$lib/icons/Faq.svelte'

	// TODO: FAQ that needs to be added to directus
	const faqData = {
		faqs: [
			{
				question: 'Wat is een Associate degree?',
				answer:
					'Een Associate Degree is een praktijkgerichte, tweejarige opleiding op hbo-niveau. De opleiding combineert theoretische kennis met praktische ervaring, zodat studenten snel inzetbaar zijn in het werkveld en de mogelijkheid hebben om door te stromen naar een bacheloropleiding.'
			},
			{
				question: 'Hoe lang duurt een Associate degree?',
				answer: 'Een Ad duurt doorgaans twee jaar bij een voltijdopleiding. Bij deeltijd kan dit langer zijn, afhankelijk van de persoonlijke planning en werkervaring.'
			},
			{
				question: 'Wat is het verschil tussen een Associate degree en een Bachelor?',
				answer:
					'Een bacheloropleiding duurt meestal vier jaar en richt zich breder op theorie en verdieping, terwijl een Ad intensief, praktijkgericht en korter is, met direct toepasbare vaardigheden voor het werkveld.'
			},
			{
				question: 'Welke voordelen heeft het behalen van een Associate degree?',
				answer:
					'Met een Ad-diploma ben je snel inzetbaar in de praktijk, heb je een erkend hbo-kwalificatieniveau en kun je doorstromen naar een bachelor. Daarnaast vergroot het je carrièremogelijkheden en professionele netwerk.'
			}
		]
	}
</script>

<section class="faq">
	<h2>Veelgestelde vragen</h2>

	{#each faqData.faqs as faq, i}
		<details
			class="faq-item adaptive"
			open={i === 0 ? true : undefined}
		>
			<summary class="faq-item__trigger"
				>{faq.question}
				<div class="faq-item__icon"><IconChevronDown /></div></summary
			>
			<p class="faq-item__content">{faq.answer}</p>
		</details>
	{/each}

	<div class="background-circle">
		<IconBackgroundCircle />
	</div>
</section>

<style>
	.faq {
		display: flex;
		flex-direction: column;
		gap: 1em;
		box-sizing: border-box;
		position: relative;
		padding: clamp(1em, 5vw, 5em);

		h2 {
			text-align: center;
		}
	}

	.faq-item {
		border: 1px solid var(--neutral-300);
		border-radius: 0.5em;
		padding: 1em;
		position: relative;
		z-index: 1;
		background-color: var(--text-white);
		width: clamp(16.5em, 80vw, 50em);
		align-self: center;
	}

	.faq-item__trigger {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: var(--font-heading);
		font-weight: var(--heading-font-weight);
		font-size: var(--p-s-size);
		line-height: 2em;
		cursor: pointer;
	}

	::details-content {
		transition:
			height 0.5s ease,
			content-visibility 0.5s ease allow-discrete;
		height: 0;
		overflow: clip;
	}

	[open]::details-content {
		height: auto;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	.faq-item__icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 38px;
		height: 35px;
		padding: 0 0.4em 0 0.5em;
		border-radius: 0.4em;
		background-color: var(--primary-orange);
		transition: transform 0.3s;
	}

	details[open] .faq-item__icon {
		transform: rotate(180deg);
	}

	.background-circle {
		position: absolute;
		width: 400px;
		height: 400px;
		left: -10%;
		bottom: -10%;
		z-index: 0;

		@media (min-width: 768px) {
			width: 25em;
			left: 10%;
			bottom: 2%;
			position: absolute;
			z-index: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		::details-content {
			transition: none;
		}

		.faq-item__icon {
			transition: none;
		}
	}

	@media (prefers-contrast: more) {
		.faq-item {
			outline: 2px solid var(--primary-blue);
		}
	}

	@media (prefers-color-scheme: dark) {
		.faq-item.adaptive {
			background-color: var(--primary-blue);
			color: var(--text-white);
		}
	}

	@media (inverted-colors: inverted) {
		.faq-item {
			background-color: var(--primary-orange);
			color: var(--text-white);
		}
	}
</style>
