# TalentWinner.svelte Component Documentation

## Overview

The TalentWinner component (TalentWinner.svelte) renders a list of previous Talent Award winners, each with a name, excerpt, and profile photo. It filters the supplied nominations down to those marked as winners with a photo, and pulls the images from Directus. The photo is hidden on smaller screens.

<details>
	<summary>Example</summary>

<img width="1768" height="594" alt="image" src="https://github.com/user-attachments/assets/5ce3b5ed-c082-42b6-b6f7-7e46c81d9dee" />

</details>

---

## Component Structure

### Script

```svelte
<script>
	import { Picture } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'

	const { data } = $props()
	const imageUrl = (id) => `${DIRECTUS_URL}/assets/${id}`
</script>
```

Props:
- `data` - Object holding the nominations
  - `nominations` - Array of nomination objects; each has `id`, `title`, `excerpt`, `header`, and `profile_picture` (asset id)

> Only nominations whose `header` is `'winnaar'` and that have a `profile_picture` are shown; `imageUrl` builds the Directus asset URL from an id.

---

### HTML

```svelte
<section class="previous-winners">
	<ul>
		<!-- keep only winners that have a photo -->
		{#each data.nominations.filter((item) => item.header?.toLowerCase() === 'winnaar' && item.profile_picture) as winner (winner.id)}
			<li>
				<section>
					<h3>{winner.title}</h3>
					<p>{winner.excerpt}</p>
				</section>
				<!-- photo, hidden on small screens (see CSS) -->
				<div>
					<Picture
						src={imageUrl(winner.profile_picture)}
						alt="{winner.title} met krullend haar, glimlachend naar de camera"
						height="200px"
						width="200px"
						style="height:auto; border-radius: 15px;"
					/>
				</div>
			</li>
		{/each}
	</ul>
</section>
```

> The filter runs inline in the `{#each}`, so the component handles its own selection from the full nominations list.

### Usage Examples

The component receives the page's `data` object directly and does its own filtering:

```svelte
nomination = { id, title, excerpt, header, profile_picture }
```

Example: previous winners below a separator

```svelte
<Separator dividerText="Voorgaande talent award winnaars" />
<TalentWinner {data} />
```

### CSS

The only dynamic styling is the photo, which is hidden on small screens and only shown from 768px up.

```svelte
<style>
	div {
		display: none;  /* photo hidden on mobile */

		/* shown from 768px up */
		@media (min-width: 768px) {
			display: block;
			width: 100%;
			max-width: 200px;
			max-height: 200px;
		}
	}
</style>
```
