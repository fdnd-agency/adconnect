# Rules for the project

## Rules within the team

- We'll hold a standup every working day
- Communication through Teams
- Keep up with the progress by using the projectboard (close own issues)
- Follow the agreed-upon workflow (see teamcanvas).
- Communicate when you get stuck.
- Take the lead during the sprintreview and sprintplanning.
- Set clear deadlines: Every task or issue must include a realistic deadline to ensure steady progress and shared expectations.
- At the start of the sprint divide tasks and break them down into smaller components.
- At the end of the sprint hold a short feedback round for each team member.
- Ask for feedback during the process from teammates.
- Respond to messages within 2 hours, after 5 PM respond the next day.
- Report absence at least 1 hour in advance, at the agreed time.
- First discuss together whether we can solve problems ourselves, then ask questions and reach out to a teacher/other team.

## Agreements with client

- Productowner: Erwin de Beer.
- Communication through e-mail and if necessary through teams.
- Feedback may be given at any moment, also between sprintreviews.
- Communicate clearly with the client to avoid miscommunications.

## Teamcanvas

<img width="1226" height="870" alt="afbeelding" src="https://github.com/user-attachments/assets/3b9bfd3b-8e6f-4015-b397-12366342885d" />


## Workflow

- We work by using issues and feature branches.
- Add deadlines to your issue/task.
- First merge the development branch to your work before you commit.
- Merge to the development branch. NOT THE MAIN, after everything for that sprint is done and provided with feedback, dev can be merged to main.
- Make a PR for your work:
  - Assign all team members
  - Process all feedback and tag team member
  - When a team member gives positive feedback on your PR, you're allowed to merge to the DEV branch.

### Pull Requests

- Always tag each other for a review.
- Use the PR-template.
- [Pull request conventions](https://github.com/fdnd-agency/adconnect/blob/dev/docs/conventions/pull-request-conventions.md)

### Issues & project board

- Assign yourself to issues.
- Always create an issue for what you're working on.
- **To do**: what still needs to be done.
- **In progress**: when you're working on it.
- **Done**: when a review has been given and it's on main.
- Check the project board during standups

### Visuals
- Screenshots/Screenrecord

## Our Git Flow

We follow the Git Flow of [FDND agency](https://docs.fdnd.nl/conventies.html#branching-strategy).

<img width="536" height="643" alt="image" src="https://github.com/user-attachments/assets/522ae521-4c91-4c00-93aa-bf11d44c5ff6" />

## FDND conventions

We follow the code conventions of FDND agency. Below the most important conventions.
[See FDND website](https://docs.fdnd.nl/conventies.html)  
For conventions that developers work with more frequently, we provided clearer explanations along with code examples, ensuring that everyone on the team follows the same approach and coding style.

### Code conventions with examples

- [Atomic design](https://github.com/fdnd-agency/adconnect/blob/dev/docs/conventions/atomic-design-conventions.md)
- [Conventional commits](https://github.com/fdnd-agency/adconnect/blob/dev/docs/conventions/conventional-commits.md)
- [Css conventions](https://github.com/fdnd-agency/adconnect/blob/dev/docs/conventions/css-conventions.md)
- [HTML conventions](https://github.com/fdnd-agency/adconnect/blob/dev/docs/conventions/html-conventions.md)
- [Javascript conventions](https://github.com/fdnd-agency/adconnect/blob/dev/docs/conventions/javascript-coventions.md)
- [Naming conventions](https://github.com/fdnd-agency/adconnect/blob/dev/docs/conventions/naming-conventions.md)
- [Sveltekit conventions](https://github.com/fdnd-agency/adconnect/blob/dev/docs/conventions/sveltekit-conventions.md)

### Design conventions

- Make user-friendly and accessible designs.
- Work together in design systems and validate designs in both Figma and the browser.
- Use variables, styles en organize your Figma-files effectively.

## Definitions of Ready

A Definition of Ready (DoR) is a set of criteria that a user story must meet before the team can start working on it in a sprint.
It ensures that the story is clear, feasible, and valuable, so the team doesn’t waste time figuring things out mid-sprint.

### Definitions of Ready - checklist

- User story written clearly with format "As a.... I want to.... So that...." and approved by Product Owner.
- Know the scope. Know what you will be working on in this user-story so you'l lalso know what NOT to work on.
- Acceptance criteria defined (what “done” looks like).
- Sources or research material available. 
- Give a weight/value to the user story. Use poker planning with the Modified Fibonacchi set of values.
- Story estimated and added to sprint backlog.

## Definitions of Done

A Definition of Done (DoD) is a shared checklist of criteria that a product increment must meet before it is considered complete, releasable, and ready for customers.

### Definitions of Done - checklist
When you create a pull request, perform the following tests and checks to ensure your code meets the FDND code conventions and works in all situations. Fix any merge conflicts before requesting a review, and make sure your own code won’t break the dev branch.

Testing
- HTML validator
- Browser testing (Browserstack)
- Lighthouse Performance test
- Device testing
- User testing
- Responsiveness checks
- Lighthouse Accessibility test
- Manual Accessibility testing ([a11y checklist](https://www.a11yproject.com/checklist/))

Code
- FDND conventions are followed, Check for [coventions](https://docs.fdnd.nl/conventies.html) relevent to your code
- Remove commented-out code
  - We should be able to read and understand your code without detailed explanations, those belong in the /docs
- Prevent repeated code (DRY principle)

> These checks are meant for all situations, it is posible to skip 1 or more of the checks.  
please provide valid reasons oth the reviewers might asks you to perform them or ask why the test is missing
