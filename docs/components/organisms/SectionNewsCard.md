# SectionNewsCard.svelte Component Documentation

## Overview

The SectionNewsCard component (SectionNewsCard.svelte) renders a "latest news" block: a separator followed by a responsive grid of news cards. Each card shows a title, description, image (Picture component), and a link to the article, with titles and descriptions truncated and a hover effect on the card. The image is pulled from Directus.

---

## Component Structure

### Script

```svelte
<script>
	import { Separator, Link, Picture } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'

	let { news } = $props()
</script>
```

Props:

- `news` - Array of article objects rendered into the grid
  - `uuid` - Used as the key and to build the article link (`/nieuws/{uuid}`)
  - `title` - The article heading, truncated to one line
  - `description` - The article summary, truncated to two lines
  - `hero` - Directus asset id for the card image

> Each card's image URL is built from `hero` and the Directus base URL.

---

### HTML

```svelte
<!-- one news card: image, title, description, link -->
{#snippet newsCard(article)}
	<article class="news-card">
		<div class="news-card__content">
			<h2 class="news-card__title truncate single">{article.title}</h2>
			<p class="news-card__description truncate two">{article.description}</p>
			<Link
				class="button-outline-blue news-card__link"
				href="/nieuws/{article.uuid}"
				screenReaderText="over {article.title}"
				style="margin: 0 1em 1em 1em;"
			>
				Meer informatie
			</Link>

			<!-- image is placed first via CSS grid-row -->
			<div class="news-card__media">
				<Picture
					src={`${DIRECTUS_URL}/assets/${article.hero}`}
					alt={article.title}
					width="300"
					height="210"
					style="height:auto;"
				/>
			</div>
		</div>
	</article>
{/snippet}

<div class="news">
	<Separator dividerText="Het laatste nieuws" />

	<ul class="news__list">
		<!-- one card per article -->
		{#each news as article (article.uuid)}
			<li class="news__item">{@render newsCard(article)}</li>
		{/each}
	</ul>
</div>
```

> The image markup comes after the text but is moved to the top of the card via `grid-row: 1`.

### Usage Examples

The parent typically slices the news list down to the latest few before passing it in:

```svelte
article = { uuid, title, description, hero }
```

Example: the latest three articles on the home page

```svelte
<SectionNewsCard news={news.slice(0, 3)} />
```

### CSS

The dynamic styling is the card hover state, the container query driving the column count, and the line-clamp truncation.

```svelte
<style>
	.news {
		/* establishes a query container named "news" */
		container: news / inline-size;
	}

	.news__list {
		display: flex;
		flex-direction: column;

		/* grid kicks in when the container (not the viewport) is at least 520px wide */
		@container news (min-width: 520px) {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
		}
	}

	.news-card {
		--_border-color: #cccccc;
		transition: 0.2s ease-in-out;

		&:hover {
			/* on hover: blue border, soft shadow, slight lift */
			--_border-color: #00408d;
			box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
			translate: 0 -1%;
		}
	}

	/* clamps text to a set number of lines with an ellipsis */
	.truncate {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
	}

	.truncate.single {
		-webkit-line-clamp: 1;  /* one line */
		white-space: nowrap;
	}

	.truncate.two {
		-webkit-line-clamp: 2;  /* two lines */
	}
</style>
```
