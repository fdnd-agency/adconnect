# Components Overview

This folder follows the Atomic Design structure. Components are split into **atoms** (smallest building blocks), **molecules** (small compositions of atoms), and **organisms** (larger sections built from molecules and atoms).

**If you're looking for a component that isn't listed here, it's probably one of the components from the admin panel. Those components were not created or refactored by our team, which is why they do not have documentation.**

## Atoms

- [**Link**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/atoms/Link.md)
  - Anchor that auto-marks itself active on the current page and forwards class/attributes; the shared link primitive.
- [**Picture**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/atoms/Picture.md)
  - Renders optimized images, using `enhanced:img` for static images and a `<picture>` element for Directus images.
- [**Separator**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/atoms/Separator.md)
  - Horizontal divider line, optionally with a centered label and a no-margin variant.
- **svgIcons**
  - Collection of inline SVG icon components used across the site.

## Molecules

- [**CardHero**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/molecules/CardHero.md)
  - Page header with breadcrumb, title, description, and an optional button row.
- [**CardNews**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/molecules/CardNews.md)
  - Single news card with title, date, description, and a clickable link to the article.
- [**CardPublicaties**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/molecules/CardPublicaties.md)
  - Single publication card with title, category, year, truncated description, and a clickable link.
- [**CardSection**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/molecules/CardSection.md)
  - Section header with title, description, dots icon, and an optional link; supports a centered variant.
- [**CardTheme**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/molecules/CardTheme.md)
  - Theme card with title, description, dots icon, and an optional arrow link; whole card is clickable.
- [**Carousel**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/molecules/Carousel.md)
  - Auto-scrolling carousel in two modes: linked partner logos or hover-revealed nomination cards.
- [**ContactCard**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/molecules/ContactCard.md)
  - Static contact information card with phone and email links plus a decorative circle.
- [**ContactForm**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/molecules/ContactForm.md)
  - Contact form that submits via a SvelteKit action and swaps to loading, success, and error states.
- [**FaqSection**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/molecules/FaqSection.md)
  - Titled list of FAQ items as native `<details>` accordions, with the first item open by default.
- [**FilterButtons**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/molecules/FilterButtons.md)
  - Category filter as radio buttons that update the URL's `category` param; works without JavaScript.
- [**TalentWinner**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/molecules/TalentWinner.md)
  - List of previous Talent Award winners with name, excerpt, and photo, filtered from the nominations.
- [**TextSection**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/molecules/TextSection.md)
  - Document description with an optional inline preview (iframe) and a link to the full source file.
- [**TimeTable**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/molecules/TimeTable.md)
  - Schedule rendered as a list of time ranges paired with event names using semantic `<time>` elements.

## Organisms

- [**AboutOverAD**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/organisms/AboutOverAD.md)
  - "Why choose Associate Degrees" section with an intro and a responsive grid of benefit cards.
- [**DetailsOverOns**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/organisms/DetailsOverOns.md)
  - Theme detail page: rich-text body in the main column and a sticky call-to-action sidebar.
- [**DetailsPublicaties**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/organisms/DetailsPublicaties.md)
  - Publication detail page: TextSection content alongside a sticky call-to-action sidebar.
- [**ErrorPage**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/organisms/ErrorPage.md)
  - Full error/fallback page with its own header, nav, footer, and links to the working pages.
- [**Footer**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/organisms/Footer.md)
  - Site-wide footer with logo, about blurb, and collapsible Menu, Thema's, and Contact link columns.
- [**NewsGridContainer**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/organisms/NewsGridContainer.md)
  - Titled, responsive grid of news cards with optional pagination controls.
- [**SectionFilter**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/organisms/SectionFilter.md)
  - Filter buttons above a responsive grid of publication cards showing the filtered results.
- [**SectionHero**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/organisms/SectionHero.md)
  - Responsive hero section pairing a CardHero with an optional image and up to two links.
- [**SectionNewsCard**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/organisms/SectionNewsCard.md)
  - "Latest news" block with a separator and a responsive grid of news cards.
- [**SectionPage**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/organisms/SectionPage.md)
  - Flexible content section pairing a CardSection with an optional image; supports mirrored, dark, vertical, and centered variants.
- [**SectionPlanning**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/organisms/SectionPlanning.md)
  - Centered CardSection above a responsive grid of cards with text and a call-to-action link.
- [**SectionThemes**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/organisms/SectionThemes.md)
  - Titled section with an optional description above a responsive grid of theme cards.
- [**TalentAwardSection**](https://github.com/fdnd-agency/adconnect/blob/dev/docs/components/organisms/TalentAwardSection.md)
  - Talent Award overview composing the winners, an intro card, and a nominations carousel.
