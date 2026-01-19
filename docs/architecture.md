## Architecture

### Overview

The website is built with SvelteKit and the content comes from Directus, a headless CMS. The website fetches the content through an API and displays it to the user.

This setup keeps the project clear and makes it easier to maintain and update.

### Global architecture

The project consists of 3 parts:

1. Frontend (SvelteKit). It handles the layout, pages, and user interaction.
2. CMS (Directus). This is where all content is managed such as text, images, and news items.
3. API. The API is used to send data from the CMS to the frontend.

### Frontend (SvelteKit)

SvelteKit uses a folder based routing system. Each folder inside src/routes represents a page on the website.

Each page usually contains:
- `+page.svelte` -> what the user sees  
- `+page.server.js` -> where the data is fetched from the CMS  

Data is fetched inside the +page.server.js files. A request is sent to the Directus API to get the needed content. The fetched data is then passed to Svelte components to build the page.

### CMS (Directus)

Directus is used as a headless CMS. This means it does not show a website itself but only provides content. This content is stored in a database and made available through the API.

[Link to the admin of Directus database](https://fdnd-agency.directus.app/admin/login)

View - [CMS](https://github.com/fdnd-agency/adconnect/blob/dev/docs/cms.md)
 more information about the CMS

### Hosting

The website is hosted on Netlify.

- The code is stored on GitHub  
- When changes are pushed, a new build is triggered automatically  
- Netlify deploys the website  
