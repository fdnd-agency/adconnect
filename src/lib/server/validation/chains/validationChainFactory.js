import { createDocumentValidationChain } from '$lib/server/validation/chains/createDocumentValidationChain.js'

/**
 * Simple Factory: one central entry point that returns the validation chain
 * for a given content type. It delegates the actual building to the per-type
 * `createXxxValidationChain()` functions.
 *
 * Adding a content type later means: write its chain factory and add one case.
 */
export class ValidationChainFactory {
	static create(contentType, options = {}) {
		switch (contentType) {
			case 'document':
				return createDocumentValidationChain(options)

			default:
				throw new Error(`Geen validatie-chain gevonden voor contenttype: ${contentType}`)
		}
	}
}
