export async function load({ params }) {
    const { slug } = params;

    // Data from Directus API
    const baseUrl = "https://fdnd-agency.directus.app/items/";
    const themeEndpoint = "adconnect_themes";
    const fields = "&fields=title,description,hero,slug,body";
    const filter = `?filter[slug][_eq]=${slug}`;

    // Convert data to json
    const themeResponse = await fetch(`${baseUrl}${themeEndpoint}${filter}${fields}`);
    const themeData = await themeResponse.json();

    return {
        theme: themeData.data,
    };
}