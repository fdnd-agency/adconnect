## CMS

### Overview

This project uses Directus as a headless CMS. Directus stores the website content, media and structured page data. The SvelteKit frontend fetches this content server-side and renders it on the public website.

The project now also contains a custom admin portal. This means editors do not always need to work directly inside the Directus interface. They can use the AdConnect admin routes to create, edit, publish, depublish and delete content through the website itself.

### Directus base URLs

- Directus project: https://fdnd-agency.directus.app
- Items API: https://fdnd-agency.directus.app/items
- Files API: https://fdnd-agency.directus.app/files
- Folders API: https://fdnd-agency.directus.app/folders
- Directus admin login: https://fdnd-agency.directus.app/admin/login

### API endpoint links

These are the current Directus collections used by the project.

#### Content collections

- [Documents](https://fdnd-agency.directus.app/items/adconnect_documents)
- [Document categories](https://fdnd-agency.directus.app/items/adconnect_categories)
- [Themes](https://fdnd-agency.directus.app/items/adconnect_themes)
- [Events](https://fdnd-agency.directus.app/items/adconnect_events)
- [Cooperations](https://fdnd-agency.directus.app/items/adconnect_cooperation)
- [News](https://fdnd-agency.directus.app/items/adconnect_news)
- [Nominations](https://fdnd-agency.directus.app/items/adconnect_nominations)
- [FAQs](https://fdnd-agency.directus.app/items/adconnect_faqs)
- [LADOs](https://fdnd-agency.directus.app/items/adconnect_lados)
- [Courses](https://fdnd-agency.directus.app/items/adconnect_courses)
- [Sectoral advisory boards](https://fdnd-agency.directus.app/items/adconnect_sectoral_advisory_boards)
- [Contact submissions](https://fdnd-agency.directus.app/items/adconnect_contact)

#### Page collections

- [Home page](https://fdnd-agency.directus.app/items/adconnect_page_home)
- [About AD page](https://fdnd-agency.directus.app/items/adconnect_page_about_ad)
- [LADO page](https://fdnd-agency.directus.app/items/adconnect_page_lado)
- [About us page](https://fdnd-agency.directus.app/items/adconnect_page_about_us)
- [AD Day page](https://fdnd-agency.directus.app/items/adconnect_page_ad_day)
- [Talent Award page](https://fdnd-agency.directus.app/items/adconnect_page_talent_award)
- [News page](https://fdnd-agency.directus.app/items/adconnect_page_news)
- [Publications page](https://fdnd-agency.directus.app/items/adconnect_page_publications)
- [Navbar CTA](https://fdnd-agency.directus.app/items/adconnect_nav_button)

Each content type has its own fields and settings. These fields define what content editors can fill in and what the SvelteKit frontend can render.

### How content is stored

Directus stores content in database collections. Each collection contains fields and items.

Example:

- Collection: `adconnect_news`
- Fields: title, body, date, hero image, status and other metadata
- Item: one news article

Most collections use `id` as the item key. The news collection uses `uuid`, which is normalized in the server-side content layer so the rest of the application can still work with a consistent `id` value.

### API access in SvelteKit

The SvelteKit frontend fetches content from Directus using server-side code. Public pages usually load content in `+page.server.js` files. Admin pages use server actions to create, update, publish, depublish and delete content.

The API is accessed with this pattern:

```txt
https://fdnd-agency.directus.app/items/<collection-name>
```

Example:

```txt
https://fdnd-agency.directus.app/items/adconnect_news
```

Most Directus communication is handled by `ContentService` in `src/lib/server/contentService.js`. The actual Directus collection mapping is stored in `src/lib/server/strategies/directusContentStrategy.js`.

The `ContentService` supports:

- fetching content;
- creating content;
- updating content;
- publishing content;
- depublishing content;
- deleting content;
- uploading files;
- deleting uploaded files;
- submitting contact messages.

More information is documented in [technical-design/contentservice.md](technical-design/contentservice.md).

## Admin portal overview

### Purpose

The AdConnect admin portal is a custom SvelteKit interface for managing CMS content. It uses Directus as the data source, but gives editors a project-specific interface that matches the content structure of this website.

The portal is available at:

```txt
/admin
```

### Authentication

Editors log in through `/admin/login`. After login, the application stores an access token in a cookie. Admin server actions use this token when they send protected requests to Directus.

The logout route is available at `/admin/logout`.

### Managed content types

The admin portal currently supports management for:

- documents;
- themes;
- news;
- events;
- FAQs;
- cooperations;
- nominations;
- courses;
- LADOs;
- sectoral advisory boards.

For these content types, the portal contains overview pages and create/edit forms and deleting, publishing and depublishing of content. The server actions call `ContentService` instead of writing Directus fetch logic directly in every route.

### Admin actions

The admin portal supports these actions:

- create new content items;
- edit existing content items;
- publish items by setting their Directus status to `published`;
- depublish items by setting their Directus status back to `draft`;
- delete content items;
- upload images and documents to Directus files;
- remove uploaded files when an action fails;
- validate form data before sending it to Directus.

### Forms and validation

Admin forms are located in `src/lib/organisms/forms`. They are reused across create and edit routes.

Before content is saved, form data is validated server-side through the validation system in `src/lib/server/validation`. This validation system uses reusable handlers and chains, so the same checks can be shared between multiple content types.

More information is documented in [technical-design/validation-chain.md](technical-design/validation-chain.md).

### Preview route

The project also has a preview route:

```txt
/preview/[type]/[id]
```

This route can render CMS content by content type and item id. It is useful for checking content before or around publication.

## Contact form and Resend

The contact form sends form data as an email using [Resend](https://resend.com/). It also stores submitted messages in the Directus `adconnect_contact` collection.

- Resend is used for email delivery.
- Directus stores the submitted contact message.
- The API key is stored in the environment file.
- [example.env](../example.env) shows which variables are needed.

Important notes:

- The API key should never be pushed to GitHub.
- The contact form must keep working server-side first.
- Client-side JavaScript may enhance the experience, but the form should still submit without it.

Example environment variable:

```env
RESEND_API_KEY="your_resend_api_key_here"
```
