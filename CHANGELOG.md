<a name="6.0.0"></a>

# [6.0.0](https://github.com/commercetools/ui-kit/compare/v5.0.0...v6.0.0) (2019-01-07)

## BREAKING CHANGES

- The `type` prop of `FlatButton` was renamed to `tone`. A new `type` prop was added to `FlatButton` instead for which possible values are `submit`, `reset` and `button`. ([#349](https://github.com/commercetools/ui-kit/pull/349))
- All custom properties in `custom-properties.{json,css}` no longer use the `--token` prefix. ([#370](https://github.com/commercetools/ui-kit/pull/370))
- Encapsulate typography styles to the `Text` components ([#383](https://github.com/commercetools/ui-kit/pull/383))
- Removed the `isDefaultClosed` prop. Added `defaultExpandMultilineText` instead (default flipped!) for `MultilineTextInput` and `MultilineTextField` ([#389](https://github.com/commercetools/ui-kit/pull/389))
- Renamed the `isDefaultExpanded` prop to `defaultExpandLanguages` for `LocalizedTextInput` and `LocalizedTextField` ([#389](https://github.com/commercetools/ui-kit/pull/389))
- Renamed the `hideExpansionControls` prop to `hideLanguageExpansionControls` for `LocalizedTextInput` and `LocalizedTextField` ([#389](https://github.com/commercetools/ui-kit/pull/389))
- Renamed the `isMultilineDefaultExpanded` prop to `defaultExpandMultilineText` for `LocalizedMultilineTextInput` and `LocalizedMultilineTextField` ([#389](https://github.com/commercetools/ui-kit/pull/389))
- Renamed the `areLanguagesDefaultOpened` prop to `defaultExpandLanguages` for `LocalizedMultilineTextInput` and `LocalizedMultilineTextField` ([#389](https://github.com/commercetools/ui-kit/pull/389))
- Renamed the `hideLanguageControls` prop to `hideLanguageExpansionControls` for `LocalizedMultilineTextInput` and `LocalizedMultilineTextField` ([#389](https://github.com/commercetools/ui-kit/pull/389))

## Features

- `PasswordField`: New component ([#342](https://github.com/commercetools/ui-kit/pull/342))
- `TimeField`: New component ([#346](https://github.com/commercetools/ui-kit/pull/346))
- `DateTimeField`: New component ([#347](https://github.com/commercetools/ui-kit/pull/347))
- `DateRangeField`: New component ([#348](https://github.com/commercetools/ui-kit/pull/348))
- `FieldErrors`: Export component ([#371](https://github.com/commercetools/ui-kit/pull/371))
- Add `type` prop to multiple buttons (`FlatButton`, `IconButton`, `PrimaryButton`, `SecondaryButton`, `SecondaryIconButton`) to enable using them as submit/reset buttons in forms. ([#349](https://github.com/commercetools/ui-kit/pull/349))
- `MoneyInput`, `MoneyField`: Adds support for `onFocus` ([#357](https://github.com/commercetools/ui-kit/pull/357)), `isAutofocussed` and `isReadOnly` ([#362](https://github.com/commercetools/ui-kit/pull/362))
- `LocalizedMoneyInput`: New component ([#339](https://github.com/commercetools/ui-kit/pull/339))

### Bug Fixes

- `DateRangeInput`: Fixes jumping date when selecting date range outside of current month. Fixes "_Invalid date_" showing up when pressing `Esc`. ([#345](https://github.com/commercetools/ui-kit/pull/345))
- `ContentNotification`: Remove margin ([#352](https://github.com/commercetools/ui-kit/issues/352))
- `MoneyInput`: Fixes `onBlur` being called properly ([#357](https://github.com/commercetools/ui-kit/issues/357))
- `CollapsiblePanel`: Toggling the CollapsiblePanel can now be trigged from the entire height of the header ([#401](https://github.com/commercetools/ui-kit/issues/401))

### Refactoring

- `MoneyInput`: Wraps `SingleValue` of react-select with a label pointing at the `currencyCode` input, so that it can be targeted using RTL ([#362](https://github.com/commercetools/ui-kit/pull/362))
- All components now have encapsulated styles [#387](https://github.com/commercetools/ui-kit/pull/387)

### Chore

- Consumer of `ui-kit` will get "prop types" warnings ([#372](https://github.com/commercetools/ui-kit/pull/372))

### Documentation

- Document required peer dependencies ([#332](https://github.com/commercetools/ui-kit/pull/332))
- Update README, add testing section ([#350](https://github.com/commercetools/ui-kit/pull/350))
- Document tokens ([#374](https://github.com/commercetools/ui-kit/pull/374))

<a name="5.0.0"></a>

# [5.0.0](https://github.com/commercetools/ui-kit/compare/v4.0.3...v5.0.0) (2018-12-13)

## BREAKING CHANGES

- `DateInput`: Previously `onChange` would be called with the value directly. Now it gets called with an event containing the value. This was done to be in line with how the other inputs work. ([#281](https://github.com/commercetools/ui-kit/pull/281))
- `DateTimeInput`: Previously `onChange` would be called with the value directly. Now it gets called with an event containing the value. This was done to be in line with how the other inputs work. The `mode` property was dropped. Property `isInvalid` has been renamed to `hasError`. New property `hasWarning` is now supported. ([#282](https://github.com/commercetools/ui-kit/pull/282))
- `TimeInput`: Previously `onChange` would be called with the value directly. Now it gets called with an event containing the value. This was done to be in line with how the other inputs work. Property `isInvalid` has been renamed to `hasError`. The following properties were dropped: `mode` and `timeZone`. ([#151](https://github.com/commercetools/ui-kit/pull/151))
- `GhostButton`: This component has been removed. ([#317](https://github.com/commercetools/ui-kit/pull/317))
- All field components: Removes re-export of static method. Use the exports from the respective input component instead. ([#321](https://github.com/commercetools/ui-kit/pull/321))

## Features

- `DateRangeInput`: New component ([#286](https://github.com/commercetools/ui-kit/pull/286))
- `DateField`: New component ([#309](https://github.com/commercetools/ui-kit/pull/309))

## Bug Fixes

- `Checkbox`, `Radio`: Fix for `disabled` and `hovered` states. ([#292](https://github.com/commercetools/ui-kit/pull/292))
- `Tag`: Adds support for multi lined tags. ([#327](https://github.com/commercetools/ui-kit/pull/327))

# [4.0.3](https://github.com/commercetools/ui-kit/compare/v4.0.2...v4.0.3) (2018-12-05)

### Bug Fixes

- Rollup config fix - stop inadvertent dependency bundling ([#279](https://github.com/commercetools/ui-kit/pull/279))

### Tooling

- Fail fast on Travis ([#284](https://github.com/commercetools/ui-kit/pull/284))

### Changes

- Updated dependencies for some packages ([#280](https://github.com/commercetools/ui-kit/pull/280))

# [4.0.2](https://github.com/commercetools/ui-kit/compare/v4.0.1...v4.0.2) (2018-11-28)

### Bug Fixes

- `Avatar`: Add missing `Avatar` export ([#268](https://github.com/commercetools/ui-kit/pull/268))

# [4.0.1](https://github.com/commercetools/ui-kit/compare/v4.0.0...v4.0.1) (2018-11-27)

### Bug Fixes

- `materials`: Fixed exported media-query formatting ([#266](https://github.com/commercetools/ui-kit/pull/266))

# [4.0.0](https://github.com/commercetools/ui-kit/compare/v3.0.0...v4.0.0) (2018-11-27)

### Bug Fixes

- `Icons`: invalid names ([#262](https://github.com/commercetools/ui-kit/pull/262))

### Changes

- Removed `peerDependencies` for some packages ([#263](https://github.com/commercetools/ui-kit/pull/263))
- Updated dependencies for some packages ([#258](https://github.com/commercetools/ui-kit/pull/258))

### BREAKING CHANGES

- ([#262](https://github.com/commercetools/ui-kit/pull/262)) The following icons got renamed:

| Invalid name        | Icon                                                                                                                                   | Correct name           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| AddressBillingIcon  | <img width="40" alt="image" src="https://user-images.githubusercontent.com/1110551/49015997-0284c480-f185-11e8-8b28-931069175241.png"> | PaperBillInvertedIcon  |
| AddressShippingIcon | <img width="38" alt="image" src="https://user-images.githubusercontent.com/1110551/49016050-2c3deb80-f185-11e8-93f2-7939d36be53e.png"> | TruckIcon              |
| ArrowGraphDownIcon  | <img width="35" alt="image" src="https://user-images.githubusercontent.com/1110551/49016071-437cd900-f185-11e8-8f47-3505e5e84e09.png"> | ArrowDownIcon          |
| ArrowGraphLeftIcon  | <img width="35" alt="image" src="https://user-images.githubusercontent.com/1110551/49016081-4e376e00-f185-11e8-92cb-9c5681b9559f.png"> | ArrowLeftIcon          |
| ArrowGraphRightIcon | <img width="37" alt="image" src="https://user-images.githubusercontent.com/1110551/49016093-555e7c00-f185-11e8-9978-bbd42e0e54af.png"> | ArrowRightIcon         |
| ArrowGraphUpIcon    | <img width="34" alt="image" src="https://user-images.githubusercontent.com/1110551/49016105-5d1e2080-f185-11e8-96e1-e5236b6bea59.png"> | ArrowUpIcon            |
| ArrowLeftIcon       | <img width="33" alt="image" src="https://user-images.githubusercontent.com/1110551/49016252-cd2ca680-f185-11e8-89e5-166ead7c7d90.png"> | AngleThinLeftIcon      |
| ArrowRightIcon      | <img width="44" alt="image" src="https://user-images.githubusercontent.com/1110551/49016259-d3bb1e00-f185-11e8-9a5e-47a3cc1000c7.png"> | AngleThinRightIcon     |
| BoxIcon             | <img width="41" alt="image" src="https://user-images.githubusercontent.com/1110551/49016134-71621d80-f185-11e8-92bb-a08b19566ed3.png"> | CubeIcon               |
| BoxProductIcon      | <img width="44" alt="image" src="https://user-images.githubusercontent.com/1110551/49016147-78892b80-f185-11e8-825b-42bc243b59dd.png"> | BoxIcon                |
| CategoryTreeIcon    | <img width="42" alt="image" src="https://user-images.githubusercontent.com/1110551/49016161-80e16680-f185-11e8-9a3a-a9f7644ce498.png"> | TreeStructureIcon      |
| CustomSettingsIcon  | <img width="37" alt="image" src="https://user-images.githubusercontent.com/1110551/49016172-8939a180-f185-11e8-952e-ae40a28bc207.png"> | ScreenGearIcon         |
| CustomViewIcon      | <img width="35" alt="image" src="https://user-images.githubusercontent.com/1110551/49016180-9060af80-f185-11e8-8d0f-1ed44b605c76.png"> | ScreenUserIcon         |
| CustomerFilledIcon  | <img width="35" alt="image" src="https://user-images.githubusercontent.com/1110551/49016191-98b8ea80-f185-11e8-9aeb-8e8e5947bda2.png"> | UserFilledIcon         |
| CustomerIcon        | <img width="38" alt="image" src="https://user-images.githubusercontent.com/1110551/49016204-a1112580-f185-11e8-9db5-a89537aa6331.png"> | UserLinearIcon         |
| ProjectSettingsIcon | <img width="40" alt="image" src="https://user-images.githubusercontent.com/1110551/49016217-ab332400-f185-11e8-8d3f-18dca228a365.png"> | GearIcon               |
| ReturnInfoIcon      | <img width="39" alt="image" src="https://user-images.githubusercontent.com/1110551/49016231-b2f2c880-f185-11e8-977c-5554e6b68a87.png"> | BidirectionalArrowIcon |
| TagDiscountIcon     | <img width="34" alt="image" src="https://user-images.githubusercontent.com/1110551/49016240-b9814000-f185-11e8-909a-d1db7e7739ef.png"> | TagStackedIcon         |

We recommend to do a simple **search/replace** for migrating the names. Note that there are a couple of new names that were previously other icons, so be careful when updating those. We recommend doing it in the following order:

1. `ArrowLeftIcon` -> `AngleThinLeftIcon`
2. `ArrowRightIcon` -> `AngleThinRightIcon`
3. `ArrowGraphLeftIcon` -> `ArrowLeftIcon`
4. `ArrowGraphRightIcon` -> `ArrowRightIcon`
5. `BoxIcon` -> `CubeIcon`
6. `BoxProductIcon` -> `BoxIcon`

- ([#263](https://github.com/commercetools/ui-kit/pull/263)) The following `peerDependencies` got removed: `flatpickr`, `react-select`, `react-textarea-autosize`, `react-virtualized`. You don't need to explicitly install them anymore, unless you are using them of course.

<a name="3.0.0"></a>

# [3.0.0](https://github.com/commercetools/ui-kit/compare/2.0.0-rc.11...3.0.0) (2018-11-23)

## BREAKING CHANGES

- `MoneyInput`: dropped support for `hasAmountError`, `hasAmountWarning`, `hasCurrencyError` and `hasCurrencyWarning`. Use `hasError` and `hasWarning` instead. ([9e00148](https://github.com/commercetools/ui-kit/commit/9e00148)), closes [#175](https://github.com/commercetools/ui-kit/issues/175)
- `MoneyInput`: `isTouched` only returns true when both fields were touched from now on. ([9e00148](https://github.com/commercetools/ui-kit/commit/9e00148)), closes [#175](https://github.com/commercetools/ui-kit/issues/175)
- `media-queries`: need to be imported differently now [#218](https://github.com/commercetools/ui-kit/pull/218)

* You need to explicitly add [our peer dependencies](https://github.com/commercetools/ui-kit/blob/20a9315/package.json#L210-L220) ([#156](https://github.com/commercetools/ui-kit/issues/156)) ([ae59216](https://github.com/commercetools/ui-kit/commit/ae59216))
* We dropped some images which were hosted in ui-kit but didn't belong here ([#230](https://github.com/commercetools/ui-kit/issues/230)) ([3f3dadf](https://github.com/commercetools/ui-kit/commit/3f3dadf)) and moved them into another package [`@commercetools-frontend/assets`](https://www.npmjs.com/package/@commercetools-frontend/assets)
* Consumers of ui-kit no longer need to `import '../materials/internals/reset.mod.css';` and `import '../materials/internals/grid.mod.css';` ([#186](https://github.com/commercetools/ui-kit/issues/186)) ([7a9e27b](https://github.com/commercetools/ui-kit/commit/7a9e27b))

## Bug Fixes

- `SelectInput`, `CreatableSelectInput`, `AsyncSelectInput`, `AsyncCreatableSelectInput`: align indicator icons properly ([#190](https://github.com/commercetools/ui-kit/issues/190)) ([b2f0141](https://github.com/commercetools/ui-kit/commit/b2f0141))
- `MoneyInput`: Avoid rounding errors ([#229](https://github.com/commercetools/ui-kit/issues/229)) ([b92ede4](https://github.com/commercetools/ui-kit/commit/b92ede4))

* `MoneyInput`: fix group style ([#188](https://github.com/commercetools/ui-kit/issues/188)) ([68430ab](https://github.com/commercetools/ui-kit/commit/68430ab))

- `LocalizedTextField`: expose `LocalizedTextField` form main exports ([#233](https://github.com/commercetools/ui-kit/issues/233)) ([f04256d](https://github.com/commercetools/ui-kit/commit/f04256d))
- styles: Remove `overflow: hidden` from body style ([#189](https://github.com/commercetools/ui-kit/issues/189)) ([a6b4b3b](https://github.com/commercetools/ui-kit/commit/a6b4b3b))
- replace styled-components with react-emotion ([#184](https://github.com/commercetools/ui-kit/issues/184)) ([869a036](https://github.com/commercetools/ui-kit/commit/869a036))

## Features

- **Media Queries** are now exported as custom properties ([#220](https://github.com/commercetools/ui-kit/issues/220)) ([5073d2a](https://github.com/commercetools/ui-kit/commit/5073d2a))
- `MoneyInput`: added thousand-separators ([#221](https://github.com/commercetools/ui-kit/issues/221)) ([6f58ca8](https://github.com/commercetools/ui-kit/commit/6f58ca8))
- Our design tokens are now exported as css variables (custom properties) and as a json file (`materials/custom-properties.css` and `materials/custom-properties.json`) ([#181](https://github.com/commercetools/ui-kit/issues/181)) ([b7c4e85](https://github.com/commercetools/ui-kit/commit/b7c4e85))
- `FieldLabel`: it's now possible to pass a `theme` for the `hintIcon` ([#231](https://github.com/commercetools/ui-kit/issues/231)) ([5ea305e](https://github.com/commercetools/ui-kit/commit/5ea305e))
- **icons:** add several new icons ([#247](https://github.com/commercetools/ui-kit/issues/247)) ([67d1810](https://github.com/commercetools/ui-kit/commit/67d1810)) ([#251](https://github.com/commercetools/ui-kit/pull/251))
  - `ConnectedTriangleIcon`, `ConnectedSquareIcon`, `HeartIcon`, `PaperclipIcon`, `PluginIcon`, `RocketIcon`, `StarIcon`
- `ContentNotification`: add new notification type ([#232](https://github.com/commercetools/ui-kit/issues/232)) ([46fb887](https://github.com/commercetools/ui-kit/commit/46fb887))
- **typography:** add `title` prop to all typography components ([#191](https://github.com/commercetools/ui-kit/issues/191)) ([acb4e78](https://github.com/commercetools/ui-kit/commit/acb4e78))

<a name="2.0.0-rc.11"></a>

# [2.0.0-rc.11](https://github.com/commercetools/ui-kit/compare/v2.0.0-rc.10...v2.0.0-rc.11) (2018-10-09)

### Bug Fixes

- `Text`: fix Text inline prop ([#154](https://github.com/commercetools/ui-kit/issues/154))

### Changes

- Replace `invariant` with `tiny-invariant` ([#152](https://github.com/commercetools/ui-kit/issues/152))

### BREAKING CHANGES

- ([#152](https://github.com/commercetools/ui-kit/issues/152)) Consumers must provide `tiny-invariant` instead of `invariant`, as the UI-Kit's peer dependency has changed.

<a name="2.0.0-rc.10"></a>

# [2.0.0-rc.10](https://github.com/commercetools/ui-kit/compare/v2.0.0-rc.9...2.0.0-rc.10) (2018-10-08)

### Fixed

- Fix broken DotIcon [#149](https://github.com/commercetools/ui-kit/issues/139)

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
