<script>
	// Import components
	import { RFaqSection } from '$lib'

	const props = $props()
	const data = $derived(props.data)
	const faqs = $derived(data.faqs)
</script>

<RFaqSection
	title="Veelgestelde vragen"
	faqData={{ faqs }}
/>
