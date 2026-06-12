# Handover Document

## 1. Introduction

This document provides an overview of the current status of the ADconnect project. It is intended for the next team that will continue development, so they can quickly understand what has been completed, what is currently operational, and which parts still require attention.

The document covers the current website state, the admin panel, known limitations, important technical challenges, and recommended next steps.

## 2. Current project status

The pages that are currently available on the development environment have also been made available on the live website. These pages are, for the most part, finished, tested and approved by the client.

The public-facing website currently contains several completed pages with dynamic content. Most of the visible text and buttons are loaded from Directus collections, which means that the content is not fully hardcoded anymore.

On the admin side, the content types that are currently available in the admin panel are fully operational. This means that all supported admin actions work correctly for the content types that have already been implemented.

Supported actions include:

- creating content
- editing content
- publishing content
- depublishing content
- deleting content
- uploading files
- replacing files
- previewing content where implemented

At this stage, the admin panel should be seen as the preferred way for ADconnect administrators to manage content. Directus itself should eventually only be used as the underlying CMS/database layer, not as the main editing environment for the client.

## 3. Finished work

The following parts are currently considered finished or operational:

### Public website

The currently available public pages are finished and live. These pages have mostly been tested and approved by the client.

The public pages use data from Directus where possible. This includes dynamic text, buttons and content sections that are connected to Directus collections.

### Admin panel

The admin panel currently supports a number of content types. For these content types, all available actions are working as expected.

This means that the admin can manage the currently implemented content types without needing to manually edit the data directly in Directus.

## 4. Current limitations

Although the current implementation is functional, there are still important limitations that the next team should be aware of.

### Not every page is fully editable

Several pages contain dynamic text and buttons that are stored in Directus collections, but not every page is fully manageable through the admin panel yet.

This was mainly caused by time constraints. The current solution works, but should be seen as a practical temporary solution rather than the final ideal setup.

### Dynamic pages are not yet fully flexible

The client would like the website to become much more dynamic. Ideally, ADconnect administrators should be able to edit every part of a page, including:

- text
- buttons
- images
- layout sections
- page-specific content
- potentially the order and structure of page layout

This is currently not fully supported.

The current implementation is more structured and content-type based. It does not yet work like a page builder where the client can fully design or rearrange pages.

### Admin panel still needs expansion

The admin panel only supports the content types that have already been implemented. Future content types will also need to be added to the admin panel.

The long-term goal should be that all content management happens through the admin panel, not directly through Directus.

## 5. Biggest technical challenge

The biggest challenge for the next team is making the website fully dynamic and editable by ADconnect administrators.

The client has expressed the wish for a more flexible editing experience. This means that the next team should carefully investigate how far this flexibility should go.

There is an important difference between:

1. making text and images editable, and
2. building a full page builder where the client can also control layout and page structure.

The second option is much more complex and should be discussed in detail with the client before implementation.

The next team should make sure there is a clear agreement on what “fully dynamic” means. Without a clear scope, this feature can become too large and difficult to finish within the available project time.

## 6. Remaining work

The following features and improvements still need to be developed or discussed further with the client.

### Dynamic content and page editing

- Make every page fully dynamic where possible.
- Decide together with the client how much control administrators should have over layout and page structure.
- Add admin panel support for page-specific content collections.

### New design implementation

- Implement the newly made design system.
- Replace the current styling where needed.
- Make sure all existing pages follow the new design.
- Keep the public website visually consistent.

### Admin panel expansion

- Add every future content type to the admin panel.
- Make sure each content type supports the required actions.
- Keep create, edit, publish, depublish and delete flows consistent.
- Avoid making Directus the main editing tool for the client.

### Cooperation pages

- Add a detail page for each cooperation.
- Show basic information about the cooperation.

### Event pages

- Add an overview page for events.
- Add detail pages for individual events.
- Make sure event data can be managed properly.

### Preview functionality

- Extend preview functionality where needed.
- Make sure detail pages, such as cooperation and event pages, can be previewed before publishing.
- Keep preview behaviour consistent across content types.

### Mobile improvements

- Make sure nominee pictures are visible and displayed correctly on mobile devices.
- Test important pages on multiple screen sizes.
- Fix responsive layout issues where needed.

## 7. Recommended next steps

### 1. Implement the new design system

The first priority should be implementing the new design system and replacing the current visual design where needed.

This has been an important request from the client and should be handled early, because it affects many parts of the website. Implementing the design system first will also make it easier to build future pages consistently.

### 2. Discuss the dynamic page requirements with the client

The next team should have a detailed discussion with the client about the wish to make pages fully dynamic.

Important questions to ask:

- Should administrators only be able to edit text and images?
- Should administrators be able to add and remove sections?
- Should administrators be able to change the order of sections?
- Should administrators be able to fully control page layouts?
- Which pages need this functionality first?
- Is a full page-builder experience expected, or is structured content editing enough?

This discussion is important because the technical solution depends heavily on the client’s expectations.

### 3. Expand the admin panel

The admin panel should continue to grow together with the available content types.

The admin panel should become the central place for content management.

## 8. Notes for the next team

The current implementation of the dynamic pages is functional, but it was built under time constraints. Some parts are therefore practical solutions rather than final long-term solutions.

The most important advice is to keep the project understandable for future students. This means:

- keep server files readable
- keep Directus communication centralised
- document important systems
- keep the admin panel consistent
- avoid unnecessary duplication
- discuss large features with the client before building them

## 9. Conclusion

The project is in a usable state. The available public pages are live, and the currently implemented admin content types are operational.

The biggest remaining challenge is expanding the dynamic content system so that ADconnect administrators can manage more of the website themselves. This should be handled carefully, because the client’s expectations may require a much larger technical solution than the current setup supports.

The next team should focus first on the new design system, then on clarifying and implementing the dynamic page requirements, and finally on expanding the admin panel for all future content types.
