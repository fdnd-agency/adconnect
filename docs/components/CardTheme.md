# CardTheme.svelte Component Documentation
## Overview
For now, this is only used on the home page.  
It is a card with an h3 title, description, and a link to another page. The whole card is clickable.

<details>
<summary>Examples:</summary>

<img width="763" height="484" alt="Image" src="https://github.com/user-attachments/assets/077c6e18-4537-42b4-bcc1-a873c0c2a7e2" />

</details>

---

## Component Structure

### Script
```svelte
<script>
	import { RLink } from '$lib'
	import { IconDots, IconCalendar, IconLabel } from '$lib/icons'
	const { title, description, link, children } = $props()
</script>

<article class="info-card">
	<div class="info-card__heading">
		<h3 class="info-card__title">{title}</h3>
		<IconDots variant="heading-three" />
	</div>

	<p class="info-card__description">{description}</p>

	{#if link}
		<div class="info-card__link">
			<RLink
				href={link.href}
				class="button-outline-blue clickable-container"
			>
				{link.label}
				<span
					class="info-card__cta-arrow"
					aria-hidden="true">→</span
				>
			</RLink>
		</div>
	{/if}
</article>
```

Props for title, description and an optional link.  


### Usage Examples
```svelte
<RCardInfo
	title="Doorstroom Ad"
	description="Met een Associate degree stroom je door naar het derde jaar van een bachelor. Zo combineer je praktijk met een diploma."
	link={{ label: "Meer over doorstroom Ad's", href: '/over-ad' }}
	infoCard
/>
```

The link prop is written like this: link={{ label: "Meer over doorstroom Ad's", href: '/over-ad' }}.  
This way, the label and href are passed together, which prevents the possibility of forgetting one or the other.
