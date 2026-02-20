import { error } from '@sveltejs/kit'
import { DIRECTUS_URL } from '$lib/server/directus.js'

export async function load({ fetch }) {
	const res = await fetch(`${DIRECTUS_URL}/items/adconnect_nominations`)

	const json = await res.json()

	if (!json.data || json.data.length === 0) {
		throw error(404, 'Talent en Nominaties niet gevonden')
	}

	return {
		nomination: json.data
	}
}
