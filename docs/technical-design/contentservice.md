# ContentService

This document explains how the `ContentService` works in this project.

The `ContentService` is used to keep all server-side communication with Directus in one central place. This keeps the page server files cleaner and prevents repeated Directus API code throughout the project.

The short version:

Server files call the `ContentService`.  
The `ContentService` handles the communication with Directus.

---

## Why we use a ContentService

The CMS has multiple places where content needs to be loaded, created, updated or deleted.

Examples:

- loading documents for the document overview page
- loading categories for a create form
- creating a new document
- uploading files
- publishing or depublishing content
- deleting content
- deleting uploaded files when something goes wrong

Without the `ContentService`, every server file would need to write its own Directus `fetch()` calls. That would make the code harder to read and harder to maintain.

Instead, the server files use simple methods such as:

```js
ContentService.fetchContent(...)
ContentService.postContent(...)
ContentService.updateContent(...)
ContentService.publishContent(...)
ContentService.deleteContent(...)
ContentService.postFile(...)
```

This makes it much clearer what the server file is trying to do.

---

## Where the ContentService is used

The `ContentService` is mainly used inside `+page.server.js` files.

For example:

- create form server files
- edit form server files
- overview page server files
- server actions such as publish, depublish and delete

---

## Example: document overview page

The document overview page shows all documents and allows the user to perform actions such as:

- publish
- depublish
- delete

In the `load` function, the documents are loaded like this:

```js
const { data: content, errors } = await ContentService.fetchContent('documents', null, null, null, true, cookies.get('access_token'))
```

This retrieves the documents from Directus through the `ContentService`.

The page then receives:

```js
return {
	documents: content.documents,
	loadError: errors.length ? 'Er is een probleem opgetreden bij het ophalen van de documenten.' : null
}
```

The same server file also uses the `ContentService` for the document actions.

Publishing:

```js
return await ContentService.publishContent(id, 'documents', token)
```

Depublishing:

```js
return await ContentService.depublishContent(id, 'documents', token)
```

Deleting:

```js
return await ContentService.deleteContent(id, 'documents', token)
```

This keeps the overview server file easy to understand. It does not need to know the exact Directus URLs or request settings.

---

## Example: create document form

The create document form uses the `ContentService` for multiple steps.

First, the `load` function gets all categories:

```js
const { data: content, errors } = await ContentService.fetchContent('categories', null, null, null, false, cookies.get('access_token'))
```

These categories are used in the form so the user can select a category for the document.

When the form is submitted, the server action:

1. reads the form data
2. validates the form data
3. uploads the image
4. uploads the source file
5. creates the document in Directus
6. optionally publishes the document
7. cleans up uploaded files if something goes wrong

The image is uploaded with:

```js
const imageUpload = await ContentService.postFile(image, token, {
	folderName: FILE_LIBRARY_FOLDER,
	allowedMimePrefixes: ['image/'],
	invalidTypeError: 'Afbeelding uploaden mislukt: Bestand is geen afbeelding.'
})
```

The source file is uploaded with:

```js
const sourceUpload = await ContentService.postFile(sourceFile, token, {
	folderName: FILE_LIBRARY_FOLDER,
	allowedMimePrefixes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument'],
	invalidTypeError: 'Bestand uploaden mislukt: Ongeldig bestandstype. Alleen PDF- en Word-documenten zijn toegestaan.'
})
```

After the files are uploaded, their ids are used in the document payload:

```js
let payload = {
	...submittedFormState,
	hero_image: imageUpload.id,
	source_file: sourceUpload.id,
	slug: baseSlug,
	status: 'draft'
}
```

The document is then created with:

```js
let createResult = await ContentService.postContent(payload, 'documents', token)
```

If the user clicked the publish button, the created document can be published with:

```js
const publishResult = await ContentService.publishContent(createResult.id, 'documents', token)
```

If something goes wrong after files were uploaded, the server file can remove those files again:

```js
await ContentService.deleteFile(fileId, token)
```

This prevents unused uploaded files from staying in Directus.

---

## What the ContentService does

The `ContentService` provides a clear list of methods that server files can use.

### `fetchContent()`

Used to load content from Directus.

Examples:

```js
ContentService.fetchContent('documents')
ContentService.fetchContent('categories')
ContentService.fetchContent('documents', id)
```

This is often used inside a `load` function.

---

### `postContent()`

Used to create new content.

Example:

```js
ContentService.postContent(payload, 'documents', token)
```

This is often used in create forms.

---

### `updateContent()`

Used to update existing content.

Example:

```js
ContentService.updateContent(id, payload, 'documents', token)
```

This is often used in edit forms.

---

### `publishContent()`

Used to publish content by setting its status to `published`.

Example:

```js
ContentService.publishContent(id, 'documents', token)
```

---

### `depublishContent()`

Used to turn published content back into a draft.

Example:

```js
ContentService.depublishContent(id, 'documents', token)
```

---

### `deleteContent()`

Used to delete content from Directus.

Example:

```js
ContentService.deleteContent(id, 'documents', token)
```

For some content types, this also removes linked files. For example, documents can have a `hero_image` and a `source_file`.

---

### `postFile()`

Used to upload a file to Directus.

Example:

```js
ContentService.postFile(file, token, {
	folderName: 'Adconnect',
	allowedMimePrefixes: ['image/']
})
```

This method can also check if the file type is allowed.

---

### `deleteFile()`

Used to delete a file from Directus.

Example:

```js
ContentService.deleteFile(fileId, token)
```

This is useful for rollback or cleanup logic.

---

### `postContact()`

Used to process contact form submissions.

Example:

```js
ContentService.postContact(name, email, message)
```

---

## Content types and Directus collections

In the code, server files use simple content type names.

Examples:

```js
'documents'
'categories'
'news'
'events'
```

The Directus strategy knows which Directus collection belongs to each content type.

For example:

```js
documents -> adconnect_documents
categories -> adconnect_categories
news -> adconnect_news
```

This means server files do not need to know the exact Directus collection names.

They can simply use:

```js
ContentService.fetchContent('documents')
```

instead of building the full Directus URL manually.

---

## File fields

Some content types have files connected to them.

For example, a document can have:

- `hero_image`
- `source_file`

In the collection configuration, these fields are listed as `fileFields`.

This is important when content is deleted. If a document is deleted, the service can also delete the files connected to that document.

This helps keep the Directus file library clean.

---

## Strategy Pattern

The `ContentService` uses the Strategy Pattern.

This means that the service has one clear interface, but the actual work is handled by a strategy.

For normal use, the service uses the Directus strategy. That strategy knows how to communicate with Directus.

The server files do not need to know about the details of the strategy. They only use the `ContentService`.

Example:

```js
ContentService.fetchContent('documents')
```

Internally, the service passes this call to the active strategy.

The benefit is that the project has one central way to work with content, while the internal implementation can still be changed if needed.

---

## What belongs in the ContentService

The `ContentService` should contain shared server-side actions related to Directus.

Good examples:

- fetching content
- creating content
- updating content
- publishing content
- depublishing content
- deleting content
- uploading files
- deleting files

If multiple server files need the same Directus action, it probably belongs in the `ContentService` or in the strategy behind it.

---

## What should stay outside the ContentService

Not everything should be placed inside the `ContentService`.

The server file should usually still handle:

- reading form data
- validating form data
- creating the payload for a specific form
- deciding which success or error message to show
- deciding if something should be published after creation
- page-specific logic

For example, this belongs in the form action:

```js
const data = await request.formData()
```

This also belongs in the form action:

```js
const payload = {
	...submittedFormState,
	hero_image: imageUpload.id,
	source_file: sourceUpload.id,
	slug: baseSlug,
	status: 'draft'
}
```

The `ContentService` should then be used to send that payload to Directus:

```js
ContentService.postContent(payload, 'documents', token)
```

A useful way to think about it:

```text
Server file
	-> reads the form
	-> validates the form
	-> prepares the payload
	-> calls the ContentService

ContentService
	-> communicates with Directus
	-> returns the result
```

---

## Error handling

Most `ContentService` methods return a result.

A successful result usually looks like this:

```js
{
	success: true,
	id: '...'
}
```

If something goes wrong, the service returns an error response.

The server file can then decide what to do.

Example:

```js
if (!createResult?.success) {
	return fail(500, {
		error: GENERIC_CREATE_ERROR,
		...submittedFormState
	})
}
```

This keeps the user-facing error messages inside the server file, while the Directus communication stays inside the service.

---

## Adding a new content type

When a new content type is added, the usual steps are:

1. Add the collection in Directus.
2. Add the content type to the collection configuration in the Directus strategy.
3. Use the content type name in the server file.

Example:

```js
ContentService.fetchContent('events')
ContentService.postContent(payload, 'events', token)
ContentService.updateContent(id, payload, 'events', token)
```

If the content type has linked files, also add the file fields.

Example:

```js
fileFields: ['hero']
```

This makes sure the service knows which files belong to that content type.

---

## Practical rules for students

Use these rules when working on this project:

1. Use `ContentService` inside server files.
2. Do not write direct Directus `fetch()` calls in page server files unless there is a very specific reason.
3. Keep form-specific logic in the form action.
4. Keep shared Directus logic in the `ContentService` or strategy.
5. Add new content types to the collection configuration.
6. Use `postFile()` for file uploads.
7. Use `deleteFile()` for file cleanup.
8. Use `publishContent()` and `depublishContent()` for status changes.

---

## Summary

The `ContentService` is the central place for server-side Directus communication.

It helps keep the project organised by preventing repeated API code in multiple server files.

The service is used for loading, creating, updating, publishing, depublishing and deleting content. It is also used for uploading and deleting files.

The service uses the Strategy Pattern, which means server files can keep using the same `ContentService` methods while the internal implementation stays flexible.

For most work in this project, remember:

Page server files handle the form flow.  
The `ContentService` handles Directus communication.
