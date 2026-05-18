# @commercetools-local/storybook

## 1.0.4

### Patch Changes

- [#3242](https://github.com/commercetools/ui-kit/pull/3242) [`8159008`](https://github.com/commercetools/ui-kit/commit/81590088f8c935525015339f1fc00a4f3d28d041) Thanks [@misama-ct](https://github.com/misama-ct)! - Storybook 8.6.18 → 9.1.20 upgrade, rolled into FEC-935.

  This is internal-only — the storybook workspace is private and the change has no consumer impact. It unblocks FEC-935 by eliminating the v8-era bug where the stories glob picked up `@storybook/react`'s bundled `template/cli/js/Button.jsx` and `Page.jsx` under strict pnpm. Storybook 9's flatter dependency graph removes the offending template directory entirely.

  Notable changes (no action required for consumers):

  - Consolidated packages dropped from `storybook/package.json`: `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/addon-storysource`, `@storybook/blocks`, `@storybook/manager-api`, `@storybook/react`, `@storybook/test`, `@storybook/theming` (all merged into the core `storybook` package in v9).
  - `Meta` / `StoryObj` / `StoryFn` / `Preview` / `Decorator` type imports moved from `@storybook/react` → `@storybook/react-vite` across 92 story files, 2 decorators, and `preview.tsx`.
  - Doc blocks moved from `@storybook/blocks` → `@storybook/addon-docs/blocks` across 80 `.readme.mdx` files.
  - `manager-api` and `theming` imports moved to the `storybook/manager-api` and `storybook/theming` subpaths.
  - Stories glob in `storybook/.storybook/main.ts` tightened to require a literal `src/` segment so it cannot descend into nested `node_modules/` symlinks (strict pnpm leaves workspace deps there).

## 1.0.3

### Patch Changes

- [#3198](https://github.com/commercetools/ui-kit/pull/3198) [`4e4736f`](https://github.com/commercetools/ui-kit/commit/4e4736f7a14b629374e8ae6c3c08a15430ee7967) Thanks [@jaikumar-tj](https://github.com/jaikumar-tj)! - Adopt trusted publishing on NPM

## 1.0.2

### Patch Changes

- [#3157](https://github.com/commercetools/ui-kit/pull/3157) [`681eff5`](https://github.com/commercetools/ui-kit/commit/681eff5141dd535b9523eebde86b82fd16c51e18) Thanks [@renovate](https://github.com/apps/renovate)! - Update all minor version dependency updates, see https://github.com/commercetools/ui-kit/pull/3157"

## 1.0.1

### Patch Changes

- [#3096](https://github.com/commercetools/ui-kit/pull/3096) [`9b381db`](https://github.com/commercetools/ui-kit/commit/9b381dbbd59cd20afa2330ef4013ccddf1bb27a3) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies to most recent minor versions, see https://github.com/commercetools/ui-kit/pull/3096

## 1.0.0

### Major Changes

- [#3034](https://github.com/commercetools/ui-kit/pull/3034) [`131fa5f`](https://github.com/commercetools/ui-kit/commit/131fa5fee2792bc817fcf043b6e5c3f5ff4f1221) Thanks [@ByronDWall](https://github.com/ByronDWall)! - Upgrade UI Kit to React 19.

  From this version onwards, this is the minimum version an application using this library should be using.

## 0.1.1

### Patch Changes

- [#3031](https://github.com/commercetools/ui-kit/pull/3031) [`6521a61`](https://github.com/commercetools/ui-kit/commit/6521a6168c7b4664b1e0f3668dcec59b72cc7794) Thanks [@renovate](https://github.com/apps/renovate)! - update non-major dependencies

- [#3077](https://github.com/commercetools/ui-kit/pull/3077) [`bb741f8`](https://github.com/commercetools/ui-kit/commit/bb741f83edefcd35219b5d1c689af236b48c9b43) Thanks [@renovate](https://github.com/apps/renovate)! - chore(dependencies): update vite from v6.0.9 to v6.0.15

## 0.1.0

### Minor Changes

- [#2988](https://github.com/commercetools/ui-kit/pull/2988) [`5853bcd`](https://github.com/commercetools/ui-kit/commit/5853bcdcbb4f917590ba8002e576d2001d0925ff) Thanks [@mustafaasif2](https://github.com/mustafaasif2)! - Remove support for chinese locale

## 0.1.0

### Minor Changes

- [#2988](https://github.com/commercetools/ui-kit/pull/2988) [`5853bcd`](https://github.com/commercetools/ui-kit/commit/5853bcdcbb4f917590ba8002e576d2001d0925ff) Thanks [@mustafaasif2](https://github.com/mustafaasif2)! - Remove support for chinese locale
