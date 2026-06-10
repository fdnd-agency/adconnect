# TextSection.svelte Component Documentation

## Overview

The TextSection component (TextSection.svelte) renders a document's description and, when a source file is available, an inline preview of it (via an `<iframe>`) plus a link to open the full document in a new tab. The preview block is skipped entirely when no source file is present.

---

## Component Structure

### Script

```svelte
<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import { Link } from '$lib'

	const { data } = $props()

	const sourceFileId = data?.document?.source_file?.id ?? data?.document?.source_file ?? null
</script>
```

Props:
- `data` - Object holding the document
  - `document` - Object with `title`, `description`, and an optional `source_file` (asset id or object with `id`)

> `sourceFileId` is resolved from `source_file` whether it's an object or a plain id; when absent it's `null` and the preview is omitted.

---

### HTML

```svelte
<article class="document-detail">
	<p>{data.document.description}</p>

	<!-- preview + link only render when a source file exists -->
	{#if sourceFileId}
		<div class="document-detail__file">
			<p>
				Hieronder een preview van het document of bekijk
				<!-- opens the full document in a new tab -->
				<Link
					target="_blank"
					href={`${DIRECTUS_URL}/assets/${sourceFileId}`}
				>
					hier
				</Link>
				het hele document
			</p>
			<!-- inline preview of the Directus asset -->
			<iframe
				class="document-detail__preview"
				title={data.document.title}
				src={`${DIRECTUS_URL}/assets/${sourceFileId}`}
			></iframe>
		</div>
	{/if}
</article>
```

> Both the link and the iframe point at the same Directus asset URL built from `sourceFileId`.

### Usage Examples

The component receives the page's `data` object directly:

```svelte
data = { document: { title, description, source_file } }
```

Example: a document detail layout

```svelte
<div class="detail-layout">
	<TextSection {data} />
</div>
```

### CSS

This component is standard layout with no dynamic or conditional styling; the only notable rules set fixed heights for the preview.

```svelte
<style>
	.document-detail__file iframe {
		height: 900px;  /* tall inline preview */
	}

	.document-detail__preview {
		height: 30em;
	}
</style>
```
