## [Naming conventions](https://docs.fdnd.nl/conventies.html#naamgeving)

- Use meaningful names, names should clearly reflect their purpose
- Always use English
- Be consistent in naming
- Avoid abbreviations, always write out the full name
- In HTML & CSS use `kebab-case`
- In JavaScript, use `camelCase`

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
| button-submit    | Correct and consistent naming              | button-submit    |
| decline-button   | Inconsistent order                         | button-decline   |
| button_previous  | Uses underscore instead of kebab-case      | button-previous  |
| --color-red      | Correct custom property naming             | --color-red      |
| --blue           | Inconsistent with previous naming pattern  | --primary-blue   |
