export async function load({ fetch }) {
	const res = await fetch(
	  'https://fdnd-agency.directus.app/items/adconnect_news'
	);
  
	const json = await res.json();

