## FaqSection.svelte Component Documentation
### Overview
This component is for the Frequently Asked Questions section.  
For now, JavaScript objects are defined in the script element to generate the list. These are used in a Svelte each loop for the details elements.  
This data still needs to be added to the database, but the structure for that is already in place.

### props
- You can use the prop to add a title when calling this component.
- Once the data is added to the database, a prop for passing the question and answer data will also need to be added. That prop should be created at that time.

### HTMl
```svelte
<section class="faq">
	<div class="faq__title">
		<h2>{title}</h2>
		<IconDots variant="heading-two" />
	</div>

	{#each faqData.faqs as faq, i}
		<!-- Only the first details element gets the open attribute -->
		<details class="faq-item adaptive" open={i === 0 ? true : undefined}>
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
```

### Usage Examples
```svelte
<FaqSection title="Veelgestelde vragen" />


```
