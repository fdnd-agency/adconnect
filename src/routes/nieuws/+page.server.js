export async function load({ fetch }) {
	const res = await fetch(
	  'https://fdnd-agency.directus.app/items/adconnect_news'
	);
  
	const json = await res.json();

const sortedNews = [...json.data].sort(
	(a, b) => new Date(b.date) - new Date(a.date)
  );
  
  return {
	news: sortedNews,
	latest3: sortedNews.slice(0, 3),
	latest9: sortedNews.slice(0, 9)
  };
}