# CardPublicaties.svelte Component Documentation

## Overview

The CardPublicaties component (CardPublicaties.svelte) renders a single publication card showing the title, category, year, and a truncated description, plus a link to the full publication. The whole card is clickable, and long titles and descriptions are clamped to two lines.

---

## Component Structure

### Script

```svelte
<script>
	import { Link } from '$lib'
	import { IconCalendar, IconLabel } from '$lib/icons'
	const { document } = $props()

	// Limit description text for screenreaders
	function truncateWords(text, limit = 20) {
		// split text into words, return the first 20 words
		return text.split(/\s+/).slice(0, limit).join(' ') + '…'
	}
</script>
```

Props:
- `document` - Object holding the publication data
  - `title` - The publication title
  - `category` (optional) - Object with a `title`; falls back to `'Geen categorie'` when missing
  - `date` (optional) - Date string; only the year (first 4 chars) is shown, falls back to `'Geen datum'`
  - `description` - Summary text, truncated to 20 words
  - `slug` - Used to build the publication link (`/publicaties/{slug}`)

> `truncateWords` caps the description at 20 words; CSS additionally clamps it to two lines.

---

### HTML

```svelte
<article class="publication-card">
	<h3 class="truncate truncate--two">{document.title}</h3>

	<div class="publication-card__info">
		<span class="publication-card__meta">
			<IconLabel />
			<p>{document.category?.title ?? 'Geen categorie'}</p>
		</span>

		<span class="publication-card__meta">
			<IconCalendar />
			<p>{document.date?.slice(0, 4) ?? 'Geen datum'}</p>
		</span>
	</div>

	<p class="truncate truncate--two">{truncateWords(document.description, 20)}</p>

	<div class="publication-card__link">
		<Link
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
		</Link>
	</div>
</article>
```

> Missing `category` or `date` fall back to Dutch placeholder text.
> The `clickable-container` class makes the whole card clickable; the visually hidden span adds the title to the link for screen readers.

### Usage Examples

The parent section renders a card per document. `document` carries everything one card needs:

```svelte
document = { title, category: { title }, date, description, slug }
```

Example: rendering filtered documents into cards

```svelte
{#each filterResults as document (document.id)}
	<li class="section-documents__item"><CardPublicaties {document} /></li>
{/each}
```

### CSS

The dynamic styling is the card hover state and the line-clamp truncation; the rest is standard layout.

```svelte
<style>
	.publication-card {
		transition: 0.2s ease-in-out;

		&:hover {
			/* on hover: blue border, soft shadow, slight lift */
			border: 1px solid #00408d;
			box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
			translate: 0 -1%;
		}
	}

	/* clamps text to a set number of lines with an ellipsis */
	.truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	.truncate--single {
		-webkit-line-clamp: 1;  /* one line */
	}

	.truncate--two {
		-webkit-line-clamp: 2;  /* two lines */
	}
</style>
```
