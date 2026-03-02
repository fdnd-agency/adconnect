import { error } from '@sveltejs/kit'

import { DIRECTUS_URL } from '$lib/server/directus.js'

export async function load({ params, fetch }) {
	const res = await fetch(`${DIRECTUS_URL}/items/adconnect_news?filter[uuid][_eq]=${params.uuid}`)

	const json = await res.json()

	if (!json.data || json.data.length === 0) {
		throw error(404, 'Nieuwsartikel niet gevonden')
	}

	return {
		news: json.data
	}
}
