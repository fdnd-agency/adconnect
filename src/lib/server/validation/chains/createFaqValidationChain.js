import { AccessTokenHandler } from '$lib/server/validation/handlers/accessTokenHandler.js'
import { RequiredFieldHandler } from '$lib/server/validation/handlers/requiredFieldHandler.js'

/**
 * Builds the validation chain for a faq. Faqs have no files, so the mode is
 * not used here; the option is still accepted to keep the factory uniform.
 *
 * @param {object} options - Options for the validation chain.
 * @param {string} options.message - Message used when the token is missing.
 * @returns {AccessTokenHandler} The first handler in the chain.
 */
export function createFaqValidationChain({ message }) {
	const validator = new AccessTokenHandler(message)

	validator.setNext(new RequiredFieldHandler('question', 'Vul een vraag in.')).setNext(new RequiredFieldHandler('answer', 'Vul een antwoord in.'))

	return validator
}
