import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const res = await fetch(
		`https://fdnd-agency.directus.app/items/adconnect_nominations`
	);

	const json = await res.json();

	if (!json.data || json.data.length === 0) {
		throw error(404, 'Talent en Nominaties niet gevonden');
	}

	return {
		nomination: json.data
	};
}


