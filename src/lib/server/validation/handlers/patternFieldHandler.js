import { ValidationHandler } from '$lib/server/validation/handlers/validationHandler.js'

// Rejects the request with a 400 when a text field does not match a pattern.
// Assumes a RequiredFieldHandler already checked that the field is filled in,
// so this handler only cares about the format (e.g. a valid URL).
export class PatternFieldHandler extends ValidationHandler {
	#field
	#pattern
	#message

	constructor(field, pattern, message) {
		super()
		this.#field = field
		this.#pattern = pattern
		this.#message = message
	}

	handle(request) {
		const value = String(request[this.#field] ?? '').trim()

		if (!this.#pattern.test(value)) {
			return { status: 400, message: this.#message }
		}

		return super.handle(request)
	}
}
