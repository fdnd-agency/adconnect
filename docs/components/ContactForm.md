# ContactForm.svelte Component Documentation
## Overview
The ContactForm is a component containing all input fields for users to send a question to the client: name, email, and question.  
This is a standalone component, meaning it handles its own loading, error, and success states

## Component Structure
### JavaScript
```svelte
<script>
	import { enhance } from '$app/forms'
	import { ErrorState, SuccesState, LoadingState } from '$lib'

	// Variable to check the status of the form
	let status = $state('')

	function formSubmit() {
		status = 'submitting'

		return async ({ result, update }) => {
			if (result.type === 'success') {
				status = 'success'
			} else if (result.type === 'failure') {
				status = 'error'
			}

			await update()
		}
	}
</script>
```
- state components are imported
- A status variable is updated depending on what is happening with the form data
  - submit = submitting after clicking the submit button, starting the loading animation
  - if `+page.server.js` sends an update, the state variable changes to success or error, triggering the respective state components


### HTML
```svelte
<form
	class="contact-form"
	method="POST"
    action='?/contactSubmit'
	use:enhance={formSubmit}
>
```
`use:enhance` prevents the page from reloading after form submission, and sends the form data to the `+page.server.js` of the contact page.  
The `contactSubmit` action only exists on that page, which is why this form will work on the route `(public)/contact/+page.svelte`  
>If you want to reuse this component in the future, you should make the action dynamic by passing it into the component via props, and create a unique action in the `new +page.server.js` file.


### Usage Examples
```svelte
<ContactForm />


```

