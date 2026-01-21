## ADConnect

**Client: Overlegplatform Associate degrees**

The Consultation Platform for Associate Degrees is a collaboration between all Dutch universities of applied sciences that offer, or plan to offer Associate Degree programs. Since 2019, they have been working to increase the visibility and strengthen the position of these programs within education and government. They share knowledge, develop joint program profiles, and organize events such as the National AD Day and the AD Talent Award. They also focus on important themes such as progression to bachelor’s programs, practice-oriented learning, and internationalization to improve the quality of Associate Degree programs.

### Client’s request

Develop a user friendly and technically efficient platform that clearly communicates the added value of Associate Degrees to the user. The user must be able to easily find relevant information through a logical website structure and a well thoughtout redesign. In addition, the website should be translatable into English to reach a broader audience.

Here is the [Design Challenge](https://github.com/fdnd-agency/adconnect/wiki/Design-Challenge) explained.

[Livelink to the website](https://adconnect.dev.fdnd.nl/)

### Team

This project was created and developed by the following team members:

- Amber Schalker - Github Username: [ambersr](https://github.com/ambersr)
- Arman Voogd - Github Username: [ArmanVD](https://github.com/ArmanVD)
- Nayome Doelwijt - Github Username: [Nayomekaia](https://github.com/Nayomekaia)

Each team member contributed to different parts of the project, such as frontend development, CMS integration, documentation, and collaboration within the team.

![mockups](https://github.com/user-attachments/assets/deb29554-9ac7-4852-9571-0bced02c7f68)

## Table of Contents

  * [Design choices](#designchoices)
  * [Description](#description)
  * [Features](#features)
  * [Installation](#installation)
  * [User guide](#userguide)
  * [Resources](#resources)
  * [License](#license)

## Design choices

Curious about the thought process behind this website?
In our design we aimed to create something that feels professional, trustworthy, and youthful at the same time. From our color palette and typography to the updated AdConnect logo, playful mascot, and clear navigation structure every choice was made with purpose. read more about this in out designchoices.md

[Design choices](https://github.com/fdnd-agency/adconnect/blob/dev/DESIGNCHOICES.md)

## Description
### PE contactform 
On the contact page, we developed a contact form. The form works server-side and is enhanced with client-side JavaScript and CSS.
- Uses semantic HTML elements such as `<form>`, `<input>`, and `<section>`.
- Developed mobile-first, with `@media queries` for wider screens.
- The form works server-side. Data is stored in the Directus API and sent via email using Resend.
- Enhanced with client-side JavaScript, while ensuring the form can be submitted without JavaScript.
- UI states added, including loading, success, and error states.

https://github.com/user-attachments/assets/158a2a80-ed2e-45a1-b576-eb3449f91301

### View page transition
When switching between pages the new page slides in from the right side of the screen. It also detects when you go back to the previous page, then the animatie is reverted so the user has more logical by navigating the website.
- Uses the View Transitions API (document.startViewTransition) for smooth page navigation.
- Determines navigation direction (forwards / backwards) based on the URL to support visual hierarchy.
- Controls animations through CSS classes on `<html>` combined with `@keyframes`.
- Waits for scroll-to-top before starting the transition to keep visual focus.
- Enabled on desktop `@media min-width: 768px`, keeping mobile interactions calm.
- Respects `prefers-reduced-motion` and falls back gracefully when unsupported.
- The view page transition is an enhancement

https://github.com/user-attachments/assets/8ddc4cad-fab4-466c-a49d-6f040d12bc5a

### Filter publications
- Used semantic HTML. I’m using an `<a>` element.
- The filter is server side rendered which means it also works when client side JS is disabled.
- Performed responsive and accessibility testing.

https://github.com/user-attachments/assets/eec6b157-3cfb-4d3b-bfc5-e33aed4bdd43

### Cooperation carousel
- Used semantic HTML: `<ul>`, `<li>`, and an `<a>` containing an `<img>`.  
- Built mobile first, then enhanced for larger screens using `@media` queries.  
- Created the carousel as a reusable component, allowing it to be used across multiple pages.  
- Performed responsive and accessibility testing.  
- All data (logos) is dynamically fetched from the Directus API.  

https://github.com/user-attachments/assets/6083738d-67c2-4acb-bd97-e92b0c4173b7

## Features
In this project we use SvelteKit to build a dynamic squad page with reusable components and routes. Data is fetched via the Directus API.

### Routes
- [`/`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/%2Bpage.svelte): On the home page, all news article data is fetched and rendered on the homepage.  
- [`/over-ad`](https://github.com/fdnd-agency/adconnect/tree/dev/src/routes/over-ad): In this route, the themes are fetched.  
- [`/ad-dag`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/ad-dag/%2Bpage.svelte): In this route, information about the Ad Day is displayed.  
- [`/talent-award`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/talent-award/%2Bpage.svelte): In this route, information regarding the Talent Awards is displayed.  
- [`/nominaties`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/talent-award/nominaties/%2Bpage.svelte): In this route, all data of the nominees is fetched.  
- [`/nominaties/[id]`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/talent-award/nominaties/%5Bid%5D/%2Bpage.svelte): In this route, all data of the nominees is fetched, and information about the specific nominee is displayed.  
- [`/over-ons`](https://github.com/fdnd-agency/adconnect/tree/dev/src/routes/over-ons): In this route, information about the Associate Degrees Advisory Platform is displayed.  
- [`/plubicaties`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/publicaties/%2Bpage.svelte): In this route, all information about important documents is fetched and rendered.
- [`/plubicaties[slug]`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/publicaties/%5Bslug%5D/%2Bpage.svelte): In this route all specific information form a document is fetched and rendered.  
- [`/contact`](https://github.com/fdnd-agency/adconnect/tree/dev/src/routes/contact): In this route a contact form and relevant information to contact the Associate Degrees Advisory Platform is displayed.  
- [`/nieuws`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/nieuws/%5Bid%5D/page.server.js): In this route, all news article data is fetched and rendered.  
- [`/nieuws[id]`](https://github.com/fdnd-agency/adconnect/tree/dev/src/routes/contact): In this route, all data of the specific news article is fetched and rendered.  

### Components 

The project uses reusable Svelte components to build the user interface. These components are structured based on Atomic Design principles (atoms, molecules, and organisms).

- Components are used for page sections such as navigation, hero sections, cards, forms, and content blocks  
- Most components receive their data from the Directus CMS making the website dynamic and easy to manage  
- Some components are still located in the general `components` folder  
  - This is due to our first implementation approach  
  - As a `*could have*` these components can be moved to the Atomic Design structure in the future  

A more detailed description of each component can be found in the [docs/components](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components.md) documentation.

## Data

### Overview
- The project uses Directus as a headless CMS.
- Directus manages all website content (text, images, sections).
- Content is delivered via an API and rendered by the SvelteKit frontend.

### Content & API
- Content is structured in collections (e.g. news, events, documents).
- Each collection has predefined fields for content editors.
- Data is fetched from Directus through API endpoints.

### Fetching data
- Data is retrieved server-side in `+page.server.js` for each route.
- A request is made to the Directus API endpoint for the relevant collection.
- The returned data is processed and then passed to the page component (`+page.svelte`) for rendering.
- Fetching server-side ensures faster initial load, improved SEO, and keeps API keys secure.

### Contact Form
- The contact form sends emails using Resend.
- Submitted messages are also stored in Directus.
- API keys and credentials are handled securely via environment variables.

For more detailed information see the dedicated [CMS documentation page](https://github.com/fdnd-agency/adconnect/blob/dev/docs/cms.md).

### Data Model
The data model shows how the different collections relate to each other.

For more detailed information see the dedicated [Data Model documentation page](https://github.com/fdnd-agency/adconnect/blob/dev/docs/datamodel.md)

Below is the mermaid diagram that visualizes the main data relationships:

[![](https://mermaid.ink/img/pako:eNq9VFFr2zAQ_ivhnk2IHbuO_TZSw_oQe7QZg2EImnV1BLZkzlJoG_LfpzjtklXN1lJaPci-T3x3930St4VKcYQUkC4Fq4m1pRzZddgvi_n3RZYvb0bbA7BfQuqR4Me41yRkPdJCN-igHPuKRKeFks5Z35j6CHKmcdgO0K58JOTZj48pz4xeK3Lgl3Kz2sHwrkLqtIOvkZQDEjK-4obY3408k3xC-KX4_TMfll-zRfYZF_EvIY7qN0nIi8VV_mV59Q4ZZ1plHOn_ze4r4QalXp3WOy9ByN52YV70rFKGepfSEW6EMv3qzDlyUw2vYLVhJJh0HxBrTCtN_xo_50Vx_S27to4W-Ssclax1G2pUrU7Sggc1CQ6pJoMetEgt24cwpC9Br9EmgdT-crxlptEllHJnaR2TP5Vqn5ikTL2G9JY1vY1Mtzf4ccL8QQmlvbe5MlJDGoezIQmkW7iDNJiM_SCcRrM4DCb2G0Ue3EN6kYynsR_Moij2k4mfJDsPHoay_jgIkii4iKZ-EoaxH8UeIBda0eIw4YZBt_sN1CR5BQ?type=png)](https://mermaid.live/edit#pako:eNq9VFFr2zAQ_ivhnk2IHbuO_TZSw_oQe7QZg2EImnV1BLZkzlJoG_LfpzjtklXN1lJaPci-T3x3930St4VKcYQUkC4Fq4m1pRzZddgvi_n3RZYvb0bbA7BfQuqR4Me41yRkPdJCN-igHPuKRKeFks5Z35j6CHKmcdgO0K58JOTZj48pz4xeK3Lgl3Kz2sHwrkLqtIOvkZQDEjK-4obY3408k3xC-KX4_TMfll-zRfYZF_EvIY7qN0nIi8VV_mV59Q4ZZ1plHOn_ze4r4QalXp3WOy9ByN52YV70rFKGepfSEW6EMv3qzDlyUw2vYLVhJJh0HxBrTCtN_xo_50Vx_S27to4W-Ssclax1G2pUrU7Sggc1CQ6pJoMetEgt24cwpC9Br9EmgdT-crxlptEllHJnaR2TP5Vqn5ikTL2G9JY1vY1Mtzf4ccL8QQmlvbe5MlJDGoezIQmkW7iDNJiM_SCcRrM4DCb2G0Ue3EN6kYynsR_Moij2k4mfJDsPHoay_jgIkii4iKZ-EoaxH8UeIBda0eIw4YZBt_sN1CR5BQ)

## Installation
To build this project, the following steps must be completed. `Node.js` and `npm` (or alternatives such as `pnpm` or `yarn`) are required as a package manager to get started.  


### Install
1. Clone respository

```
git clone https://github.com/fdnd-agency/adconnect.git
cd adconnect
```
2. Install independencies

```
npm install
```

3. Set up environment variables

Create a .env file in the root folder (copy from .env.example if available).
You need to add the following variables: 

```
#### Resend email service
RESEND_API_KEY=your_resend_api_key_here
```
4. Run the project

```
npm run dev -- --open
```

## Sources
- [Overlegplatform Associate Degrees](https://www.deassociatedegree.nl/)
- [Current styleguide](https://github.com/fdnd-agency/adconnect/blob/main/design/overlegplatform-ads-huisstijlgids.pdf)
- [Redesign in Figma](https://www.figma.com/design/C3LofyCP8YMew5ZdOFOBzf/Gezamenlijk-ontwerp?node-id=29-2&t=jVM6qvXd8jzOXidn-1)
- [CONTRIBUTING.md](https://github.com/fdnd-agency/adconnect/blob/dev/CONTRIBUTING.md)
- [HANDOVER.md](https://github.com/fdnd-agency/adconnect/blob/dev/HANDOVER.md)
- [Technical documentation (docs folder)](https://github.com/fdnd-agency/adconnect/tree/dev/docs)

## User Guide

This project is built with SvelteKit and uses Directus as a headless CMS.  
If you want to run the project locally, follow the installation steps in the README.  
For more details on how to use the platform as an editor, see the documentation in the Directus dashboard.

## License
This project is licensed under the terms of the MIT license.
