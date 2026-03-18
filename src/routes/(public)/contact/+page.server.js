import { fail } from '@sveltejs/kit'
import { ContentService } from '$lib/server/contentService.js'

// Email validation regex
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Form submitting
export const actions = {
	// The default function that is going to run
	default: async ({ request }) => {
		// 'request' contains all the form field data

		// Retrieves the form field data from the 'request'
		const formData = await request.formData()

		// Variables to get the form fields
		const name = formData.get('name')
		const email = formData.get('email')
		const message = formData.get('message')

		// Check if there is an correct email
		if (!regex.test(email)) {
			return fail(400, { error: 'Ongeldig e-mailadres.' })
		}

		try {
			await ContentService.postContact(name, email, message)
			return { success: true }
		} catch (error) {
			// If something goes wrong tell the form it failed
			console.error('Resend error:', error)
			return fail(500, { error: 'Het verzenden is mislukt.' })
		}
	}
}
