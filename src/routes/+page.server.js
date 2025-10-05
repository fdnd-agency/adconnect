export async function load({ url }) {
    
    // Data from Directus API
    const baseUrl = "https://fdnd-agency.directus.app/items/adconnect_news";
    const fields = "?fields=title,description,date_updated,uuid";

    // Convert data to json
    const newsResponse = await fetch(baseUrl + fields);
    const newsData = await newsResponse.json();

    console.log(newsData);

    return {
        news: newsData.data,
    };
}