## Contributing

Please _read_ before contributing to UIKit as we settled on some informal
processes to keep components in UIKit of a _high standard_ with _coherent_ APIs.

### Criteria for components in UIKit

These are general and loose rules components in UIKit should strive to fulfill.

- General purpose and a core building block (of an application)
- Isolated behaviour agnostic to its environment (not easy to reach into
  internals)
- Agreed and signed off by the design team (collaboration and sharing during
  development)
- Easy to compose (components should be combinable)
- Visual representation (a storybook serves as shared visual of different
  states)
- Documentation of prop-types and usage patterns
- Sensible defaults for props which are not a hard requirement

### How to add a component to UI Kit.

These are informal steps we suggest you to follow when adding a new component.

1.  Create a new task to add the component to the UIKit.

    - [ ] Create task.
    - [ ] Add task to the MCD project.
    - [ ] Add task to the [UIKit Kanban Board].

2.  Sync with the UIKit leads

    - [ ] Notify @lufego or @dferber90 of the task.

3.  Create documentation for the component **UNDECIDED**

    - [ ] Create copy of [UIKit Component Documentation Template].
    - [ ] Add copy to the [UIKit Component Documentation List] page.
    - [ ] `Designer` & `Dev` go through the copy and update it for the new component.

4.  Align design with style guide

    - [ ] `Designer` checks the style guide restrictions and makes sure no elements are being duplicated.

5.  Create design for the component (if it hasn't been done already).

    - [ ] `Designer` creates the design for the component.

6.  Review new design

    - [ ] `Designer` & `Dev` review the component's design.

7.  Sync with the UIKit leads

    - [ ] Notify @lufego or @dferber90 of the new design.

8.  Open a Github issue with the API proposal for the new component **_optional_**

    _When the implementation of a component takes a lot of effort, or when multiple APIs are possible, it might be a good idea to open an issue first to discuss the API or to avoid doing unnecessary work._

    - [ ] i. `Dev` opens a Github issue on the MC Frontend repo describing the API proposal for the new component.
    - [ ] Use PropTypes to describe the component's props.
    - [ ] Show example usage of the component.

9.  Develop the component and open a PR to add the component to the UIKit.

    - [ ] Open a PR to add the component to the UIKit.
    - [ ] PR is approved by either Luis or Dominic or both.

10. UX Review

    - [ ] `Designer` conducts the UX review on the component.

11. Component is merged

    - [ ] `Designer` adds component to UIKit Sketch file.

12. Migrate component to MC.
    - [ ] Component is used only where needed for the user story.
    - [ ] Update component status on the UIKit Kanban board.

### When and how to change an existing component in UIKit

- Changing an existing component should be done with a _certain degree_ of care.
  Please assume that the current API has been wrestled over.
- If you want to add some functionality, consider if it should really be a
  concern of the component you want to enhance. For this:
  - The functionality should be applicable for a wide range of current and future
    requested features. What is in _UIKit should be basic building blocks_ that
    in theory can be used in a wide range of applications, even outside of
    commercetools.
  - When in doubt take inspiration from functionalities of the original
    HTML-tags than towards anything more complex.
- Always _remove unneeded functionality_ as soon as you spot it
  - This helps us to get components simple, consistent and easy to use
- _Avoid breaking changes_ to the API of the component. If you need to create
  breaking changes follow these steps
  - Make sure you have checked all usages of the component you change for
    potential problems
  - Inform all developers about the plan in the chats as pull requests might be
    open and other features already planned
  - Start with creating a deprecation notice on the component's functionality
    using the `warning` package (examples exist)
  - Ensuring that no consumer still uses the deprecated API after some time
  - Remove the deprecated feature
- Before you implement your changes, _create a Github issue_ stating your need
  for the required functionality, describe your proposed changes and also give
  an indication of the scope and implications of that change.
- Make sure you also _ping the design team_ about your changes to get their
  feedback
- Implement your changes and put them _up for code review_
- Update Storybook, all documentation and usage examples
- Migrate all code that will immediately be affected by your changes

### Resources

[uikit process diagram]: https://wiki.commercetools.com/display/DD/MC+UI+KIT+Component+Process
[uikit kanban board]: https://jira.commercetools.com/secure/RapidBoard.jspa?rapidView=138&view=detail&selectedIssue=MCD-1104
[uikit component documentation template]: https://wiki.commercetools.com/display/DD/2.+UI+Kit+-+Components+Building+Documentation+Guide
[uikit component documentation list]: https://wiki.commercetools.com/display/DD/3.+Components+-+Documentations
