# Rules for the project

## Rules within the team

- We'll hold a standup every Monday, Wednesday, and Friday
- Communication through Teams
- Keep up with the progress by using the projectboard (close own issues)
- Follow the agreed-upon workflow (see teamcanvas).
- Communicate when you get stuck.
- Take the lead during the sprintreview and sprintplanning.
- Set clear deadlines: Every task or issue must include a realistic deadline to ensure steady progress and shared expectations.
- At the start of the sprint divide tasks and break them down into smaller components.
- At the end of the sprint hold a short feedback round for each team member.
- Ask for feedback during the process from teammates.

## Agreements with client

- Productowner: Erwin de Beer.
- Communication through e-mail and if necessary through teams.
- Feedback may be given at any moment, also between sprintreviews.
- Communicate clearly with the client to avoid miscommunications.

### Upcoming sprint reviews

- 9th of October: Sprintreview (15:30 - 16:00)
- 30th of October: Sprintreview
- 27th of November: Sprintreview
- 18th of December: Sprintreview

## Teamcanvas

<img width="982" height="690" alt="Image" src="https://github.com/user-attachments/assets/b6a47b12-243f-43c9-a4ae-047b1689f128" />

## Workflow

- We work by using issues and feature branches.
- Add deadlines to your issue/task.
- First merge the development branch to your work before you commit.
- Merge to the development branch. NOT THE MAIN.
- Make a PR for your work:
  - Assign all team members
  - Process all feedback and tag team member
  - When a team member gives positive feedback on your PR, you're allowed to merge to the DEV branch.

## Naming Branch

Branches should be created directly from the feature issue using the “Create New Branch” button.
The branch name must include the branch number and a clear issue name.

<img width="336" height="149" alt="Scherm­afbeelding 2026-01-12 om 15 35 26" src="https://github.com/user-attachments/assets/46fc7692-f7bd-403e-977f-319f0e39b678" />




## PR Template

### What has changed?

- Link to issues (use a `#`)
- Explain what changes you've made
- Explain on which items/code you want to receive feedback

### Visuals

- Screenshots/Screenrecord

## Our Git Flow

We follow the Git Flow of [FDND agency](https://docs.fdnd.nl/conventies.html#branching-strategy).

<img width="536" height="643" alt="image" src="https://github.com/user-attachments/assets/522ae521-4c91-4c00-93aa-bf11d44c5ff6" />

## FDND conventions

We follow the code conventions of FDND agency. Below the most important conventions.
[See FDND website](https://docs.fdnd.nl/conventies.html)

### Code conventions

- Follow consistent naming
- Follow best practices for HTML-structure and semantics.
- Use CSS-nesting, pseudo-private custom properties and use a dynamic colour palette.
- Use template literals, object destructuring and choose wisely between const, let en var.
- Label commits clearly (fix:, docs:, style: etc)
- Follow guidelines for data, routes, component-structure and CSS within SvelteKit-projects.
- Atomic: each commit does one thing (one bugfix, one feature, one refactor, one test addition).

### Design conventions
- Make user-friendly and accessible designs.
- Work together in design systems and validate designs in both Figma and the browser.
- Use variables, styles en organize your Figma-files effectively.

## Rules implementing container queries
- Use container queries only when component resizing is needed.
- Add an extra (div) wrapper only if it has a clear structural purpose (for example grouping/separating elements).
- Give containers clear and consistent names.
- Apply `@container` to the nearest logical parent of the component.
- Mention new or changed container query usage in your pull request.

## Rules implementing media query user preferences
- Always start with default CSS and add media queries as overrides.
- Keep it simple and semantic with clear names like `@media (prefers-color-scheme: dark)`.
- Use only what is relevant for UX.
- Group related rules together such as all `prefers-reduced-motion` styles.

## DoR:

A Definition of Ready (DoR) is a set of criteria that a user story must meet before the team can start working on it in a sprint.
It ensures that the story is clear, feasible, and valuable, so the team doesn’t waste time figuring things out mid-sprint.

### DoR's:
- User story written clearly with format "As a.... I want to.... So that...." and approved by Product Owner.
- Acceptance criteria defined (what “done” looks like).
- Sources or research material available.
- Poker planned.
- Story estimated and added to sprint backlog.
- No external dependencies (e.g., waiting for content from another team).

## DoD:

A Definition of Done (DoD) is a shared checklist of criteria that a product increment must meet before it is considered complete, releasable, and ready for customers.

### DoD's:
- Acceptance Criteria
- Accessibility (A11y)
- Tested
- Reviewed
- PR Merged
- Deployed to Staging
