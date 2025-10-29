export async function load({ url }) {
    
    // Data from Directus API
    const baseUrl = "https://fdnd-agency.directus.app/items/";
    const documentsEndpoint = "adconnect_documents";
    const fields = "?fields=title,id,description,slug,hero_image,source_file,category.*,date";

    // Get the category from string
    const category = url.searchParams.get('category');

    let filter;

    if (category) {
        // Check if the category isn't 'alle-publicaties'
        if (category === 'alle-publicaties' || category === '') {
            // No filter added
            filter = '';
        } else {
            // Choose category, then add parameter 'category=..' in url
            filter = `&filter[category][title][_icontains]=${category}`;

        }
    } else {
        // No category parameter in url
        filter = '';
    }

    // Convert document data (with filter) to json
    const filterUrl = baseUrl + documentsEndpoint + fields + filter;
    const documentsResponse = await fetch(filterUrl);
    const documentsData = await documentsResponse.json();

    // Convert category data to json
    const categoriesResponse = await fetch(baseUrl + "adconnect_categories");
    const categoriesData = await categoriesResponse.json();

    return {
        documents: documentsData.data,
        categories: categoriesData.data,
        selectedCategory: category || 'alle-categories'
    };
}
