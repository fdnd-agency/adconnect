# Link.svelte Component Documentation

## Overview

The Link component (`Link.svelte`) is a universal, anchor element that serves multiple purposes throughout the application. It adapts to different use cases through CSS variants while maintaining consistent styling patterns and following FDND conventions.

---

## Component Structure

### Script Section

```svelte
<script>
	const { href, children, screenReaderText, ...props } = $props()
</script>
```

**Props:**
- `href` - URL destination for the link
- `children` - Renders content inside the Link component
  - ```svelte
    <Link class="..." href="...">
	    Meer informatie
        <!-- children will render: 'meer informatie' -->
    </Link>
    ```
- `screenReaderText` (optional) - Hidden text for screen readers
- `...props` - All other HTML attributes (class, data-*, aria-*, etc.)

### HTML
HTML inside the component:
```svelte
<a {href} {...props}>
	{@render children?.()}

	{#if screenReaderText}
		<span class="visually-hidden">{screenReaderText}</span>
	{/if}
</a>
```

Usage in other files:
```svelte
<Link
	class="button-outline-blue"
	href="/nieuws/{article.uuid}"
	screenReaderText="over {article.title}">Meer informatie
</Link>
```

Output in the DOM:
```svelte
<a
	href="/nieuws/2db02c29-99c5-402a-9d2a-d4697ff869cf"
	class="button-outline-blue s-e6aFGoMWy-BP">
	Meer informatie
	<span class="visually-hidden s-e6aFGoMWy-BP">over Landelijke Ad-dag</span>
</a>
```

---

## CSS - Component Variants

To use different variants, you pass a class through HTML just like normally. The `...props` ensures that the class is added to the component. In the component itself, we have the corresponding classes nested.

### Example 
There are 3 nav-link versions:
- A `desktop` version used when the navigation is fully open
- A `hamburger` version for use in the hamburger menu
- A `default` version used for the secondary navigation (FAQ, About Us & Contact)


Usage:
```css
.nav-link {
	/* shared styles for this class */

	/* Desktop variant */
	&.desktop {
		/* usage: class="nav-link desktop" */
	}

	/* Hamburger variant */
	&.hamburger {
		/* usage: class="nav-link hamburger" */

		&::after {
			all: unset;
			/* reset the after, we dont need after in this version */
		}
	}

	/* Shared pseudo-element */
	&::after {
	}

	&:hover,
	&.active {
		/* change styles on hover and active */
	}
}
```
