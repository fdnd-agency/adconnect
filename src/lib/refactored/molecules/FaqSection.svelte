<script>
	import { IconChevronDown, IconBackgroundCircle, IconDots } from '$lib/icons'

	const { title, faqData } = $props()
</script>

<section class="faq">
	<div class="faq__title">
		<h2>{title}</h2>
		<IconDots variant="heading-two" />
	</div>

	{#each faqData.faqs as faq, i}
		<details
			class="faq-item adaptive"
			open={i === 0 ? true : undefined}
		>
			<summary class="faq-item__trigger">
				{faq.question}
				<div class="faq-item__icon"><IconChevronDown /></div>
			</summary>
			<p class="faq-item__content">{faq.answer}</p>
		</details>
	{/each}

	<div class="faq__background-circle">
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
		padding: 2em clamp(1em, 5vw, 5em);
		overflow: clip;
	}

	.faq__title {
		display: flex;
		flex-direction: column-reverse;
		gap: 1em;
		align-items: center;
		margin-bottom: 2em;

		h2 {
			max-width: 12em;
			text-align: center;
			text-wrap: balance;
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

	.faq__background-circle {
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
