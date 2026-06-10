import { AccessTokenHandler } from '$lib/server/validation/handlers/accessTokenHandler.js'
import { RequiredFieldHandler } from '$lib/server/validation/handlers/requiredFieldHandler.js'
import { RequiredArrayHandler } from '$lib/server/validation/handlers/requiredArrayHandler.js'

/**
 * Builds the validation chain for a Lado. A Lado mixes simple presence checks
 * with integer/business rules (valid course ids, a valid board, a valid parent
 * and the edit-only self-parent rule). Only the leading run of presence checks
 * lives in the chain; the route keeps the integer/business rules inline so the
 * exact error order stays intact. Lados have no files, so the mode is unused.
 *
 * @param {object} options - Options for the validation chain.
 * @param {string} options.message - Message used when the token is missing.
 * @returns {AccessTokenHandler} The first handler in the chain.
 */
export function createLadoValidationChain({ message }) {
	const validator = new AccessTokenHandler(message)

	// Order matches the leading form fields, so the user sees one error at a time.
	validator
		.setNext(new RequiredFieldHandler('title', 'Vul een naam in.'))
		.setNext(new RequiredArrayHandler('contactPersons', 'Vul een contactpersoon in.'))
		.setNext(new RequiredFieldHandler('nationalAdProfile', 'Vul een nationaal ad-profiel in.'))
		.setNext(new RequiredFieldHandler('ladoStatus', 'Vul een lado status in.'))
		.setNext(new RequiredArrayHandler('courseIds', 'Kies minimaal één opleiding.'))

	return validator
}
