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

Important: In this project, use only single hyphens (-) for all separations, not double underscores (__)

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
