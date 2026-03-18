import { ContentService } from '$lib/server/contentService.js'

export async function load({ url }) {
	// Data from Directus API
	const fields = 'title,id,description,slug,hero_image,source_file,category.*,date'

	// Get the category from string
	const category = url.searchParams.get('category')

	let filter

	if (category) {
		// Check if the category isn't 'alle-publicaties'
		if (category === 'alle-publicaties' || category === '') {
			// No filter added
			filter = null
		} else {
			// Choose category using Directus filter object syntax.
			filter = { category: { title: { _icontains: category } } }
		}
	} else {
		// No category parameter in url
		filter = null
	}

	const documentsResponse = await ContentService.fetchContent('documents', null, fields, filter, false)

	// Convert category data to json
	const categoriesResponse = await ContentService.fetchContent('categories', null, null, null, false)

	return {
		documents: Array.from(documentsResponse.data.documents?.values?.() ?? []),
		categories: Array.from(categoriesResponse.data.categories?.values?.() ?? []),
		selectedCategory: category || 'alle-publicaties'
	}
}
