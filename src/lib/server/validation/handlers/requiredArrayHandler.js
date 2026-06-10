import { ValidationHandler } from '$lib/server/validation/handlers/validationHandler.js'

// Rejects the request with a 400 when a required list is missing or empty.
// Used for fields that hold an array, like news tags or selected ids.
export class RequiredArrayHandler extends ValidationHandler {
	#field
	#message

	constructor(field, message) {
		super()
		this.#field = field
		this.#message = message
	}

	handle(request) {
		const value = request[this.#field]

		if (!Array.isArray(value) || value.length === 0) {
			return { status: 400, message: this.#message }
		}

		return super.handle(request)
	}
}
