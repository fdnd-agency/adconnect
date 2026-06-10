# CardNews.svelte Component Documentation
## Overview

This is the card component used on the news page.  
The component consists of an h3 element, a date, a description, and a link to the page with more information about that news item.

<details>
<summary>Examples:</summary>

<img width="764" height="652" alt="Image" src="https://github.com/user-attachments/assets/18fcc4c9-87f9-4dea-8ed4-a93bc8573806" />
</details>

---

## Component Structure
```svelte
<article class="news-card">
	<h2 class="news-card__title">{item.title}</h2>

	<section class="news-card__date">
		<IconCalendar />
		<p class="news-card__date-text">{formatDateNL(item.date)}</p>
	</section>

	<p class="news-card__description">{item.description}</p>

	<RLink
		href={`/nieuws/${item.uuid}`}
		class="button-outline-blue clickable-container"
	>
		Meer informatie
		<span
			class="visually-hidden"
			aria-hidden="true">over {item.title}</span
		>
	</RLink>
</article>
```


### Usage Examples
```svelte
<ul>
	{#each paginatedNews as item (item.uuid)}
		<li>
			<RCardNews {item} />
		</li>
	{/each}
</ul>
```
Send all data for a single news item into the component. Inside the component, values such as `item.title` and `item.description` are then used.
