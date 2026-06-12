# Validation System

This document explains how the validation system works in the project.

The goal of this system is to make form validation easier to reuse and easier to extend. This is useful because the CMS contains multiple forms, such as forms for documents, events, news items and other content types.

Instead of writing the same validation checks in every form action, the project uses a small validation system based on two design patterns:

- Chain of Responsibility
- Factory

You do not need to know these patterns in depth to work with the code. The main idea is simple:

A form is checked by a list of validation rules.  
The factory creates the correct list of rules for the form.

---

## Why this validation system exists

Before using this system, a form action could contain many repeated checks like this:

```js
if (!title) {
	return fail(400, { error: 'Vul een titel in.' })
}

if (!description) {
	return fail(400, { error: 'Vul een omschrijving in.' })
}

if (!date) {
	return fail(400, { error: 'Vul een datum in.' })
}
```

This works, but it becomes messy when multiple forms need the same kind of validation.

For example, many content forms need to check if these fields are filled in:

- title
- description
- date
- category

If every form writes these checks manually, the same logic is repeated in many files. That makes the code harder to maintain.

The validation system solves this by moving these checks into reusable validation handlers.

---

## Basic idea

The validation system works like a chain.

A form is passed through multiple validation handlers. Each handler checks one thing.

Example:

AccessTokenHandler
-> RequiredFieldHandler(title)
-> RequiredFieldHandler(description)
-> RequiredFieldHandler(date)
-> RequiredFieldHandler(category)

Each handler checks its own rule.

If the check passes, the form data is passed to the next handler.

If the check fails, the chain stops and returns an error.

If all checks pass, the chain returns `null`. This means there were no validation errors.

---

## Chain of Responsibility

The Chain of Responsibility pattern is used for the validation handlers.

In this project, this means:

- each validation rule is placed in its own handler
- handlers are connected to each other
- the form data moves through the chain
- the first failing handler returns an error
- if no handler fails, the result is `null`

This keeps the form action cleaner, because the form action does not need to contain all validation checks itself.

---

## Base ValidationHandler

All validation handlers extend the same base class: `ValidationHandler`.

```js
export class ValidationHandler {
	#nextHandler = null

	setNext(handler) {
		this.#nextHandler = handler
		return handler
	}

	handle(request) {
		if (this.#nextHandler) {
			return this.#nextHandler.handle(request)
		}

		return null
	}
}
```

### What this class does

The base handler keeps track of the next handler in the chain.

The `setNext()` method connects one handler to the next one.

Example:

```js
validator.setNext(new RequiredFieldHandler('title', 'Vul een titel in.')).setNext(new RequiredFieldHandler('description', 'Vul een omschrijving in.'))
```

This creates a chain where the title is checked first, and the description is checked after that.

The `handle()` method sends the data to the next handler.

If there is no next handler, it returns `null`.

---

## RequiredFieldHandler

The `RequiredFieldHandler` checks if a text field is filled in.

Example:

```js
new RequiredFieldHandler('title', 'Vul een titel in.')
```

This means:

Check if the `title` field has a value.  
If it is empty, return the message: `Vul een titel in.`

The handler can be reused for different fields.

Examples:

```js
new RequiredFieldHandler('title', 'Vul een titel in.')
new RequiredFieldHandler('description', 'Vul een omschrijving in.')
new RequiredFieldHandler('date', 'Vul een datum in.')
new RequiredFieldHandler('category', 'Kies een categorie.')
```

This makes it easy to reuse the same validation logic across multiple forms.

---

## RequiredFileHandler

The `RequiredFileHandler` checks if a file has been uploaded.

Example:

```js
new RequiredFileHandler('image', 'Upload een afbeelding.')
```

This means:

Check if the `image` field contains a real uploaded file.

This is useful for create forms where an image or document is required.

For update forms, files are often optional. This is because the user may want to keep the existing file instead of uploading a new one.

---

## AccessTokenHandler

The `AccessTokenHandler` checks if the user has an access token.

This is used to make sure the user is allowed to submit the form.

If there is no token, the form action should not continue with uploading files or saving content.

---

## Factory

The Factory pattern is used to create the correct validation chain.

Instead of building the chain inside every form action, the form action asks the factory to create it.

Example:

```js
const validator = ValidationChainFactory.create('document', GENERIC_CREATE_ERROR)
```

This means:

Give me the validation chain for a document form.

The form action does not need to know exactly which handlers are needed. The factory handles that.

---

## Why the factory is useful

The factory keeps the validation setup in one place.

Without the factory, every form action would need to build its own chain. This would create repeated code again.

With the factory, a form action only needs this:

```js
const validator = ValidationChainFactory.create('document', GENERIC_CREATE_ERROR)
```

This makes the code easier to read and easier to update.

If the document form needs a new validation rule later, it can be added inside the factory instead of changing every form action.

---

## How validation is used in a form action

A form action first reads the form data:

```js
const data = await request.formData()
```

The submitted data is then converted to a usable object:

```js
const { submitAction: rawSubmitAction = 'save', image, source_file: sourceFile, ...submittedFormState } = extractFormState(data)
```

The normal text fields are stored in `submittedFormState`.

The files are kept separate as `image` and `sourceFile`.

After that, the text fields are cleaned up:

```js
submittedFormState.title = String(submittedFormState.title ?? '').trim()
submittedFormState.description = String(submittedFormState.description ?? '').trim()
submittedFormState.date = String(submittedFormState.date ?? '').trim()
submittedFormState.category = String(submittedFormState.category ?? '').trim()
```

Then the validator is created:

```js
const validator = ValidationChainFactory.create('document', GENERIC_CREATE_ERROR)
```

The validation is then executed:

```js
const validationError = validator.handle({
	token,
	...submittedFormState,
	image,
	source_file: sourceFile
})
```

The text fields are passed with:

```js
...submittedFormState
```

The files are passed separately because they were also extracted separately from the form.

If there is a validation error, the form action returns a `fail()` response:

```js
if (validationError) {
	return fail(validationError.status, {
		error: validationError.message,
		...submittedFormState
	})
}
```

If there is no validation error, the form action continues.

---

## Create and update forms

Create and update forms can use the same validation system, but they may not need exactly the same rules.

For example:

### Create document

When creating a new document, the user should upload:

- an image
- a source file

So the create validation chain should check those files.

### Update document

When updating an existing document, the user does not always need to upload new files.

The existing image and source file can stay linked to the document.

So the update validation chain should usually not require new files.

A clean way to handle this is to let the factory know if the form is used for creating or updating.

Example:

```js
ValidationChainFactory.create('document', {
	mode: 'create',
	message: GENERIC_CREATE_ERROR
})
```

```js
ValidationChainFactory.create('document', {
	mode: 'update',
	message: GENERIC_UPDATE_ERROR
})
```

The shared document fields can stay the same:

- title
- description
- date
- category

Only the file validation changes depending on the mode.

---

## Example flow

When a document form is submitted, the validation flow looks like this:

Form is submitted
↓
Form data is extracted
↓
ValidationChainFactory creates the document validation chain
↓
AccessTokenHandler checks if a token exists
↓
RequiredFieldHandler checks title
↓
RequiredFieldHandler checks description
↓
RequiredFieldHandler checks date
↓
RequiredFieldHandler checks category
↓
RequiredFileHandler checks image, if required
↓
RequiredFileHandler checks source file, if required
↓
If everything is valid, the form action continues

If one check fails, the chain stops.

Example:

Title is empty
↓
RequiredFieldHandler(title) returns an error
↓
The form action returns fail(400)
↓
The user sees the validation message

---

## Adding a new validation rule

To add a new validation rule, create a new handler that extends `ValidationHandler`.

Possible future handlers:

- MaxLengthHandler
- SlugFormatHandler
- FileSizeHandler
- AllowedFileTypeHandler
- DateFormatHandler

Example idea:

```js
new MaxLengthHandler('title', 'De titel is te lang.', 100)
```

After creating the handler, add it to the correct chain in the factory.

---

## Adding validation for a new content type

If a new content type is added, add a new chain in the `ValidationChainFactory`.

Example content types:

- document
- event
- news
- faq
- nomination

The factory decides which handlers are needed for each content type.

For example, a FAQ may only need:

- question
- answer

While a document may need:

- title
- description
- date
- category
- image
- source_file

This keeps the validation rules organised.

---

## Benefits

### Less repeated code

Validation rules do not need to be written again in every form action.

### Easier to read

The form action stays focused on the main flow:

- read form
- validate form
- upload files
- save content
- return response

### Easier to extend

New validation rules can be added by creating new handlers.

### Easier to maintain

If a validation rule changes, it can be changed in one place instead of in multiple form actions.

### Clear structure

The factory creates the correct validation chain, and the chain checks the form step by step.

---

## Summary

The validation system helps keep form validation clean and reusable.

The Chain of Responsibility pattern is used to run multiple validation checks in order.

The Factory pattern is used to create the correct validation chain for a content type.

Together, they make it easier to add new forms, new content types and new validation rules without repeating the same code everywhere.
