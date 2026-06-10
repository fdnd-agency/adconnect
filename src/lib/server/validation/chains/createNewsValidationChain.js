import { AccessTokenHandler } from '$lib/server/validation/handlers/accessTokenHandler.js'
import { RequiredFieldHandler } from '$lib/server/validation/handlers/requiredFieldHandler.js'
import { RequiredFileHandler } from '$lib/server/validation/handlers/requiredFileHandler.js'
import { RequiredArrayHandler } from '$lib/server/validation/handlers/requiredArrayHandler.js'

/**
 * Builds the validation chain for a news article.
 *
 * @param {object} options - Options for the validation chain.
 * @param {string} options.mode - 'create' or 'update'.
 * @param {string} options.message - Message used when the token is missing.
 * @returns {AccessTokenHandler} The first handler in the chain.
 */
export function createNewsValidationChain({ mode = 'create', message }) {
	const validator = new AccessTokenHandler(message)

	// Order matches the form fields, so the user sees one error at a time.
	let lastHandler = validator.setNext(new RequiredFieldHandler('title', 'Vul een titel in.')).setNext(new RequiredFieldHandler('description', 'Vul een omschrijving in.'))

	// The hero image sits between the description and the date in the form, so
	// it is only linked here when creating (an edit keeps the existing image).
	if (mode === 'create') {
		lastHandler = lastHandler.setNext(new RequiredFileHandler('image', 'Upload een afbeelding.'))
	}

	lastHandler
		.setNext(new RequiredFieldHandler('date', 'Vul een datum in.'))
		.setNext(new RequiredFieldHandler('author', 'Vul een auteur in.'))
		.setNext(new RequiredArrayHandler('tags', 'Vul tags in.'))
		.setNext(new RequiredFieldHandler('body', 'Vul de body in.'))

	return validator
}
