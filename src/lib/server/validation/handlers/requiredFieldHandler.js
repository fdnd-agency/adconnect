import { ValidationHandler } from '$lib/server/validation/handlers/validationHandler.js'

// Rejects the request with a 400 when a required text field is empty.
// Reused per field by passing a different field name and message.
export class RequiredFieldHandler extends ValidationHandler {
	#field
	#message

	constructor(field, message) {
		super()
		this.#field = field
		this.#message = message
	}

	handle(request) {
		const value = String(request[this.#field] ?? '').trim()

		if (!value) {
			return { status: 400, message: this.#message }
		}

		return super.handle(request)
	}
}
