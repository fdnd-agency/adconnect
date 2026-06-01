<script>
	// Import components
	import { MultipleFaq, SingleFaq } from '$lib'

	const props = $props()
	const data = $derived(props.data)
	const faqs = $derived(data.faqs)
</script>

<section
	class="faq-section"
	id="faq"
>
	<h2>Veelgestelde vragen</h2>
	<MultipleFaq>
		{#each faqs as faq, index (faq.id)}
			<SingleFaq
				open={index === 0}
				question={faq.question}
				answer={faq.answer}
			/>
		{/each}
	</MultipleFaq>
</section>

<style>
	.faq-section {
		display: flex;
		flex-direction: column;
		gap: 2em;
		padding: 3em 5%;
		box-sizing: border-box;
		position: relative;

		@media (min-width: 768px) {
			padding: 2em 5em 5em 5em;
		}
	}

	.faq-section h2 {
		text-align: center;
	}

	#faq {
		scroll-margin-top: 150px;
	}
</style>
