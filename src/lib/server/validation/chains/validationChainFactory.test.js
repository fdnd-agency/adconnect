import { describe, it, expect } from 'vitest'
import { ValidationChainFactory } from '$lib/server/validation/chains/validationChainFactory.js'

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

describe('ValidationChainFactory', () => {
	it('returns a working create chain for the document content type', () => {
		const validator = ValidationChainFactory.create('document', { mode: 'create', message: GENERIC_CREATE_ERROR })

		// A fully valid request passes the whole chain (null = no error).
		expect(validator.handle(validRequest())).toBe(null)

		// In create mode the files are required.
		expect(validator.handle({ ...validRequest(), image: undefined })).toEqual({ status: 400, message: 'Upload een afbeelding.' })
	})

	it('returns an update chain that does not require files', () => {
		const validator = ValidationChainFactory.create('document', { mode: 'update', message: GENERIC_UPDATE_ERROR })

		// An edit without new uploads keeps the existing files, so this passes.
		expect(validator.handle({ ...validRequest(), image: undefined, source_file: undefined })).toBe(null)
	})

	it('passes the message through to the token rule (403)', () => {
		const validator = ValidationChainFactory.create('document', { mode: 'create', message: GENERIC_CREATE_ERROR })
		expect(validator.handle({ token: null })).toEqual({ status: 403, message: GENERIC_CREATE_ERROR })
	})

	it('throws for an unknown content type', () => {
		expect(() => ValidationChainFactory.create('unknown', { mode: 'create', message: GENERIC_CREATE_ERROR })).toThrow('Geen validatie-chain gevonden voor contenttype: unknown')
	})
})
