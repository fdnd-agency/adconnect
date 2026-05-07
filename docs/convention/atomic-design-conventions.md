## Atomic Design

### How Atomic Design is applied
**atoms**
- The smallest building blocks
- Represent a single HTML element
- Receive data via props
- Examples: Button, Input, Label, Icon, Badge

Atoms are the **_smallest building blocks_**, but that doesn’t mean the code itself is minimal.  
You can create complex atoms with their own logic, but when they are rendered in the DOM, they appear as a single element, such as a button.  

<details>
<summary>Button atom example</summary>
This is a button with an svg inside of it,  
there are 2 options now but 

```svelte
<script lang="ts">
	let {
		variant,
		onclick,
		ariaLabel,
		ariaExpanded,
		ariaControls
	}: {
		variant: 'hamburger' | 'close' | 'search'
		onclick: (e: MouseEvent) => void
		ariaLabel?: string
		ariaExpanded?: boolean
		ariaControls?: string
	} = $props()
</script>

<!-- Rule, To keep the code clean:
 buttons within the same theme are grouped inside an if/else.
 Example: The search button has a separate if statement because it has nothing to do with the menu-button's
 -->

{#if variant === 'hamburger'}
	<button class="menu-button" {onclick} aria-label="Open menu" aria-expanded={ariaExpanded} aria-controls={ariaControls}>
		<svg>...</svg>
	</button>
{:else if variant === 'close'}
	<button class="menu-button" {onclick} aria-label={ariaLabel}>
		<svg>...</svg>
	</button>
{/if}

{#if variant === 'search'}
	<button class="search-button" {onclick} aria-label="Search for something" aria-controls={ariaControls}>
		<svg>...</svg>
	</button>
{/if}

<style>
	.menu-button {
		background-color: inherit;
		border: none;
		cursor: pointer;

		@container nav-container (min-width: 1025px) {
			display: none;
		}

		.close {
			--_stroke-color: black;
			stroke: var(--_stroke-color);

			&:hover {
				--_stroke-color: var(--accent);
			}
		}
	}
</style>
```  

> Inside this component, we can add more button>svg variations.  
The JavaScript logic already exists, keeping your code DRY, consistent, and making it easier to add new button variations.

</details>

---

**molecules**
- Combination of multiple atoms working together with extra elements around those
- Do one thing and do it well (e.g., a search input with a button, filter lists)
- Examples: Search bar, Form field, Filter dropdown, Toggle switch

<details>
<summary>Example</summary>


```svelte
<script lang="ts">
	import { Button } from '$lib'

	let {
		label,
		name,
		placeholder = '',
		onSubmit
	}: {
		label: string
		name: string
		placeholder?: string
		onSubmit: (value: string) => void
	} = $props()

	let value = $state('')
	let inputId = `field-${name}`

	function handleClick(e: MouseEvent) {
		e.preventDefault()
		if (value.trim()) onSubmit(value)
	}
</script>

<div class="form-field">
	<label for={inputId}>{label}</label>
	<div class="input-group">
		<input
			id={inputId}
			type="text"
			{name}
			{placeholder}
			bind:value
		/>
		<!-- atom -->
		<Button variant="search" onclick={handleClick} />
	</div>
</div>

<style>
	.form-field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	label {
		font-size: 0.875rem;
		font-weight: 500;
	}

	.input-group {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border: 1px solid var(--border-color, #ccc);
		border-radius: 0.5rem;
		padding: 0.25rem 0.5rem;

		&:focus-within {
			border-color: var(--accent);
		}
	}

	input {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		padding: 0.25rem;
	}
</style>
```  

</details>

---

**organisms**
- Complex components combining atoms, molecules, and/or other organisms
- Represent distinct sections or features of a page (e.g., header, navigation, product card, form)
  - Tightly coupled to specific features or UI areas
- Examples: Navigation bar, Product list, Filter panel, User profile


<details>
<summary>Example</summary>


```svelte
<script lang="ts">
	import { WebsiteLogo, Menu } from '$lib'
</script>

<header>
	<h1>Arkaive</h1>
	<!-- atom -->
	<WebsiteLogo />
	<!-- organism -->
	<Menu />
</header>

<style>
	header {
		container: nav-container / inline-size;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
```  

</details>

---

**templates**
- we dont apply templates in our codebase

---

**pages**
- Correspond to routes (`+page.svelte` files in `src/routes`)
  - The full page / the page the user sees
- Load and render organisms
  - no added HTML elements only organisms
- CSS only for the layout

<details>
<summary>Example</summary>


```svelte
<script>
	import { Filters, ProjectCardContainer, About } from '$lib'
	let { data } = $props()
</script>

<!-- 3 sections on a page, each one an organism -->
<Filters projectCount={data.projects.length} />
<ProjectCardContainer projectsData={data.projects} />
<About />
```  

</details>
