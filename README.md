# ADConnect

**Client: Overlegplatform Associate degrees**

The Consultation Platform for Associate Degrees is a collaboration between all Dutch universities of applied sciences that offer — or plan to offer — Associate Degree programs. Since 2019, they have been working to increase the visibility and strengthen the position of these programs within education and government. They share knowledge, develop joint program profiles, and organize events such as the National AD Day and the AD Talent Award. They also focus on important themes such as progression to bachelor’s programs, practice-oriented learning, and internationalization to improve the quality of Associate Degree programs.

## Client’s request

Develop a user-friendly and technically efficient platform that clearly communicates the added value of Associate Degrees to the user. The user must be able to easily find relevant information through a logical website structure and a well-thought-out redesign. In addition, the website should be translatable into English to reach a broader audience.

Hier staat de [Design Challenge](https://github.com/fdnd-agency/adconnect/wiki/Design-Challenge) verder toegelicht.

## Table of Contents

  * [Description](#description)
  * [Installation](#installation)
  * [Features](#features)
  * [Resources](#resources)
  * [License](#license)

## Description
- Menu
- Hero

### Cards
- Semantic HTML, for example using `<article>` with a `<h3>`, `<p>`, and `<a>`.  
- Multiple tests performed, including: Accessibility test, Performance test, and testing in older browsers.  
- Responsive using a `grid` layout.  
- Used components within components.  
- All data is dynamically loaded from the server JS.

https://github.com/user-attachments/assets/10ace37c-4bbe-4006-8576-8b98df3fc218

### Footer
- Used semantic HTML, for example `<footer>` with a `<details>` and `<summary>`.  
- Multiple tests performed, including: Accessibility test, Performance test, and testing in older browsers.  
- Responsive using a `grid` layout.  
- Dropdown menu for mobile so it does not become a long list, making it more user-friendly.

https://github.com/user-attachments/assets/b136cfc9-5af5-4485-937f-3c58ff0d6d53

## Features
In this project, we use SvelteKit to build a dynamic squad page with reusable components and routes. Data is fetched via the Directus API.


### Routes
- [`/`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/%2Bpage.svelte): On the home page, all news article data is fetched and rendered on the homepage.  
- [`/over-ad`](https://github.com/fdnd-agency/adconnect/tree/dev/src/routes/over-ad): In this route, the themes are fetched.  
- [`/ad-dag`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/ad-dag/%2Bpage.svelte): In this route, information about the Ad Day is displayed.  
- [`/talent-award`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/talent-award/%2Bpage.svelte): In this route, information regarding the Talent Awards is displayed.  
- [`/nominaties`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/talent-award/nominaties/%2Bpage.svelte): In this route, all data of the nominees is fetched.  
- [`/nominaties/[id]`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/talent-award/nominaties/%5Bid%5D/%2Bpage.svelte): In this route, all data of the nominees is fetched, and information about the specific nominee is displayed.  
- [`/over-ons`](https://github.com/fdnd-agency/adconnect/tree/dev/src/routes/over-ons): In this route, information about the Associate Degrees Advisory Platform is displayed.  
- [`/documenten`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/documenten/%2Bpage.svelte): In this route, all information about important documents is fetched and rendered.  
- [`/contact`](https://github.com/fdnd-agency/adconnect/tree/dev/src/routes/contact): In this route, a contact form and relevant information to contact the Associate Degrees Advisory Platform is displayed.  
- [`/nieuws`](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/nieuws/%5Bid%5D/page.server.js): In this route, all news article data is fetched and rendered.  
- [`/nieuws[id]`](https://github.com/fdnd-agency/adconnect/tree/dev/src/routes/contact): In this route, all data of the specific news article is fetched and rendered.  

### Components 
- [`Hero.svelte`](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/hero/Hero.svelte): This contains the hero section that is loaded on all pages.  
- [`NewsCard.svelte`](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/NewsCard.svelte): This component is a news article that is loaded within the `NewsCardSection.svelte` component.  
- [`NewsCardSection.svelte`](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/NewsCardSection.svelte): This component is a section containing all news articles (`NewsCard` component) and is loaded.  

### Data
Data is fetched in `+page.server.js` for the corresponding route. A fetch is performed to the Directus API, the data is processed, and then rendered to the respective `+page.svelte` page.  
- See for example the [`+page.server.js` of the home page](https://github.com/fdnd-agency/adconnect/blob/dev/src/routes/%2Bpage.server.js).  

## Installation
To build this project, the following steps must be completed. `Node.js` and `npm` (or alternatives such as `pnpm` or `yarn`) are required as a package manager to get started.  

### Create Project
- If you want to start a new SvelteKit project, run the following command in the terminal:

```
npx sv create
```

- Then follow the steps displayed in the terminal.

### Install
- Once the project is set up, run the following command to install all dependencies:

```
npm install
```

### Development
- After all dependencies are installed, you can start the development server. Run the following command to see changes automatically:

```
npm run dev -- --open
```

### Build
- To create a production version of your app:

```
npm run build
```

- And to preview the production version:

```
npm run preview`
```

## Sources
- [Overlegplatform Associate Degrees](https://www.deassociatedegree.nl/)
- [Current styleguide](https://github.com/fdnd-agency/adconnect/blob/main/design/overlegplatform-ads-huisstijlgids.pdf)
- [Redesign in Figma](https://www.figma.com/design/C3LofyCP8YMew5ZdOFOBzf/Gezamenlijk-ontwerp?node-id=29-2&t=jVM6qvXd8jzOXidn-1)

## License
This project is licensed under the terms of the MIT license.
