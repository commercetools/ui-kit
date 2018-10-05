<a name="2.0.0-rc.9"></a>

# [2.0.0-rc.9](https://github.com/commercetools/ui-kit/compare/v2.0.0-rc.8...2.0.0-rc.9) (2018-10-05)

### New Components

- `LocalizedTextField` [#133](https://github.com/commercetools/ui-kit/pull/133)
- `LocalizedMultilineTextField` [#132](https://github.com/commercetools/ui-kit/pull/132)

### Fixed

- Fix broken checkboxes [#139](https://github.com/commercetools/ui-kit/issues/139)

### Changed

- Updated dependencies [#137](https://github.com/commercetools/ui-kit/issues/137)
- Dropped dependency on `reselect` [#137](https://github.com/commercetools/ui-kit/issues/137)
- Fixed "theme" typo [#137](https://github.com/commercetools/ui-kit/issues/137)
- Dropped outdated warning in `CollapsiblePanel` [#137](https://github.com/commercetools/ui-kit/issues/137)

### BREAKING CHANGES

- If you use Formik, ensure you use at least `v1.3.1`. Otherwise form validation of `MoneyInput` will not work properly [#137](https://github.com/commercetools/ui-kit/issues/137)

<a name="2.0.0-rc.8"></a>

# [2.0.0-rc.8](https://github.com/commercetools/ui-kit/compare/v2.0.0-rc.7...v2.0.0-rc.8) (2018-10-04)

### New Components

- `CreatableSelectField` [#128](https://github.com/commercetools/ui-kit/pull/128)
- `AsyncCreatableSelectField` [#129](https://github.com/commercetools/ui-kit/pull/129)

### Fixed

- `Icons` Fix SVG compilation so that icons can be properly styled. ([#134](https://github.com/commercetools/ui-kit/issues/134)) ([409e9e1](https://github.com/commercetools/ui-kit/commit/409e9e1))

<a name="2.0.0-rc.7"></a>

# [2.0.0-rc.7](https://github.com/commercetools/ui-kit/compare/v2.0.0-rc.6...v2.0.0-rc.7) (2018-10-02)

### New components

- `NumberField` [#74](https://github.com/commercetools/ui-kit/pull/74)
- `WarningMessage` [#95](https://github.com/commercetools/ui-kit/pull/95)
- `MoneyField` [#93](https://github.com/commercetools/ui-kit/pull/93) [#103](https://github.com/commercetools/ui-kit/pull/103)
- `MultilineTextField` [#106](https://github.com/commercetools/ui-kit/pull/106)
- `SelectField` [#114](https://github.com/commercetools/ui-kit/pull/114)

### Added

- Added Form Fields example, complementary to Form Inputs example [#76](https://github.com/commercetools/ui-kit/pull/76)
- Spanish translations [#99](https://github.com/commercetools/ui-kit/pull/99)
- Add translation workflow documentation [#105](https://github.com/commercetools/ui-kit/pull/105)

### Changed

- `FieldErrors`: support `fractions` and `negative` error types [#76](https://github.com/commercetools/ui-kit/pull/76)
- `TextField`: safely check for errors [#76](https://github.com/commercetools/ui-kit/pull/76)
- `LocalizedMultilineTextInput`: add `warning` prop support [#77](https://github.com/commercetools/ui-kit/pull/77)
- `NumberField`, `TextField`: rename `isTouched` prop to `touched` for all fields [#97](https://github.com/commercetools/ui-kit/pull/97)
- `SelectInput`: drop support of some props [#119](https://github.com/commercetools/ui-kit/pull/119)
- `AsyncSelectInput`: drop support of some props [#120](https://github.com/commercetools/ui-kit/pull/120)
- `CreatableSelectInput`: drop support of some props [#121](https://github.com/commercetools/ui-kit/pull/121)
- `AsyncCreatableSelectInput`: drop support of some props [#122](https://github.com/commercetools/ui-kit/pull/122)

### Removed

- `HorizontalConstraint`: Removed export. Use `Constraints.Horizontal` instead [#94](https://github.com/commercetools/ui-kit/pull/94)

### Fixed

- Readd forms example [#75](https://github.com/commercetools/ui-kit/pull/75)
- Fix Travis CI link in README [#89](https://github.com/commercetools/ui-kit/pull/89)
- `MoneyInput`: Fix story and docs [#91](https://github.com/commercetools/ui-kit/pull/91)
- `MoneyField`, `TextField`: Fix automatic id generation [#92](https://github.com/commercetools/ui-kit/pull/92)
- Use top-level UI Kit export in examples [#96](https://github.com/commercetools/ui-kit/pull/96)
- `MoneyInput`: add Formik bug workaround [#102](https://github.com/commercetools/ui-kit/pull/102) [#108](https://github.com/commercetools/ui-kit/pull/108)
- `SelectInput`, `AsyncSelectInput`, `CreatableSelectInput`, `AsyncCreatableSelectInput`: Use same height when in `isMulti` mode [#112](https://github.com/commercetools/ui-kit/pull/112)
- `SelectInput`: show values in selected order [#119](https://github.com/commercetools/ui-kit/pull/119)
- `SelectInput`: replace `id` with `containerId` and `inputId` with `id` [#119](https://github.com/commercetools/ui-kit/pull/119)

### BREAKING CHANGES

#### `HorizontalConstraint`

Removed export. This is already exported as `Constraints.Horizontal`.

Use `Constraints.Horizontal` instead [#94](https://github.com/commercetools/ui-kit/pull/94).

#### Renamed `isTouched` to `touched` for all Fields

Renamed `isTouched` prop to `touched` for all fields. You need to upgrade `NumberField` and `TextField` by providing `touched` instead of `isTouched` [#97](https://github.com/commercetools/ui-kit/pull/97). Other fields are using `touched` already.

#### Drop support for specific props

Some props were dropped from
`SelectInput` ([#119](https://github.com/commercetools/ui-kit/pull/119)), `AsyncSelectInput` ([#120](https://github.com/commercetools/ui-kit/pull/120)), `CreatableSelectInput` ([#121](https://github.com/commercetools/ui-kit/pull/121)) and `AsyncCreatableSelectInput` ([#122](https://github.com/commercetools/ui-kit/pull/122)).

See the PRs for details. These props were not used in the MC.

#### `SelectInput` ids

Changed `SelectInput`s `id` to be applied to the input, and removed the `inputId` prop.
Added a `containerId` to prop to enable still targeting the container.

Upgrade your code like this:

```diff
- <SelectInput id="container-id" inputId="input-id" />
+ <SelectInput id="input-id" containerId="container-id" />
```

<a name="2.0.0-rc.6"></a>

# [2.0.0-rc.6](https://github.com/commercetools/ui-kit/compare/v2.0.0-rc.5...v2.0.0-rc.6) (2018-09-18)

### Bug Fixes

- fix i18n exports ([#68](https://github.com/commercetools/ui-kit/issues/68)) ([f299ea6](https://github.com/commercetools/ui-kit/commit/f299ea6))
- use correct token for selected input background ([#67](https://github.com/commercetools/ui-kit/issues/67)) ([bad8992](https://github.com/commercetools/ui-kit/commit/bad8992))

### Features

- **select-inputs:** let user override customized components ([#70](https://github.com/commercetools/ui-kit/issues/70)) ([bc7d2f0](https://github.com/commercetools/ui-kit/commit/bc7d2f0))

<a name="2.0.0-rc.5"></a>

# [2.0.0-rc.5](https://github.com/commercetools/ui-kit/compare/v2.0.0-rc.4...v2.0.0-rc.5) (2018-09-14)

### Chores

- add missing german translations ([d5fd673](https://github.com/commercetools/ui-kit/commit/d5fd673))

### Features

- re-export `HorizontalConstraint` component ([f3be957](https://github.com/commercetools/ui-kit/commit/f3be957))

<a name="2.0.0-rc.4"></a>

# [2.0.0-rc.4](https://github.com/commercetools/ui-kit/compare/v2.0.0-rc.3...v2.0.0-rc.4) (2018-09-14)

### Tooling

- fix deploy setup on travis ([a17a3c0](https://github.com/commercetools/ui-kit/commit/a17a3c0))

<a name="2.0.0-rc.3"></a>

# [2.0.0-rc.3](https://github.com/commercetools/ui-kit/compare/v2.0.0-rc.2...v2.0.0-rc.3) (2018-09-13)

> This release is broken from npm, do not use it.

### Tooling

- add missing dev dependency `mc-scripts` ([0c148d7](https://github.com/commercetools/ui-kit/commit/0c148d7))

<a name="2.0.0-rc.2"></a>

# [2.0.0-rc.2](https://github.com/commercetools/ui-kit/compare/v2.0.0-rc.1...v2.0.0-rc.2) (2018-09-13)

### Tooling

- keep `react-select` a normal **dependency** ([#44](https://github.com/commercetools/ui-kit/pull/44))

<a name="2.0.0-rc.1"></a>

# [2.0.0-rc.1](https://github.com/commercetools/ui-kit/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2018-09-12)

### Tooling

- optimize bundle sizes ([#40](https://github.com/commercetools/ui-kit/pull/40))
- remove proxy exports ([#42](https://github.com/commercetools/ui-kit/pull/42))

<a name="2.0.0-rc.0"></a>

# [2.0.0-rc.0](https://github.com/commercetools/ui-kit/compare/v1.0.0-beta.30...v2.0.0-rc.0) (2018-09-10)

### Bug Fixes

- avoid machine-based paths in generated files ([004cd38](https://github.com/commercetools/ui-kit/commit/004cd38))
- **select-input:** default selectInput to null ([635d48e](https://github.com/commercetools/ui-kit/commit/635d48e))
- **select-input:** fix typo, and update code documentation ([5892497](https://github.com/commercetools/ui-kit/commit/5892497))
- **select-input:** update code documentation ([f1a7e8d](https://github.com/commercetools/ui-kit/commit/f1a7e8d))

### Features

- **select-input:** add posibility of providing custom internal components ([8f98678](https://github.com/commercetools/ui-kit/commit/8f98678))
- **typography/text:** to accept isItalic for text detail and body ([df570e9](https://github.com/commercetools/ui-kit/commit/df570e9))

### Tooling

- bundle package using [Rollup](https://rollupjs.org) ([26f3df2](https://github.com/commercetools/ui-kit/commit/26f3df2))

The package now exposes all components as named exports, so you can import them without reaching into the internals (see [README](https://github.com/commercetools/ui-kit/blob/v2.0.0-rc.0/README.md#install) for more information).

> NOTE that we plan to remove those proxy exports in the `2.0.0` release.

<a name="1.0.0-beta.30"></a>

# [1.0.0-beta.30](https://github.com/commercetools/ui-kit/compare/3ba7996...v1.0.0-beta.30) (2018-09-03)

_This is the first release after the code has been moved to this public repository. From now we will update the changelog on every new release._

> There isn't an official changelog prior to this version.
