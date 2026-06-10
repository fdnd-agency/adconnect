import { describe, it, expect } from 'vitest'
import { ValidationChainFactory } from '$lib/server/validation/chains/validationChainFactory.js'

const GENERIC_CREATE_ERROR = 'Er is iets misgegaan bij het opslaan van het document.'

describe('ValidationChainFactory', () => {
	it('returns a working chain for the document content type', () => {
		const validator = ValidationChainFactory.create('document', GENERIC_CREATE_ERROR)

		// A fully valid request should pass the whole chain (null = no error).
		const request = {
			token: 'token-123',
			title: 'Geldige titel',
			description: 'Geldige omschrijving',
			date: '2026-03-18',
			category: 'cat-1',
			image: new File(['img'], 'cover.png', { type: 'image/png' }),
			source_file: new File(['pdf'], 'bron.pdf', { type: 'application/pdf' })
		}
		expect(validator.handle(request)).toBe(null)
	})

	it('passes the generic error through to the token rule (403)', () => {
		const validator = ValidationChainFactory.create('document', GENERIC_CREATE_ERROR)
		expect(validator.handle({ token: null })).toEqual({ status: 403, message: GENERIC_CREATE_ERROR })
	})

	it('throws for an unknown content type', () => {
		expect(() => ValidationChainFactory.create('unknown', GENERIC_CREATE_ERROR)).toThrow('Geen validatie-chain gevonden voor contenttype: unknown')
	})
})
