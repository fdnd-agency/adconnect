/**
 * Chain of Responsibility - Base Handler
 *
 * Each handler is one validation rule. A request travels through the chain;
 * the first failing rule returns a `{ status, message }`, otherwise `null`.
 */
export class ValidationHandler {
	// Next handler in the chain, or null at the end.
	#nextHandler = null
	setNext(handler) {
		this.#nextHandler = handler
		return handler
	}

	// Default behaviour: forward to the next handler, or return null at the end.
	handle(request) {
		if (this.#nextHandler) {
			return this.#nextHandler.handle(request)
		}

		return null
	}
}
