# UI Kit

This module contains the official UI Kit for developing the MC UI.

You can find the _living styleguide_ [here](https://mc.escemo.com/styleguide).

## Why UIKit

* Declarative components serving as a design guide
* Shared independently from the application's code base
* Used across different apps consumed by different teams
* Shared language between developers and designers

## Ownership

The UIKit is owned **by all developers and designers** working on the MC,
meaning that there it not a single person or a single team responsible for it.

There might be some assigned person(s) driving and coordinating its development
but eventually decisions are made together (see Contributing section below).

This implies that everyone should and is welcomed to contribute to it, just like
an OSS library.

## Contributing

Please _read_ before contributing to UIKit as we settled on some informal
processes to keep components in UIKit of a _high standard_ with _coherent_ APIs.

### Criteria for components in UIKit

These are general and loose rules components in UIKit should strive to fulfill.

* General purpose and a core building block (of an application)
* Isolated behaviour agnostic to its environment (not easy to reach into
  internals)
* Agreed and signed off by the design team (collaboration and sharing during
  development)
* Easy to compose (components should be combinable)
* Visual representation (a storybook serves as shared visual of different
  states)
* Documentation of prop-types and usage patterns
* Sensible defaults for props which are not a hard requirement

### How to add to UIKit

These are informal steps we suggest you to follow when adding a new component.

* Extract development of the component into a separate user story
  * Recommended if possible - often times alternative components can be used
    until the new component has been added to UIKit
* Try to map out usages in applications and try to anticipate additions to the
  component
  * E.g. when developing radio buttons, checkboxes might be next
* Create an GitHub issue with a screenshot of component states and propose an
  API
  * Use `PropTypes` and give examples of usages of the component
* Inform the design team about any inconsistencies in state or design found in
  the process of API specification (most are on GitHub)
* Develop the component(s) and put them up for code review
* Only later migrate the application to use the newly developed component

### When and how to change an existing component in UIKit

* Changing an existing component should be done with a _certain degree_ of care.
  Please assume that the current API has been wrestled over.
* If you want to add some functionality, consider if it should really be a
  concern of the component you want to enhance. For this:
  * The functionality should applicable for a wide range of current and future
    requested features. What is in _UIKit should be basic building blocks_ that
    in theory can be used in a wide range of applications, even outside of
    commercetools.
  * When in doubt take inspiration from functionalities of the original
    HTML-tags than towards anything more complex.
* Always _remove unneeded functionality_ as soon as you spot it
  * This helps us to get components simple, consistent and easy to use
* _Avoid breaking changes_ to the API of the component. If you need to create
  breaking changes follow these steps
  * Make sure you have checked all usages of the component you change for
    potential problems
  * Inform all developers about the plan in the chats as pull requests might be
    open and other features already planned
  * Start with creating a deprecation notice on the component's functionality
    using the `warning` package (examples exist)
  * Ensuring that no consumer still uses the deprecated API after some time
  * Remove the deprecated feature
* Before you implement your changes, _create a Github issue_ stating your need
  for the required functionality, describe your proposed changes and also give
  an indication of the scope and implications of that change.
* Make sure you also _ping the design team_ about your changes to get their
  feedback
* Implement your changes and put them _up for code review_
* Update Storybook, all documentation and usage examples
* Migrate all code that will immediately be affected by your changes

## Structure

* `Buttons`: contains button components (e.g. primary button, flat button)
* `DatePicker`: contains date picker components for different time scales
* `TimeRangePicker`: contains a time range picker (from and to time)
* `Dropdowns`: contains dropdown components (e.g. primary action dropdown)
* `Icons`: contains SVG icons (auto generated from `.svg`-files)
* `Label`: contains label components (e.g. for indicating something critical or
  a warning)
* `Typography`: contains basic components to be used for typography elements
  (e.g. text, titles)
* `Table`: contains the table
* `Tags`: contains tag components of different styles (warning, removable, etc)
* `Materials`: contains the base for composition (colors, spacings, etc)
* `HoCs`: contains Higher Order Components (e.g. for mouse over and -out state
  injection)
