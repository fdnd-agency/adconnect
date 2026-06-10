import { AccessTokenHandler } from '$lib/server/validation/handlers/accessTokenHandler.js'
import { RequiredFieldHandler } from '$lib/server/validation/handlers/requiredFieldHandler.js'
import { RequiredFileHandler } from '$lib/server/validation/handlers/requiredFileHandler.js'

/**
 * Builds the validation chain for a theme.
 *
 * @param {object} options - Options for the validation chain.
 * @param {string} options.mode - 'create' or 'update'.
 * @param {string} options.message - Message used when the token is missing.
 * @returns {AccessTokenHandler} The first handler in the chain.
 */
export function createThemeValidationChain({ mode = 'create', message }) {
	const validator = new AccessTokenHandler(message)

	// Order matches the form fields, so the user sees one error at a time.
	const lastHandler = validator
		.setNext(new RequiredFieldHandler('title', 'Vul een titel in.'))
		.setNext(new RequiredFieldHandler('description', 'Vul een omschrijving in.'))
		.setNext(new RequiredFieldHandler('date', 'Vul een datum in.'))
		.setNext(new RequiredFieldHandler('excerpt', 'Vul een samenvatting in.'))
		.setNext(new RequiredFieldHandler('body', 'Vul de body in.'))

	// The image is only required when creating; an edit keeps the existing one.
	if (mode === 'create') {
		lastHandler.setNext(new RequiredFileHandler('image', 'Upload een afbeelding.'))
	}

	return validator
}
