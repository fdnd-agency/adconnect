# Components Overview

This folder follows the Atomic Design structure. Components are split into **atoms** (smallest building blocks), **molecules** (small compositions of atoms), and **organisms** (larger sections built from molecules and atoms).

**If you're looking for a component that isn't listed here, it's probably one of the components from the admin panel. Those components were not created or refactored by our team, which is why they do not have documentation.**

## Atoms

- **Link**
  - Anchor that auto-marks itself active on the current page and forwards class/attributes; the shared link primitive.
- **Picture**
  - Renders optimized images, using `enhanced:img` for static images and a `<picture>` element for Directus images.
- **Separator**
  - Horizontal divider line, optionally with a centered label and a no-margin variant.
- **svgIcons**
  - Collection of inline SVG icon components used across the site.

## Molecules

- **CardHero**
  - Page header with breadcrumb, title, description, and an optional button row.
- **CardNews**
  - Single news card with title, date, description, and a clickable link to the article.
- **CardPublicaties**
  - Single publication card with title, category, year, truncated description, and a clickable link.
- **CardSection**
  - Section header with title, description, dots icon, and an optional link; supports a centered variant.
- **CardTheme**
  - Theme card with title, description, dots icon, and an optional arrow link; whole card is clickable.
- **Carousel**
  - Auto-scrolling carousel in two modes: linked partner logos or hover-revealed nomination cards.
- **ContactCard**
  - Static contact information card with phone and email links plus a decorative circle.
- **ContactForm**
  - Contact form that submits via a SvelteKit action and swaps to loading, success, and error states.
- **FaqSection**
  - Titled list of FAQ items as native `<details>` accordions, with the first item open by default.
- **FilterButtons**
  - Category filter as radio buttons that update the URL's `category` param; works without JavaScript.
- **TalentWinner**
  - List of previous Talent Award winners with name, excerpt, and photo, filtered from the nominations.
- **TextSection**
  - Document description with an optional inline preview (iframe) and a link to the full source file.
- **TimeTable**
  - Schedule rendered as a list of time ranges paired with event names using semantic `<time>` elements.

## Organisms

- **AboutOverAD**
  - "Why choose Associate Degrees" section with an intro and a responsive grid of benefit cards.
- **DetailsOverOns**
  - Theme detail page: rich-text body in the main column and a sticky call-to-action sidebar.
- **DetailsPublicaties**
  - Publication detail page: TextSection content alongside a sticky call-to-action sidebar.
- **ErrorPage**
  - Full error/fallback page with its own header, nav, footer, and links to the working pages.
- **Footer**
  - Site-wide footer with logo, about blurb, and collapsible Menu, Thema's, and Contact link columns.
- **NewsGridContainer**
  - Titled, responsive grid of news cards with optional pagination controls.
- **SectionFilter**
  - Filter buttons above a responsive grid of publication cards showing the filtered results.
- **SectionHero**  - Responsive hero section pairing a CardHero with an optional image and up to two links.
- **SectionNewsCard**
  - "Latest news" block with a separator and a responsive grid of news cards.
- **SectionPage**
  - Flexible content section pairing a CardSection with an optional image; supports mirrored, dark, vertical, and centered variants.
- **SectionPlanning**
  - Centered CardSection above a responsive grid of cards with text and a call-to-action link.
- **SectionThemes**
  - Titled section with an optional description above a responsive grid of theme cards.
- **TalentAwardSection**
  - Talent Award overview composing the winners, an intro card, and a nominations carousel.