All `.svg` files have now been converted into `.svelte` files with custom properties for the fill and stroke. Icons that use different colors in light and dark mode are changed via CSS.

---

# svg Icons Documentation
## Overview
All icons are inside `lib/icons/`. This folder has its own `index.js` file that exports only the icons within this folder.  
This allows imports from `$lib/icons`, which makes it easier to distinguish where the icons are being imported from.

Previously, this was done aswell using comments to differentiate between different `$lib` imports.  
However, this still left the possibility of accidentally importing a component from an image import line, since they both used $lib.

## Example
How it is done now:  
Example with the new index.js file:
```typescript
import { MultipleFaq, SingleFaq, DividerText, Divider, LogoSection, Hero } from '$lib'

import { IconLogo } from '$lib/icons'
```
It will crash/show an error message when you try to import a component from `$lib/icons`

<details>
<summary>How it was done previously</summary>

```typescript
// Import components
import { MultipleFaq, SingleFaq, DividerText, Divider, LogoSection, Hero } from '$lib'

// Import images
import { logo } from '$lib'
```
Easy to mistakenly import a component from images
</details>


## Custom classes
For now, we only have one component where you can pass a class: `Dots.svelte`.  
This component is often used right above headings, but the height and width were slightly larger for `h2` and a bit smaller for `h3`.

By passing a class via props, you can specify which variant you need.

```svelte
<IconDots variant="heading-two" />

<IconDots variant="heading-three" />
```


If you add lang="ts" to your script, you will also get an error message when you forget to pass the variant.  

<img width="700" alt="Image" src="https://github.com/user-attachments/assets/3c81fbd9-fb2d-40a8-a959-db88a0151463" />


