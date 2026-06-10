# ContactCard.svelte Component Documentation

## Overview

The ContactCard component (ContactCard.svelte) renders a static contact information card with a heading, intro text, and clickable phone and email links (each with an inline icon). A decorative background circle sits in the corner on wider screens. It takes no data props and is rendered as-is.

---

## Component Structure

### Script

```svelte
<script>
	import { Link, CardSection, mail, Picture } from '$lib'
	const { ...props } = $props()
</script>
```

Props:
- none - All content is static; `...props` is collected but not used.

> This is a presentational component with fixed contact details; the phone and email are hardcoded in the markup.

---

### HTML

```svelte
<section class="contact-card">
	<h2>Contactgegevens</h2>

	<p>Heb je vragen of wil je meer weten over Associate Degrees...</p>

	<!-- phone and email, each a Link with an inline SVG icon -->
	<address class="contact-card__details">
		<Link href="tel:+0205995555" class="nav-link">
			<svg><!-- phone icon --></svg>
			Telefoonnummer
		</Link>

		<Link href="mailto:platformads@outlook.com" class="nav-link">
			<svg><!-- mail icon --></svg>
			platformads@outlook.com
		</Link>
	</address>

	<!-- decorative background circle, shown on wider screens only -->
	<svg class="circle-info"><!-- circle --></svg>
</section>
```

> The phone and email links use `tel:` and `mailto:` so they're actionable on click.
> The `circle-info` SVG is purely decorative and hidden on smaller screens.

### Usage Examples

The component takes no props; just place it where the contact details should appear.

```svelte
<div class="contact-wrapper">
	<ContactCard />
	<ContactForm />
</div>
```

### CSS

The only responsive/dynamic styling is the decorative circle, which only appears on wider screens.

```svelte
<style>
	.circle-info {
		display: none;  /* hidden by default */

		/* shown and positioned in the corner from 875px up */
		@media (min-width: 875px) {
			width: 17em;
			right: -10%;
			bottom: -40%;
			display: block;
			position: absolute;
		}
	}
</style>
```
