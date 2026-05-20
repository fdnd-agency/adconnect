## [Naming conventions](https://docs.fdnd.nl/conventies.html#naamgeving)

- Use meaningful names, names should clearly reflect their purpose
- Always use English
- Be consistent in naming
- Avoid abbreviations, always write out the full name
- In HTML & CSS use `kebab-case`
  - Follow BEM (Block, Element, Modifier) for CSS class naming
- In JavaScript, use `camelCase`

  ---

### SMACSS Naming Convention
> SMACSS = Scalable and Modular Architecture for CSS

SMACSS uses mostly the same naming convention as BEM, which stands for Block, Element, Modifier.  
This is a CSS naming system that keeps your code organized and predictable.  
Structure:
- Block: Main component
- Element: Part of a block
- Modifier: Variation or state

BEM combines everything into multiple classes on a single element.  
Example:
```svelte
	<button class="newsletter__button newsletter__button--decline">Unsubscribe</button>
	<button class="newsletter__button newsletter__button--accept">Subscribe</button>
```
This uses a class for the element (button) and a class for the modifier (decline and accept variations).

SMACSS follows similar naming but separates the modifier into a different class, which makes the classes on an element easier to read. Additionally, you can reuse modifier classes across different elements. This also allows you to nest modifiers if they are only needed for a specific element.  
Example:
```svelte
	<button class="newsletter__button decline">Unsubscribe</button>
	<button class="newsletter__button accept">Subscribe</button>
```

#### SMACSS
```svelte
<!-- SMACSS methodology -->
<style>
	/* BASE */
	button {
		cursor: pointer;
		font-family: inherit;
	}

	input {
		font-family: inherit;
	}

	/* LAYOUT */
	.l-newsletter {
		display: flex;
		flex-direction: column;
		padding: 0.5em;
	}

	/* MODULE: Newsletter block */
	.newsletter {
		background-color: orange;
	}

	/* ELEMENTS */
	.newsletter__heading {
		color: blue;
	}

	.newsletter__input {
		background-color: white;
		margin-bottom: 10px;
	}

	.newsletter__button {
		border: var(--_border);
		background-color: var(--_background);
		color: var(--_text);
		margin-bottom: 10px;
	}

	/* MODIFIERS */
	.newsletter__button--decline {
		--_border: 1px solid red;
		--_background: lightcyan;
		--_text: red;

		&:hover {
			--_background: red;
			--_text: black;
		}
	}

	.newsletter__button--accept {
		--_border: 1px solid green;
		--_background: lightcyan;
		--_text: green;

		&:hover {
			--_background: green;
			--_text: black;
		}
	}

	/* STATE */
	.newsletter__button.is-disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>

<section class="newsletter l-newsletter">
	<h2 class="newsletter__heading">Newsletter</h2>
	<input
		type="email"
		class="newsletter__input"
		placeholder="Enter your email"
	/>
	<button class="newsletter__button newsletter__button--decline">Unsubscribe</button>
	<button class="newsletter__button newsletter__button--decline is-disabled">extra button</button>
	<button class="newsletter__button newsletter__button--accept">Subscribe</button>
</section>
```

#### BEM
```svelte
<!-- BEM methodology -->
<style>
	/* BLOCK: Newsletter block */
	.newsletter {
		background-color: orange;
	}

	/* ELEMENT: heading inside of newsletter */
	.newsletter__heading {
		color: blue;
	}

	/* ELEMENT: input inside of newsletter */
	.newsletter__input {
		background-color: white;
	}

	/* ELEMENT: button inside of newsletter */
	.newsletter__button {
		border: var(--_border);
		background-color: var(--_background);
		color: var(--_text);
	}

	/* MODIFIERS for buttons inside of newsletter*/
	.newsletter__button--decline {
		--_border: 1px solid red;
		--_background: lightcyan;
		--_text: red;

		&:hover {
			--_background: red;
			--_text: black;
		}
	}

	.newsletter__button--accept {
		--_border: 1px solid green;
		--_background: lightcyan;
		--_text: green;

		&:hover {
			--_background: green;
			--_text: black;
		}
	}
</style>

<section class="newsletter">
	<h2 class="newsletter__heading">Newsletter</h2>
	<input
		type="email"
		class="newsletter__input"
	/>
	<button class="newsletter__button newsletter__button--decline">Unsubscribe</button>
	<button class="newsletter__button newsletter__button--accept">Subscribe</button>
</section>
```


---

Examples
Meaningfull names:
| Name                 | What it describes                                      | ... |
|----------------------|--------------------------------------------------------|------------------------------------------|
| focusTrap            | JavaScript function that traps keyboard tab focus      |      |
| nav-list             | List structure inside navigation element                       | nav > ul                                 |
| nav-item             | Individual navigation item                             | nav > ul > li                            |
| skip-link            | Hidden link that allows skipping to main content       |                              |
| fetchDocumentDetails()      | JavaScript function that fetches all document data    |                |

Consistant naming:
| Incorrect Name   | Issue                                      | Correct Name     |
|------------------|--------------------------------------------|------------------|
| button-submit    | Correct and consistent naming              |     |
| decline-button   | Inconsistent order                         | button-decline   |
| button_previous  | Uses underscore instead of kebab-case      | button-previous  |
| --color-red      | Correct custom property naming             |       |
| --blue           | Inconsistent with previous naming pattern  | --color-blue   |
