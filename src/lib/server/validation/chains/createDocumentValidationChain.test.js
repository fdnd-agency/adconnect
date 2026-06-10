import { describe, it, expect } from 'vitest'
import { createDocumentValidationChain } from '$lib/server/validation/chains/createDocumentValidationChain.js'

// Generic error the factory uses for the missing-token (403) case.
const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van het document.'

// A request that fills in every required field, so it passes the whole chain.
function validRequest() {
	return {
		token: 'token-123',
		title: 'Geldige titel',
		description: 'Geldige omschrijving',
		date: '2026-03-18',
		category: 'cat-1',
		image: new File(['img'], 'cover.png', { type: 'image/png' }),
		source_file: new File(['pdf'], 'bron.pdf', { type: 'application/pdf' })
	}
}

describe('createDocumentValidationChain', () => {
	it('returns null when every rule passes', () => {
		const validator = createDocumentValidationChain(GENERIC_CREATE_ERROR)
		expect(validator.handle(validRequest())).toBe(null)
	})

	it('checks the token first and returns a 403 with the generic error', () => {
		// Token missing AND title empty: the token rule runs first, so 403 wins.
		const request = { ...validRequest(), token: null, title: '' }
		const validator = createDocumentValidationChain(GENERIC_CREATE_ERROR)
		expect(validator.handle(request)).toEqual({ status: 403, message: GENERIC_CREATE_ERROR })
	})

	it('reports the first empty text field in chain order', () => {
		// Title is valid but description is empty, so the description rule fires.
		const request = { ...validRequest(), description: '' }
		const validator = createDocumentValidationChain(GENERIC_CREATE_ERROR)
		expect(validator.handle(request)).toEqual({ status: 400, message: 'Vul een omschrijving in.' })
	})

	it('validates the files after the text fields', () => {
		const request = { ...validRequest(), image: undefined }
		const validator = createDocumentValidationChain(GENERIC_CREATE_ERROR)
		expect(validator.handle(request)).toEqual({ status: 400, message: 'Upload een afbeelding.' })
	})

	it('rejects a missing source file last', () => {
		const request = { ...validRequest(), source_file: undefined }
		const validator = createDocumentValidationChain(GENERIC_CREATE_ERROR)
		expect(validator.handle(request)).toEqual({ status: 400, message: 'Upload een bronbestand.' })
	})
})
