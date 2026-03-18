import { ContentService } from '$lib/server/contentService.js'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
	const { slug } = params

	// Data from Directus API
	const fields = 'title,id,description,slug,hero_image,source_file.*,date'
	const filter = { slug: { _eq: slug } }

	// Fetch through ContentService and extract the matching document from the returned Map.
	const response = await ContentService.fetchContent('documents', null, fields, filter, false)
	const document = Array.from(response.data.documents?.values?.() ?? [])[0]

	if (!document) {
		throw error(404, 'Publicatie niet gevonden')
	}

	return {
		document
	}
}
