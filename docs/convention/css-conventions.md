## [CSS code conventions](https://docs.fdnd.nl/conventies.html#css-conventies)

### CSS - General conventions
- 1 tab – for indentation.
- Follow HTML order
- Use kebab-case in naming classes en id's.

### CSS - Nesting
Don’t nest more than three levels deep,  
Examples for svelte:
```svelte
<style>
/* This indent before the ul comes from the style tag and doesn’t count toward CSS nesting */
	ul {
		display: flex;
		flex-direction: column;
		width: 100%;

		/* First level nested */
		li {
			width: 18em;

			/* Second level nested  */
			a {
				color: black;

				/* Third level nested  */
				&:hover {
					color: blue;
				}
			}
		}

		/* First level nested  */
		li:last-child {
			order: -1;
		}
	}
</style>
```

### CSS - Pseudo-Private Custom Properties
define local variables once and use them,  
When you have text color black, but need to change it to blue on hover,  
Swap the custom property values instead of repeating every property again

```svelte
<style>
	button {
		/* set default values */
		--_bg: white;
		--_color: black;

		/* use them */
		background: var(--_bg);
		color: var(--_color);

		/* on hover, only change the variables */
		/* the properties above pick up the new values automatically */
		&:hover {
			--_bg: black;
			--_color: white;
		}
	}
</style>
```

<details>
<summary>Example without Pseudo-Private Custom Properties</summary>

```svelte
<style>
	button {
		background: white;
		color: black;

		&:hover {
			background: white;
			color: white;
		}
	}
</style>
```
</details>

- DRY: each property declared once, not repeated per state
- Scales: adding `:focus`, `:active`, etc. only needs variable swaps
- Clear diffs: state blocks show only what changes
- Safer: can't forget to update a property in one of the states
- Easy variants: Composable later
- If you ever need a variant (`.button.danger`), you just override the variables: `--_bg: red`.
- No need to rewrite the whole button, the structure stays untouched


### CSS - Responsive to the container
We follow atomic design: a component should be able to stand on its own  
To make components like this responsive, we use container queries  
These respond to the parent container, meaning you can adjust the layout based on the parent’s width

Example:
```svelte
<!-- ------------------------------ Card.svelte (Organism) ------------------------------ -->
<article class="card-wrapper">
	<a class="card">
		<h3>Title</h3>
		<CardMeta />
	</a>
</article>

<style>
	/* Name a container on the parent */
	.card-wrapper{
		container: card / inline-size;
	}

	/* Descendants in THIS file query the container by name */
	@container card (min-width: 400px) {
		.card {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>

<!-- ------------------------------ CardMeta.svelte (Molecule) ------------------------------ -->
<p class="meta">
	Author
	<MetaIcon />
</p>

<style>
	/* Lives in a separate file, but still reacts to the parent's "card" container */
	@container card (min-width: 600px) {
		.meta {
			font-size: 1.25rem;
		}
	}
</style>

<!-- ------------------------------ MetaIcon.svelte (Atom) ------------------------------ -->
<span class="icon">★</span>

<style>
	/* Even this deeply nested atom responds to the SAME container */
	@container card (min-width: 800px) {
		.icon {
			transform: scale(1.5);
		}
	}
</style>
```

#### Responsive to the container - Key takeaways
Put the container on a wrapper, not on the element you want to style.
- A container query checks the size of the container, but it can't restyle the container itself.
- So if you put container directly on `.card`, you can never restyle `.card` based on its own width.  
- By wrapping `.card ` in `.card-wrapper`, the wrapper measures the available room, and everything inside (including the `.card ` itself) can respond to it.

Container queries cross component boundaries.
- Define the container once in an `organism`, and any `nested molecule or atom` can use it by name.  
- This means children components react to the organism's size instead of each managing its own container.  

**Note: this isn't always the right call**  
- think about whether a component should be tied to its parent's size or stay self-contained.
- Wrap everything, including container queries, inside one top-level class.
  - Then you have the option to reuse the same component with a `different class` & `container name` to get it responsive in another situation
  - <details>
    <summary>Example</summary>

    ```svelte
    <!-- ------------------------------ Feed.svelte (parent A) ------------------------------ -->
    <section class="feed-wrapper">
    	<Filters variant="in-feed" />
    </section>
    
    <style>
    	.feed-wrapper {
            container: feed / inline-size;
        }
    </style>
    
    
    <!-- ------------------------------ Sidebar.svelte (parent B) ------------------------------ -->
    <aside class="sidebar-wrap">
    	<Filters variant="in-sidebar" />
    </aside>
    
    <style>
    	.sidebar-wrapper {
            container: sidebar / inline-size;
        }
    </style>
    
    
    <!-- ------------------------- Filters.svelte (same component, used in both) ------------------------- -->
    <div class={variant}>
    	<h3>Title</h3>
    </div>
    
    <style>
        /* Query for the filters IF they are in the feed */
    	.in-feed {
    		@container feed (min-width: 600px) {
    			h3 { font-size: 2rem; }
    		}
    	}
    
        /* Query for the filters IF they are in the sidebar */
    	.in-sidebar {
    		@container sidebar (min-width: 300px) {
    			h3 { font-size: 1rem; }
    		}
    	}
    </style>
    ```
  </details>

