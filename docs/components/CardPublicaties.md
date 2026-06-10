# CardPublicaties.svelte Component Documentation
## Overview

dit is de cars die je op de publicaties pagina zien, de filter resultaten komen in deze kaart terecht.  


<details>
<summary>Examples:</summary>

<img width="773" height="595" alt="Image" src="https://github.com/user-attachments/assets/8aa29c30-ede9-4f64-b01c-343f66678922" />
</details>

---

## Component Structure

### Script
```svelte
<script>
	import { RLink } from '$lib'
	import { IconCalendar, IconLabel } from '$lib/icons'
	const { document } = $props()

	// Import images
	import { fallback, calendar, label } from '$lib'

	// Limit description text for screenreaders
	function truncateWords(text, limit = 20) {
		// split text into words, return the first 20 words
		return text.split(/\s+/).slice(0, limit).join(' ') + '…'
	}
</script>
```
truncateWords is a function that limits the description to 20 words. This is done by calling the function withe the description text inside of it.  
```svelte
<p class="publication-card__description truncate truncate--two">{truncateWords(document.description, 20)}</p>
```

---

### HTML
```svelte
<article class="publication-card">
	<h3 class="publication-card__title truncate truncate--two">{document.title}</h3>

	<div class="publication-card__info">
		<span class="publication-card__meta">
			<IconLabel />
			<p class="publication-card__meta-text">{document.category?.title ?? 'Geen categorie'}</p>
		</span>

		<span class="publication-card__meta">
			<IconCalendar />
			<p class="publication-card__meta-text">{document.date?.slice(0, 4) ?? 'Geen datum'}</p>
		</span>
	</div>

	<!-- limit description words -->
	<p class="publication-card__description truncate truncate--two">{truncateWords(document.description, 20)}</p>

	<div class="publication-card__link">
		<RLink
			href="/publicaties/{document.slug}"
			class="button-outline-blue clickable-container"
		>
			Meer informatie
			<span
				class="visually-hidden"
				aria-hidden="true"
			>
				over {document.title}
			</span>
		</RLink>
	</div>
</article>
```


### Usage Examples
```svelte
<RCardPublicaties {document} />
```
send all document data via 1 prop, inside the component use `document.title`, `document.description` etc for each field
