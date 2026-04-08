import { ContentService } from '$lib/server/contentService'
import { error, redirect } from '@sveltejs/kit'

function createE2EPreviewContent(type, id) {
	if (type === 'news') {
		return [
			{
				uuid: id,
				id,
				title: 'E2E Draft Nieuws',
				description: 'Dit is een conceptnieuwsbericht voor end-to-end tests.',
				body: '<p>Preview van conceptcontent.</p>',
				hero: 'e2e-hero-image',
				status: 'draft'
			}
		]
	}

	if (type === 'themes') {
		return [
			{
				id,
				title: 'E2E Thema',
				description: 'Concept thema voor preview-tests.',
				body: '<p>Concept themabody.</p>',
				hero: 'e2e-theme-hero',
				status: 'draft'
			}
		]
	}

	if (type === 'documents') {
		return [
			{
				id,
				title: 'E2E Document',
				description: 'Dit document wordt gebruikt voor preview-tests.',
				hero_image: 'e2e-document-hero',
				source_file: { id: 'e2e-document-file' },
				status: 'draft'
			}
		]
	}

	if (type === 'faqs') {
		return [
			{
				id,
				question: 'E2E FAQ vraag',
				answer: 'E2E FAQ antwoord',
				status: 'draft'
			}
		]
	}

	return null
}

export async function load({ params, cookies, locals }) {
	if (!locals.user) {
		throw redirect(303, '/admin/login')
	}

	if (process.env.E2E_TEST_MODE === '1') {
		const mockContent = createE2EPreviewContent(params.type, params.id)
		if (mockContent) {
			return {
				type: params.type,
				content: mockContent,
				loadError: null
			}
		}
	}

	const fields = params.type === 'documents' ? 'title,id,description,slug,hero_image,source_file.*,date,status' : null
	let response

	try {
		response = await ContentService.fetchContent(params.type, params.id, fields, null, false, cookies.get('access_token'))
	} catch {
		return {
			type: params.type,
			content: [],
			loadError: `Er is een probleem opgetreden bij het ophalen van de ${params.type} preview.`
		}
	}

	const { data, errors } = response
	const content = Array.isArray(data?.[params.type]) ? data[params.type] : []

	if (!content.length) {
		throw error(404, 'Preview item niet gevonden')
	}

	return {
		type: params.type,
		content,
		loadError: errors.length ? `Er is een probleem opgetreden bij het ophalen van de ${params.type} preview.` : null
	}
}
