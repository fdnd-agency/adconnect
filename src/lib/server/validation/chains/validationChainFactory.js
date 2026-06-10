import { createDocumentValidationChain } from '$lib/server/validation/chains/createDocumentValidationChain.js'

/**
 * Simple Factory: one central entry point that returns the validation chain
 * for a specific content type.
 *
 * Adding a content type later means: write its chain factory and add one case.
 */
export class ValidationChainFactory {
	/**
	 * @param {string} contentType.
	 * @param {string} genericCreateError - Message used for the missing-token (403) case.
	 * @returns {import('$lib/server/validation/handlers/validationHandler.js').ValidationHandler}
	 */
	static create(contentType, genericCreateError) {
		switch (contentType) {
			case 'document':
				return createDocumentValidationChain(genericCreateError)

			default:
				throw new Error(`Geen validatie-chain gevonden voor contenttype: ${contentType}`)
		}
	}
}
