<script>
	// Import components
	import { FaqSection } from '$lib'

	const props = $props()
	const data = $derived(props.data)
	const faqs = $derived(data.faqs)
</script>

<FaqSection
	title="Veelgestelde vragen"
	faqData={{ faqs }}
/>
