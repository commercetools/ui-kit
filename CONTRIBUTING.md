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

#### pnpm

We use [pnpm workspaces](https://pnpm.io/workspaces) to manage dependencies between multiple packages.

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

## Testing

Different forms of testing occur an different levels to ensure the workings of UI Kit.

### Testing behavior

Components in UI Kit are integration tested to ensure they meet requirements over time. For this [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) is used. Using [Behavior driven development](https://en.wikipedia.org/wiki/Behavior-driven_development) and Jest you specify your acceptance criteria and write expectations based on the component’s state. There are numerous examples in code for existing components. There are many examples of tests when you search for `.spec.js` files.

### Testing visuals

A Design System must not introduce visual regressions, so UI Kit runs Visual Regression Testing on [Chromatic](https://www.chromatic.com/), which captures Storybook stories.

#### Writing a captured story

Every component needs a story enumerating its visual states, such as a filled placeholder, a triggered warning, or a read-only field. Add one `AllVariants` story to the component's `*.stories.tsx`, with one `<VisualSpec>` per state:

```tsx
import { VisualSpec } from '@/storybook-helpers';

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => <>{/* <VisualSpec label="..."> per state */}</>,
};
```

Capture is opt-in: `preview.tsx` sets `chromatic: { disableSnapshot: true }` globally, so `disableSnapshot: false` is what enrolls the story. `!autodocs` keeps the stacked frame off the generated `Props` page. A snapshot is identified by story id (title plus export name), so renaming either resets its baseline. Group related states under a `<VisualSpecGroup label="...">` heading where they share an axis.

A snapshot is one frame, so render every state declaratively, including states a user reaches by interacting: pass the prop that gets there, as [`filters.stories.tsx`](packages/components/filters/src/filters.stories.tsx) does with `defaultOpen`.

A global decorator adds `1rem` of padding inside every story except those setting `layout: 'fullscreen'`. Chromatic crops to rendered content, so focus rings and shadows painted at the edge would otherwise clip.

#### Gotchas

- **`<VisualSpec>` shrink-wraps** (`width: max-content`), so a state testing free space (`justifyContent`, `width: 100%`, a percentage) collapses and every state in the run renders identically. The states are all there; the axis under test is invisible. Give that state's own wrapper an explicit width, as [`inline.stories.tsx`](packages/components/spacings/spacings-inline/src/inline.stories.tsx) does. Widening `VisualSpec` instead stretches every component's label band across the frame.
- **Inverted-tone states need `backgroundColor` on `<VisualSpec>`**, or they are invisible against white. See `flat-button`, `field-label`, `link`.
- **No router decorator is registered globally.** A component given a `to` prop renders a react-router `Link`, which throws without one, and Chromatic baselines the error overlay. Add a story-level `BrowserRouter`, as `link.stories.tsx` does. In `.tsx`, `to` also needs an explicit `as={Link}`.
- **Import from the leaf package, not the `@commercetools-frontend/ui-kit` barrel.** The barrel pulls the whole library into the story's module graph, inflating what TurboSnap treats as changed.
- **An undeclared import passes locally and fails CI**, because local `tsc` resolves through the hoisted tree while CI installs strictly. Add the `devDependency` with the lockfile in the same commit, or import the source relatively, targeting a file rather than a package directory: `../../spacings-inset/src/inset` resolves, `../../spacings-inset` hits an unbuilt `dist`.
- **Pin a wider capture** with `viewports` alongside `disableSnapshot`, as [`icons.stories.tsx`](packages/components/icons/src/icons.stories.tsx) does with `[1600]`.

#### Reviewing and CI

Diffs are accepted or rejected in the Chromatic UI; the required `UI Tests` check stays red until someone does. Because `.github/workflows/chromatic.yml` uses `exitOnceUploaded`, the `chromatic` job goes green at upload and Chromatic reports the real verdict asynchronously.

The workflow skips the build when nothing under `packages/`, `design-system/`, `storybook/` or `pnpm-lock.yaml` changed, posting a passing `UI Tests` status itself, so a green check can mean "not run". It also uses TurboSnap, snapshotting only diff-affected stories; run the workflow manually via `workflow_dispatch` for a full rebuild.

To run it locally: `CHROMATIC_PROJECT_TOKEN=... pnpm --filter @commercetools-local/storybook run chromatic`. No dev server is involved, the CLI builds its own static Storybook. TurboSnap is set by the workflow rather than `chromatic.config.json`, so a local run snapshots everything unless you append `-- --only-changed`.

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

> **Note on `git worktree`:** if you place a worktree _inside_ an installed copy of this repo (e.g. under `ui-kit/.worktrees/…`), Node's module resolution can walk up into the parent's `node_modules` and resolve a second physical copy of `@emotion/react` / React, producing "two copies of React" hook errors at test time. CI is unaffected. Place worktrees outside the installed repo, or remove the parent's `node_modules` before testing inside the worktree.

Some useful commands to work with the repository:

- `pnpm test` and `pnpm test:watch`
- `pnpm typecheck`
- `pnpm build`
- `pnpm lint`

## Dependencies & supply chain security

Dependency management in this repository follows the Merchant Center supply chain security baseline: a pnpm publish cooldown (`minimumReleaseAge`), build-script allowlists, SHA-pinned GitHub Actions, and centralized Renovate configuration. Before adding, updating, or overriding a dependency — or when a `minimumReleaseAge` cooldown or `pnpm audit --fix` blocks you — follow the baseline and override procedures:

[Supply Chain Security — Baseline & Override Procedures](https://commercetools.atlassian.net/wiki/spaces/MCF/pages/3580231746/Supply+Chain+Security+-+Baseline+Override+Procedures)

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
2. Run the `pnpm generate-icons` command to generate the React component files. The components are generated using the `svgr` CLI and the template file in `svgr/config.js`
3. Run `pnpm preconstruct dev` to generate the necessary entrypoint folders for the icon.

See `packages/components/icons/src/CONTRIBUTING.md` for more details.

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

### Branch-specific preview release

To release a preview npm package for a specific branch other than the `main` branch, follow these steps:

1. Create a branch whose name starts with the prefix `preview/`  example: `preview/my-branch`
2. Create a PR for the branch in github.
3. Make sure that the branch includes a changeset for the packages you want to publish.
4. Add a comment to the github PR that starts with the string `[preview_deployment]`.
5. The preview release action will add a comment to the PR on success.
6. The release will be available on npm under an npm tag that is the branch name without `preview/`. e.g. if you are releasing `@commercetools-uikit/utils` from `preview/my-branch`, the preview can be installed as `@commercetools-uikit/utils@my-branch`.

Note that canary releases **will not create git tags and version bump commits**.
