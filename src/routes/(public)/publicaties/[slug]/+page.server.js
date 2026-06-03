import { ContentService } from '$lib/server/contentService.js'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
	const fields = 'title,id,description,slug,hero_image,source_file,category.*,date'
	const filter = { slug: { _eq: params.slug } }

	const response = await ContentService.fetchContent('documents', null, fields, filter, false)
	const document = Array.from(response.data.documents?.values?.() ?? [])[0]

	if (!document) throw error(404, 'Publicatie niet gevonden')

	return { document }
}
