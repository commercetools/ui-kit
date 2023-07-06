# Contributing

Hi, thanks for taking an interest in contributing to the **UI Kit** repository. We welcome any kind of contribution, from reporting issues or idea to submitting pull requests for bug fixes, improvements, new features, etc.

Please take a moment to review this document in order to make the contribution process straightforward and effective for everyone involved.

## Core ideas

The UI Kit repository primarily contains UI components that implement commercetools Design System. The following assumptions and criteria are valid:

- Components are ideally agnostic to any domain-specific functionality or behavior.
- Components are meant to be easily composed with each other.
- Components use Design Tokens defined in the Design System.
- Components are implemented following UX Guidelines.

## Repository structure

This repository is managed as a monorepo, meaning it contains multiple (sub)packages located in the [`packages`](./packages) directory.

```
packages/
  components/
    buttons/
    ...
```

Some of the packages are used as "presets" and live in the [`presets`](./presets) folder. Those simply group other packages together to avoid importing each single one of them, for example `inputs`, `buttons`, etc.

### Development tools

At commercetools we use the following development tools:

#### Pnpm

We use [Pnpm workspaces](https://pnpm.io/workspaces) to manage dependencies between multiple packages.

#### Jest

We use [Jest](https://jestjs.io/) as the main framework for testing. Additionally, we take advantage of the Jest runners to run other tasks such as ESLint.

#### Prettier

We rely on [Prettier](https://prettier.io/) to consistently format our code.

#### TypeScript

We prefer to implement our UI components using [TypeScript](https://www.typescriptlang.org/). This has the benefit of provide packages with type declarations, thus a better developer experience, but also to have the codebase more maintainable and less error-prone.

#### Storybook

We use [Storybook](https://storybook.js.org/) to provide a playground UI to showcase and play around with the UI components.

#### Preconstruct

We rely on [Preconstruct](https://preconstruct.tools/) to build the packages.

#### Commitlint

Commit messages should follow a [conventional commit format](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional).

## Opening an Issue

In general, it's a good idea to open an issue first, no matter if it's a bug report, a new feature, etc. Doing so allows maintainers and other contributors to be aware of the context when an associated pull request is provided. It also gives a chance to provide early feedback and suggestions on what the pull request should focus on and what the expectations, avoiding unnecessary work during a pull request.

### Developing a new component

When planning to work on a new feature/component, we strongly recommend to start with an issue, describing the use case, the expected interactions, etc. Ideally, some basic design or sketches should be provided to give a clear idea of how the component looks like.

If possible, wait for other maintainers or contributors to give a thumbs up before starting development, to make sure the requirements are accepted.

## Submitting a Pull Request

Good pull requests, such as patches, improvements, and new features, are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

If possible, please try to provide a [related issue first](#opening-an-issue), where the topic is discussed and agreed upon before starting to work on that. This is helpful for both you and the maintainers to be familiar with the changes beforehand.

## Getting started

1. Clone the repository.
2. Run `pnpm install` in the root folder to install the dependencies.

At this point you can start working on the UI components in the `packages` folder.

Some useful commands to work with the repository:

- `pnpm test` and `pnpm test:watch`
- `pnpm typecheck`
- `pnpm build`
- `pnpm lint`

## Developing locally

When you develop UI components, it's recommended to start Storybook.

```
pnpm start
```

### Adding translations

The UI Kit uses `react-intl` to define and consume messages. The source/core messages are usually defined in `messages.js` files, co-located to each component that requires messages.

The translations for the supported languages exist in the `/i18n` folder. We do not use any automated translation software.

After adding new messages, you need to run `pnpm extract-intl`. This will modify the language files in `/i18n` by adding empty translations for the message keys.

If you want to modify an existing translation, you will need to manually edit the related files in `/i18n`.

### Adding new icons

To add new icons in the `@commercetools-uikit/icons` package:

1. Add the raw SVG file to the `packages/components/icons/src/svg` folder. Make sure the file name ends with `.react.svg`.
2. Run the `pnpm generate-icons` command to generate the React component files. The components are generated using the `svgo` CLI and the template file `packages/components/icons/src/templates/icon.styles.tsx`.

## Adding changesets

commercetools ui-kit uses [changesets](https://github.com/atlassian/changesets) to do versioning and creating changelogs.

As a contributor you need to add a changeset by running `pnpm changeset`.
The command will prompt to select the packages that should be bumped, their associated semver bump types and some markdown which will be inserted into the changelogs.

When opening a Pull Request, a `changeset-bot` checks that the Pull Request contains a changeset. A changeset is **NOT required**, as things like documentation or other changes in the repository itself generally don't need a changeset.

## Releasing packages

commercetools ui-kit uses [changesets](https://github.com/atlassian/changesets) to do versioning and publishing a release.

A [Changesets release GitHub Action](https://github.com/changesets/action) opens a `Version Packages` Pull Request whenever there are some changesets that have not been released yet.

When the `Version Packages` Pull Request gets merged, the Changesets release GitHub Action will automatically trigger the release.

### Canary releases

On `main` branch, we automatically publish **canary** releases from CI to the `canary` distribution channel, _after_ the build runs successfully.

Canary releases are useful to test early changes that should not be released yet to `next` or `latest`. They are automatically triggered and released after a Pull Request merged into `main`.

Note that canary releases **will not create git tags and version bump commits**.
