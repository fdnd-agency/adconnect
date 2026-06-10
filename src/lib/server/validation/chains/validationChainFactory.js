import { createDocumentValidationChain } from '$lib/server/validation/chains/createDocumentValidationChain.js'
import { createNewsValidationChain } from '$lib/server/validation/chains/createNewsValidationChain.js'
import { createEventValidationChain } from '$lib/server/validation/chains/createEventValidationChain.js'
import { createFaqValidationChain } from '$lib/server/validation/chains/createFaqValidationChain.js'
import { createThemeValidationChain } from '$lib/server/validation/chains/createThemeValidationChain.js'
import { createCooperationValidationChain } from '$lib/server/validation/chains/createCooperationValidationChain.js'
import { createNominationValidationChain } from '$lib/server/validation/chains/createNominationValidationChain.js'
import { createCourseValidationChain } from '$lib/server/validation/chains/createCourseValidationChain.js'
import { createSectoralAdvisoryBoardValidationChain } from '$lib/server/validation/chains/createSectoralAdvisoryBoardValidationChain.js'
import { createLadoValidationChain } from '$lib/server/validation/chains/createLadoValidationChain.js'

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

			case 'news':
				return createNewsValidationChain(options)

			case 'event':
				return createEventValidationChain(options)

			case 'faq':
				return createFaqValidationChain(options)

			case 'theme':
				return createThemeValidationChain(options)

			case 'cooperation':
				return createCooperationValidationChain(options)

			case 'nomination':
				return createNominationValidationChain(options)

			case 'course':
				return createCourseValidationChain(options)

			case 'sectoralAdvisoryBoard':
				return createSectoralAdvisoryBoardValidationChain(options)

			case 'lado':
				return createLadoValidationChain(options)

			default:
				throw new Error(`Geen validatie-chain gevonden voor contenttype: ${contentType}`)
		}
	}
}
