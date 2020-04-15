## [10.18.5](https://github.com/commercetools/ui-kit/compare/v10.18.4...v10.18.5) (2020-04-15)

#### 💅 Type: Enhancement

- `data-table`
  - [#1312](https://github.com/commercetools/ui-kit/pull/1312) fix(data-table): add footer prop ([@jonnybel](https://github.com/jonnybel))

#### 🐛 Type: Bug

- `data-table`
  - [#1319](https://github.com/commercetools/ui-kit/pull/1319) fix(data-table): column cells not wrapping ([@jonnybel](https://github.com/jonnybel))

#### ⛑ Type: Refactoring

- `stamp`
  - [#1318](https://github.com/commercetools/ui-kit/pull/1318) refactor(stamp): to support theme styles ([@emmenko](https://github.com/emmenko))
- `data-table`
  - [#1314](https://github.com/commercetools/ui-kit/pull/1314) fix(data-table): remove `onClick` from column options ([@jonnybel](https://github.com/jonnybel))

## [10.18.4](https://github.com/commercetools/ui-kit/compare/v10.18.3...v10.18.4) (2020-04-01)

#### 🐛 Type: Bug

- `components`
  - [#1304](https://github.com/commercetools/ui-kit/pull/1304) fix(data-table): normalize z-index of table element ([@jonnybel](https://github.com/jonnybel))
  - [#1301](https://github.com/commercetools/ui-kit/pull/1301) fix(data-table): return `sortDirection` for `onSortChange` function ([@jonnybel](https://github.com/jonnybel))
  - [#1299](https://github.com/commercetools/ui-kit/pull/1299) fix(password-field): adjust alignment of 'show password' button ([@jonnybel](https://github.com/jonnybel))

#### 💅 Type: Enhancement

- `components`
  - [#1310](https://github.com/commercetools/ui-kit/pull/1310) fix(data-table): background on hover changing color now only for clickable rows ([@jonnybel](https://github.com/jonnybel))
  - [#1305](https://github.com/commercetools/ui-kit/pull/1305) fix(data-table): allow disabling text wrap for column header label ([@jonnybel](https://github.com/jonnybel))
  - [#1309](https://github.com/commercetools/ui-kit/pull/1309) fix(data-table): move `wrapHeaderLabel` to become a table prop ([@jonnybel](https://github.com/jonnybel))

#### 🔮 Type: Chore

- Other
  - [#1302](https://github.com/commercetools/ui-kit/pull/1302) chore: update yarn to 1.22.4 ([@jonnybel](https://github.com/jonnybel))
- `components`
  - [#1300](https://github.com/commercetools/ui-kit/pull/1300) chore: migrate more src packages ([@emmenko](https://github.com/emmenko))

## [10.18.3](https://github.com/commercetools/ui-kit/compare/v10.18.2...v10.18.3) (2020-03-20)

#### 🐛 Type: Bug

- `components`
  - [#1293](https://github.com/commercetools/ui-kit/pull/1293) fix(data-table): only clip cells with isTruncated option ([@jonnybel](https://github.com/jonnybel))
- `presets`
  - [#1291](https://github.com/commercetools/ui-kit/pull/1291) fix(presets): hooks export in presets/ui-kit ([@jonnybel](https://github.com/jonnybel))
  - [#1290](https://github.com/commercetools/ui-kit/pull/1290) fix(presets): data-table export in presets/ui-kit ([@jonnybel](https://github.com/jonnybel))

## [10.18.2](https://github.com/commercetools/ui-kit/compare/v10.18.1...v10.18.2) (2020-03-18)

#### 🐛 Type: Bug

- `components`
  - [#1287](https://github.com/commercetools/ui-kit/pull/1287) fix(accessible-button): fix no-outline rule for button elements ([@jonnybel](https://github.com/jonnybel))

#### 🔮 Type: Chore

- `presets`
  - [#1288](https://github.com/commercetools/ui-kit/pull/1288) chore(ui-kit): add new components and hooks to ui-kit preset ([@jonnybel](https://github.com/jonnybel))

## [10.18.1](https://github.com/commercetools/ui-kit/compare/v10.18.0...v10.18.1) (2020-03-16)

#### 🐛 Type: Bug

- `components`
  - [#1285](https://github.com/commercetools/ui-kit/pull/1285) fix(collapsible-panel): to forward data-attributes ([@jonnybel](https://github.com/jonnybel))

## [10.18.0](https://github.com/commercetools/ui-kit/compare/v10.17.0...v10.18.0) (2020-03-16)

#### 🐛 Type: Bug

- `components`
  - [#1283](https://github.com/commercetools/ui-kit/pull/1283) fix(collapsible-panel): accessible panel Header element ([@jonnybel](https://github.com/jonnybel))

#### 🔮 Type: Chore

- `components`
  - [#1278](https://github.com/commercetools/ui-kit/pull/1278) chore(card): fix documentation ([@jonnybel](https://github.com/jonnybel))

#### 🚀 Type: New Feature

- `components`, `hooks`
  - [#1233](https://github.com/commercetools/ui-kit/pull/1233) feat(table): add new component `DataTable` ([@jonnybel](https://github.com/jonnybel))

## [10.17.0](https://github.com/commercetools/ui-kit/compare/v10.16.0...v10.17.0) (2020-03-11)

#### 🚀 Type: New Feature

- `components`
  - [#1272](https://github.com/commercetools/ui-kit/pull/1272) feat(accessible-button): exports new function `getNormalizedButtonStyles`
    This new utility function removes user-agent styles for a `button` element, which might be useful for enabling a layout component with the navigational benefits of a `button`, such as Tab navigation and triggering `onClick` with the `Enter` key. ([@jonnybel](https://github.com/jonnybel))
  - [#1272](https://github.com/commercetools/ui-kit/pull/1272) fix(collapsible-panel): improve accessibility of panel header ([@jonnybel](https://github.com/jonnybel))
  - [#1271](https://github.com/commercetools/ui-kit/pull/1271) feat(accessible-hidden): new component `AccessibleHidden`
    This component allows rendering invisible but machine-readable content, for accessibility or testing purposes. ([@jonnybel](https://github.com/jonnybel))

## [10.16.0](https://github.com/commercetools/ui-kit/compare/v10.15.1...v10.16.0) (2020-02-14)

#### 🚀 Type: New Feature

- [#1261](https://github.com/commercetools/ui-kit/pull/1261): add `intlMessage` prop to `ErrorMessage` and `WarningMessage` components ([@YahiaElTai](https://github.com/YahiaElTai))

#### ⛑ Type: Refactoring

- `components`
  - [#1224](https://github.com/commercetools/ui-kit/pull/1224) refactor: move components src to corresponding packages folders ([@jonnybel](https://github.com/jonnybel))

## [10.15.1](https://github.com/commercetools/ui-kit/compare/v10.15.0...v10.15.1) (2020-02-03)

#### 🐛 Type: Bug

- [#1253](https://github.com/commercetools/ui-kit/pull/1253) fix(tag): remove button style on hover when disabled ([@jonnybel](https://github.com/jonnybel))
- [#1251](https://github.com/commercetools/ui-kit/pull/1251) fix(secondary-button): to prop-type ([@tdeekens](https://github.com/tdeekens))

#### 🔮 Type: Chore

- [#1256](https://github.com/commercetools/ui-kit/pull/1256) chore: update yarn ([@jonnybel](https://github.com/jonnybel))

## [10.15.0](https://github.com/commercetools/ui-kit/compare/v10.14.2...v10.15.0) (2020-01-24)

#### 🔮 Type: Chore

- [#1242](https://github.com/commercetools/ui-kit/pull/1242) chore(tag): fix crashing storybook example ([@jonnybel](https://github.com/jonnybel))

#### 💅 Type: Enhancement

- `components`
  - [#1246](https://github.com/commercetools/ui-kit/pull/1246) feat(contraints): allow `data-` attributes ([@dogayuksel](https://github.com/dogayuksel))

## [10.14.2](https://github.com/commercetools/ui-kit/compare/v10.14.1...v10.14.2) (2020-01-15)

#### 🤖 Type: Dependencies

- `calendar-utils`, `components`
  - [#1240](https://github.com/commercetools/ui-kit/pull/1240) fix: update calendar-utils ([@jonnybel](https://github.com/jonnybel))

## [10.14.1](https://github.com/commercetools/ui-kit/compare/v10.14.0...v10.14.1) (2020-01-14)

### Warning:

Please use version `10.14.2` in favour this one, as the `date-input` components are broken in this release version.

#### 🐛 Type: Bug

- [#1238](https://github.com/commercetools/ui-kit/pull/1238) fix(select-input): multi select tag missing border when there's no remove button ([@jonnybel](https://github.com/jonnybel))

#### 🔮 Type: Chore

- [#1234](https://github.com/commercetools/ui-kit/pull/1234) chore: regenerate icon exports ([@jonnybel](https://github.com/jonnybel))
- [#1220](https://github.com/commercetools/ui-kit/pull/1220) chore: use `babel.config.js` file ([@emmenko](https://github.com/emmenko))
- [#1219](https://github.com/commercetools/ui-kit/pull/1219) chore: check npm authentication on prerelease ([@jonnybel](https://github.com/jonnybel))

# [10.14.0](https://github.com/commercetools/ui-kit/compare/v10.13.0...v10.14.0) (2019-12-12)

### Warning:

Please use version `10.14.2` in favour this one, as the `date-input` components are broken in this release version.

#### 🐛 Type: Bug

- [#1214](https://github.com/commercetools/ui-kit/pull/1214) fix(text): proptypes warning when providing an empty string as children to text components ([@ahmehri](https://github.com/ahmehri))
- [#1211](https://github.com/commercetools/ui-kit/pull/1211) fix(flat-button): icon size and position for multi-line anchors ([@jonnybel](https://github.com/jonnybel))

#### 🔮 Type: Chore

- `i18n`
  - [#1216](https://github.com/commercetools/ui-kit/pull/1216) chore: fix `build i18n` command ([@jonnybel](https://github.com/jonnybel))

#### 💅 Type: Enhancement

- `components`, `i18n`
  - [#1215](https://github.com/commercetools/ui-kit/pull/1215) fix(select-input): make the `ClearIndicator` a button ([@jonnybel](https://github.com/jonnybel))

#### 🚀 Type: New Feature

- [#1213](https://github.com/commercetools/ui-kit/pull/1213) feat(date-input): add min and max value props to `date-input` and `date-field` ([@jonnybel](https://github.com/jonnybel))

# [10.13.0](https://github.com/commercetools/ui-kit/compare/v10.12.0...v10.13.0) (2019-12-05)

## Split codebase into packages

With this release, we start publishing packages for each single component under the NPM scope `@commercetools-uikit`. The goal with this is for applications using only a bunch of UIKit components to have reduced bundle size by using only packages needed. We also hope that treeshaking works better with this approach.
We also have some "preset" packages that just group a bunch of single packages together, such as `inputs`, `spacings`, `buttons`, etc. This is useful in case you use many packages within that "preset" to avoid importing each single one of them.

> The main package `@commercetools-frontend/ui-kit` will continue to exist as a full "preset" package and is currently fully backwards compatible.

#### 🐛 Type: Bug

- [#1193](https://github.com/commercetools/ui-kit/pull/1193) fix(radio-input): radio option background color ([@jonnybel](https://github.com/jonnybel))
- [#1197](https://github.com/commercetools/ui-kit/pull/1197) fix(localized-rich-text-input): dropdown fix ([@montezume](https://github.com/montezume))
- [#1196](https://github.com/commercetools/ui-kit/pull/1196) fix(tooltip): do not use native title when tooltip is off ([@montezume](https://github.com/montezume))

#### 🚀 Type: New Feature

- `calendar-time-utils`, `calendar-utils`, `components`, `hooks`, `i18n`, `localized-utils`, `utils`
  - [#1177](https://github.com/commercetools/ui-kit/pull/1177) feat: split codebase into packages and set up monorepository ([@montezume](https://github.com/montezume))
- Other
  - [#1200](https://github.com/commercetools/ui-kit/pull/1200) feat(date-input): add isReadOnly prop to date inputs and fields ([@jonnybel](https://github.com/jonnybel))
  - [#1192](https://github.com/commercetools/ui-kit/pull/1192) feat(select): add isReadOnly prop to select inputs and fields ([@jonnybel](https://github.com/jonnybel))

#### 🤖 Type: Dependencies

- `components`
  - [#1202](https://github.com/commercetools/ui-kit/pull/1202) fix(deps): update all dependencies ([@renovate[bot]](https://github.com/apps/renovate))

# [10.12.0](https://github.com/commercetools/ui-kit/compare/v10.11.0...v10.12.0) (2019-11-26)

### Bug Fixes

- `LocalizedRichTextInput`: dropdowns being clipped by the container ([#1197](https://github.com/commercetools/ui-kit/issues/1197)) ([ab54b57](https://github.com/commercetools/ui-kit/commit/ab54b5792f8277050619008df32f55b8c30ea04e))
- `RadioInput`: radio option background color ([#1193](https://github.com/commercetools/ui-kit/issues/1193)) ([e773f92](https://github.com/commercetools/ui-kit/commit/e773f9266a705b34aadf62f9b9b5d5afe2b9ed74))
- `Tooltip`: do not use native title when tooltip is off ([#1196](https://github.com/commercetools/ui-kit/issues/1196)) ([04f35e9](https://github.com/commercetools/ui-kit/commit/04f35e907944436508b558b93489e45a87ff0648))

### Features

- `SelectInput`: add `isReadOnly` prop to all select inputs and fields ([#1192](https://github.com/commercetools/ui-kit/issues/1192)) ([cbf0f3e](https://github.com/commercetools/ui-kit/commit/cbf0f3eda1e4d279d843abdd5db62f50c577b8e0))

# [10.11.0](https://github.com/commercetools/ui-kit/compare/v10.10.1...v10.11.0) (2019-11-21)

### Features

- `i18n`: add Japanese (`ja`) support ([#1191](https://github.com/commercetools/ui-kit/issues/1191)) ([9f05960](https://github.com/commercetools/ui-kit/commit/9f059603a3298d6d6329f25c7d305f5dde54b029))

## [10.10.1](https://github.com/commercetools/ui-kit/compare/v10.10.0...v10.10.1) (2019-11-20)

### Bug Fixes

- `Buttons`: make `onClick` not required if `as` is passed ([#1189](https://github.com/commercetools/ui-kit/issues/1189)) ([4ab05dc](https://github.com/commercetools/ui-kit/commit/4ab05dc898748314990cadb022ba70171b1e720e))
- `Text`: fix for when `children` is not defined ([#1188](https://github.com/commercetools/ui-kit/issues/1188)) ([b86f5b6](https://github.com/commercetools/ui-kit/commit/b86f5b664f09a087813029b85aea37598d4cb522))

## [10.10.0](https://github.com/commercetools/ui-kit/compare/v10.9.0...v10.10.0) (2019-11-20)

### Bug Fixes

- `ToggleInput`: allow passing `value` prop ([#1185](https://github.com/commercetools/ui-kit/issues/1185)) ([9ed5296](https://github.com/commercetools/ui-kit/commit/9ed52961cda0879a8d3b19a0fda9e5f60ac0452a))
- `LocalizedRichTextInput`: input containment ([#1179](https://github.com/commercetools/ui-kit/issues/1179)) ([2ead044](https://github.com/commercetools/ui-kit/commit/2ead0444f9677cd6765696bbd5a75f678495e59b))
- `PrimaryButton`: active and toggle state fix ([#1174](https://github.com/commercetools/ui-kit/issues/1174)) ([71fc660](https://github.com/commercetools/ui-kit/commit/71fc660127287d19fc3807134d2c10167c46af1e))
- `DateInput`: header focus problem fix ([#1160](https://github.com/commercetools/ui-kit/issues/1160)) ([bd18332](https://github.com/commercetools/ui-kit/commit/bd1833299ead076d6c0af12c76d78dfc3c8a0af3))

### Features

- `CheckboxInput`: support `isReadOnly` prop ([#1157](https://github.com/commercetools/ui-kit/issues/1157)) ([798b95e](https://github.com/commercetools/ui-kit/commit/798b95e39588f9d8d64db8f398477d8fc361c127))
- `FlatButton`: add `inverted` tone ([#1175](https://github.com/commercetools/ui-kit/issues/1175)) ([a763a0b](https://github.com/commercetools/ui-kit/commit/a763a0b3b54d9b00f4570f52e1803052f943ae4d))
- `IconButton`: support `as` ([#1164](https://github.com/commercetools/ui-kit/issues/1164)) ([032b198](https://github.com/commercetools/ui-kit/commit/032b198f50cc36e024fa010d80bb674644300b46))
- `LocalizedMoneyInput`: support `isReadOnly` prop ([#1158](https://github.com/commercetools/ui-kit/issues/1158)) ([0e9ca9b](https://github.com/commercetools/ui-kit/commit/0e9ca9b963e98c9604435660cd2bfe80dc76588c))
- `PrimaryButton`: support `as` prop ([#1170](https://github.com/commercetools/ui-kit/issues/1170)) ([6e00d84](https://github.com/commercetools/ui-kit/commit/6e00d84c615902781c9c36759250e705e69340ff))
- `SecondaryIconButton`: add `as` prop ([#1168](https://github.com/commercetools/ui-kit/issues/1168)) ([337b3ef](https://github.com/commercetools/ui-kit/commit/337b3efedc90f33bb4af312bbc074a80551bd424))

# [10.9.0](https://github.com/commercetools/ui-kit/compare/v10.8.0...v10.9.0) (2019-11-13)

### Bug Fixes

- `PrimaryButton`: active and toggle state ([#1174](https://github.com/commercetools/ui-kit/issues/1174)) ([71fc660](https://github.com/commercetools/ui-kit/commit/71fc660127287d19fc3807134d2c10167c46af1e))
- `DateInput`: header focus problem fix ([#1160](https://github.com/commercetools/ui-kit/issues/1160)) ([bd18332](https://github.com/commercetools/ui-kit/commit/bd1833299ead076d6c0af12c76d78dfc3c8a0af3))

### Features

- `CheckboxInput`: support `isReadOnly` prop ([#1157](https://github.com/commercetools/ui-kit/issues/1157)) ([798b95e](https://github.com/commercetools/ui-kit/commit/798b95e39588f9d8d64db8f398477d8fc361c127))
- `FlatButton`: add `inverted` tone ([#1175](https://github.com/commercetools/ui-kit/issues/1175)) ([a763a0b](https://github.com/commercetools/ui-kit/commit/a763a0b3b54d9b00f4570f52e1803052f943ae4d))
- `IconButton`: support `as` ([#1164](https://github.com/commercetools/ui-kit/issues/1164)) ([032b198](https://github.com/commercetools/ui-kit/commit/032b198f50cc36e024fa010d80bb674644300b46))
- `LocalizedMoneyInput`: support `isReadOnly` prop ([#1158](https://github.com/commercetools/ui-kit/issues/1158)) ([0e9ca9b](https://github.com/commercetools/ui-kit/commit/0e9ca9b963e98c9604435660cd2bfe80dc76588c))
- `PrimaryButton`: support `as` ([#1170](https://github.com/commercetools/ui-kit/issues/1170)) ([6e00d84](https://github.com/commercetools/ui-kit/commit/6e00d84c615902781c9c36759250e705e69340ff))
- `SecondaryIconButton`: add `as` prop ([#1168](https://github.com/commercetools/ui-kit/issues/1168)) ([337b3ef](https://github.com/commercetools/ui-kit/commit/337b3efedc90f33bb4af312bbc074a80551bd424))

# [10.8.0](https://github.com/commercetools/ui-kit/compare/v10.7.0...v10.8.0) (2019-11-01)

### Bug Fixes

- `RichTextInput,` `LocalizedRichTextInput`: fix for safari ([#1150](https://github.com/commercetools/ui-kit/issues/1150)) ([9f99224](https://github.com/commercetools/ui-kit/commit/9f992241ec66864f8a68d85027af371c82a55cb7))

### Features

- `FieldLabel:` add tone ([#1147](https://github.com/commercetools/ui-kit/issues/1147)) ([e6eb44d](https://github.com/commercetools/ui-kit/commit/e6eb44d6f0b4d09d8c717ea98ea132d8b55dfe07))

# [10.7.0](https://github.com/commercetools/ui-kit/compare/v10.6.1...v10.7.0) (2019-10-30)

### Features

- `RadioInput.Option`: adds `components.wrapper` prop ([#1139](https://github.com/commercetools/ui-kit/pull/1139))

### Bug Fixes

- `LocalizedRichTextInput`: fix omit empty translations, add readme ([#1134](https://github.com/commercetools/ui-kit/issues/1134)) ([0b4b7e9](https://github.com/commercetools/ui-kit/commit/0b4b7e9e2f48fdeb2588c62fa5d2f4baec3bed9e))
- `RichTextInput`: dropdown focus bug ([#1145](https://github.com/commercetools/ui-kit/issues/1145)) ([0496f29](https://github.com/commercetools/ui-kit/commit/0496f2948b33354322b2289e01a120017cfdf712))

## [10.6.1](https://github.com/commercetools/ui-kit/compare/v10.6.0...v10.6.1) (2019-10-23)

### Bug Fixes

- use SafeHTMLElement ([#1126](https://github.com/commercetools/ui-kit/issues/1126)) ([d13ef9f](https://github.com/commercetools/ui-kit/commit/d13ef9f6a3c4c223dd8c5c41eeafb7233d4e8e38))
- `LocalizedRichTextInput`, `RichTextInput`: disabled state fix ([#1128](https://github.com/commercetools/ui-kit/pull/1128))
- `LocalizedRichTextInput`: fixes `LocalizedRichTextInput.createLocalizedString` ([#1125](https://github.com/commercetools/ui-kit/issues/1125)) ([e645e21](https://github.com/commercetools/ui-kit/commit/e645e2161ae2a2c5d0523fffd118837cec8b528d))
- `RichTextInput`, `LocalizedRichTextInput`: visual disabled fixes ([#1132](https://github.com/commercetools/ui-kit/issues/1132)) ([a82ab5b](https://github.com/commercetools/ui-kit/commit/a82ab5bf4ff795dfcbcda55d47ff305fccece7f1))

## [10.6.0](https://github.com/commercetools/ui-kit/compare/v10.5.1...v10.6.0) (2019-10-22)

### Bug Fixes

- `Typography`: fix Text.Body to use intlMessage when 'as' prop is present ([#1122](https://github.com/commercetools/ui-kit/pull/1122))

### Features

- `SelectInput`s: allow `inputValue` prop ([#1121](https://github.com/commercetools/ui-kit/pull/1121))

## [10.5.1](https://github.com/commercetools/ui-kit/compare/v10.5.0...v10.5.1) (2019-10-21)

### Bug Fixes

- `Button`s: fix onClick bug ([#1118](https://github.com/commercetools/ui-kit/issues/1118)) ([f6b7808](https://github.com/commercetools/ui-kit/commit/f6b7808f29719b1d018209d1d4121423fccffc37))

# [10.5.0](https://github.com/commercetools/ui-kit/compare/v10.4.0...v10.5.0) (2019-10-21)

### Bug Fixes

- `Button`s use not-allowed cursor on disabled ([#1114](https://github.com/commercetools/ui-kit/issues/1114)) ([2bd07f3](https://github.com/commercetools/ui-kit/commit/2bd07f32bff97d8f4980d935f00d30f57201ceeb))
- `CollapsiblePanel` z-index fix when sticky ([#1115](https://github.com/commercetools/ui-kit/issues/1115)) ([f9c60a5](https://github.com/commercetools/ui-kit/commit/f9c60a500e07c1d7ae17c230d1e6f7be7741d261))
- `LocalizedRichTextInput` make behavior match localized-multiline-text-input ([#1108](https://github.com/commercetools/ui-kit/issues/1108)) ([3de26c5](https://github.com/commercetools/ui-kit/commit/3de26c502ed70e116f2dd7e0eb73c5e22e42965c))

### Features

- `RichTextInput` support admin center rich text ([#1110](https://github.com/commercetools/ui-kit/issues/1110)) ([ec4615a](https://github.com/commercetools/ui-kit/commit/ec4615a3a4603144c1e6ae451191a8e890b53991))

<a name="10.4.0"></a>

## [10.4.0](https://github.com/commercetools/ui-kit/compare/v10.3.0...v10.4.0) (2019-10-16)

### Bug Fixes

- `RichTextInput`: fix onBlur and onFocus ([#1093](https://github.com/commercetools/ui-kit/issues/1093)) ([8d76ba2](https://github.com/commercetools/ui-kit/commit/8d76ba28a9958da481e9ad14714af06f3b898ba1))
- `RichTextInput`: fix regression ([#1103](https://github.com/commercetools/ui-kit/issues/1103)) ([4f12b55](https://github.com/commercetools/ui-kit/commit/4f12b552d6fee57cfcf46d8a40b58380d81b089b))
- `RichTextInput`: placeholder bug ([#1099](https://github.com/commercetools/ui-kit/issues/1099)) ([08caef0](https://github.com/commercetools/ui-kit/commit/08caef0f4c87be627a8d0dcc9bb6112613db45bd))

### Features

This release represents the first release that contains the new `LocalizedRichTextInput`. Keep in mind this component is still in beta and may be subject to upcoming breaking changes. We will not consider breaking changes to `LocalizedRichTextInput` to be breaking changes to UI-Kit until the component is out of beta status.

- `LocalizedRichTextInput`: new component ([#1076](https://github.com/commercetools/ui-kit/issues/1076))
- `CollapsiblePanel`: add prop to set alignment of header controls ([#1101](https://github.com/commercetools/ui-kit/issues/1101)) ([07ad46d](https://github.com/commercetools/ui-kit/commit/07ad46dd6ce361f4ac776edf75dc605ce0eb4af0))
- `RichTextInput`: add expand icon ([#1095](https://github.com/commercetools/ui-kit/issues/1095)) ([0cb3fac](https://github.com/commercetools/ui-kit/commit/0cb3fac9e6a3e6a8c1c4bfefe5796fbe94d1b1f1))

<a name="10.3.0"></a>

## [10.3.0](https://github.com/commercetools/ui-kit/compare/v10.2.1...v10.3.0) (2019-10-08)

### Features

This release represents the first release that contains the new `RichTextInput`. Keep in mind this component is still in beta and may be subject to upcoming breaking changes. We will not consider breaking changes to `RichTextInput` to be breaking changes to UI-Kit until the component is out of beta status.

- `RichTextInput`: new component ([#952](https://github.com/commercetools/ui-kit/issues/952))

### Bug Fixes

- `LocalizedMultilineTextInput`: margin fix ([#1089](https://github.com/commercetools/ui-kit/issues/1089))

<a name="10.2.1"></a>

## [10.2.1](https://github.com/commercetools/ui-kit/compare/v10.2.0...v10.2.1) (2019-09-16)

### Bug Fixes

- use correct font family ([#1061](https://github.com/commercetools/ui-kit/issues/1061)) ([bdf890b](https://github.com/commercetools/ui-kit/commit/bdf890b))
- `FlatButton`: fully support theming ([#1056](https://github.com/commercetools/ui-kit/issues/1056)) ([8dabdc7](https://github.com/commercetools/ui-kit/commit/8dabdc7))

<a name="10.2.0"></a>

# [10.2.0](https://github.com/commercetools/ui-kit/compare/v10.1.3...v10.2.0) (2019-09-11)

### Bug Fixes

- `CollapsibleMotion`: do not set to null on rerender ([#1043](https://github.com/commercetools/ui-kit/issues/1043)) ([bc91861](https://github.com/commercetools/ui-kit/commit/bc91861))
- `Tooltip`: fix for off ([#1045](https://github.com/commercetools/ui-kit/issues/1045)) ([0e5183f](https://github.com/commercetools/ui-kit/commit/0e5183f))

### Features

- `CollapsibleMotion`: add minHeight prop ([#1042](https://github.com/commercetools/ui-kit/issues/1042)) ([df0bdf7](https://github.com/commercetools/ui-kit/commit/df0bdf7))
- `Tooltip`: expose Popper.js modifiers ([#1054](https://github.com/commercetools/ui-kit/issues/1054)) ([9ab8072](https://github.com/commercetools/ui-kit/commit/9ab8072))

<a name="10.1.3"></a>

## [10.1.3](https://github.com/commercetools/ui-kit/compare/v10.1.2...v10.1.3) (2019-08-27)

### Bug Fixes

- `MoneyInput`: fix parsing ([#1019](https://github.com/commercetools/ui-kit/pull/1019))
- `MoneyInput`: fix high precision tooltip ([#1029](https://github.com/commercetools/ui-kit/pull/1029))

<a name="10.1.2"></a>

## [10.1.2](https://github.com/commercetools/ui-kit/compare/v10.1.1...v10.1.2) (2019-08-08)

### Bug Fixes

- **inputs:** do not generate new field id on each render ([#999](https://github.com/commercetools/ui-kit/issues/999)) ([cb32dde](https://github.com/commercetools/ui-kit/commit/cb32dde))

<a name="10.1.1"></a>

## [10.1.1](https://github.com/commercetools/ui-kit/compare/v10.1.0...v10.1.1) (2019-08-07)

### Bug Fixes

- `Tooltip`: use defined variable ([#997](https://github.com/commercetools/ui-kit/issues/997)) ([c8ea11d](https://github.com/commercetools/ui-kit/commit/c8ea11d))

<a name="10.1.0"></a>

# [10.1.0](https://github.com/commercetools/ui-kit/compare/v10.0.1...511adad) (2019-08-02)

### New Features

`custom-properties`: Expose `custom-properties.ts` ([#978](https://github.com/commercetools/ui-kit/pull/978))
`use-toggle-state`: New hook ([#966](https://github.com/commercetools/ui-kit/pull/966)

### Bug Fixes

- **jest/setup:** to show actual error logs on CI when something is logged ([#979](https://github.com/commercetools/ui-kit/issues/979)) ([511adad](https://github.com/commercetools/ui-kit/commit/511adad))
- **select-inputs** truncate select-input placeholder text is long ([#955](https://github.com/commercetools/ui-kit/issues/955)) ([0ae06f5](https://github.com/commercetools/ui-kit/commit/0ae06f5))
- **`date-inputs`:** placeholder i18n fixes ([#954](https://github.com/commercetools/ui-kit/issues/954)) ([12737ed](https://github.com/commercetools/ui-kit/commit/12737ed))

### Refactoring

- `TimeInput`: use hooks ([#960](https://github.com/commercetools/ui-kit/issues/960))
- `PasswordField`, **select-inputs**: use hooks ([#957](https://github.com/commercetools/ui-kit/pull/957)
- `LocalizedTextField`: use hooks ([#958](https://github.com/commercetools/ui-kit/pull/958)
- `DateInput`: use hooks ([#963](https://github.com/commercetools/ui-kit/pull/963)
- `MultilineTextInput`: use hooks ([#966](https://github.com/commercetools/ui-kit/pull/966)
- `PrimaryActionDropdown`: use hooks ([#965](https://github.com/commercetools/ui-kit/pull/965)
- `MoneyInput`: use hooks ([#964](https://github.com/commercetools/ui-kit/pull/964)
- `LocalizedMoneyInput`: use hooks ([#974](https://github.com/commercetools/ui-kit/pull/974)
- `CollapsibleMotion`: use hooks ([#981](https://github.com/commercetools/ui-kit/pull/981)
- `Tooltip`: use hooks ([#983](https://github.com/commercetools/ui-kit/pull/983), ([#994](https://github.com/commercetools/ui-kit/pull/994)

<a name="10.0.1"></a>

# [10.0.1](https://github.com/commercetools/ui-kit/compare/v10.0.0...10.0.1) (2019-07-19)

### Bug Fixes

- **buttons:** leftovers of theme/color renaming ([#942](https://github.com/commercetools/ui-kit/issues/942)) ([1ad3384](https://github.com/commercetools/ui-kit/commit/1ad3384))
- **date-time-input:** today button not highlighting todays date ([#927](https://github.com/commercetools/ui-kit/issues/927)) ([4e02963](https://github.com/commercetools/ui-kit/commit/4e02963))
- **deps:** update dependency lodash to v4.17.13 [security](<[#930](https://github.com/commercetools/ui-kit/issues/930)>) ([1a2b156](https://github.com/commercetools/ui-kit/commit/1a2b156))
- **deps:** update dependency lodash-es to v4.17.14 [security](<[#929](https://github.com/commercetools/ui-kit/issues/929)>) ([89cd753](https://github.com/commercetools/ui-kit/commit/89cd753))
- **table:** sortable header icon color ([#943](https://github.com/commercetools/ui-kit/issues/943)) ([3c1ba18](https://github.com/commercetools/ui-kit/commit/3c1ba18))

<a name="10.0.0"></a>

# [10.0.0](https://github.com/commercetools/ui-kit/compare/v9.11.0...10.0.0) (2019-06-20)

### Breaking Changes

This release introduces **breaking changes** which may entail some **migration steps**. We'll go through them now:

- `hocs`: `withMouseOverState` and `withMouseDownState` have been dropped. Please use CSS properties instead. ([#881](https://github.com/commercetools/ui-kit/pull/881))

- `Icons`: make icons themeable ([#726](https://github.com/commercetools/ui-kit/issues/726)) ([9bea3ad](https://github.com/commercetools/ui-kit/commit/9bea3ad))

The prop `theme` has been renamed to `color` for Icons. Also, the values of this prop have changed. Please see the table below for the mapping between the old and new values.

| old         | new       |
| ----------- | --------- |
| black       | solid     |
| gray        | neutral60 |
| white       | surface   |
| blue        | info      |
| green       | primary   |
| green-light | primary40 |
| orange      | warning   |
| red         | error     |

- `Text`: add `as` prop while deprecating `elementType` ([#631](https://github.com/commercetools/ui-kit/issues/631)) ([4bd6b42](https://github.com/commercetools/ui-kit/commit/4bd6b42))

For Text.Body component, the `isInline` prop is also being deprecated. The same result is achieved by setting the as prop to span.

The prop `elementType` has been renamed to `as` for Text components. The `elementType` prop still exists, but is deprecated and will be removed in the next major UI-Kit release. Please migrate your components.

The following `custom properties` were dropped. Please take a look at the tables below to see the dropped properties, and their replacements.

#### Colors

| old          | new            |
| ------------ | -------------- |
| colorGreen   | colorPrimary   |
| colorGreen25 | colorPrimary25 |
| colorGreen40 | colorPrimary40 |
| colorGreen85 | colorPrimary85 |
| colorGreen95 | colorPrimary95 |
| colorBlack   | colorSolid     |
| colorWhite   | colorSurface   |
| colorGrey    | colorNeutral   |
| colorNavy    | colorInfo      |
| colorNavy30  | colorInfo30    |
| colorNavy40  | colorInfo40    |
| colorNavy95  | colorInfo95    |
| colorNavy98  | colorInfo98    |
| colorGray    | colorNeutral   |
| colorGray60  | colorNeutral60 |
| colorGray90  | colorNeutral90 |
| colorGray95  | colorNeutral95 |
| colorBlue    | colorInfo      |
| colorBlue85  | colorInfo85    |
| colorBlue95  | colorInfo95    |
| colorOrange  | colorWarning   |
| colorRed     | colorError     |

#### Spacings

| old        |    new     |
| ---------- | :--------: |
| spacing-4  | spacing-xs |
| spacing-8  | spacing-s  |
| spacing-16 | spacing-m  |
| spacing-24 | spacing-l  |
| spacing-32 | spacing-xl |

#### Design tokens

| old                              |                  new                   |
| -------------------------------- | :------------------------------------: |
| --border-color-input-pristine    |        --border-color-for-input        |
| --border-color-input-focus       | --border-color-for-input-when-focused  |
| --border-color-input-disabled    | --border-color-for-input-when-disabled |
| --border-color-input-readonly    | --border-color-for-input-when-readonly |
| --border-color-input-error       |  --border-color-for-input-when-error   |
| --border-color-input-warning     | --border-color-for-input-when-warning  |
| --border-color-tag-pristine      |         --border-color-for-tag         |
| --border-color-tag-warning       |     --border-color-for-tag-warning     |
| --border-color-tag-focus         |  --border-color-for-tag-when-focused   |
| --border-color-tag-warning-hover |     --border-color-for-tag-warning     |
| --border-color-separator         |            --color-neutral             |
| --border-radius-input            |       --border-radius-for-input        |
| --border-radius-tag              |        --border-radius-for-tag         |

#### Other

The custom property `transition-standard` has been changed from having a value of `all 0.2s ease` to `200ms ease`. To continue using this property as below, the following refactor is necessary. However, if possible, you should avoid animating using "all".

```
transition: all var(--transitionStandard);
```

The split up shadows (ie, `shadow-one-first`, `shadow-1-second`) have been dropped. Instead, simply use `shadow-1`, etc.

<a name="9.11.0"></a>

# [9.11.0](https://github.com/commercetools/ui-kit/compare/v9.10.0...v9.11.0) (2019-07-04)

### Bug Fixes

- `FieldLabel`: do not scale icon when long hint ([#878](https://github.com/commercetools/ui-kit/issues/878)) ([1c06bbc](https://github.com/commercetools/ui-kit/commit/1c06bbc))
- `Link`: apply underlined styles ([#911](https://github.com/commercetools/ui-kit/issues/911)) ([20cd7a4](https://github.com/commercetools/ui-kit/commit/20cd7a4))
- `Storybook`: downgrade storybook-readme ([#896](https://github.com/commercetools/ui-kit/issues/896)) ([32f9374](https://github.com/commercetools/ui-kit/commit/32f9374))

### Features

- `DateInputs`: add tooltips ([#911](https://github.com/commercetools/ui-kit/issues/910))
- `Storybook`: add context for theme ([#876](https://github.com/commercetools/ui-kit/issues/876)) ([c87d581](https://github.com/commercetools/ui-kit/commit/c87d581))

### Chore

- setup bundlesize ([#914](https://github.com/commercetools/ui-kit/issues/914)) ([c74581f](https://github.com/commercetools/ui-kit/commit/c74581f))
- add postcss codemod ([#893](https://github.com/commercetools/ui-kit/issues/893)) ([82b4381](https://github.com/commercetools/ui-kit/commit/82b4381))

<a name="9.10.0"></a>

# [9.10.0](https://github.com/commercetools/ui-kit/compare/v9.9.0...9.10.0) (2019-06-19)

### Bug Fixes

- `IconButton`: hover state fix, and remove HOC ([#871](https://github.com/commercetools/ui-kit/issues/871)) ([823a31f](https://github.com/commercetools/ui-kit/commit/823a31f))
- `NumberInput`: toFormValue should handle both undefined and null ([#870](https://github.com/commercetools/ui-kit/issues/870)) ([7db6786](https://github.com/commercetools/ui-kit/commit/7db6786))
- `SelectInput` multi select disabled bug ([#855](https://github.com/commercetools/ui-kit/issues/855)) ([2b68dad](https://github.com/commercetools/ui-kit/commit/2b68dad))

### Refactoring

- `Table`: remove hoc
- `SecondaryButton`: remove usage of HOC ([#872](https://github.com/commercetools/ui-kit/pull/872))
- Various dependency updates ([#856](https://github.com/commercetools/ui-kit/pull/856))
- Various dependency updates ([#866](https://github.com/commercetools/ui-kit/pull/866))
- Adds missing peer deps ([#868](https://github.com/commercetools/ui-kit/pull/868))

### Features

- `FlatButton`: support theming ([#869](https://github.com/commercetools/ui-kit/pull/869))

### Documentation

- `HorizontalConstraint`: update README ([#858](https://github.com/commercetools/ui-kit/pull/858))
- `Contributing`: fix link ([#867](https://github.com/commercetools/ui-kit/pull/867))

* `Storybook`: add addon-a11y ([#842](https://github.com/commercetools/ui-kit/issues/842)) ([c874d94](https://github.com/commercetools/ui-kit/commit/c874d94))

# [9.9.0](https://github.com/commercetools/ui-kit/compare/v9.8.3...v9.9.0) (2019-06-12)

### Bug Fixes

- `SelectInput`: use first-of-type instead of first-child to remove emotion warning ([#850](https://github.com/commercetools/ui-kit/issues/850))

### Features

- add version export ([#840](https://github.com/commercetools/ui-kit/issues/840)) ([ab98dbc](https://github.com/commercetools/ui-kit/commit/ab98dbc))
- `Storybook`: use contexts for choosing locale ([#841](https://github.com/commercetools/ui-kit/issues/841)) ([27bbe30](https://github.com/commercetools/ui-kit/commit/27bbe30))

### Refactoring

- Various dependency updates ([#849](https://github.com/commercetools/ui-kit/pull/849))
- Various dependency updates ([#838](https://github.com/commercetools/ui-kit/pull/838))

<a name="9.8.3"></a>

# [9.8.3](https://github.com/commercetools/ui-kit/compare/v9.8.2...v9.8.3) (2019-06-05)

### Bug Fixes

- `ToggleInput`: disabled style fixes ([#832](https://github.com/commercetools/ui-kit/issues/832))

<a name="9.8.2"></a>

# [9.8.2](https://github.com/commercetools/ui-kit/compare/v9.8.1...v9.8.2) (2019-06-05)

### Bug Fixes

- `Table`: onSortChange being called without being passed ([#827](https://github.com/commercetools/ui-kit/issues/827)) ([0c45f89](https://github.com/commercetools/ui-kit/commit/0c45f89))
- `CollapsiblePanel`: remove z-index ([#805](https://github.com/commercetools/ui-kit/issues/805)) ([a526942](https://github.com/commercetools/ui-kit/commit/a526942))
- `IconButton`: centre icon ([#828](https://github.com/commercetools/ui-kit/issues/828)) ([482e824](https://github.com/commercetools/ui-kit/commit/482e824))
- `MultilineInput`: expand behaviour not working ([#804](https://github.com/commercetools/ui-kit/issues/804)) ([f5d4c4d](https://github.com/commercetools/ui-kit/commit/f5d4c4d))
- `RadioInput`: do not use htmlFor if no id is passed ([#817](https://github.com/commercetools/ui-kit/issues/817)) ([95f2180](https://github.com/commercetools/ui-kit/commit/95f2180))

### Features

- add stylelint for css-in-js ([#815](https://github.com/commercetools/ui-kit/issues/815)) ([a205725](https://github.com/commercetools/ui-kit/commit/a205725))

<a name="9.8.1"></a>

# [9.8.1](https://github.com/commercetools/ui-kit/compare/v9.8.0...v9.8.1) (2019-05-18)

### Bug Fixes

- `i18n`: build all locales ([#800](https://github.com/commercetools/ui-kit/issues/800)) ([670fc46](https://github.com/commercetools/ui-kit/commit/670fc46))
- `IconButton`: misaligned icon fix ([#794](https://github.com/commercetools/ui-kit/issues/794)) ([fd232f1](https://github.com/commercetools/ui-kit/commit/fd232f1))
- `MoneyInput`: add minimumFractionDigits ([#795](https://github.com/commercetools/ui-kit/issues/795)) ([98ee547](https://github.com/commercetools/ui-kit/commit/98ee547))
- `SelectInput`, `AsyncSelectInput`, `CreatableSelectInput`, `AsyncCreatableSelectInput`: localize placeholder ([#802](https://github.com/commercetools/ui-kit/issues/802)) ([013f617](https://github.com/commercetools/ui-kit/commit/013f617))

<a name="9.8.0"></a>

# [9.8.0](https://github.com/commercetools/ui-kit/compare/v9.7.0...v9.8.0) (2019-05-17)

### Bug Fixes

- `select-inputs`: fix multi value bug ([#784](https://github.com/commercetools/ui-kit/issues/784)) ([1fa3ad3](https://github.com/commercetools/ui-kit/commit/1fa3ad3))

### Features

- `LinkButton` support isExternal prop ([#783](https://github.com/commercetools/ui-kit/issues/783)) ([42bc1a9](https://github.com/commercetools/ui-kit/commit/42bc1a9))

<a name="9.7.0"></a>

# [9.7.0](https://github.com/commercetools/ui-kit/compare/v9.6.1...v9.7.0) (2019-05-17)

### Bug Fixes

- `CheckboxInput`: hovered state when disabled ([#775](https://github.com/commercetools/ui-kit/issues/775)) ([670afe7](https://github.com/commercetools/ui-kit/commit/670afe7))
- `CollapsiblePanel`: height of panel header while disabled ([#767](https://github.com/commercetools/ui-kit/issues/767)) ([549a0b9](https://github.com/commercetools/ui-kit/commit/549a0b9))
- `CollapsiblePanel`: disabled state fix ([#777](https://github.com/commercetools/ui-kit/issues/777)) ([944740c](https://github.com/commercetools/ui-kit/commit/944740c))
- `TimeInput`: border radius bug ([#773](https://github.com/commercetools/ui-kit/issues/773)) ([06e9420](https://github.com/commercetools/ui-kit/commit/06e9420))
- `IconButton`: add border color ([#782](https://github.com/commercetools/ui-kit/issues/782)) ([57499e5](https://github.com/commercetools/ui-kit/commit/57499e5))

### Features

- `TimeInput`: visual improvements on hover and focus ([#776](https://github.com/commercetools/ui-kit/issues/776))
- `SecondaryIconButton`: refactor hover and add theming ([#770](https://github.com/commercetools/ui-kit/issues/770)) ([08a6045](https://github.com/commercetools/ui-kit/commit/08a6045))
- `PinGearIcon`: new component ([#778](https://github.com/commercetools/ui-kit/issues/778)) ([1fbb659](https://github.com/commercetools/ui-kit/commit/1fbb659))

### Refactoring

- Various dependency updates ([#780](https://github.com/commercetools/ui-kit/pull/780))

<a name="9.6.1"></a>

# [9.6.1](https://github.com/commercetools/ui-kit/compare/v9.6.0...v9.6.1) (2019-05-13)

### Bug Fixes

- `Tooltip`: z-index fix ([#765](https://github.com/commercetools/ui-kit/issues/765)) ([9390f71](https://github.com/commercetools/ui-kit/commit/9390f71))

<a name="9.6.0"></a>

# [9.6.0](https://github.com/commercetools/ui-kit/compare/v9.5.0...v9.6.0) (2019-05-13)

### Bug Fixes

- `LinkButton`: add hover effect for icon ([#752](https://github.com/commercetools/ui-kit/issues/752)) ([f3fc29b](https://github.com/commercetools/ui-kit/commit/f3fc29b))
- `Tooltip`: margin specificity fix ([#754](https://github.com/commercetools/ui-kit/issues/754)) ([15aa855](https://github.com/commercetools/ui-kit/commit/15aa855))

### Features

- `Link`: new component. ([#755](https://github.com/commercetools/ui-kit/issues/755)) ([af7e144](https://github.com/commercetools/ui-kit/commit/af7e144))

### Refactoring

- Various dependency updates ([#762](https://github.com/commercetools/ui-kit/pull/762))

<a name="9.5.0"></a>

# [9.5.0](https://github.com/commercetools/ui-kit/compare/v9.4.0...v9.5.0) (2019-05-08)

### Bug Fixes

- `CheckboxInput`: make component accessible ([#722](https://github.com/commercetools/ui-kit/pull/722))
- `RadioInput`: make component accessible ([#721](https://github.com/commercetools/ui-kit/pull/721))
- `SelectInput`: cursor when disabled ([#709](https://github.com/commercetools/ui-kit/issues/709)) ([57a4f6a](https://github.com/commercetools/ui-kit/commit/57a4f6a))
- `Text`: allow theming ([#720](https://github.com/commercetools/ui-kit/issues/720)) ([b5f8e44](https://github.com/commercetools/ui-kit/commit/b5f8e44))
- `TimeInput`: fix for readonly state ([#724](https://github.com/commercetools/ui-kit/issues/724)) ([19ac8c6](https://github.com/commercetools/ui-kit/commit/19ac8c6))

### Features

- `CheckboxInput`: use design tokens / add theming ([#728](https://github.com/commercetools/ui-kit/issues/728)) ([c9604ba](https://github.com/commercetools/ui-kit/commit/c9604ba))
- `DateRangeInput` add `isClearable` prop ([#745](https://github.com/commercetools/ui-kit/issues/745)) ([727ea20](https://github.com/commercetools/ui-kit/commit/727ea20))
- `* selects` make selects support theming ([#727](https://github.com/commercetools/ui-kit/issues/727)) ([65d953f](https://github.com/commercetools/ui-kit/commit/65d953f))
- `SubdirectoryArrowIcon`: new component ([#738](https://github.com/commercetools/ui-kit/issues/738)

<a name="9.4.0"></a>

# [9.4.0](https://github.com/commercetools/ui-kit/compare/v9.3.1...v9.4.0) (2019-04-23)

### Features

- `* inputs`, `* fields`: add `autoComplete` prop to most inputs / fields. ([#696](https://github.com/commercetools/ui-kit/issues/696)) ([f1274ec](https://github.com/commercetools/ui-kit/commit/f1274ec))

### Refactoring

- Various dependency updates ([#704](https://github.com/commercetools/ui-kit/pull/704))

<a name="9.3.1"></a>

# [9.3.1](https://github.com/commercetools/ui-kit/compare/v9.3.0...v9.3.1) (2019-04-17)

### Bug Fixes

- **circleci:** releasing from master and release ([#689](https://github.com/commercetools/ui-kit/issues/689)) ([7a7f8da](https://github.com/commercetools/ui-kit/commit/7a7f8da))
- replace deprecated and broken package jest-plugin-filename with jest-watch-typeahead ([#685](https://github.com/commercetools/ui-kit/issues/685)) ([cd72a2b](https://github.com/commercetools/ui-kit/commit/cd72a2b))
- `SelectInputs`, `SelectFields`, `MoneyField`, `MoneyInput`: incorrect prop type ([#692](https://github.com/commercetools/ui-kit/issues/692)) ([62e9599](https://github.com/commercetools/ui-kit/commit/62e9599))

<a name="9.3.0"></a>

# [9.3.0](https://github.com/commercetools/ui-kit/compare/v9.2.0...v9.3.0) (2019-04-16)

### Bug Fixes

- **circleci:** remove branch ignore rule ([b8443e1](https://github.com/commercetools/ui-kit/commit/b8443e1))
- **storybook:** fix for selecting French and Chinese locales ([#681](https://github.com/commercetools/ui-kit/issues/681)) ([d6163da](https://github.com/commercetools/ui-kit/commit/d6163da))

### Features

- `SelectInputs`, `SelectFields`: support `menuPortalTarget` prop ([#682](https://github.com/commercetools/ui-kit/issues/682)) ([a8c132b](https://github.com/commercetools/ui-kit/commit/a8c132b))
- `SelectInputs`, `SelectFields`: support add `shouldBlockScroll` prop ([#686](https://github.com/commercetools/ui-kit/issues/686)) ([60507df](https://github.com/commercetools/ui-kit/commit/60507df))
- `MoneyInput`, `MoneyField`: support `menuPortalTarget` and `shouldBlockScroll` ([#684](https://github.com/commercetools/ui-kit/issues/684)) ([85d4bd8](https://github.com/commercetools/ui-kit/commit/85d4bd8))
- `i18n`: add translations for Simplified Chinese and French ([#679](https://github.com/commercetools/ui-kit/issues/679)) ([9e6ca2b](https://github.com/commercetools/ui-kit/commit/9e6ca2b))
- `Text`: support theming ([#671](https://github.com/commercetools/ui-kit/issues/671)) ([1ac8324](https://github.com/commercetools/ui-kit/commit/1ac8324))

<a name="9.2.0"></a>

# [9.2.0](https://github.com/commercetools/ui-kit/compare/v9.1.2...v9.2.0) (2019-04-11)

### Bug Fixes

- **circleci:** releasing to next ([#619](https://github.com/commercetools/ui-kit/issues/619)) ([fbea050](https://github.com/commercetools/ui-kit/commit/fbea050))
- `SelectInput`: change default menu height ([#624](https://github.com/commercetools/ui-kit/issues/624)) ([0b43ce5](https://github.com/commercetools/ui-kit/commit/0b43ce5))
- `FlatButton`: add focus highlighting ([#648](https://github.com/commercetools/ui-kit/issues/648)) ([7741452](https://github.com/commercetools/ui-kit/commit/7741452))
- `MoneyInput`: change high precision money badge ([#661](https://github.com/commercetools/ui-kit/issues/661)) ([1091426](https://github.com/commercetools/ui-kit/commit/1091426))
- `Tag`: css fixes for tag ([#626](https://github.com/commercetools/ui-kit/issues/626)) ([4cf0219](https://github.com/commercetools/ui-kit/commit/4cf0219))
- `Tag`: right border of removable tag ([#650](https://github.com/commercetools/ui-kit/issues/650)) ([425e82d](https://github.com/commercetools/ui-kit/commit/425e82d))
- `LinkButton`: to use inline TextBody ([#627](https://github.com/commercetools/ui-kit/issues/627)) ([815333e](https://github.com/commercetools/ui-kit/commit/815333e))
- **ci:** storybook build times ([#667](https://github.com/commercetools/ui-kit/issues/667)) ([43fb470](https://github.com/commercetools/ui-kit/commit/43fb470))

### Features

- `TextInput`: make text-input `theme-able` ([#563](https://github.com/commercetools/ui-kit/issues/563)) ([6b49e33](https://github.com/commercetools/ui-kit/commit/6b49e33))
- **i18n:** support new locales fr-FR and zh-CN ([#643](https://github.com/commercetools/ui-kit/issues/643)) ([667fefd](https://github.com/commercetools/ui-kit/commit/667fefd))
- `LocalizedMultilineTextInput`: support theming ([257139f](https://github.com/commercetools/ui-kit/commit/257139f))
- `LocalizedTextInput`: support custom theming, use design tokens ([#630](https://github.com/commercetools/ui-kit/issues/630)) ([1505fba](https://github.com/commercetools/ui-kit/commit/1505fba))
- `MultilineTextInput`: support custom theming ([#633](https://github.com/commercetools/ui-kit/issues/633)) ([59fec17](https://github.com/commercetools/ui-kit/commit/59fec17))
- `NumberInput`: support custom theming ([#634](https://github.com/commercetools/ui-kit/issues/634)) ([f1129b6](https://github.com/commercetools/ui-kit/commit/f1129b6))
- `PasswordInput`: support theming ([#635](https://github.com/commercetools/ui-kit/issues/635)) ([18ea367](https://github.com/commercetools/ui-kit/commit/18ea367))
- `Tag`: use design tokens, add theming ([#641](https://github.com/commercetools/ui-kit/issues/641)) ([b3d5285](https://github.com/commercetools/ui-kit/commit/b3d5285))
- **custom-properties**: tshirt size spacings ([#645](https://github.com/commercetools/ui-kit/issues/645)) ([0b3c7a8](https://github.com/commercetools/ui-kit/commit/0b3c7a8))
- **text:** allow to pass intl message instead of children ([#651](https://github.com/commercetools/ui-kit/issues/651)) ([5e108e5](https://github.com/commercetools/ui-kit/commit/5e108e5))

<a name="9.1.2"></a>

# [9.1.2](https://github.com/commercetools/ui-kit/compare/v9.1.1...v9.1.2) (2019-03-29)

### Bug Fixes

- `CollapsiblePanel`: add `min-height` when not condensed [#616](https://github.com/commercetools/ui-kit/pull/616) ([3dd5856](https://github.com/commercetools/ui-kit/commit/3dd5856a8fae660722ffe769023657ad0c7f9cef))

<a name="9.1.1"></a>

# [9.1.1](https://github.com/commercetools/ui-kit/compare/v9.1.0...v9.1.1) (2019-03-19)

### Bug Fixes

- `MoneyInput`: parse money value in MoneyInput ([#597](https://github.com/commercetools/ui-kit/issues/597)) ([6f922d9](https://github.com/commercetools/ui-kit/commit/6f922d9))
- `Table`: to remove jumpy effect on hover ([#598](https://github.com/commercetools/ui-kit/issues/598)) ([05cabae](https://github.com/commercetools/ui-kit/commit/05cabae))

### Refactoring

- Remove unnecessary lodash map values dep ([#572](https://github.com/commercetools/ui-kit/issues/572)) ([b82e3b4](https://github.com/commercetools/ui-kit/commit/b82e3b4))

<a name="9.1.0"></a>

# [9.1.0](https://github.com/commercetools/ui-kit/compare/v9.0.0...v9.1.0) (2019-02-22)

### Features

- `Tooltip`: adds new prop `TooltipWrapperComponent` ([#560](https://github.com/commercetools/ui-kit/issues/560)) ([4f5ff38](https://github.com/commercetools/ui-kit/commit/4f5ff38))
- Inputs: use design tokens for input styling ([#562](https://github.com/commercetools/ui-kit/issues/562)) ([8ec02e6](https://github.com/commercetools/ui-kit/commit/8ec02e6))

### Bug Fixes

- `MoneyInput`: fix for inputting currencies with no fractional digits ([bf5fccc](https://github.com/commercetools/ui-kit/commit/bf5fccc))

### Refactoring

- Various dependency updates ([#564](https://github.com/commercetools/ui-kit/pull/564))

<a name="9.0.0"></a>

# [9.0.0](https://github.com/commercetools/ui-kit/compare/v8.5.0...v9.0.0) (2019-02-20)

## BREAKING CHANGES

- `RadioInput`: the prop `scale` has been removed. Now you can pass any of the spacing props through the `directionProps`. The classname prop has also been removed. ([#555](https://github.com/commercetools/ui-kit/issues/555)) ([9f420c5](https://github.com/commercetools/ui-kit/commit/9f420c5))

### Features

- `RadioField`: New component ([#537](https://github.com/commercetools/ui-kit/issues/537)) ([c2fcaf7](https://github.com/commercetools/ui-kit/commit/c2fcaf7))
- `PasswordField`: add show/hide button ([#555](https://github.com/commercetools/ui-kit/issues/555)) ([9f420c5](https://github.com/commercetools/ui-kit/commit/9f420c5))
- Icons: new `EyeIcon` ([#555](https://github.com/commercetools/ui-kit/issues/555)) ([9f420c5](https://github.com/commercetools/ui-kit/commit/9f420c5))
- Icons: new `PageGearIcon` ([#553](https://github.com/commercetools/ui-kit/issues/553)) ([8c080aa](https://github.com/commercetools/ui-kit/commit/8c080aa))
- `Spacings.Inline`, `Spacings.Stack`: support `justifyContent` prop for Inline/Stack components ([#557](https://github.com/commercetools/ui-kit/issues/557)) ([5bd61e7](https://github.com/commercetools/ui-kit/commit/5bd61e7)), closes [#552](https://github.com/commercetools/ui-kit/issues/552)

### Bug Fixes

- `Card`: do not apply padding to outer flex container. Fixes [#554](https://github.com/commercetools/ui-kit/issues/554) ([#556](https://github.com/commercetools/ui-kit/issues/556)) ([65b150e](https://github.com/commercetools/ui-kit/commit/65b150e))
- Spacings: specificity of margin for children elements ([#558](https://github.com/commercetools/ui-kit/issues/558)) ([733408f](https://github.com/commercetools/ui-kit/commit/733408f))

### Refactoring

- Various dependency updates ([#549](https://github.com/commercetools/ui-kit/pull/549))

<a name="8.5.0"></a>

# [8.5.0](https://github.com/commercetools/ui-kit/compare/v8.4.0...v8.5.0) (2019-02-15)

### Features

- `Tooltip`: Add `off` prop ([#539](https://github.com/commercetools/ui-kit/issues/539)) ([2777c53](https://github.com/commercetools/ui-kit/commit/2777c53))

<a name="8.4.0"></a>

# [8.4.0](https://github.com/commercetools/ui-kit/compare/v8.3.1...v8.4.0) (2019-02-12)

### Features

- `Tooltip`: allow passing in custom `BodyComponent` ([#535](https://github.com/commercetools/ui-kit/pull/535))

<a name="8.3.1"></a>

# [8.3.1](https://github.com/commercetools/ui-kit/compare/v8.3.0...v8.3.1) (2019-02-11)

### Bug Fixes

- SelectInputs and SelectFields: Wrong CSS is applied in case of multi and disabled states ([#532](https://github.com/commercetools/ui-kit/issues/532))

<a name="8.3.0"></a>

# [8.3.0](https://github.com/commercetools/ui-kit/compare/v8.2.0...v8.3.0) (2019-02-11)

### Features

- `Tooltip`: new component ([#501](https://github.com/commercetools/ui-kit/pull/501))
- `SpeechBubbleIcon`: new component ([#516](https://github.com/commercetools/ui-kit/pull/516))
- SelectInputs: adds new prop `showOptionGroupDivider` ([#517](https://github.com/commercetools/ui-kit/pull/517))

### Refactoring

- Bundling - stop bundling emotion css source maps ([#519](https://github.com/commercetools/ui-kit/pull/519), [#520](https://github.com/commercetools/ui-kit/pull/520))

- Various dependency updates ([#529](https://github.com/commercetools/ui-kit/pull/529))

<a name="8.2.0"></a>

# [8.2.0](https://github.com/commercetools/ui-kit/compare/v8.1.1...v8.2.0) (2019-02-06)

### Bug Fixes

- `Tag`: Wrong CSS is applied in case linkTo prop is provided ([#511](https://github.com/commercetools/ui-kit/issues/511)) ([ba038f0](https://github.com/commercetools/ui-kit/commit/ba038f0))
- `MoneyInput`: Background color fix for single currency MoneyInput ([#513](https://github.com/commercetools/ui-kit/pull/513))

### Features

- `Card`: support data attributes ([#514](https://github.com/commercetools/ui-kit/issues/514)) ([0c1538b](https://github.com/commercetools/ui-kit/commit/0c1538b))

<a name="8.1.1"></a>

# [8.1.1](https://github.com/commercetools/ui-kit/compare/v8.1.0...v8.1.1) (2019-01-31)

### Bug Fixes

- sequential field id generation ([#499](https://github.com/commercetools/ui-kit/issues/499)) ([c85074a](https://github.com/commercetools/ui-kit/commit/c85074a))

<a name="8.1.0"></a>

# [8.1.0](https://github.com/commercetools/ui-kit/compare/v8.0.0...v8.1.0) (2019-01-31)

### Features

- Icons: adding new icons for new welcome landing page ([#497](https://github.com/commercetools/ui-kit/issues/497)) ([00fa71c](https://github.com/commercetools/ui-kit/commit/00fa71c))

* `Card`: new component ([#494](https://github.com/commercetools/ui-kit/pull/494))
* Buttons: support all aria-attributes ([#496](https://github.com/commercetools/ui-kit/pull/496))

<a name="8.0.0"></a>

# [8.0.0](https://github.com/commercetools/ui-kit/compare/v7.0.0...v8.0.0) (2019-01-29)

This release mostly includes internal changes and should be quite straightforward to upgrade.

## BREAKING CHANGES

- We rewrote our components to use [Emotion](https://emotion.sh) styles (CSS-in-JS) instead of CSS Modules. One of the reasons was to support SSR, which Emotion [supports out-of-the-box](https://emotion.sh/docs/ssr), to enable using the UI-Kit for static sites (e.g. Gatsby, Next.js). Before, styles were injected **after** the components will be rendered, causing a FOUC (_Flash Of Unstyled Content_).

> This change does not visually affects the components, thanks to our Visual Regression Testing setup. You can read about it in our [techblog](https://techblog.commercetools.com/keeping-a-react-design-system-consistent-f055160d5166).

- The font sizes of the components have been changed from `px` to `rem`, to allow consumers of the UI-Kit to determine the size according to their requirements (e.g. for Merchant Center applications the _root_ size should be `13px`, for documentation websites the size can be left to the user's browser). ([#482](https://github.com/commercetools/ui-kit/issues/482))

> The `@commercetools-frontend/application-shell` package already sets the font size to `13px`, so you shouldn't need to change anything.

- Previously, the `customProperties` object from the main export was returning a JSON object with keys like `--color-black`. The JSON export was not really meant to be used from JS code, therefore now the object is formatted with _camelCase_ keys, like `colorBlack`. The JSON file is still available from `@commercetools-frontend/ui-kit/materials/custom-properties.json`.

- The `@commercetools-frontend/ui-kit/materials/media-queries.mod.css` has been removed and is now available from the package `@commercetools-frontend/application-components/materials/media-queries.mod.css`.

### Bug Fixes

- `Tag`: Design fixes for the `isDisabled` state ([#464](https://github.com/commercetools/ui-kit/pull/464))

<a name="7.0.0"></a>

# [7.0.0](https://github.com/commercetools/ui-kit/compare/v6.1.0...v7.0.0) (2019-01-21)

## BREAKING CHANGES

- `Radio`: renamed to `RadioInput` ([#428](https://github.com/commercetools/ui-kit/pull/428))
- `Checkbox`: renamed to `CheckboxInput` ([#428](https://github.com/commercetools/ui-kit/pull/428))
- `Toggle`: renamed to `ToggleInput`, now returns an event from onChange ([#428](https://github.com/commercetools/ui-kit/pull/428))
- `LocalizedMoneyInput`: remove 'amount/currencyCode' from event name ([#419](https://github.com/commercetools/ui-kit/issues/419)) ([e28d022](https://github.com/commercetools/ui-kit/commit/e28d022))
- ([#433](https://github.com/commercetools/ui-kit/pull/433)) Some unsupported HorizontalConstraint props have been dropped. Please check the PR for more details
- ([#435](https://github.com/commercetools/ui-kit/pull/435)) The following icons have been renamed:
  - FlagFulfilledIcon -> FlagFilledIcon
  - FlagIcon -> FlagLinearIcon
  - DoneIcon -> CheckThinIcon
  - SuccessIcon -> CheckBoldIcon
  - DeleteIcon -> BinLinearIcon
  - DeleteFilledIcon -> BinFilledIcon
  - AddIcon -> PlusThinIcon
  - AddBoldIcon -> PlusBoldIcon
  - PinActiveIcon -> PinLinearIcon
  - PinIcon -> PinFilled

### Bug Fixes

- `ErrorMessage`: support data-attributes ([#424](https://github.com/commercetools/ui-kit/issues/424)) ([7d35c2e](https://github.com/commercetools/ui-kit/commit/7d35c2e))

- `MoneyField`: remove required `currencies` prop ([#422](https://github.com/commercetools/ui-kit/issues/422)) ([c05d9da](https://github.com/commercetools/ui-kit/commit/c05d9da))

- `MoneyInput`: avoid messing with floating point numbers ([#446](https://github.com/commercetools/ui-kit/issues/446)) ([f5c6260](https://github.com/commercetools/ui-kit/commit/f5c6260))

- `RadioInput.Option`, `CheckboxInput`, `SwitchInput:` move data-attributes to input ([#423](https://github.com/commercetools/ui-kit/issues/423)) ([677dc77](https://github.com/commercetools/ui-kit/commit/677dc77))

- `TimeInput`: call onChange with generated id instead of undefined if no id passed as prop ([#427](https://github.com/commercetools/ui-kit/issues/427)) ([7bbc6c6](https://github.com/commercetools/ui-kit/commit/7bbc6c6))

### Features

- `CollapsiblePanel`: add `hideExpansionControls` (not hidden by default) ([#421](https://github.com/commercetools/ui-kit/issues/421)) ([0bd7fa9](https://github.com/commercetools/ui-kit/commit/0bd7fa9))

- `Grid`: new component ([#442](https://github.com/commercetools/ui-kit/issues/442)) ([7469bae](https://github.com/commercetools/ui-kit/commit/7469bae))

### Refactoring

`TextInput`, `PasswordInput`, `NumberInput`: use design tokens ([#443](https://github.com/commercetools/ui-kit/issues/443)) ([792c505](https://github.com/commercetools/ui-kit/commit/792c505))

<a name="6.1.1"></a>

# [6.1.1](https://github.com/commercetools/ui-kit/compare/v6.1.0...v6.1.1) (2019-01-09)

### Bug Fixes

- `Radio`: allow boolean and string proptype values ([#416](https://github.com/commercetools/ui-kit/pull/416))

### Documentation

- Improve VRT documentation ([#417](https://github.com/commercetools/ui-kit/pull/417))

<a name="6.1.0"></a>

# [6.1.0](https://github.com/commercetools/ui-kit/compare/v6.0.0...v6.1.0) (2019-01-08)

### Features

- `EyeCrossedIcon`: new component ([#409](https://github.com/commercetools/ui-kit/pull/409))

### Bug Fixes

- `MoneyInput`: use narrow styling when no currencies are passed ([#411](https://github.com/commercetools/ui-kit/pull/411))
- `PrimaryActionDropdown`: use secondary tone when disabled ([#408](https://github.com/commercetools/ui-kit/pull/408))
- `Text` add missing inverted prop to prop-types ([#414](https://github.com/commercetools/ui-kit/pull/414))

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
- `TimeInput`: Add default placeholder ([#405](https://github.com/commercetools/ui-kit/pull/405))

### Bug Fixes

- `DateRangeInput`: Fixes jumping date when selecting date range outside of current month. Fixes "_Invalid date_" showing up when pressing `Esc`. ([#345](https://github.com/commercetools/ui-kit/pull/345))
- `ContentNotification`: Remove margin ([#352](https://github.com/commercetools/ui-kit/issues/352))
- `MoneyInput`: Fixes `onBlur` being called properly ([#357](https://github.com/commercetools/ui-kit/issues/357))-
- `CollapsiblePanel`: Toggling the CollapsiblePanel can now be trigged from the entire height of the header ([#401](https://github.com/commercetools/ui-kit/issues/401))
- `DateRangeInput`, `DateTimeInput`, `DateInput`: fixes z-index issue. ([#406](https://github.com/commercetools/ui-kit/issues/406))

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
