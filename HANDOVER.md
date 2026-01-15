# Handover

## 1. Introduction

This document provides an overview of the current project status, including completed pages, test results, and the website structure. It is intended for the team taking over the project, so they can quickly gain insight into the progress and concept.

## 2. Status project

### Completed Pages

The following pages have been fully tested and are ready for use:

- Home
- News & News Detail Page
- Contact
- About Us
- Talent Awards
- About Ad
- Theme Detail Page
- Ad Day

### Tests Performed

The following tests have been conducted on the above pages according to the **RAPPE principles**:

- Performance Test
- Responsive Test
- Accessibility Test
- Browser Test

### Concept and Target Audience Segmentation

Together with first-year students, a concept has been developed to reach the right audience via tabs in the top navigation menu:

- Target Audiences: Professionals, Students, Employers
- Functionality: Clicking on a target audience shows the relevant pages, making content tailored and easy to access for the visitor.

### Website Structure

Based on issue #15, the website structure has been revised. Example structure for the **Students** target audience:

- `/students` – Home page for students
- `/students/about-ad` – About Ad page for students
- `/students/news` – News for students
- `/students/talent-awards` – Talent Awards page for students

## Status

### Key Features Already Working

#### 1. View Page Transitions
- New pages slide in from the right when navigating forward; going back reverses the animation for logical flow.
- Utilizes the View Transitions API (`document.startViewTransition`) for smooth navigation.
- Determines navigation direction (forwards/backwards) based on URL to support visual hierarchy.
- Animations controlled via CSS classes on `<html>` combined with `@keyframes`.
- Waits for scroll-to-top before starting the transition to maintain visual focus.
- Enabled on desktop screens (`min-width: 768px`) to keep mobile interactions minimal.
- Respects `prefers-reduced-motion` and gracefully falls back when unsupported.
- Considered an enhancement rather than core functionality.  

#### 2. Filter Publications
- Built with semantic HTML using `<a>` elements.
- Server-side rendered**, so filtering works even when client-side JS is disabled.
- Fully responsive and accessibility tested.  

#### 3. Cooperation Carousel
- Semantic HTML structure: `<ul>` containing `<li>` elements with `<a>` wrapping `<img>`.
- Mobile-first approach, enhanced for larger screens with `@media` queries.
- Carousel created as a reusable component for multiple pages.
- Fully responsive and accessibility tested.
- All logos/data dynamically fetched from the Directus API.  

#### 4. Cards
- Semantic HTML: `<article>` with `<h3>`, `<p>`, and `<a>` elements.
- Multiple tests performed: Accessibility, Performance, and older browser compatibility.
- Responsive layout implemented using CSS grid.
- Uses components within components for modularity.
- All card data dynamically loaded from server JS.

## 3. Biggest points of attention and challenges

The most important focus of this project is the navigation system. On the old website, the navigation was complex, unclear, and not tailored to the different target audiences. For the new website, we designed a clearer and more structured navigation approach.

We introduced two navigation levels: a top navigation and a bottom navigation.

<img width="1452" height="162" alt="Scherm­afbeelding 2026-01-12 om 16 04 52" src="https://github.com/user-attachments/assets/0424e32e-ef7e-4aff-9aee-33a6dd71368a" />

Top navigation
The top navigation focuses on the three main target groups: Professionals, Students, and Employers. In addition, it includes general pages such as About Us and Contact, which are relevant to all audiences.

<img width="1454" height="48" alt="Scherm­afbeelding 2026-01-12 om 16 05 27" src="https://github.com/user-attachments/assets/501fd6d8-8471-4d29-bb42-a347a730ec2b" />

Bottom navigation
The bottom navigation contains target-group-specific topics, designed to directly address the interests and needs of each audience.

<img width="1450" height="113" alt="Scherm­afbeelding 2026-01-12 om 16 05 55" src="https://github.com/user-attachments/assets/f7e5082d-2f9d-4d48-9466-5427fc5da44d" />

At this stage, we have fully developed the Professionals section of the website. The Students and Employers sections are still under development. The specific topics related to each target group will be discussed further with the client.

For the Students section, we created a character that can be used as a mascot on student-related pages.

<img width="200" height="250" alt="Scherm­afbeelding 2026-01-12 om 16 06 31" src="https://github.com/user-attachments/assets/408f2334-506d-4b56-8c36-1b5b4f8d13df" />

A key challenge is ensuring that the navigation works intuitively: when a user selects Students, they should only see student-related pages; the same applies to Employers and Professionals. 

in issue #15 you can find more related content that will give more clariry about the navigation setup 

## 4. First step for the next team

The recommended first step for the next team is to clearly define and refine all target groups for the AdConnect website together with the product owner. At the moment, the platform distinguishes between students and professionals, but during the project it became clear that the group “professionals” may actually consist of multiple sub-groups with different needs, such as employers, study advisors, HR managers, or partner organisations.

By mapping out these target groups in more detail, the team can better understand who AdConnect is really serving and what information each group is looking for about Associate Degrees. This makes it much easier to decide what content should be shown to whom, which user stories are needed, and which features should be prioritised.

Once these groups are clearly defined, tasks can be divided more effectively within the team, content can be structured more logically, and the website can be designed in a way that fits the goals of each user group. This prevents confusion, reduces the risk of building irrelevant features, and ensures that AdConnect provides clear and relevant information about Associate Degrees to everyone who uses the platform.
