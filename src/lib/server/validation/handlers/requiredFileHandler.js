import { ValidationHandler } from '$lib/server/validation/handlers/validationHandler.js'

// Rejects the request with a 400 when a required upload is missing or empty.
// Reused per file field by passing a different field name and message.
export class RequiredFileHandler extends ValidationHandler {
	#field
	#message

	constructor(field, message) {
		super()
		this.#field = field
		this.#message = message
	}

	handle(request) {
		const file = request[this.#field]

		// Only a real, non-empty File passes. (`File` is global on the server.)
		if (!(file instanceof File) || file.size === 0) {
			return { status: 400, message: this.#message }
		}

		return super.handle(request)
	}
}
