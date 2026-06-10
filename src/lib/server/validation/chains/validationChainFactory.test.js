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

	it('returns a news chain that requires tags and the hero image (create)', () => {
		const validator = ValidationChainFactory.create('news', { mode: 'create', message: GENERIC_CREATE_ERROR })
		const valid = {
			token: 'token-123',
			title: 'Titel',
			description: 'Omschrijving',
			image: new File(['img'], 'cover.png', { type: 'image/png' }),
			date: '2026-03-18',
			author: 'Auteur',
			tags: ['nieuws'],
			body: 'Body'
		}

		expect(validator.handle(valid)).toBe(null)
		expect(validator.handle({ ...valid, tags: [] })).toEqual({ status: 400, message: 'Vul tags in.' })
		expect(validator.handle({ ...valid, image: undefined })).toEqual({ status: 400, message: 'Upload een afbeelding.' })
	})

	it('returns a news update chain that keeps the existing image', () => {
		const validator = ValidationChainFactory.create('news', { mode: 'update', message: GENERIC_UPDATE_ERROR })
		expect(validator.handle({ token: 'token-123', title: 'Titel', description: 'Omschrijving', date: '2026-03-18', author: 'Auteur', tags: ['nieuws'], body: 'Body' })).toBe(null)
	})

	it('returns an event chain that requires the image only on create', () => {
		const valid = {
			token: 'token-123',
			title: 'Titel',
			description: 'Omschrijving',
			date: '2026-03-18',
			time_duration: '2 uur',
			excerpt: 'Samenvatting',
			body: 'Body',
			image: new File(['img'], 'cover.png', { type: 'image/png' })
		}

		expect(ValidationChainFactory.create('event', { mode: 'create', message: GENERIC_CREATE_ERROR }).handle(valid)).toBe(null)
		expect(ValidationChainFactory.create('event', { mode: 'create', message: GENERIC_CREATE_ERROR }).handle({ ...valid, image: undefined })).toEqual({ status: 400, message: 'Upload een afbeelding.' })
		expect(ValidationChainFactory.create('event', { mode: 'update', message: GENERIC_UPDATE_ERROR }).handle({ ...valid, image: undefined })).toBe(null)
	})

	it('returns a faq chain that only needs a question and answer', () => {
		const validator = ValidationChainFactory.create('faq', { mode: 'create', message: GENERIC_CREATE_ERROR })
		expect(validator.handle({ token: 'token-123', question: 'Vraag?', answer: 'Antwoord' })).toBe(null)
		expect(validator.handle({ token: 'token-123', question: '', answer: 'Antwoord' })).toEqual({ status: 400, message: 'Vul een vraag in.' })
	})

	it('returns a theme chain that requires the image only on create', () => {
		const valid = {
			token: 'token-123',
			title: 'Titel',
			description: 'Omschrijving',
			date: '2026-03-18',
			excerpt: 'Samenvatting',
			body: 'Body',
			image: new File(['img'], 'cover.png', { type: 'image/png' })
		}

		expect(ValidationChainFactory.create('theme', { mode: 'create', message: GENERIC_CREATE_ERROR }).handle(valid)).toBe(null)
		expect(ValidationChainFactory.create('theme', { mode: 'create', message: GENERIC_CREATE_ERROR }).handle({ ...valid, image: undefined })).toEqual({ status: 400, message: 'Upload een afbeelding.' })
		expect(ValidationChainFactory.create('theme', { mode: 'update', message: GENERIC_UPDATE_ERROR }).handle({ ...valid, image: undefined })).toBe(null)
	})

	it('returns a cooperation chain that validates the url format and logo', () => {
		const valid = {
			token: 'token-123',
			name: 'Naam',
			url: 'https://example.com',
			logo: new File(['img'], 'logo.png', { type: 'image/png' })
		}

		expect(ValidationChainFactory.create('cooperation', { mode: 'create', message: GENERIC_CREATE_ERROR }).handle(valid)).toBe(null)
		expect(ValidationChainFactory.create('cooperation', { mode: 'create', message: GENERIC_CREATE_ERROR }).handle({ ...valid, url: 'geen-url' })).toEqual({
			status: 400,
			message: 'Vul een geldige URL in (http:// of https://).'
		})
		expect(ValidationChainFactory.create('cooperation', { mode: 'create', message: GENERIC_CREATE_ERROR }).handle({ ...valid, logo: undefined })).toEqual({ status: 400, message: 'Upload een logo.' })
		expect(ValidationChainFactory.create('cooperation', { mode: 'update', message: GENERIC_UPDATE_ERROR }).handle({ ...valid, logo: undefined })).toBe(null)
	})

	it('returns a nomination chain that requires the profile picture only on create', () => {
		const valid = {
			token: 'token-123',
			title: 'Titel',
			header: 'Header',
			date: '2026-03-18',
			excerpt: 'Samenvatting',
			body: 'Body',
			event_id: 'event-1',
			institution: 'Instelling',
			course: 'Opleiding',
			previous_course: 'Vorige opleiding',
			education_variant: 'Variant',
			alumnus: 'Alumnus',
			profile_picture: new File(['img'], 'foto.png', { type: 'image/png' })
		}

		expect(ValidationChainFactory.create('nomination', { mode: 'create', message: GENERIC_CREATE_ERROR }).handle(valid)).toBe(null)
		expect(ValidationChainFactory.create('nomination', { mode: 'create', message: GENERIC_CREATE_ERROR }).handle({ ...valid, profile_picture: undefined })).toEqual({
			status: 400,
			message: 'Upload een profielfoto.'
		})
		expect(ValidationChainFactory.create('nomination', { mode: 'update', message: GENERIC_UPDATE_ERROR }).handle({ ...valid, profile_picture: undefined })).toBe(null)
	})

	it('returns a course chain that only needs a title', () => {
		const validator = ValidationChainFactory.create('course', { mode: 'create', message: GENERIC_CREATE_ERROR })
		expect(validator.handle({ token: 'token-123', title: 'Titel' })).toBe(null)
		expect(validator.handle({ token: 'token-123', title: '' })).toEqual({ status: 400, message: 'Vul een titel in.' })
	})

	it('returns a sectoralAdvisoryBoard chain that only needs a title', () => {
		const validator = ValidationChainFactory.create('sectoralAdvisoryBoard', { mode: 'create', message: GENERIC_CREATE_ERROR })
		expect(validator.handle({ token: 'token-123', title: 'Titel' })).toBe(null)
		expect(validator.handle({ token: 'token-123', title: '' })).toEqual({ status: 400, message: 'Vul een titel in.' })
	})

	it('returns a lado chain that covers the leading presence checks', () => {
		const validator = ValidationChainFactory.create('lado', { mode: 'create', message: GENERIC_CREATE_ERROR })
		const valid = {
			token: 'token-123',
			title: 'Bedrijf X',
			contactPersons: ['Persoon 1'],
			nationalAdProfile: 'Nationaal profiel',
			ladoStatus: 'Actief',
			courseIds: ['123']
		}

		// The chain only validates presence; the integer/business rules stay
		// inline in the route, so a request with valid presence passes here.
		expect(validator.handle(valid)).toBe(null)
		expect(validator.handle({ ...valid, contactPersons: [] })).toEqual({ status: 400, message: 'Vul een contactpersoon in.' })
		expect(validator.handle({ ...valid, courseIds: [] })).toEqual({ status: 400, message: 'Kies minimaal één opleiding.' })
		expect(validator.handle({ ...valid, token: null })).toEqual({ status: 403, message: GENERIC_CREATE_ERROR })
	})
})
