import { AccessTokenHandler } from '$lib/server/validation/handlers/accessTokenHandler.js'
import { RequiredFieldHandler } from '$lib/server/validation/handlers/requiredFieldHandler.js'

/**
 * Builds the validation chain for a sectoral advisory board. Only a title is
 * required, so the mode is not used; the option is still accepted to keep the
 * factory uniform.
 *
 * @param {object} options - Options for the validation chain.
 * @param {string} options.message - Message used when the token is missing.
 * @returns {AccessTokenHandler} The first handler in the chain.
 */
export function createSectoralAdvisoryBoardValidationChain({ message }) {
	const validator = new AccessTokenHandler(message)

	validator.setNext(new RequiredFieldHandler('title', 'Vul een titel in.'))

	return validator
}
