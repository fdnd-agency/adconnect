## Components

### Overview

This file lists the main components in the project and explains what they do.  
Components are reusable UI parts that are used on multiple pages.

The project uses an atomic design structure (atoms, molecules, organisms), but some components are still located in the general components folder.  
This is because the atomic structure was introduced later and those components were created before the new structure.  
They can be moved later as a "could have" improvement.

All components are located in `src/lib/components`, `src/lib/atoms`, `src/lib/molecules` and `src/lib/organisms`.

### Component structure

The project follows a structure based on atoms, molecules and organisms:

- Atoms: smallest UI parts (buttons, simple UI)
- Molecules: slightly bigger components made of atoms
- Organisms: bigger sections made of multiple components
- Components: general components that are not placed in atoms/molecules/organisms yet

### General components (src/lib/components)

These components are still in the general components folder because they were created before we started using the atomic structure. They could be moved to atoms/molecules/organisms later.

#### schedule.svelte
- Path: `src/lib/components/ad/schedule.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/ad/schedule.svelte)
- Used for: Showing the AD schedule section
- What it does: Displays a schedule or timeline for AD-related events

#### FeatureSplit.svelte
- Path: `src/lib/components/why-ad-home/FeatureSplit.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/why-ad-home/FeatureSplit.svelte)
- Used for: The “why AD” section on the home page
- What it does: Shows features in a split layout (text + image or icons)

#### PreviousWinners.svelte
- Path: `src/lib/components/talentaward/PreviousWinners.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/talentaward/PreviousWinners.svelte)
- Used for: Talent award page
- What it does: Shows a list of previous winners

#### location.svelte
- Path: `src/lib/components/location/location.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/location/location.svelte)
- Used for: Location page or section
- What it does: Shows a map with the location

#### ButtonLight.svelte
- Path: `src/lib/components/ButtonLight.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/ButtonLight.svelte)
- Used for: Buttons across the site
- What it does: A light style button component

#### NewsCard.svelte
- Path: `src/lib/components/NewsCard.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/NewsCard.svelte)
- Used for: News pages and sections
- What it does: Shows one news item (title, date, summary, image)

#### Information.svelte
- Path: `src/lib/components/information-home/Information.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/information-home/Information.svelte)
- Used for: Information section on the home page
- What it does: Shows a section with information blocks

#### Cta.svelte
- Path: `src/lib/components/nominaties/Cta.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/nominaties/Cta.svelte)
- Used for: Nomination page
- What it does: A call-to-action section or button

#### NewsCardSection.svelte
- Path: `src/lib/components/NewsCardSection.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/NewsCardSection.svelte)
- Used for: News overview page
- What it does: Loads and displays all news items using NewsCard

#### InformationCard.svelte
- Path: `src/lib/components/information-cards/InformationCard.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/information-cards/InformationCard.svelte)
- Used for: Information cards section
- What it does: Displays one information card (title, text, icon)

#### InformationCards.svelte
- Path: `src/lib/components/information-cards/InformationCards.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/components/information-cards/InformationCards.svelte)
- Used for: Information cards section
- What it does: Displays a list of information cards

### Atoms (src/lib/atoms)

These components follow the atomic structure and are placed in the atoms folder.

#### Breadcrumb.svelte
- Path: `src/lib/atoms/Breadcrumb.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/atoms/Breadcrumb.svelte)
- Used for: Breadcrumbs in the Hero component
- What it does: Shows the current page path as breadcrumbs

### Molecules (src/lib/molecules)

These components follow the atomic structure and are placed in the molecules folder.

### ErrorState.svelte
- Path: `src/lib/molecules/ErrorState.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/molecules/ErrorState.svelte)
- Used for: Contact form
- What it does: Shows an error message if the form fails

### BenefitsCard.svelte
- Path: `src/lib/molecules/BenefitsCard.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/molecules/BenefitsCard.svelte)
- Used for: Over AD page
- What it does: Shows one benefit card

### Divider.svelte
- Path: `src/lib/molecules/Divider.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/molecules/Divider.svelte)
- Used for: Separating sections
- What it does: Displays a line divider

### SingleFaq.svelte
- Path: `src/lib/molecules/SingleFaq.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/molecules/SingleFaq.svelte)
- Used for: FAQ section
- What it does: Shows one FAQ question and answer

### DividerText.svelte
- Path: `src/lib/molecules/DividerText.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/molecules/DividerText.svelte)
- Used for: Separating sections with text
- What it does: Shows text between dividers

### DocumentCard.svelte
- Path: `src/lib/molecules/DocumentCard.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/molecules/DocumentCard.svelte)
- Used for: Publications section
- What it does: Shows a document card with download link

### ThemeCard.svelte
- Path: `src/lib/molecules/ThemeCard.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/molecules/ThemeCard.svelte)
- Used for: Themes section
- What it does: Shows one theme card

### LoadingState.svelte
- Path: `src/lib/molecules/LoadingState.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/molecules/LoadingState.svelte)
- Used for: Contact form
- What it does: Shows a loading state while the form is sending

### SuccesState.svelte
- Path: `src/lib/molecules/SuccesState.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/molecules/SuccesState.svelte)
- Used for: Contact form
- What it does: Shows a success message after sending the form

### DevelopmentTemplate.svelte
- Path: `src/lib/molecules/DevelopmentTemplate.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/molecules/DevelopmentTemplate.svelte)
- Used for: Pages that are still in development
- What it does: Shows a placeholder message or template

### Organisms (src/lib/organisms)

These components follow the atomic structure and are placed in the organisms folder.

### MultipleFaq.svelte
- Path: `src/lib/organisms/MultipleFaq.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/organisms/MultipleFaq.svelte)
- Used for: FAQ page
- What it does: Shows multiple FAQ items using SingleFaq

### NavStudent.svelte
- Path: `src/lib/organisms/NavStudent.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/organisms/NavStudent.svelte)
- Used for: Header for students
- What it does: Navigation menu and header layout for student pages

### NavPros.svelte
- Path: `src/lib/organisms/NavPros.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/organisms/NavPros.svelte)
- Used for: Header for professionals
- What it does: Navigation menu and header layout for professional pages

### TopNav.svelte
- Path: `src/lib/organisms/TopNav.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/organisms/TopNav.svelte)
- Used for: Top header with other pages
- What it does: Shows top navigation links and possibly language options

### ImageTextSection.svelte
- Path: `src/lib/organisms/ImageTextSection.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/organisms/ImageTextSection.svelte)
- Used for: “About AD” page
- What it does: Section with image on one side and text on the other

### LogoSection.svelte
- Path: `src/lib/organisms/LogoSection.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/organisms/LogoSection.svelte)
- Used for: Logo carousel section
- What it does: Shows logos in a carousel

### Hero.svelte
- Path: `src/lib/organisms/Hero.svelte`
- GitHub: [Link in GitHub](https://github.com/fdnd-agency/adconnect/blob/dev/src/lib/organisms/Hero.svelte)
- Used for: Every page
- What it does: Hero section with image, title, text and button
