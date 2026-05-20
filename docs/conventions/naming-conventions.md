## [Naming conventions](https://docs.fdnd.nl/conventies.html#naamgeving)

- Use meaningful names, names should clearly reflect their purpose
- Always use English
- Be consistent in naming
- Avoid abbreviations, always write out the full name
- In HTML & CSS use `kebab-case`
  - Follow BEM (Block, Element, Modifier) for CSS class naming
- In JavaScript, use `camelCase`

  ---

### BEM Naming Convention
BEM stands for Block, Element, Modifier, a CSS naming system that keeps your code organized and predictable.
Structure:
- Block: Main component (nav)
- Element: Part of a block (nav-list, nav-item)
- Modifier: Variation or state (nav-item-active)

#### BEM
```svelte
<!-- BEM methodology -->
<style>
	/* BLOCK: Main component */
	.newsletter {
		background-color: orange;
	}

	/* ELEMENT: Part of the newsletter block */
	.newsletter__heading {
		color: blue;
	}

	/* ELEMENT: Part of the newsletter block */
	.newsletter__input {
		background-color: white;
	}

	/* ELEMENT: Part of the newsletter block */
	.newsletter__button {
		border: var(--_border);
		background-color: var(--_background);
		color: var(--_text);
	}

	/* MODIFIER: Variation of the newsletter__button element */
	.newsletter__button--decline {
		--_border: 1px solid red;
		--_background: lightcyan;
		--_text: red;
		&:hover {
			--_background: red;
			--_text: black;
		}
	}

	/* MODIFIER: Variation of the newsletter__button element */
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


#### BEM, ipv `--` een nested een extra class
```svelte
<!-- BEM methodology -->
<style>
	/* BLOCK: Main component */
	.newsletter {
		background-color: orange;
	}

	/* ELEMENT: Part of the newsletter block */
	.newsletter__heading {
		color: blue;
	}

	/* ELEMENT: Part of the newsletter block */
	.newsletter__input {
		background-color: white;
	}

	/* ELEMENT: Part of the newsletter block */
	.newsletter__button {
		border: var(--_border);
		background-color: var(--_background);
		color: var(--_text);

		/* MODIFIER: Variation of the newsletter__button element */
		&.decline {
			--_border: 1px solid red;
			--_background: lightcyan;
			--_text: red;
			&:hover {
				--_background: red;
				--_text: black;
			}
		}

		/* MODIFIER: Variation of the newsletter__button element */
		&.accept {
			--_border: 1px solid green;
			--_background: lightcyan;
			--_text: green;
			&:hover {
				--_background: green;
				--_text: black;
			}
		}
	}
</style>

<section class="newsletter">
	<h2 class="newsletter__heading">Newsletter</h2>
	<input
		type="email"
		class="newsletter__input"
	/>
	<button class="newsletter__button decline">Unsubscribe</button>
	<button class="newsletter__button accept">Subscribe</button>
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
