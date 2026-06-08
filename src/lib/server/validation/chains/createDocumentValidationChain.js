import { AccessTokenHandler } from '$lib/server/validation/handlers/accessTokenHandler.js'
import { RequiredFieldHandler } from '$lib/server/validation/handlers/requiredFieldHandler.js'
import { RequiredFileHandler } from '$lib/server/validation/handlers/requiredFileHandler.js'

/**
 * Builds the validation chain for creating a document.
 *
 * @param {string} genericCreateError - Message used when the token is missing.
 * @returns {AccessTokenHandler} The first handler in the chain.
 */
export function createDocumentValidationChain(genericCreateError) {
	const validator = new AccessTokenHandler(genericCreateError)

	// Has to be in order of the form fields, so the user sees one error at a time.
	validator
		.setNext(new RequiredFieldHandler('title', 'Vul een titel in.'))
		.setNext(new RequiredFieldHandler('description', 'Vul een omschrijving in.'))
		.setNext(new RequiredFieldHandler('date', 'Vul een datum in.'))
		.setNext(new RequiredFieldHandler('category', 'Kies een categorie.'))
		.setNext(new RequiredFileHandler('image', 'Upload een afbeelding.'))
		.setNext(new RequiredFileHandler('source_file', 'Upload een bronbestand.'))

	return validator
}
