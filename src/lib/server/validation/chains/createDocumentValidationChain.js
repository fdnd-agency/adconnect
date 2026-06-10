import { AccessTokenHandler } from '$lib/server/validation/handlers/accessTokenHandler.js'
import { RequiredFieldHandler } from '$lib/server/validation/handlers/requiredFieldHandler.js'
import { RequiredFileHandler } from '$lib/server/validation/handlers/requiredFileHandler.js'

/**
 * Builds the validation chain for creating a document.
 *
 * @param {object} options - Options for the validation chain.
 * @param {string} options.mode - The mode of the validation chain ('create' or 'update').
 * @param {string} options.message - Message used when the token is missing.
 * @returns {AccessTokenHandler} The first handler in the chain.
 */
export function createDocumentValidationChain({ mode = 'create', message }) {
	const validator = new AccessTokenHandler(message)

	// Has to be in order of the form fields, so the user sees one error at a time.
	// setNext() returns the handler you just linked, so lastHandler is the tail of
	// the chain. New rules must be linked to that tail; linking them to `validator`
	// again would overwrite the first link and silently drop the text-field rules.
	const lastHandler = validator
		.setNext(new RequiredFieldHandler('title', 'Vul een titel in.'))
		.setNext(new RequiredFieldHandler('description', 'Vul een omschrijving in.'))
		.setNext(new RequiredFieldHandler('date', 'Vul een datum in.'))
		.setNext(new RequiredFieldHandler('category', 'Kies een categorie.'))

	// Files are only required when creating; an edit keeps the existing files.
	if (mode === 'create') {
		lastHandler.setNext(new RequiredFileHandler('image', 'Upload een afbeelding.')).setNext(new RequiredFileHandler('source_file', 'Upload een bronbestand.'))
	}

	return validator
}
