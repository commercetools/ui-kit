# @commercetools-local/generator-readme

## 1.1.5

### Patch Changes

- [`1d12f65`](https://github.com/commercetools/ui-kit/commit/1d12f65d06e237b500b27749e9ee93b4fababacb) [#1650](https://github.com/commercetools/ui-kit/pull/1650) Thanks [@emmenko](https://github.com/emmenko)! - Rebundle all packages due to a fix in Rollup.

## 1.1.4

### Patch Changes

- [`efde835`](https://github.com/commercetools/ui-kit/commit/efde83584d00f1e3147d179f3ee8233a325b515b) [#1646](https://github.com/commercetools/ui-kit/pull/1646) Thanks [@emmenko](https://github.com/emmenko)! - Improve Rollup configuration, use babel runtime helpers

## 1.1.3

### Patch Changes

- [`7897ced`](https://github.com/commercetools/ui-kit/commit/7897cede31440e29ce8afdb2b17fa23462f6f211) [#1642](https://github.com/commercetools/ui-kit/pull/1642) Thanks [@emmenko](https://github.com/emmenko)! - Ensure each package.json of each package has all the necessary fields.

## 1.1.2

### Patch Changes

- [`4dacdc4`](https://github.com/commercetools/ui-kit/commit/4dacdc49e7ed4e9128b19f3e54229b39f7ff30ab) [#1623](https://github.com/commercetools/ui-kit/pull/1623) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies.

## 1.1.1

### Patch Changes

- [`5d15865`](https://github.com/commercetools/ui-kit/commit/5d158656703b2f5a99aacd7debf319aad3ce6ee4) [#1579](https://github.com/commercetools/ui-kit/pull/1579) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies

## 1.1.0

### Minor Changes

- [`8aee3b0`](https://github.com/commercetools/ui-kit/commit/8aee3b005eb428522cc8341498bc9191a93be99b) [#1540](https://github.com/commercetools/ui-kit/pull/1540) Thanks [@adnasa](https://github.com/adnasa)! - migrate docs to use `generate-readme`

## 1.0.2

### Patch Changes

- [`2e22b63`](https://github.com/commercetools/ui-kit/commit/2e22b638848adad9d9722f6a997fd02777023c27) [#1500](https://github.com/commercetools/ui-kit/pull/1500) Thanks [@emmenko](https://github.com/emmenko)! - Generate READMEs for more components

* [`49419ac`](https://github.com/commercetools/ui-kit/commit/49419ac8b604b9c3a2d51df6f4e25af912c5f80a) [#1509](https://github.com/commercetools/ui-kit/pull/1509) Thanks [@emmenko](https://github.com/emmenko)! - Generate README for `<DataTableManager>`. Some of the conditional prop types have been refactored to be validated on runtime using the invariant package. Furthermore, the generate-readme package has been refined to support more edge cases.

- [`be19296`](https://github.com/commercetools/ui-kit/commit/be19296475aff238f4ebb1c5aa8a1e3f0c8c734f) [#1508](https://github.com/commercetools/ui-kit/pull/1508) Thanks [@emmenko](https://github.com/emmenko)! - Check for required `columns` prop for `DataTable` on runtime. This is important to allow compound components such as `DataTableManager` to inject the `columns` prop, as otherwise the prop types validation would fail.

## 1.0.1

### Patch Changes

- [`cc40d76`](https://github.com/commercetools/ui-kit/commit/cc40d765fdeff8626a9886e080eab35dad97b805) [#1502](https://github.com/commercetools/ui-kit/pull/1502) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies

* [`f790204`](https://github.com/commercetools/ui-kit/commit/f790204f13b877cef5fb19f217a106449f9917bd) [#1471](https://github.com/commercetools/ui-kit/pull/1471) Thanks [@emmenko](https://github.com/emmenko)! - feat: add package to generate readme files
