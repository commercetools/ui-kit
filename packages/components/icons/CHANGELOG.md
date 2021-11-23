# @commercetools-uikit/icons

## 12.2.5

### Patch Changes

- [#2018](https://github.com/commercetools/ui-kit/pull/2018) [`878d08f7`](https://github.com/commercetools/ui-kit/commit/878d08f7ef9a4015b3756e887448b3e26ab91080) Thanks [@emmenko](https://github.com/emmenko)! - Upgrarde to Yarn v3

- Updated dependencies [[`878d08f7`](https://github.com/commercetools/ui-kit/commit/878d08f7ef9a4015b3756e887448b3e26ab91080), [`c253bad3`](https://github.com/commercetools/ui-kit/commit/c253bad3fae2f84158aeeebe1d0bec9124cfe10e), [`37661395`](https://github.com/commercetools/ui-kit/commit/37661395813297ad58b3227f41ca40c291c3b282)]:
  - @commercetools-uikit/design-system@12.2.5
  - @commercetools-uikit/utils@12.2.5

## 12.2.4

### Patch Changes

- Updated dependencies [[`dcc63b4b`](https://github.com/commercetools/ui-kit/commit/dcc63b4b487623f7da3d415336d608fba95cd4d5)]:
  - @commercetools-uikit/design-system@12.2.4

## 12.2.3

### Patch Changes

- [#1980](https://github.com/commercetools/ui-kit/pull/1980) [`c1990f33`](https://github.com/commercetools/ui-kit/commit/c1990f33b29e96be33a77dd4b02c63e65f43047f) Thanks [@emmenko](https://github.com/emmenko)! - Use new TS compiler options `jsx: react-jsx` and `jsxImportSource: @emotion/react`. All unused React imports then have been removed or migrated to destructured named imports.

- Updated dependencies [[`425b45a3`](https://github.com/commercetools/ui-kit/commit/425b45a30b0b64f28a7c2db635ab6d0da7eabd8f)]:
  - @commercetools-uikit/design-system@12.2.3

## 12.2.2

### Patch Changes

- [#1967](https://github.com/commercetools/ui-kit/pull/1967) [`64e4bc89`](https://github.com/commercetools/ui-kit/commit/64e4bc891914b65d319611b35c4a52f011c11a07) Thanks [@renovate](https://github.com/apps/renovate)! - Fix TypeScript export declarations from package entry point. Migrate missing TS files.

* [#1967](https://github.com/commercetools/ui-kit/pull/1967) [`64e4bc89`](https://github.com/commercetools/ui-kit/commit/64e4bc891914b65d319611b35c4a52f011c11a07) Thanks [@renovate](https://github.com/apps/renovate)! - Fix generated icon components: selected colors are not explicitly mapped, unused IDs are removed (via SVGO), do not use IDs as style selectors.

  This is an internal refactoring and should not affect the usage of the components.

- [#1967](https://github.com/commercetools/ui-kit/pull/1967) [`64e4bc89`](https://github.com/commercetools/ui-kit/commit/64e4bc891914b65d319611b35c4a52f011c11a07) Thanks [@renovate](https://github.com/apps/renovate)! - Some files were not migrated to TypeScript. Also, each package entry point should not contain any TypeScript syntax (as it does not play well with preconstruct).
  Instead, explicit export types are defined in a `export-types.ts` file, which is then re-exported from the entry point.
- Updated dependencies [[`52cd68bf`](https://github.com/commercetools/ui-kit/commit/52cd68bfaac2359801bb6a716a41b200da9d8b99)]:
  - @commercetools-uikit/design-system@12.2.2

## 12.2.1

### Patch Changes

- [#1965](https://github.com/commercetools/ui-kit/pull/1965) [`96cb4491`](https://github.com/commercetools/ui-kit/commit/96cb4491f07f7059e2ded4ff43896bd128fae326) Thanks [@emmenko](https://github.com/emmenko)! - Remove unnecessary `fill="none"` attribute from SVG files. We noticed that when refining the style selector for nested `fill` colors to avoid overriding `fill="none"` style, icons rendered without an explicit color (therefore using `inherit`) were not applying the color correctly due to cascading conflicts. After a deeper look, it appears that the `fill="none"` attributes are actually irrelevant for our set of icons.

## 12.2.0

### Minor Changes

- [#1964](https://github.com/commercetools/ui-kit/pull/1964) [`c5a5bc9e`](https://github.com/commercetools/ui-kit/commit/c5a5bc9e23b5f5ea551c1666c8e2f1330f6b32d7) Thanks [@emmenko](https://github.com/emmenko)! - Introduce a new component `<InlineSvg>` to render SVG documents dynamically. The component is exported as a separate entrypoint.

  ```js
  import InlineSvg from '@commercetools-uikit/icons/inline-svg';
  ```

  > This component is meant to be used internally within other packages and it's not recommended to use it directly, unless there are valid reasons.

### Patch Changes

- Updated dependencies [[`c5a5bc9e`](https://github.com/commercetools/ui-kit/commit/c5a5bc9e23b5f5ea551c1666c8e2f1330f6b32d7)]:
  - @commercetools-uikit/utils@12.2.0

## 12.1.0

### Minor Changes

- [#1953](https://github.com/commercetools/ui-kit/pull/1953) [`31a75d13`](https://github.com/commercetools/ui-kit/commit/31a75d1392d30a9897c840b3acaf403eec381b36) Thanks [@islam3zzat](https://github.com/islam3zzat)! - Add new icons: Lock and Operations icons

### Patch Changes

- Updated dependencies [[`1878a2bf`](https://github.com/commercetools/ui-kit/commit/1878a2bf796f105c55195e86f5496198180d7e2d)]:
  - @commercetools-uikit/design-system@12.1.0

## 12.0.12

### Patch Changes

- Updated dependencies [[`aac07cda`](https://github.com/commercetools/ui-kit/commit/aac07cda3cb5704fd77a65da9e985e9635032616)]:
  - @commercetools-uikit/design-system@12.0.12

## 12.0.8

### Patch Changes

- Updated dependencies [[`5c6f88fd`](https://github.com/commercetools/ui-kit/commit/5c6f88fd944f13f5a4d7e58c4e5985b925fe975a)]:
  - @commercetools-uikit/design-system@12.0.8

## 12.0.7

### Patch Changes

- [#1831](https://github.com/commercetools/ui-kit/pull/1831) [`f2f40530`](https://github.com/commercetools/ui-kit/commit/f2f405300317f544b08d27da2eb8b284e6484808) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`f2f40530`](https://github.com/commercetools/ui-kit/commit/f2f405300317f544b08d27da2eb8b284e6484808)]:
  - @commercetools-uikit/design-system@12.0.7
  - @commercetools-uikit/utils@12.0.7

## 12.0.0

### Major Changes

- [#1852](https://github.com/commercetools/ui-kit/pull/1852) [`236994dd`](https://github.com/commercetools/ui-kit/commit/236994ddbd033b0fa296d05ac40ce907524ff35d) Thanks [@adnasa](https://github.com/adnasa)! - Bump `@commercetools-uikit/*` and `@commercetools-frontend/ui-kit` to v12.

  Read more about it in our [Release Notes](https://docs.commercetools.com/custom-applications/releases).

* [#1855](https://github.com/commercetools/ui-kit/pull/1855) [`af70fa9c`](https://github.com/commercetools/ui-kit/commit/af70fa9cd60c790f1db73c45c02852aeb5cba989) Thanks [@emmenko](https://github.com/emmenko)! - \* The peer dependencies `react` and `react-dom` now only require version `>=17`.
  - The peer dependency `react-intl` now only requires version `>=5`.

### Patch Changes

- Updated dependencies [[`236994dd`](https://github.com/commercetools/ui-kit/commit/236994ddbd033b0fa296d05ac40ce907524ff35d), [`d0fd05c9`](https://github.com/commercetools/ui-kit/commit/d0fd05c986cd88333d22798714a816ca67048dac)]:
  - @commercetools-uikit/design-system@12.0.0
  - @commercetools-uikit/utils@12.0.0

## 11.2.1

### Patch Changes

- [#1836](https://github.com/commercetools/ui-kit/pull/1836) [`f4b53b59`](https://github.com/commercetools/ui-kit/commit/f4b53b59971711b0b585a39246ad2c52c85288b9) Thanks [@adnasa](https://github.com/adnasa)! - chore: update dependencies

- Updated dependencies [[`f4b53b59`](https://github.com/commercetools/ui-kit/commit/f4b53b59971711b0b585a39246ad2c52c85288b9)]:
  - @commercetools-uikit/design-system@11.2.1
  - @commercetools-uikit/utils@11.2.1

## 11.2.0

### Patch Changes

- Updated dependencies [[`93232c64`](https://github.com/commercetools/ui-kit/commit/93232c64be9f2c794557f42fc9cf14bc61f2d557)]:
  - @commercetools-uikit/utils@11.2.0

## 11.0.2

### Patch Changes

- Updated dependencies [[`db2e8a20`](https://github.com/commercetools/ui-kit/commit/db2e8a2038a6bf813adf4c16fd77103d356893b6)]:
  - @commercetools-uikit/design-system@11.0.2

## 11.0.1

### Patch Changes

- [`ac50d08e`](https://github.com/commercetools/ui-kit/commit/ac50d08ea22ebaa56d73c44bb7fb81020511c86b) [#1796](https://github.com/commercetools/ui-kit/pull/1796) Thanks [@stephsprinkle](https://github.com/stephsprinkle)! - fix: filter and list icon

- Updated dependencies [[`89302420`](https://github.com/commercetools/ui-kit/commit/89302420fbac2d93785a6908985f42d80e1f377e)]:
  - @commercetools-uikit/design-system@11.0.1

## 10.47.4

### Patch Changes

- [`a05ad894`](https://github.com/commercetools/ui-kit/commit/a05ad89455990d68eb1b47b5cdc77e669a4ece20) [#1791](https://github.com/commercetools/ui-kit/pull/1791) Thanks [@stephsprinkle](https://github.com/stephsprinkle)! - fix(icons): list with search export

## 10.47.3

### Patch Changes

- [`88653838`](https://github.com/commercetools/ui-kit/commit/8865383861492f22a2bfd2def4a5133e3ccf0af1) [#1787](https://github.com/commercetools/ui-kit/pull/1787) Thanks [@adnasa](https://github.com/adnasa)! - rename `invariant` to `warning`

- Updated dependencies [[`88653838`](https://github.com/commercetools/ui-kit/commit/8865383861492f22a2bfd2def4a5133e3ccf0af1)]:
  - @commercetools-uikit/utils@10.47.3

## 10.47.0

### Minor Changes

- [`49d7b6a7`](https://github.com/commercetools/ui-kit/commit/49d7b6a7a03bdf97bc0f2c5da82cabcd8f1e8b99) [#1774](https://github.com/commercetools/ui-kit/pull/1774) Thanks [@stephsprinkle](https://github.com/stephsprinkle)! - feat(icons): add new list with search icon

### Patch Changes

- [`7fc183bc`](https://github.com/commercetools/ui-kit/commit/7fc183bcccdc5e81c2cc2eb7029cf32b34087ef3) [#1777](https://github.com/commercetools/ui-kit/pull/1777) Thanks [@adnasa](https://github.com/adnasa)! - drop tiny-variant, migrate to ui-kit/invariant

- Updated dependencies [[`48abdf42`](https://github.com/commercetools/ui-kit/commit/48abdf42c8522a700403f7b3436e0fdce22022b0)]:
  - @commercetools-uikit/utils@10.47.0

## 10.46.3

### Patch Changes

- Updated dependencies [[`8a6238a3`](https://github.com/commercetools/ui-kit/commit/8a6238a384fb4e1c3c73826d28e3812a1debfe67)]:
  - @commercetools-uikit/design-system@10.46.3

## 10.44.4

### Patch Changes

- [`d3c9002f`](https://github.com/commercetools/ui-kit/commit/d3c9002fcabeed3c4d2b73835e352490d3532208) [#1637](https://github.com/commercetools/ui-kit/pull/1637) Thanks [@renovate](https://github.com/apps/renovate)! - Support `react` and `react-dom` peer dependencies for version `>= 17`

## 10.44.1

### Patch Changes

- [`5f8a7da`](https://github.com/commercetools/ui-kit/commit/5f8a7da2518b401c4f8fe06046dc33b4e8f4414d) [#1742](https://github.com/commercetools/ui-kit/pull/1742) Thanks [@emmenko](https://github.com/emmenko)! - Fix types. Avoid using `React.FC` as it does not properly work with `defaultProps`.

## 10.44.0

### Minor Changes

- [`22164a3`](https://github.com/commercetools/ui-kit/commit/22164a34ec0607b778df534378f5cf3f8403f80f) [#1740](https://github.com/commercetools/ui-kit/pull/1740) Thanks [@emmenko](https://github.com/emmenko)! - Migrate icons to TypeScript

### Patch Changes

- [`22164a3`](https://github.com/commercetools/ui-kit/commit/22164a34ec0607b778df534378f5cf3f8403f80f) [#1740](https://github.com/commercetools/ui-kit/pull/1740) Thanks [@emmenko](https://github.com/emmenko)! - refactor(filter and list icon): updated icon content per UX request

## 10.43.3

### Patch Changes

- Updated dependencies [[`13e18a0`](https://github.com/commercetools/ui-kit/commit/13e18a01cc66146c616d5e076e9a16f2642259cf)]:
  - @commercetools-uikit/design-system@10.43.3

## 10.43.2

### Patch Changes

- Updated dependencies [[`276b88d`](https://github.com/commercetools/ui-kit/commit/276b88d4d2e25dc6d45f3c0a182e2b348652275c)]:
  - @commercetools-uikit/design-system@10.43.2

## 10.42.3

### Patch Changes

- [`7531d9e`](https://github.com/commercetools/ui-kit/commit/7531d9e4ef07b1af2d2a8bde3192ea453f725b1a) [#1699](https://github.com/commercetools/ui-kit/pull/1699) Thanks [@emmenko](https://github.com/emmenko)! - Generate SVG icons components using `@svgr/cli`.

## 10.42.2

### Patch Changes

- [`c7d495b`](https://github.com/commercetools/ui-kit/commit/c7d495b9160392ffd7aa7af24d15518da7948c97) [#1693](https://github.com/commercetools/ui-kit/pull/1693) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade preconstruct CLI to v2 for bundling.

* [`85fe702`](https://github.com/commercetools/ui-kit/commit/85fe702d28c23de58a376cbcf38d39b838357fbc) [#1697](https://github.com/commercetools/ui-kit/pull/1697) Thanks [@emmenko](https://github.com/emmenko)! - Remove dependency `@emotion/styled-base` as it's not necessary anymore in emotion v11.

* Updated dependencies [[`c7d495b`](https://github.com/commercetools/ui-kit/commit/c7d495b9160392ffd7aa7af24d15518da7948c97)]:
  - @commercetools-uikit/design-system@10.42.2

## 10.42.1

### Patch Changes

- Updated dependencies [[`3c522ed`](https://github.com/commercetools/ui-kit/commit/3c522ed7576af3a6bc6dca30777df76202ca8834)]:
  - @commercetools-uikit/design-system@10.42.1

## 10.42.0

### Minor Changes

- [`04ea8ab`](https://github.com/commercetools/ui-kit/commit/04ea8abdfbada5fedd9a932743323762fb790fd0) [#1671](https://github.com/commercetools/ui-kit/pull/1671) Thanks [@emmenko](https://github.com/emmenko)! - Compile and bundle packages using [preconstruct](https://preconstruct.tools)

### Patch Changes

- Updated dependencies [[`04ea8ab`](https://github.com/commercetools/ui-kit/commit/04ea8abdfbada5fedd9a932743323762fb790fd0)]:
  - @commercetools-uikit/design-system@10.42.0

## 10.41.0

### Minor Changes

- [`26c6562`](https://github.com/commercetools/ui-kit/commit/26c65622f7f1911f51fc0056ade2d0c8ec8af0a1) [#1670](https://github.com/commercetools/ui-kit/pull/1670) Thanks [@emmenko](https://github.com/emmenko)! - Migrate to emotion v11. https://emotion.sh/docs/emotion-11

## 10.40.1

### Patch Changes

- [`2d7c352`](https://github.com/commercetools/ui-kit/commit/2d7c35215b0b42d5d20488e6bc20b771ad22de68) [#1679](https://github.com/commercetools/ui-kit/pull/1679) Thanks [@emmenko](https://github.com/emmenko)! - Do not export `create-styled-icon.js` but copy the file in each generated icons package.

## 10.40.0

### Patch Changes

- [`37a68a0`](https://github.com/commercetools/ui-kit/commit/37a68a012bb2e912ee25798312d69ab9b3464bf8) [#1672](https://github.com/commercetools/ui-kit/pull/1672) Thanks [@emmenko](https://github.com/emmenko)! - Move internal source code into utils packages, to avoid using relative paths pointing to locations outside of the packages.

* [`d9bc2d2`](https://github.com/commercetools/ui-kit/commit/d9bc2d29cef14cdde9a659609ed1b7e9b24d21d0) [#1677](https://github.com/commercetools/ui-kit/pull/1677) Thanks [@emmenko](https://github.com/emmenko)! - Fix relative imports leftovers

* Updated dependencies [[`a2c1615`](https://github.com/commercetools/ui-kit/commit/a2c1615512b416c464310d3e67a9ee220dde47d8)]:
  - @commercetools-uikit/design-system@10.40.0

## 10.39.8

### Patch Changes

- [`3bebfed`](https://github.com/commercetools/ui-kit/commit/3bebfed8f7468f247be2cef30e274088138166e5) [#1662](https://github.com/commercetools/ui-kit/pull/1662) Thanks [@emmenko](https://github.com/emmenko)! - Explicitly get Emotion theme from context instead of relying on the implicit behavior

- Updated dependencies [[`3bebfed`](https://github.com/commercetools/ui-kit/commit/3bebfed8f7468f247be2cef30e274088138166e5)]:
  - @commercetools-uikit/design-system@10.39.8

## 10.39.7

### Patch Changes

- Updated dependencies [[`050af75`](https://github.com/commercetools/ui-kit/commit/050af75aabefd0f11b498b48f5926383e7cfcf8b)]:
  - @commercetools-uikit/design-system@10.39.7

## 10.39.6

### Patch Changes

- [`bcb2d29`](https://github.com/commercetools/ui-kit/commit/bcb2d29956c959b09c32a1cedaee5ae2fadf034e) [#1657](https://github.com/commercetools/ui-kit/pull/1657) Thanks [@emmenko](https://github.com/emmenko)! - Fix Rollup: keep `process.env.NODE_ENV` in production bundles.

- Updated dependencies [[`bcb2d29`](https://github.com/commercetools/ui-kit/commit/bcb2d29956c959b09c32a1cedaee5ae2fadf034e)]:
  - @commercetools-uikit/design-system@10.39.6

## 10.39.4

### Patch Changes

- [`a635fcc`](https://github.com/commercetools/ui-kit/commit/a635fcc8105b81545baaa684751432769cc0d94a) [#1652](https://github.com/commercetools/ui-kit/pull/1652) Thanks [@emmenko](https://github.com/emmenko)! - Fix spacings package name (regression).

- Updated dependencies [[`a635fcc`](https://github.com/commercetools/ui-kit/commit/a635fcc8105b81545baaa684751432769cc0d94a)]:
  - @commercetools-uikit/design-system@10.39.4

## 10.39.3

### Patch Changes

- [`1d12f65`](https://github.com/commercetools/ui-kit/commit/1d12f65d06e237b500b27749e9ee93b4fababacb) [#1650](https://github.com/commercetools/ui-kit/pull/1650) Thanks [@emmenko](https://github.com/emmenko)! - Rebundle all packages due to a fix in Rollup.

- Updated dependencies [[`1d12f65`](https://github.com/commercetools/ui-kit/commit/1d12f65d06e237b500b27749e9ee93b4fababacb)]:
  - @commercetools-uikit/design-system@10.39.3

## 10.39.2

### Patch Changes

- [`efde835`](https://github.com/commercetools/ui-kit/commit/efde83584d00f1e3147d179f3ee8233a325b515b) [#1646](https://github.com/commercetools/ui-kit/pull/1646) Thanks [@emmenko](https://github.com/emmenko)! - Improve Rollup configuration, use babel runtime helpers

* [`d65d494`](https://github.com/commercetools/ui-kit/commit/d65d4946feeac082ad8f0a5d44010e3afacb4c79) [#1649](https://github.com/commercetools/ui-kit/pull/1649) Thanks [@emmenko](https://github.com/emmenko)! - Explicitly declare `@emotion/styled-base` dependency so that Yarn workspaces can properly hoist it and node can resolve the module.

* Updated dependencies [[`efde835`](https://github.com/commercetools/ui-kit/commit/efde83584d00f1e3147d179f3ee8233a325b515b)]:
  - @commercetools-uikit/design-system@10.39.2

## 10.39.1

### Patch Changes

- [`7897ced`](https://github.com/commercetools/ui-kit/commit/7897cede31440e29ce8afdb2b17fa23462f6f211) [#1642](https://github.com/commercetools/ui-kit/pull/1642) Thanks [@emmenko](https://github.com/emmenko)! - Ensure each package.json of each package has all the necessary fields.

- Updated dependencies [[`7897ced`](https://github.com/commercetools/ui-kit/commit/7897cede31440e29ce8afdb2b17fa23462f6f211)]:
  - @commercetools-uikit/design-system@10.39.1

## 10.38.0

### Minor Changes

- [`d1591be`](https://github.com/commercetools/ui-kit/commit/d1591be95db3aa63d02d2a45ab728cddb678a585) [#1633](https://github.com/commercetools/ui-kit/pull/1633) Thanks [@nbryant-commercetools](https://github.com/nbryant-commercetools)! - Addition of a new clock with arrow icon

## 10.33.0

### Minor Changes

- [`4645854`](https://github.com/commercetools/ui-kit/commit/46458547d2603c412e9e6a90d1a04526784c8a9e) [#1558](https://github.com/commercetools/ui-kit/pull/1558) Thanks [@Rombelirk](https://github.com/Rombelirk)! - Fixed icon shrinking inside of flex container

## 10.30.1

### Patch Changes

- [`db6b77c`](https://github.com/commercetools/ui-kit/commit/db6b77c3baf110136440dfc7c6d42cace74eb85e) [#1492](https://github.com/commercetools/ui-kit/pull/1492) Thanks [@emmenko](https://github.com/emmenko)! - Use ranged versions for emotion dependencies

* [`5734a25`](https://github.com/commercetools/ui-kit/commit/5734a2507bb7d5bc1a1eb32aab166aff43e8fc32) [#1499](https://github.com/commercetools/ui-kit/pull/1499) Thanks [@torihedden](https://github.com/torihedden)! - feat: add new `ViewGridPlus` icon

## 10.24.0

### Patch Changes

- [`f845d56`](https://github.com/commercetools/ui-kit/commit/f845d567ebe26642cff4f2a89d157fb8ba8f3e8e) [#1409](https://github.com/commercetools/ui-kit/pull/1409) Thanks [@mohib0306](https://github.com/mohib0306)! - Move icons from `src/components/icons` to `packages/components/icons`

* [`7d3349e`](https://github.com/commercetools/ui-kit/commit/7d3349efd2915c76d41f01ff8783887f510f9cf7) [#1419](https://github.com/commercetools/ui-kit/pull/1419) Thanks [@mohib0306](https://github.com/mohib0306)! - Move `src/components/typography` to `packages/components/typography`

## 10.22.0

### Patch Changes

- [`86a85e6`](https://github.com/commercetools/ui-kit/commit/86a85e642d0d47089c3ddd7094974c58badbed56) [#1368](https://github.com/commercetools/ui-kit/pull/1368) Thanks [@mohib0306](https://github.com/mohib0306)! - Update Grid icon

* [`3d0b4fb`](https://github.com/commercetools/ui-kit/commit/3d0b4fb455af11bc144422793320ea44ddbfce81) [#1367](https://github.com/commercetools/ui-kit/pull/1367) Thanks [@NickDevG](https://github.com/NickDevG)! - Add FilterAndListIcon to the available icons set

## 10.20.0

### Minor Changes

- [`7c02900`](https://github.com/commercetools/ui-kit/commit/7c029007f4d5f49fe2db3a648ccba0d65176d770) [#1354](https://github.com/commercetools/ui-kit/pull/1354) Thanks [@mohib0306](https://github.com/mohib0306)! - Add RightTriangleFilledIcon and RightTriangleLinearIcon to the available icons set

## 10.19.0

### Minor Changes

- [`a4dc975`](https://github.com/commercetools/ui-kit/commit/a4dc975e208cb77a661fb8b16855054898c92f30) [#1349](https://github.com/commercetools/ui-kit/pull/1349) Thanks [@mohib0306](https://github.com/mohib0306)! - Add AngleUpDown icon to the available icons set
