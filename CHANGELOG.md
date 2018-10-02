<a name="2.0.0-rc.7"></a>

# [2.0.0-rc.7](https://github.com/commercetools/ui-kit/compare/v2.0.0-rc.6...v2.0.0-rc.7) (2018-10-02)

### Bug Fixes

- **money-input:** add formatting workaround ([#102](https://github.com/commercetools/ui-kit/issues/102)) ([344c5d7](https://github.com/commercetools/ui-kit/commit/344c5d7))
- **money-input:** lost updates for Formik validation ([#108](https://github.com/commercetools/ui-kit/issues/108)) ([54cbf91](https://github.com/commercetools/ui-kit/commit/54cbf91))
- adds token for tag height and removes padding from library ([29c20c7](https://github.com/commercetools/ui-kit/commit/29c20c7))
- remove HorizontalConstraint export ([#94](https://github.com/commercetools/ui-kit/issues/94)) ([508ff40](https://github.com/commercetools/ui-kit/commit/508ff40))

### Features

- add 'fractions' and 'negative' errors field-errors ([25b8e20](https://github.com/commercetools/ui-kit/commit/25b8e20))
- add MultilineTextField ([#106](https://github.com/commercetools/ui-kit/issues/106)) ([5b810da](https://github.com/commercetools/ui-kit/commit/5b810da))
- export WarningMessage ([#95](https://github.com/commercetools/ui-kit/issues/95)) ([67a1ea3](https://github.com/commercetools/ui-kit/commit/67a1ea3))
- **aria-filter:** adds filterAriaAttributes util ([#124](https://github.com/commercetools/ui-kit/issues/124)) ([6de8161](https://github.com/commercetools/ui-kit/commit/6de8161))
- **async-creatable-select-input:** explicitly declare props ([#122](https://github.com/commercetools/ui-kit/issues/122)) ([8e9b43e](https://github.com/commercetools/ui-kit/commit/8e9b43e))
- **async-select-input:** explicitly declare props ([#120](https://github.com/commercetools/ui-kit/issues/120)) ([7bc0c6d](https://github.com/commercetools/ui-kit/commit/7bc0c6d))
- **creatable-select-input:** explicitly declare props ([#121](https://github.com/commercetools/ui-kit/issues/121)) ([37e607f](https://github.com/commercetools/ui-kit/commit/37e607f))
- **localized-multiline-text:** adds warning prop ([#77](https://github.com/commercetools/ui-kit/issues/77)) ([8f1e283](https://github.com/commercetools/ui-kit/commit/8f1e283))
- **money-field:** add high-precision price badge ([#103](https://github.com/commercetools/ui-kit/issues/103)) ([f83306f](https://github.com/commercetools/ui-kit/commit/f83306f))

### SelectInput

- explicitly declare props ([#119](https://github.com/commercetools/ui-kit/issues/119)) ([44189a6](https://github.com/commercetools/ui-kit/commit/44189a6))

### BREAKING CHANGES

- removed support for some props, avoid blindly forwarding props. See commit for details.
- feat(select-input): show values in selected order
- feat(select-input): change ids: id (prev: inputId): The id of the input element.containerId (prev: id): The id of the search container.
- removed inputId prop, changed target of id prop.
- HorizontalConstraint export is no longer available.

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
