export async function load({ url }) {
  // Data from Directus API
  const baseUrl = "https://fdnd-agency.directus.app/items/";
  const fields = "?fields=title,description,date_updated,uuid,hero";
  const cooperationEndpoint = "adconnect_cooperation";
  const fieldsCooperation = "?fields=url,name,logo";

  // Convert data to json
  const newsResponse = await fetch(baseUrl + "adconnect_news" + fields);
  const newsData = await newsResponse.json();
  const cooperationResponse = await fetch(baseUrl + cooperationEndpoint + fieldsCooperation);
  const cooperationData = await cooperationResponse.json();

  return {
    news: newsData.data,
    cooperation: cooperationData.data,
  };
}
