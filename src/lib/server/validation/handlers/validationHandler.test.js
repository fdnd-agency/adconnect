import { describe, it, expect } from 'vitest'
import { ValidationHandler } from '$lib/server/validation/handlers/validationHandler.js'
import { AccessTokenHandler } from '$lib/server/validation/handlers/accessTokenHandler.js'
import { RequiredFieldHandler } from '$lib/server/validation/handlers/requiredFieldHandler.js'
import { RequiredFileHandler } from '$lib/server/validation/handlers/requiredFileHandler.js'

describe('ValidationHandler (base handler)', () => {
	it('returns null when it is the last link and nothing rejects the request', () => {
		// A lone base handler has no next link, so it always accepts.
		const handler = new ValidationHandler()
		expect(handler.handle({})).toBe(null)
	})

	it('setNext returns the linked handler so chains can be built fluently', () => {
		const first = new ValidationHandler()
		const second = new ValidationHandler()
		// The return value must be the handler that was just linked.
		expect(first.setNext(second)).toBe(second)
	})

	it('forwards the request to the next handler', () => {
		const first = new ValidationHandler()
		// The next handler always rejects, proving the request was forwarded.
		first.setNext(new RequiredFieldHandler('title', 'Vul een titel in.'))
		expect(first.handle({ title: '' })).toEqual({ status: 400, message: 'Vul een titel in.' })
	})
})

describe('AccessTokenHandler', () => {
	it('rejects with status 403 when the token is missing', () => {
		const handler = new AccessTokenHandler('Niet toegestaan.')
		expect(handler.handle({ token: null })).toEqual({ status: 403, message: 'Niet toegestaan.' })
	})

	it('passes the request along when a token is present', () => {
		// With no next handler a passing check returns null (end of chain).
		const handler = new AccessTokenHandler('Niet toegestaan.')
		expect(handler.handle({ token: 'token-123' })).toBe(null)
	})
})

describe('RequiredFieldHandler', () => {
	it('rejects with status 400 when the field is empty', () => {
		const handler = new RequiredFieldHandler('title', 'Vul een titel in.')
		expect(handler.handle({ title: '' })).toEqual({ status: 400, message: 'Vul een titel in.' })
	})

	it('treats whitespace-only values as empty', () => {
		const handler = new RequiredFieldHandler('title', 'Vul een titel in.')
		expect(handler.handle({ title: '   ' })).toEqual({ status: 400, message: 'Vul een titel in.' })
	})

	it('rejects when the field is missing entirely', () => {
		const handler = new RequiredFieldHandler('title', 'Vul een titel in.')
		expect(handler.handle({})).toEqual({ status: 400, message: 'Vul een titel in.' })
	})

	it('passes when the field is filled in', () => {
		const handler = new RequiredFieldHandler('title', 'Vul een titel in.')
		expect(handler.handle({ title: 'Hallo' })).toBe(null)
	})
})

describe('RequiredFileHandler', () => {
	it('rejects with status 400 when the value is not a File', () => {
		const handler = new RequiredFileHandler('image', 'Upload een afbeelding.')
		expect(handler.handle({ image: 'not-a-file' })).toEqual({ status: 400, message: 'Upload een afbeelding.' })
	})

	it('rejects an empty file (size 0)', () => {
		const handler = new RequiredFileHandler('image', 'Upload een afbeelding.')
		const emptyFile = new File([], 'empty.png', { type: 'image/png' })
		expect(handler.handle({ image: emptyFile })).toEqual({ status: 400, message: 'Upload een afbeelding.' })
	})

	it('passes for a real, non-empty file', () => {
		const handler = new RequiredFileHandler('image', 'Upload een afbeelding.')
		const file = new File(['data'], 'cover.png', { type: 'image/png' })
		expect(handler.handle({ image: file })).toBe(null)
	})
})
