import { AccessTokenHandler } from '$lib/server/validation/handlers/accessTokenHandler.js'
import { RequiredFieldHandler } from '$lib/server/validation/handlers/requiredFieldHandler.js'
import { RequiredFileHandler } from '$lib/server/validation/handlers/requiredFileHandler.js'
import { PatternFieldHandler } from '$lib/server/validation/handlers/patternFieldHandler.js'

// Same URL check the route used before: must start with http:// or https://.
const URL_PATTERN = /^https?:\/\/[^\s/$.?#].[^\s]*$/i

/**
 * Builds the validation chain for a cooperation.
 *
 * @param {object} options - Options for the validation chain.
 * @param {string} options.mode - 'create' or 'update'.
 * @param {string} options.message - Message used when the token is missing.
 * @returns {AccessTokenHandler} The first handler in the chain.
 */
export function createCooperationValidationChain({ mode = 'create', message }) {
	const validator = new AccessTokenHandler(message)

	// First check the URL is filled in, then check it has a valid format.
	const lastHandler = validator
		.setNext(new RequiredFieldHandler('name', 'Vul een naam in.'))
		.setNext(new RequiredFieldHandler('url', 'Vul een URL in.'))
		.setNext(new PatternFieldHandler('url', URL_PATTERN, 'Vul een geldige URL in (http:// of https://).'))

	// The logo is only required when creating; an edit keeps the existing one.
	if (mode === 'create') {
		lastHandler.setNext(new RequiredFileHandler('logo', 'Upload een logo.'))
	}

	return validator
}
