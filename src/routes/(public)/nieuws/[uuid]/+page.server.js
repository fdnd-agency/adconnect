import { error } from '@sveltejs/kit'

export async function load({ params, fetch }) {
	const res = await fetch(`https://fdnd-agency.directus.app/items/adconnect_news?filter[uuid][_eq]=${params.uuid}`)

	const json = await res.json()

	if (!json.data || json.data.length === 0) {
		throw error(404, 'Nieuwsartikel niet gevonden')
	}

	return {
		news: json.data
	}
}
