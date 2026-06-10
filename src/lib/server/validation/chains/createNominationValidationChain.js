import { AccessTokenHandler } from '$lib/server/validation/handlers/accessTokenHandler.js'
import { RequiredFieldHandler } from '$lib/server/validation/handlers/requiredFieldHandler.js'
import { RequiredFileHandler } from '$lib/server/validation/handlers/requiredFileHandler.js'

/**
 * Builds the validation chain for a nomination.
 *
 * @param {object} options - Options for the validation chain.
 * @param {string} options.mode - 'create' or 'update'.
 * @param {string} options.message - Message used when the token is missing.
 * @returns {AccessTokenHandler} The first handler in the chain.
 */
export function createNominationValidationChain({ mode = 'create', message }) {
	const validator = new AccessTokenHandler(message)

	// Order matches the form fields, so the user sees one error at a time.
	const lastHandler = validator
		.setNext(new RequiredFieldHandler('title', 'Vul een titel in.'))
		.setNext(new RequiredFieldHandler('header', 'Vul een header in.'))
		.setNext(new RequiredFieldHandler('date', 'Vul een datum in.'))
		.setNext(new RequiredFieldHandler('excerpt', 'Vul een samenvatting in.'))
		.setNext(new RequiredFieldHandler('body', 'Vul de body in.'))
		.setNext(new RequiredFieldHandler('event_id', 'Kies een event.'))
		.setNext(new RequiredFieldHandler('institution', 'Vul een instelling in.'))
		.setNext(new RequiredFieldHandler('course', 'Vul een opleiding in.'))
		.setNext(new RequiredFieldHandler('previous_course', 'Vul een vorige opleiding in.'))
		.setNext(new RequiredFieldHandler('education_variant', 'Vul een onderwijsvariant in.'))
		.setNext(new RequiredFieldHandler('alumnus', 'Vul alumnis in.'))

	// The profile picture is only required when creating; an edit keeps it.
	if (mode === 'create') {
		lastHandler.setNext(new RequiredFileHandler('profile_picture', 'Upload een profielfoto.'))
	}

	return validator
}
