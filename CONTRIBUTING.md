# Contributing

Please _read_ before contributing to UI Kit as we settled on some informal
processes to keep components in UI Kit of a _high standard_ with _coherent_ APIs.

## Criteria for components in UI Kit

These are general and loose rules components in UI Kit should strive to fulfill.

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

## Development

### Testing

We split our testing in three parts: functionality, visual and the final bundle. We use separate tools for these, and we try to avoid overlap.

#### Functionality testing

- write tests from a user perspective, not from a dev perspective
- we test using `react-testing-library`
  - we have `test-utils` as a thin wrapper which sets up the context of tested components
  - we avoid `beforeEach` as it leads to test coupling
  - an `it` can describe the flow of a user
  - it is okay to have many `expect` statements in an `it`
  - code comments can help explain the `expect`s better
- avoid testing for visuals (classnames or the DOM structure)
  - the user does not care about the DOM structure or the classnames themselves
  - use visual testing instead (see below)
- if mocking is required, try to do it at the level the user interacts with the component
  - Examples
    - good: mocking network responses
    - bad: mocking a fetching component
  - Try to keep mocking minimal. The less we mock, and the later we mock, the more our tests will cover and the more confidence we gain that our components work

#### Visual testing

- we will use a tool called [Percy](https://percy.io/) for visual regression testing
- we test the components from the produced bundle
  - this gives us confidence that the bundling process works
  - this tests components under conditions closer to how consumers would use them
  - this helps us to avoid accidentally not exposing implemented components from the main `index.js` file
- we test components in multiple states in one snapshot
  - it is nice to see all states in one snapshot
  - it uses less snapshots (we have a monthly budget)
  - we use custom components called `Suite` and `Spec` to surround our component-under-test, which makes the review easier
  - we set a min-height for every `Spec` to ensure that changes in height of a component's state don't break the visual diff of states following below that
- we can currently not "interact" with components (like opening a dropdown menu) before taking a screenshot. We might be able to solve this by using Puppeteer in the future, but we wanted to get up and running first.

#### Bundle testing

We have test files ending with `*.bundlespec.js`. They are used to test the bundle produced by the rollup build. It is necessary to run the build before running these tests. We use these to further ensure that our bundling process works.

## Releasing

The release process is _semi-automated_: you only need to **manually** trigger it and [Travis](https://travis-ci.org/commercetools/ui-kit/) will take care of the rest. All automated releases go the the `next` distribution channel. This gives us a chance to test releases out before making them offical by moving the `latest` dist-tag along.

<details>
  <summary>
  Why we don't use <code>semantic-release</code>
  </summary>

> We do not use semantic-release but we follow its conventions closely. Using semantic-release would have the downside that we'd need to educate all contributors about proper commit messages (or take great care while squash-merging).

</details>

### The steps to prepare and trigger a release to `next` are as follows:

- ensure you are on the latest `master` branch
- update the `CHANGELOG.md`
  - run `yarn changelog` to get a code snippet of the important commits from the last release
  - copy that and paste it into `CHANGELOG.md` file
  - make sure that the git tag references are correctly defined and the top entry represents the _new_ tag that you are about to create
  - add or modify the generated changelog to provide more context about the new release
- bump the `version` in the `package.json`
- make a commit and push it to `master` (e.g. `git commit -am "chore: bump version to 2.0.0, update changelog"`)
  - if you can't push it directly to `master`, open a Pull Request first
- at this point you can create the `tag`: `git tag -m "Version v2.0.0" v2.0.0`
  - the tag name is the `version` string in the `package.json` plus the prefix `v`
- push the tag: `git push --tags`

From that point on, [Travis](https://travis-ci.org/commercetools/ui-kit/) will take over the release: build the bundles, publish to `npm` and update branch for the documentation website (see below).

### Moving the `latest` dist-tag to a release:

After testing the `next` release on a production project, it's time to move to the `latest` dist-tag to make the release official.

```bash
$ npm dist-tag add @commercetools-frontend/ui-kit@<version> latest
```

### About release-candidates & alpha / beta versions

Having release candidates is not necesssary when using dist tags:

> "With semantic-release it’s discouraged to put information about stability into the version number (i.e. 1.0.0-beta or 2.0.0-rc1) because it’s mixing things up. The tool you can use to comunicate stability are npm’s dist-tags. The last paragraph of this section should give you some hints: https://github.com/semantic-release/semantic-release#how-does-it-work"
>
> boennemann, [source](https://gitter.im/semantic-release/semantic-release/archives/2015/08/26)

## Publishing documentation website

The documentation is currently built with [Storybook](https://storybook.js.org) and is hosted on [Netlify][netlify].

By default, only _Deploy Previews_ (Pull Requests) are deployed to [Netlify](https://www.netlify.com). The _Production_ website is deployed from the branch `master`.

## Translations (i18n)

The UI Kit uses `react-intl`. The core messages are written down in `messages.js` files.

The translations for the supported languages exist in the `/i18n` folder. We do not use any automated translation software.

### Adding new messages

In case you are working on a component and you want to add a completely new message, you should add it to (or create a) `messages.js` file. See the other `messages.js` files as a reference.

After adding the message(s), you need to run `yarn i18n:build`. This will modify the language files in `/i18n` by adding empty translations for the message keys.

### Editing translations

If you want to modify an existing translation, you will need to manually edit the related files in `/i18n`.

## How to add a component to UI Kit.

These are informal steps we suggest you to follow when adding a new component.

1.  Create a new task to add the component to the UI Kit.

    - [ ] Create task.
    - [ ] Add task to the MCD project.
    - [ ] Add task to the [UI Kit Kanban Board].

2.  Sync with the UI Kit leads

    - [ ] Notify @lufego or @dferber90 of the task.

3.  Create documentation for the component **UNDECIDED**

    - [ ] Create copy of [UI Kit Component Documentation Template].
    - [ ] Add copy to the [UI Kit Component Documentation List] page.
    - [ ] `Designer` & `Dev` go through the copy and update it for the new component.

4.  Align design with style guide

    - [ ] `Designer` checks the style guide restrictions and makes sure no elements are being duplicated.

5.  Create design for the component (if it hasn't been done already).

    - [ ] `Designer` creates the design for the component.

6.  Review new design

    - [ ] `Designer` & `Dev` review the component's design.

7.  Sync with the UI Kit leads

    - [ ] Notify @lufego or @dferber90 of the new design.

8.  Open a Github issue with the API proposal for the new component **_optional_**

    _When the implementation of a component takes a lot of effort, or when multiple APIs are possible, it might be a good idea to open an issue first to discuss the API or to avoid doing unnecessary work._

    - [ ] i. `Dev` opens a Github issue on the MC Frontend repo describing the API proposal for the new component.
    - [ ] Use PropTypes to describe the component's props.
    - [ ] Show example usage of the component.

9.  Develop the component and open a PR to add the component to the UI Kit.

    - [ ] Open a PR to add the component to the UI Kit.
    - [ ] PR is approved by either Luis or Dominic or both.

10. UX Review

    - [ ] `Designer` conducts the UX review on the component.

11. Component is merged

    - [ ] `Designer` adds component to UI Kit Sketch file.

12. Migrate component to MC.
    - [ ] Component is used only where needed for the user story.
    - [ ] Update component status on the UI Kit Kanban board.

### When and how to change an existing component in UI Kit

- Changing an existing component should be done with a _certain degree_ of care.
  Please assume that the current API has been wrestled over.
- If you want to add some functionality, consider if it should really be a
  concern of the component you want to enhance. For this:
  - The functionality should be applicable for a wide range of current and future
    requested features. What is in _UI Kit should be basic building blocks_ that
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

- [Process Diagram](https://wiki.commercetools.com/display/DD/MC+UI+KIT+Component+Process)
- [Kanban Board](https://jira.commercetools.com/secure/RapidBoard.jspa?rapidView=138&view=detail&selectedIssue=MCD-1104)
- [Component documentation template](https://wiki.commercetools.com/display/DD/2.+UI+Kit+-+Components+Building+Documentation+Guide)
- [Component documentation list](https://wiki.commercetools.com/display/DD/3.+Components+-+Documentations)
