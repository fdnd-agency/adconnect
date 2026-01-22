## CMS

### Overview

This project uses Directus as a headless CMS. Directus is used to manage all the content that appears on the website like text, images, news items, and page sections. Directus does not show a website itself. It only stores content and makes it available through an API. The SvelteKit front-end fetches this content and displays it to the user.

### Links API endpoints
- [Cooperation](https://fdnd-agency.directus.app/items/adconnect_cooperation)
- [Documents](https://fdnd-agency.directus.app/items/adconnect_documents)
- [Events](https://fdnd-agency.directus.app/items/adconnect_events)
- [News](https://fdnd-agency.directus.app/items/adconnect_news)
- [Nominations](https://fdnd-agency.directus.app/items/adconnect_nominations)
- [Themes](https://fdnd-agency.directus.app/items/adconnect_themes)
- [Categories (documents)](https://fdnd-agency.directus.app/items/adconnect_categories)
- [Contact](https://fdnd-agency.directus.app/items/adconnect_contact)

Each content type has its own fields and settings. These fields define what content editors can fill in.

### How content is stored

Directus stores content in a database. Each content type is saved in a table. Each table has fields (columns) and items (rows).

Example:

- Table: news
  - Fields: title, body, date, image
  - Each item is a news article

### API access

The SvelteKit frontend fetches content from Directus using the API.

The API is accessed through a base URL (example):

https://fdnd-agency.directus.app/items/adconnect_'endpoint'

### Contact form [(Resend)](https://resend.com/)

The contact form does not send messages through Directus.  
Instead it sends the form data as an email using Resend.

The contact form also stores submitted messages in the Directus database, in the `adconnect_contact` collection.

- Resend is used to send the email.
- The API key is stored in the environment file.
- There is an `example.env` file that shows which variables need to be added.

Important notes:
- You need to import Resend in the code where the form is handled.
- The API key should never be pushed to GitHub.

Example environment variables (from example.env):
- RESEND_API_KEY

This setup ensures that form messages are sent securely by email and also saved in Directus.
