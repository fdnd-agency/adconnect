# Separator.svelte Component Documentation
## Overview
The Separator component (Separator.svelte) is an hr-based component that serves as a divider between sections on the page.  
It has the option to display text in the middle between two lines. If no text is provided, the component renders as a single line.

---

## Component Structure
```svelte
<section>
	<hr />
	{#if dividerText}
		<p>{dividerText}</p>
		<span></span>
	{/if}
</section>
```
- The first line is an `hr` element, which is announced by screen readers. The second line is a `span` so that a second separator is not announced again after the dividerText is read.
- dividerText is a string for text between 2 lines

