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
BEM which stands for Block, Element, Modifier.  
This is a CSS naming system that keeps your code organized and predictable.  
Structure:
- Block: Main component
- Element: Part of a block
- Modifier: Variation or state

#### BEM - Naming Convention
- **Block**: `.blockname`
- **Element**: `.blockname__elementname` (double underscore `__`)
- **Modifier**: `.blockname__elementname--modifiername` (double dash `--`)

#### BEM - Example
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
	<input type="email" class="newsletter__input"/>
	<button class="newsletter__button newsletter__button--decline">Unsubscribe</button>
	<button class="newsletter__button newsletter__button--accept">Subscribe</button>
</section>
```


---

### Examples
### Inconsistent vs Consistent Naming

| Incorrect Name | Issue | Correct Name | BEM Format |
|-------------------|-------|-----------------|------------|
| `.button_submit` | Uses underscore instead of kebab-case | `.button--submit` | Block--Modifier |
| `.decline-button` | Inconsistent word order | `.button--decline` | Block--Modifier |
| `.newsletter_input` | Uses underscore, not BEM | `.newsletter__input` | Block__Element |
| `.submit_btn` | Abbreviation used | `.button--submit` | Block--Modifier |
| `.card_header` | Uses underscore, should use double underscore | `.card__header` | Block__Element |
| `.active-nav` | Inconsistent with state naming | `.navigation.is-active` | Block + State |
| `.form__input--focus` | Uses `--` for state (wrong) | `.form__input.is-focused` | Block__Element + State |
| `.btnSubmit` | camelCase in CSS (should be kebab-case) | `.button--submit` | Block--Modifier |
| `.nav-link` | Missing block context | `.navigation__link` | Block__Element |

### Context Examples

| Scenario | Bad | Good | difference |
|----------|--------|---------|--------|
| CSS class for button | `.btn` | `.button` | Block |
| JS function name | `get-user-data` | `getUserData()` | camelCase |
| CSS custom property | `--primary` | `--color-primary` | Descriptive |
| Button inside card | `.card-button` | `.card__button` | Block__Element |
| Disabled state | `.button-disabled` | `.button.is-disabled` | Block + State |
| Navigation item active | `.nav_item_active` | `.navigation__item.is-active` | Block__Element + State |
| Form input email type | `.inp-email` | `.form__input--email` | Block__Element--Modifier |
| Modal close button | `.modal_closeBtn` | `.modal__close-button` | Block__Element |
