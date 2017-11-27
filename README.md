# UI Kit

This module contains the official UI Kit for developing the MC UI.

You can find the _living styleguide_ [here](https://mc.escemo.com/styleguide).

## Why UIKit

* Declarative components serving as a design guide
* Shared independently from the application's code base
* Used across different apps consumed by different teams
* Shared language between developers and designers

## Contributing

Please _read_ before contributing to UIKIt as we settled on some informal
processes to keep components in UIKit of a _high standard_ with _coherent_ APIs.

### Criteria for components in UIKit

These are general and loose rules components in UIKIt should strive to fulfill.

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
    until the new component has been added to UIKIt
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

### When/How to change an existing UIKit-Component

* Changing an existing component should be done with a certain degree of care.
  Assume that the current API has been wrestled over.
* If you want to add some functionality, consider if it should really be a
  concern of the component you want to enhance. For this:
  * The functionality should applicable for a wide range of current and future
    requested features. What is in UIKit should be basic building blocks that in
    theory can be used in a wide range of applications, even outside of
    Commercetools.
  * When in doubt orient yourself more towards the functionalities of the
    original html-tags than towards anything more complex.
* Always remove unneeded functionality as soon as you spot it
* Avoid breaking changes to the API of the component, make sure you have checked
  all usages of the component you change for potential problems. Be aware that
  UIKit is an individually published package and might be used in a wide-range
  of applications
* Before you implement your changes, create a Github issue stating your need for
  the required functionality, describe your proposed changes and also give an
  indication of the scope and implications of that change.
* Make sure you also ping the design team about your changes to get their
  feedback
* Implement your changes and put them up for code review
* Update Storybook, all documentation and usage examples
* Migrate all code that will immediately be affected by your changes
* Make sure that your changes are released under proper semver-rules so others
  know when to update their code in accordance to your changes

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
