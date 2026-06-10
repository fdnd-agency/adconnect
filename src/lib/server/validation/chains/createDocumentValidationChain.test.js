import { describe, it, expect } from 'vitest'
import { createDocumentValidationChain } from '$lib/server/validation/chains/createDocumentValidationChain.js'

const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van het document.'
const GENERIC_UPDATE_ERROR = 'Er is iets misgegaan bij het bijwerken van het document.'

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

describe('createDocumentValidationChain - create mode', () => {
	it('returns null when every rule passes', () => {
		const validator = createDocumentValidationChain({ mode: 'create', message: GENERIC_CREATE_ERROR })
		expect(validator.handle(validRequest())).toBe(null)
	})

	it('checks the token first and returns a 403 with the given message', () => {
		// Token missing AND title empty: the token rule runs first, so 403 wins.
		const request = { ...validRequest(), token: null, title: '' }
		const validator = createDocumentValidationChain({ mode: 'create', message: GENERIC_CREATE_ERROR })
		expect(validator.handle(request)).toEqual({ status: 403, message: GENERIC_CREATE_ERROR })
	})

	it('reports the first empty text field in chain order', () => {
		// Title is valid but description is empty, so the description rule fires.
		const request = { ...validRequest(), description: '' }
		const validator = createDocumentValidationChain({ mode: 'create', message: GENERIC_CREATE_ERROR })
		expect(validator.handle(request)).toEqual({ status: 400, message: 'Vul een omschrijving in.' })
	})

	it('requires the image after the text fields', () => {
		const request = { ...validRequest(), image: undefined }
		const validator = createDocumentValidationChain({ mode: 'create', message: GENERIC_CREATE_ERROR })
		expect(validator.handle(request)).toEqual({ status: 400, message: 'Upload een afbeelding.' })
	})

	it('requires the source file last', () => {
		const request = { ...validRequest(), source_file: undefined }
		const validator = createDocumentValidationChain({ mode: 'create', message: GENERIC_CREATE_ERROR })
		expect(validator.handle(request)).toEqual({ status: 400, message: 'Upload een bronbestand.' })
	})

	it('defaults to create mode when no mode is given', () => {
		// Without an explicit mode the files must still be required.
		const request = { ...validRequest(), image: undefined }
		const validator = createDocumentValidationChain({ message: GENERIC_CREATE_ERROR })
		expect(validator.handle(request)).toEqual({ status: 400, message: 'Upload een afbeelding.' })
	})
})

describe('createDocumentValidationChain - update mode', () => {
	it('does not require files, so an edit without new uploads passes', () => {
		// In update mode existing files are kept, so missing uploads are fine.
		const request = { ...validRequest(), image: undefined, source_file: undefined }
		const validator = createDocumentValidationChain({ mode: 'update', message: GENERIC_UPDATE_ERROR })
		expect(validator.handle(request)).toBe(null)
	})

	it('still validates the token and the text fields', () => {
		const validator = createDocumentValidationChain({ mode: 'update', message: GENERIC_UPDATE_ERROR })
		expect(validator.handle({ ...validRequest(), token: null })).toEqual({ status: 403, message: GENERIC_UPDATE_ERROR })
		expect(validator.handle({ ...validRequest(), title: '' })).toEqual({ status: 400, message: 'Vul een titel in.' })
	})
})
