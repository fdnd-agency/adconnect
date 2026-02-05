export async function load({ params }) {
	const { slug } = params

	// Data from Directus API
	const baseUrl = 'https://fdnd-agency.directus.app/items/'
	const documentEndpoint = 'adconnect_documents'
	const fields = 'fields=title,id,description,slug,hero_image,source_file.*,date'
	const filter = `?filter[slug][_eq]=${slug}`

	// Convert data to json
	const documentResponse = await fetch(`${baseUrl}${documentEndpoint}${filter}&${fields}`)
	const documentData = await documentResponse.json()

	return {
		document: documentData.data[0]
	}
}
