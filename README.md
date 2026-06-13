## AdConnect

**Client: Overlegplatform Associate degrees**

The Consultation Platform for Associate Degrees is a collaboration between all Dutch universities of applied sciences that offer, or plan to offer Associate Degree programs. Since 2019, they have been working to increase the visibility and strengthen the position of these programs within education and government. They share knowledge, develop joint program profiles, and organize events such as the National AD Day and the AD Talent Award. They also focus on important themes such as progression to bachelor's programs, practice-oriented learning, and internationalization to improve the quality of Associate Degree programs.

### Client's request

Develop a user friendly and technically efficient platform that clearly communicates the added value of Associate Degrees to the user. The user must be able to easily find relevant information through a logical website structure and a well thoughtout redesign. In addition, the website should be translatable into English to reach a broader audience.

Here is the [Design Challenge](https://github.com/fdnd-agency/adconnect/wiki/Design-Challenge) explained.

[Livelink to the website](https://adconnect.dev.fdnd.nl/)
this is currently locked with a password on the clients request
password: adconnect2026

### Team

This project was created and developed by the following team members:

- Amber Schalker - Github Username: [ambersr](https://github.com/ambersr)
- Arman Voogd - Github Username: [ArmanVD](https://github.com/ArmanVD)
- Nayome Doelwijt - Github Username: [Nayomekaia](https://github.com/Nayomekaia)

The admin panel, the large refactor of front-end specific code and the desing system has been developed by the following team members under the FDND-agency:

- Wesley van Geemen (Back-end) - Github Username: [AstoraZ20968](https://github.com/AstoraZ20968)
- Alex Louwe (Back-end) - Github Username: [CesariHVA](https://github.com/CesariHVA)
- Viresh Sheoratan (Front-end) - Github Username: [vsheo](https://github.com/vsheo)
- Sidney Hermus (Front-end) - Github Username: [Sidopjescherm](https://github.com/Sidopjescherm)
- Alisa Ayad (CMD-Design)
- Benjamin Sadri Milani (CMD-Design)

Each team member contributed to different parts of the project, such as frontend development, CMS integration, documentation, and collaboration within the team.

## Table of Contents

- [Project status](#project-status)
- [Features](#features)
- [Architecture](#architecture)
- [Design system and components](#design-system-and-components)
- [Admin portal](#admin-portal)
- [Data and CMS](#data-and-cms)
- [Installation](#installation)
- [Available scripts](#available-scripts)
- [Documentation](#documentation)
- [User guide](#user-guide)
- [Sources](#sources)
- [License](#license)

## Project status

AdConnect is now a SvelteKit website connected to Directus as a headless CMS. The public website has been redesigned and the codebase has been refactored around reusable components, server-side data loading, a new admin portal and technical services that make content management easier to maintain.

In the past weeks the project has moved beyond the first public pages. The main additions are:

- a revamped design system with atomic components, documented component usage and a clearer page structure;
- a custom admin portal for managing Directus content from inside the website;
- reusable forms for content creation and editing;
- a centralized ContentService for Directus communication;
- a reusable validation system based on Chain of Responsibility and Factory patterns;
- preview routes for checking CMS content before or around publication;
- extra public routes for students, employers, FAQ and LADO/AD profile information;
- automated unit and end-to-end test scripts with Vitest and Playwright.

## Features

### Public website

The public website is built with SvelteKit routes and server-side data fetching. Most pages load content from Directus in `+page.server.js` and pass the data to reusable Svelte components.

Current public routes include:

- `/` - homepage with CMS-driven sections and highlighted content;
- `/over-ad` and `/over-ad/[slug]` - information about Associate Degrees and related themes;
- `/studenten` - page focused on students;
- `/werkgevers` - page focused on employers;
- `/lados-en-ad-profielen` - overview of LADO information and AD profiles;
- `/ad-dag` - information about the National AD Day;
- `/talent-award` - information about the AD Talent Award;
- `/talent-award/nominaties` and `/talent-award/nominaties/[id]` - nomination overview and detail pages;
- `/publicaties` and `/publicaties/[slug]` - publication overview and detail pages;
- `/nieuws` and `/nieuws/[uuid]` - news overview and detail pages;
- `/over-ons` - information about the platform;
- `/faq` - frequently asked questions;
- `/contact` - progressive enhanced contact form.

### Contact form

The contact form still works server-side first and is enhanced on the client where possible. It sends email with Resend and stores submitted messages in the Directus `adconnect_contact` collection.

The form includes:

- semantic form fields;
- server-side handling through SvelteKit actions;
- loading, success and error states;
- storage in Directus;
- email delivery through Resend;
- environment-based API key handling.

### Preview flow

The `/preview/[type]/[id]` route can render CMS content by type and id. This helps editors and developers inspect content without needing to build a separate page for every preview case.

## Architecture

The project consists of three main parts:

1. **Frontend:** SvelteKit handles routing, pages, layouts and UI components.
2. **CMS:** Directus stores website content, media and structured collections.
3. **API layer:** server-side services fetch, create, update, publish and delete Directus content.

SvelteKit's folder-based routing is used throughout the project. Public routes live in `src/routes/(public)`, admin routes live in `src/routes/admin`, and shared UI and server logic live in `src/lib`.

Important server-side utilities:

- `src/lib/server/contentService.js` - central service for Directus content and file operations;
- `src/lib/server/authService.js` - authentication helper for the admin portal;
- `src/lib/server/directus.js` - Directus connection utilities;
- `src/lib/server/formUtils.js` - shared form helpers;
- `src/lib/server/slugify.js` - slug generation helper;
- `src/lib/server/validation` - reusable validation handlers and chains.

More details are documented in [docs/architecture.md](docs/architecture.md), [docs/code-structure.md](docs/code-structure.md), [docs/technical-design/contentservice.md](docs/technical-design/contentservice.md) and [docs/technical-design/validation-chain.md](docs/technical-design/validation-chain.md).

## Design system and components

The frontend has been largely revamped around a new design system and Atomic Design structure. Components are split into atoms, molecules and organisms so pages can be built from smaller reusable parts instead of one-off page code.

Main component folders:

- `src/lib/atoms` - small UI parts such as breadcrumbs, counters and error elements;
- `src/lib/molecules` - reusable combined UI parts such as cards, loading states, preview banners and admin item elements;
- `src/lib/organisms` - larger sections such as navigation, admin layout components, content lists and forms;
- `src/lib/organisms/forms` - reusable admin forms for documents, news, events, FAQs, nominations, themes, cooperations, courses, LADO items and sectoral advisory boards;
- `src/lib/icons` - shared icon components.

The component documentation has also been updated. See and the component-specific files in [docs/components](docs/components).

## Admin portal

The project now includes a custom admin portal under `/admin`. This portal is built in SvelteKit and communicates with Directus through server-side actions and the ContentService.

The admin portal currently supports:

- login and logout;
- dashboard overview;
- listing CMS content;
- creating content;
- editing existing content;
- publishing and depublishing content;
- deleting content;
- uploading files and cleaning up failed uploads;
- protected requests using an access token;
- validation before content is sent to Directus.

Managed content types include:

- documents;
- news;
- events;
- FAQs;
- themes;
- cooperations;
- nominations;
- courses;
- LADO items;
- sectoral advisory boards.

The admin interface uses its own reusable components, including `AdminHeader`, `AdminSidebar`, `AdminToolbar`, `AdminContentList`, `AdminItemCard`, `AdminStatItem` and `AdminUserMenu`.

## Data and CMS

The project uses Directus as a headless CMS. Content editors manage structured content in Directus, while SvelteKit fetches that content server-side and renders it in the frontend.

Important collections include:

- cooperation;
- documents;
- events;
- news;
- nominations;
- themes;
- document categories;
- contact submissions.

The admin portal and public website both depend on this data model. More information can be found in [docs/cms.md](docs/cms.md) and [docs/datamodel.md](docs/datamodel.md).

## Installation

To run the project locally, you need Node.js and npm.

1. Clone the repository

```bash
git clone https://github.com/fdnd-agency/adconnect.git
cd adconnect
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root folder. Use [example.env](example.env) as a reference.

```env
RESEND_API_KEY="your_resend_api_key_here"
```

4. Run the development server

```bash
npm run dev
```

You can also open the project directly in the browser with:

```bash
npm run start
```

## Available scripts

- `npm run dev` - start the Vite development server;
- `npm run start` - start the development server and open the browser;
- `npm run build` - create a production build;
- `npm run preview` - preview the production build locally;
- `npm run lint:check` - run ESLint without auto-fixing;
- `npm run lint` - run ESLint with auto-fixing;
- `npm run test:unit` - run Vitest unit tests;
- `npm run test:e2e` - run Playwright end-to-end tests;
- `npm run test` - run unit tests and end-to-end tests.

## Documentation

The project contains updated documentation for design, code structure, CMS usage and technical implementation.

- [docs/architecture.md](docs/architecture.md) - global project architecture;
- [docs/cms.md](docs/cms.md) - Directus CMS setup and endpoints;
- [docs/datamodel.md](docs/datamodel.md) - data model and collection relationships;
- [docs/code-structure.md](docs/code-structure.md) - code conventions and structure;
- [docs/components/overview.md](docs/components/overview.md) - component overview;
- [docs/components](docs/components) - component-specific documentation;
- [docs/technical-design/contentservice.md](docs/technical-design/contentservice.md) - ContentService explanation;
- [docs/technical-design/validation-chain.md](docs/technical-design/validation-chain.md) - validation system explanation;
- [docs/audits](docs/audits) - page audits for responsive behaviour, accessibility, performance and progressive enhancement;
- [design/DESIGNHANDOVER.md](design/DESIGNHANDOVER.md) - design handover.

## User guide

### Adding content in Directus

1. Go to `Content` in the left menu.
2. Select the desired collection, such as Themes, News, Events or Documents.
3. Click `Create Item` or the `+` button.
4. Fill in the required fields.
5. Set the status to `Published` if the item is ready.
6. Click `Save`.

[Directus Editor Guide](https://directus.io/docs/guides/content/editor)

### Managing content in the AdConnect admin portal

1. Go to `/admin`.
2. Log in with a valid Directus account.
3. Choose the content type you want to manage.
4. Create, edit, publish, depublish or delete content from the overview pages.
5. Use the preview route where needed to check content before publication.

## Sources

- [Overlegplatform Associate Degrees](https://www.deassociatedegree.nl/)
- [Current styleguide](https://github.com/fdnd-agency/adconnect/blob/main/design/overlegplatform-ads-huisstijlgids.pdf)
- [Redesign in Figma](https://www.figma.com/design/MWooyTNuJWHPSHtrr6EOjg/Interface-Inventory-Ad-Connect?node-id=298-347)
- [Design Challenge](https://github.com/fdnd-agency/adconnect/wiki/Design-Challenge)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [HANDOVER.md](HANDOVER.md)
- [Technical documentation](docs)

## License

This project is licensed under the terms of the MIT license.
