import { ValidationHandler } from '$lib/server/validation/handlers/validationHandler.js'

// Rejects the request with a 403 when no access token is present.
export class AccessTokenHandler extends ValidationHandler {
	#message

	constructor(message) {
		super()
		this.#message = message
	}

	handle(request) {
		if (!request.token) {
			return { status: 403, message: this.#message }
		}

		return super.handle(request)
	}
}
