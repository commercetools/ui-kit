# @commercetools-uikit/radio-input

## 12.2.1

### Patch Changes

- [#1965](https://github.com/commercetools/ui-kit/pull/1965) [`96cb4491`](https://github.com/commercetools/ui-kit/commit/96cb4491f07f7059e2ded4ff43896bd128fae326) Thanks [@emmenko](https://github.com/emmenko)! - Remove unnecessary `fill="none"` attribute from SVG files. We noticed that when refining the style selector for nested `fill` colors to avoid overriding `fill="none"` style, icons rendered without an explicit color (therefore using `inherit`) were not applying the color correctly due to cascading conflicts. After a deeper look, it appears that the `fill="none"` attributes are actually irrelevant for our set of icons.

- Updated dependencies [[`96cb4491`](https://github.com/commercetools/ui-kit/commit/96cb4491f07f7059e2ded4ff43896bd128fae326)]:
  - @commercetools-uikit/icons@12.2.1
  - @commercetools-uikit/input-utils@12.2.1

## 12.2.0

### Minor Changes

- [#1964](https://github.com/commercetools/ui-kit/pull/1964) [`c5a5bc9e`](https://github.com/commercetools/ui-kit/commit/c5a5bc9e23b5f5ea551c1666c8e2f1330f6b32d7) Thanks [@emmenko](https://github.com/emmenko)! - Introduce a new component `<InlineSvg>` to render SVG documents dynamically. The component is exported as a separate entrypoint.

  ```js
  import InlineSvg from '@commercetools-uikit/icons/inline-svg';
  ```

  > This component is meant to be used internally within other packages and it's not recommended to use it directly, unless there are valid reasons.

### Patch Changes

- Updated dependencies [[`c5a5bc9e`](https://github.com/commercetools/ui-kit/commit/c5a5bc9e23b5f5ea551c1666c8e2f1330f6b32d7), [`c5a5bc9e`](https://github.com/commercetools/ui-kit/commit/c5a5bc9e23b5f5ea551c1666c8e2f1330f6b32d7)]:
  - @commercetools-uikit/utils@12.2.0
  - @commercetools-uikit/icons@12.2.0
  - @commercetools-uikit/constraints@12.2.0
  - @commercetools-uikit/input-utils@12.2.0
  - @commercetools-uikit/spacings-inline@12.2.0
  - @commercetools-uikit/spacings-stack@12.2.0

## 12.1.0

### Patch Changes

- Updated dependencies [[`1878a2bf`](https://github.com/commercetools/ui-kit/commit/1878a2bf796f105c55195e86f5496198180d7e2d), [`31a75d13`](https://github.com/commercetools/ui-kit/commit/31a75d1392d30a9897c840b3acaf403eec381b36)]:
  - @commercetools-uikit/design-system@12.1.0
  - @commercetools-uikit/constraints@12.1.0
  - @commercetools-uikit/icons@12.1.0
  - @commercetools-uikit/input-utils@12.1.0
  - @commercetools-uikit/spacings-inline@12.1.0
  - @commercetools-uikit/spacings-stack@12.1.0

## 12.0.12

### Patch Changes

- Updated dependencies [[`aac07cda`](https://github.com/commercetools/ui-kit/commit/aac07cda3cb5704fd77a65da9e985e9635032616)]:
  - @commercetools-uikit/design-system@12.0.12
  - @commercetools-uikit/constraints@12.0.12
  - @commercetools-uikit/icons@12.0.12
  - @commercetools-uikit/input-utils@12.0.12
  - @commercetools-uikit/spacings-inline@12.0.12
  - @commercetools-uikit/spacings-stack@12.0.12

## 12.0.8

### Patch Changes

- Updated dependencies [[`5c6f88fd`](https://github.com/commercetools/ui-kit/commit/5c6f88fd944f13f5a4d7e58c4e5985b925fe975a), [`509ee816`](https://github.com/commercetools/ui-kit/commit/509ee816c83a3f9ccd65fe46c4d2dfdfe790744d)]:
  - @commercetools-uikit/design-system@12.0.8
  - @commercetools-uikit/constraints@12.0.8
  - @commercetools-uikit/icons@12.0.8
  - @commercetools-uikit/input-utils@12.0.8
  - @commercetools-uikit/spacings-inline@12.0.8
  - @commercetools-uikit/spacings-stack@12.0.8

## 12.0.7

### Patch Changes

- [#1831](https://github.com/commercetools/ui-kit/pull/1831) [`f2f40530`](https://github.com/commercetools/ui-kit/commit/f2f405300317f544b08d27da2eb8b284e6484808) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`38e2ab22`](https://github.com/commercetools/ui-kit/commit/38e2ab226d50291fa159a01ee2a7c66d988aed1f), [`f2f40530`](https://github.com/commercetools/ui-kit/commit/f2f405300317f544b08d27da2eb8b284e6484808), [`c39e9e83`](https://github.com/commercetools/ui-kit/commit/c39e9e837ec00ddbd9c85ebcfe467fe1ae154961), [`2d2364d0`](https://github.com/commercetools/ui-kit/commit/2d2364d0118cdd6751c7f7f3b18932ea016080af)]:
  - @commercetools-uikit/input-utils@12.0.7
  - @commercetools-uikit/design-system@12.0.7
  - @commercetools-uikit/constraints@12.0.7
  - @commercetools-uikit/icons@12.0.7
  - @commercetools-uikit/spacings-inline@12.0.7
  - @commercetools-uikit/spacings-stack@12.0.7
  - @commercetools-uikit/utils@12.0.7

## 12.0.6

### Patch Changes

- Updated dependencies [[`fa4f030d`](https://github.com/commercetools/ui-kit/commit/fa4f030d1580929ee28f62fb31ebe3e742c6c8dd)]:
  - @commercetools-uikit/input-utils@12.0.6

## 12.0.4

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/input-utils@12.0.4

## 12.0.3

### Patch Changes

- Updated dependencies [[`4acb66d4`](https://github.com/commercetools/ui-kit/commit/4acb66d44988b62b64411216ad49a1c896d18a93)]:
  - @commercetools-uikit/input-utils@12.0.3

## 12.0.0

### Major Changes

- [#1852](https://github.com/commercetools/ui-kit/pull/1852) [`236994dd`](https://github.com/commercetools/ui-kit/commit/236994ddbd033b0fa296d05ac40ce907524ff35d) Thanks [@adnasa](https://github.com/adnasa)! - Bump `@commercetools-uikit/*` and `@commercetools-frontend/ui-kit` to v12.

  Read more about it in our [Release Notes](https://docs.commercetools.com/custom-applications/releases).

* [#1829](https://github.com/commercetools/ui-kit/pull/1829) [`d0fd05c9`](https://github.com/commercetools/ui-kit/commit/d0fd05c986cd88333d22798714a816ca67048dac) Thanks [@adnasa](https://github.com/adnasa)! - Remove `constraint` prop (`xs`, `s`, `m`, `l`, `xl`) in favor of `max`.

- [#1855](https://github.com/commercetools/ui-kit/pull/1855) [`af70fa9c`](https://github.com/commercetools/ui-kit/commit/af70fa9cd60c790f1db73c45c02852aeb5cba989) Thanks [@emmenko](https://github.com/emmenko)! - \* The peer dependencies `react` and `react-dom` now only require version `>=17`.
  - The peer dependency `react-intl` now only requires version `>=5`.

### Patch Changes

- Updated dependencies [[`236994dd`](https://github.com/commercetools/ui-kit/commit/236994ddbd033b0fa296d05ac40ce907524ff35d), [`d0fd05c9`](https://github.com/commercetools/ui-kit/commit/d0fd05c986cd88333d22798714a816ca67048dac), [`af70fa9c`](https://github.com/commercetools/ui-kit/commit/af70fa9cd60c790f1db73c45c02852aeb5cba989), [`ba6c2cc9`](https://github.com/commercetools/ui-kit/commit/ba6c2cc9e577e76dc790459a9edd0e755faa3a43), [`d0fd05c9`](https://github.com/commercetools/ui-kit/commit/d0fd05c986cd88333d22798714a816ca67048dac)]:
  - @commercetools-uikit/design-system@12.0.0
  - @commercetools-uikit/constraints@12.0.0
  - @commercetools-uikit/icons@12.0.0
  - @commercetools-uikit/input-utils@12.0.0
  - @commercetools-uikit/spacings-inline@12.0.0
  - @commercetools-uikit/spacings-stack@12.0.0
  - @commercetools-uikit/utils@12.0.0

## 11.2.1

### Patch Changes

- [#1836](https://github.com/commercetools/ui-kit/pull/1836) [`f4b53b59`](https://github.com/commercetools/ui-kit/commit/f4b53b59971711b0b585a39246ad2c52c85288b9) Thanks [@adnasa](https://github.com/adnasa)! - chore: update dependencies

- Updated dependencies [[`f4b53b59`](https://github.com/commercetools/ui-kit/commit/f4b53b59971711b0b585a39246ad2c52c85288b9)]:
  - @commercetools-uikit/design-system@11.2.1
  - @commercetools-uikit/constraints@11.2.1
  - @commercetools-uikit/icons@11.2.1
  - @commercetools-uikit/input-utils@11.2.1
  - @commercetools-uikit/spacings-inline@11.2.1
  - @commercetools-uikit/spacings-stack@11.2.1
  - @commercetools-uikit/utils@11.2.1

## 11.2.0

### Patch Changes

- Updated dependencies [[`93232c64`](https://github.com/commercetools/ui-kit/commit/93232c64be9f2c794557f42fc9cf14bc61f2d557)]:
  - @commercetools-uikit/utils@11.2.0
  - @commercetools-uikit/constraints@11.2.0
  - @commercetools-uikit/icons@11.2.0
  - @commercetools-uikit/input-utils@11.2.0
  - @commercetools-uikit/spacings-inline@11.2.0
  - @commercetools-uikit/spacings-stack@11.2.0

## 11.0.2

### Patch Changes

- Updated dependencies [[`b49a5bf0`](https://github.com/commercetools/ui-kit/commit/b49a5bf04fe25d2dda249a3bc9a5ced365a8e67f), [`db2e8a20`](https://github.com/commercetools/ui-kit/commit/db2e8a2038a6bf813adf4c16fd77103d356893b6)]:
  - @commercetools-uikit/constraints@11.0.2
  - @commercetools-uikit/design-system@11.0.2
  - @commercetools-uikit/input-utils@11.0.2
  - @commercetools-uikit/icons@11.0.2
  - @commercetools-uikit/spacings-inline@11.0.2
  - @commercetools-uikit/spacings-stack@11.0.2

## 11.0.1

### Patch Changes

- Updated dependencies [[`89302420`](https://github.com/commercetools/ui-kit/commit/89302420fbac2d93785a6908985f42d80e1f377e), [`ac50d08e`](https://github.com/commercetools/ui-kit/commit/ac50d08ea22ebaa56d73c44bb7fb81020511c86b)]:
  - @commercetools-uikit/design-system@11.0.1
  - @commercetools-uikit/constraints@11.0.1
  - @commercetools-uikit/icons@11.0.1
  - @commercetools-uikit/input-utils@11.0.1
  - @commercetools-uikit/spacings-inline@11.0.1
  - @commercetools-uikit/spacings-stack@11.0.1

## 10.47.4

### Patch Changes

- Updated dependencies [[`a05ad894`](https://github.com/commercetools/ui-kit/commit/a05ad89455990d68eb1b47b5cdc77e669a4ece20)]:
  - @commercetools-uikit/icons@10.47.4
  - @commercetools-uikit/input-utils@10.47.4

## 10.47.3

### Patch Changes

- [`88653838`](https://github.com/commercetools/ui-kit/commit/8865383861492f22a2bfd2def4a5133e3ccf0af1) [#1787](https://github.com/commercetools/ui-kit/pull/1787) Thanks [@adnasa](https://github.com/adnasa)! - rename `invariant` to `warning`

- Updated dependencies [[`88653838`](https://github.com/commercetools/ui-kit/commit/8865383861492f22a2bfd2def4a5133e3ccf0af1)]:
  - @commercetools-uikit/constraints@10.47.3
  - @commercetools-uikit/icons@10.47.3
  - @commercetools-uikit/utils@10.47.3
  - @commercetools-uikit/input-utils@10.47.3
  - @commercetools-uikit/spacings-inline@10.47.3
  - @commercetools-uikit/spacings-stack@10.47.3

## 10.47.0

### Patch Changes

- [`7fc183bc`](https://github.com/commercetools/ui-kit/commit/7fc183bcccdc5e81c2cc2eb7029cf32b34087ef3) [#1777](https://github.com/commercetools/ui-kit/pull/1777) Thanks [@adnasa](https://github.com/adnasa)! - drop tiny-variant, migrate to ui-kit/invariant

- Updated dependencies [[`7fc183bc`](https://github.com/commercetools/ui-kit/commit/7fc183bcccdc5e81c2cc2eb7029cf32b34087ef3), [`48abdf42`](https://github.com/commercetools/ui-kit/commit/48abdf42c8522a700403f7b3436e0fdce22022b0), [`49d7b6a7`](https://github.com/commercetools/ui-kit/commit/49d7b6a7a03bdf97bc0f2c5da82cabcd8f1e8b99)]:
  - @commercetools-uikit/constraints@10.47.0
  - @commercetools-uikit/icons@10.47.0
  - @commercetools-uikit/utils@10.47.0
  - @commercetools-uikit/input-utils@10.47.0
  - @commercetools-uikit/spacings-inline@10.47.0
  - @commercetools-uikit/spacings-stack@10.47.0

## 10.46.3

### Patch Changes

- Updated dependencies [[`8a6238a3`](https://github.com/commercetools/ui-kit/commit/8a6238a384fb4e1c3c73826d28e3812a1debfe67)]:
  - @commercetools-uikit/design-system@10.46.3
  - @commercetools-uikit/constraints@10.46.3
  - @commercetools-uikit/icons@10.46.3
  - @commercetools-uikit/input-utils@10.46.3
  - @commercetools-uikit/spacings-inline@10.46.3
  - @commercetools-uikit/spacings-stack@10.46.3

## 10.46.2

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/input-utils@10.46.2

## 10.46.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/input-utils@10.46.1

## 10.45.0

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/input-utils@10.45.0

## 10.44.4

### Patch Changes

- [`d3c9002f`](https://github.com/commercetools/ui-kit/commit/d3c9002fcabeed3c4d2b73835e352490d3532208) [#1637](https://github.com/commercetools/ui-kit/pull/1637) Thanks [@renovate](https://github.com/apps/renovate)! - Support `react` and `react-dom` peer dependencies for version `>= 17`

- Updated dependencies [[`d3c9002f`](https://github.com/commercetools/ui-kit/commit/d3c9002fcabeed3c4d2b73835e352490d3532208)]:
  - @commercetools-uikit/constraints@10.44.4
  - @commercetools-uikit/icons@10.44.4
  - @commercetools-uikit/input-utils@10.44.4
  - @commercetools-uikit/spacings-inline@10.44.4
  - @commercetools-uikit/spacings-stack@10.44.4

## 10.44.1

### Patch Changes

- [`5f8a7da`](https://github.com/commercetools/ui-kit/commit/5f8a7da2518b401c4f8fe06046dc33b4e8f4414d) [#1742](https://github.com/commercetools/ui-kit/pull/1742) Thanks [@emmenko](https://github.com/emmenko)! - Fix types. Avoid using `React.FC` as it does not properly work with `defaultProps`.

- Updated dependencies [[`5f8a7da`](https://github.com/commercetools/ui-kit/commit/5f8a7da2518b401c4f8fe06046dc33b4e8f4414d)]:
  - @commercetools-uikit/constraints@10.44.1
  - @commercetools-uikit/icons@10.44.1
  - @commercetools-uikit/spacings-inline@10.44.1
  - @commercetools-uikit/spacings-stack@10.44.1
  - @commercetools-uikit/input-utils@10.44.1

## 10.44.0

### Minor Changes

- [`22164a3`](https://github.com/commercetools/ui-kit/commit/22164a34ec0607b778df534378f5cf3f8403f80f) [#1740](https://github.com/commercetools/ui-kit/pull/1740) Thanks [@emmenko](https://github.com/emmenko)! - Migrate icons to TypeScript

### Patch Changes

- Updated dependencies [[`22164a3`](https://github.com/commercetools/ui-kit/commit/22164a34ec0607b778df534378f5cf3f8403f80f), [`22164a3`](https://github.com/commercetools/ui-kit/commit/22164a34ec0607b778df534378f5cf3f8403f80f), [`22164a3`](https://github.com/commercetools/ui-kit/commit/22164a34ec0607b778df534378f5cf3f8403f80f), [`22164a3`](https://github.com/commercetools/ui-kit/commit/22164a34ec0607b778df534378f5cf3f8403f80f), [`22164a3`](https://github.com/commercetools/ui-kit/commit/22164a34ec0607b778df534378f5cf3f8403f80f)]:
  - @commercetools-uikit/icons@10.44.0
  - @commercetools-uikit/utils@10.44.0
  - @commercetools-uikit/constraints@10.44.0
  - @commercetools-uikit/spacings-inline@10.44.0
  - @commercetools-uikit/spacings-stack@10.44.0
  - @commercetools-uikit/input-utils@10.44.0

## 10.43.3

### Patch Changes

- Updated dependencies [[`13e18a0`](https://github.com/commercetools/ui-kit/commit/13e18a01cc66146c616d5e076e9a16f2642259cf)]:
  - @commercetools-uikit/design-system@10.43.3
  - @commercetools-uikit/constraints@10.43.3
  - @commercetools-uikit/icons@10.43.3
  - @commercetools-uikit/input-utils@10.43.3
  - @commercetools-uikit/spacings-inline@10.43.3
  - @commercetools-uikit/spacings-stack@10.43.3

## 10.43.2

### Patch Changes

- Updated dependencies [[`276b88d`](https://github.com/commercetools/ui-kit/commit/276b88d4d2e25dc6d45f3c0a182e2b348652275c)]:
  - @commercetools-uikit/design-system@10.43.2
  - @commercetools-uikit/constraints@10.43.2
  - @commercetools-uikit/icons@10.43.2
  - @commercetools-uikit/input-utils@10.43.2
  - @commercetools-uikit/spacings-inline@10.43.2
  - @commercetools-uikit/spacings-stack@10.43.2

## 10.42.3

### Patch Changes

- [`7531d9e`](https://github.com/commercetools/ui-kit/commit/7531d9e4ef07b1af2d2a8bde3192ea453f725b1a) [#1699](https://github.com/commercetools/ui-kit/pull/1699) Thanks [@emmenko](https://github.com/emmenko)! - Generate SVG icons components using `@svgr/cli`.

- Updated dependencies [[`7531d9e`](https://github.com/commercetools/ui-kit/commit/7531d9e4ef07b1af2d2a8bde3192ea453f725b1a)]:
  - @commercetools-uikit/icons@10.42.3
  - @commercetools-uikit/input-utils@10.42.3

## 10.42.2

### Patch Changes

- [`c7d495b`](https://github.com/commercetools/ui-kit/commit/c7d495b9160392ffd7aa7af24d15518da7948c97) [#1693](https://github.com/commercetools/ui-kit/pull/1693) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade preconstruct CLI to v2 for bundling.

* [`85fe702`](https://github.com/commercetools/ui-kit/commit/85fe702d28c23de58a376cbcf38d39b838357fbc) [#1697](https://github.com/commercetools/ui-kit/pull/1697) Thanks [@emmenko](https://github.com/emmenko)! - Remove dependency `@emotion/styled-base` as it's not necessary anymore in emotion v11.

* Updated dependencies [[`c7d495b`](https://github.com/commercetools/ui-kit/commit/c7d495b9160392ffd7aa7af24d15518da7948c97), [`85fe702`](https://github.com/commercetools/ui-kit/commit/85fe702d28c23de58a376cbcf38d39b838357fbc)]:
  - @commercetools-uikit/design-system@10.42.2
  - @commercetools-uikit/constraints@10.42.2
  - @commercetools-uikit/icons@10.42.2
  - @commercetools-uikit/input-utils@10.42.2
  - @commercetools-uikit/spacings-inline@10.42.2
  - @commercetools-uikit/spacings-stack@10.42.2
  - @commercetools-uikit/utils@10.42.2

## 10.42.1

### Patch Changes

- Updated dependencies [[`3c522ed`](https://github.com/commercetools/ui-kit/commit/3c522ed7576af3a6bc6dca30777df76202ca8834)]:
  - @commercetools-uikit/design-system@10.42.1
  - @commercetools-uikit/constraints@10.42.1
  - @commercetools-uikit/icons@10.42.1
  - @commercetools-uikit/input-utils@10.42.1
  - @commercetools-uikit/spacings-inline@10.42.1
  - @commercetools-uikit/spacings-stack@10.42.1

## 10.42.0

### Minor Changes

- [`04ea8ab`](https://github.com/commercetools/ui-kit/commit/04ea8abdfbada5fedd9a932743323762fb790fd0) [#1671](https://github.com/commercetools/ui-kit/pull/1671) Thanks [@emmenko](https://github.com/emmenko)! - Compile and bundle packages using [preconstruct](https://preconstruct.tools)

### Patch Changes

- Updated dependencies [[`04ea8ab`](https://github.com/commercetools/ui-kit/commit/04ea8abdfbada5fedd9a932743323762fb790fd0)]:
  - @commercetools-uikit/design-system@10.42.0
  - @commercetools-uikit/constraints@10.42.0
  - @commercetools-uikit/icons@10.42.0
  - @commercetools-uikit/input-utils@10.42.0
  - @commercetools-uikit/spacings-inline@10.42.0
  - @commercetools-uikit/spacings-stack@10.42.0
  - @commercetools-uikit/utils@10.42.0

## 10.41.0

### Minor Changes

- [`26c6562`](https://github.com/commercetools/ui-kit/commit/26c65622f7f1911f51fc0056ade2d0c8ec8af0a1) [#1670](https://github.com/commercetools/ui-kit/pull/1670) Thanks [@emmenko](https://github.com/emmenko)! - Migrate to emotion v11. https://emotion.sh/docs/emotion-11

### Patch Changes

- Updated dependencies [[`26c6562`](https://github.com/commercetools/ui-kit/commit/26c65622f7f1911f51fc0056ade2d0c8ec8af0a1)]:
  - @commercetools-uikit/constraints@10.41.0
  - @commercetools-uikit/icons@10.41.0
  - @commercetools-uikit/input-utils@10.41.0
  - @commercetools-uikit/spacings-inline@10.41.0
  - @commercetools-uikit/spacings-stack@10.41.0
  - @commercetools-uikit/utils@10.41.0

## 10.40.1

### Patch Changes

- [`2d7c352`](https://github.com/commercetools/ui-kit/commit/2d7c35215b0b42d5d20488e6bc20b771ad22de68) [#1679](https://github.com/commercetools/ui-kit/pull/1679) Thanks [@emmenko](https://github.com/emmenko)! - Do not export `create-styled-icon.js` but copy the file in each generated icons package.

- Updated dependencies [[`2d7c352`](https://github.com/commercetools/ui-kit/commit/2d7c35215b0b42d5d20488e6bc20b771ad22de68)]:
  - @commercetools-uikit/icons@10.40.1
  - @commercetools-uikit/input-utils@10.40.1

## 10.40.0

### Minor Changes

- [`a2c1615`](https://github.com/commercetools/ui-kit/commit/a2c1615512b416c464310d3e67a9ee220dde47d8) [#1632](https://github.com/commercetools/ui-kit/pull/1632) Thanks [@jonnybel](https://github.com/jonnybel)! - Add support for new constraint scale values for `horizontalConstraint` prop

### Patch Changes

- [`37a68a0`](https://github.com/commercetools/ui-kit/commit/37a68a012bb2e912ee25798312d69ab9b3464bf8) [#1672](https://github.com/commercetools/ui-kit/pull/1672) Thanks [@emmenko](https://github.com/emmenko)! - Move internal source code into utils packages, to avoid using relative paths pointing to locations outside of the packages.

* [`d9bc2d2`](https://github.com/commercetools/ui-kit/commit/d9bc2d29cef14cdde9a659609ed1b7e9b24d21d0) [#1677](https://github.com/commercetools/ui-kit/pull/1677) Thanks [@emmenko](https://github.com/emmenko)! - Fix relative imports leftovers

* Updated dependencies [[`37a68a0`](https://github.com/commercetools/ui-kit/commit/37a68a012bb2e912ee25798312d69ab9b3464bf8), [`d9bc2d2`](https://github.com/commercetools/ui-kit/commit/d9bc2d29cef14cdde9a659609ed1b7e9b24d21d0), [`a2c1615`](https://github.com/commercetools/ui-kit/commit/a2c1615512b416c464310d3e67a9ee220dde47d8), [`de7dcdf`](https://github.com/commercetools/ui-kit/commit/de7dcdf295218c50711b238ef12038850bc2463b), [`a2c1615`](https://github.com/commercetools/ui-kit/commit/a2c1615512b416c464310d3e67a9ee220dde47d8)]:
  - @commercetools-uikit/icons@10.40.0
  - @commercetools-uikit/input-utils@10.40.0
  - @commercetools-uikit/constraints@10.40.0
  - @commercetools-uikit/utils@10.40.0
  - @commercetools-uikit/design-system@10.40.0
  - @commercetools-uikit/spacings-inline@10.40.0
  - @commercetools-uikit/spacings-stack@10.40.0

## 10.39.8

### Patch Changes

- [`3bebfed`](https://github.com/commercetools/ui-kit/commit/3bebfed8f7468f247be2cef30e274088138166e5) [#1662](https://github.com/commercetools/ui-kit/pull/1662) Thanks [@emmenko](https://github.com/emmenko)! - Explicitly get Emotion theme from context instead of relying on the implicit behavior

- Updated dependencies [[`3bebfed`](https://github.com/commercetools/ui-kit/commit/3bebfed8f7468f247be2cef30e274088138166e5)]:
  - @commercetools-uikit/design-system@10.39.8
  - @commercetools-uikit/constraints@10.39.8
  - @commercetools-uikit/spacings-inline@10.39.8
  - @commercetools-uikit/spacings-stack@10.39.8
  - @commercetools-uikit/utils@10.39.8

## 10.39.7

### Patch Changes

- Updated dependencies [[`050af75`](https://github.com/commercetools/ui-kit/commit/050af75aabefd0f11b498b48f5926383e7cfcf8b)]:
  - @commercetools-uikit/design-system@10.39.7
  - @commercetools-uikit/constraints@10.39.7
  - @commercetools-uikit/spacings-inline@10.39.7
  - @commercetools-uikit/spacings-stack@10.39.7

## 10.39.6

### Patch Changes

- [`bcb2d29`](https://github.com/commercetools/ui-kit/commit/bcb2d29956c959b09c32a1cedaee5ae2fadf034e) [#1657](https://github.com/commercetools/ui-kit/pull/1657) Thanks [@emmenko](https://github.com/emmenko)! - Fix Rollup: keep `process.env.NODE_ENV` in production bundles.

- Updated dependencies [[`3564da3`](https://github.com/commercetools/ui-kit/commit/3564da32dcf07e72ecfff92bdba79f63b26855b8), [`bcb2d29`](https://github.com/commercetools/ui-kit/commit/bcb2d29956c959b09c32a1cedaee5ae2fadf034e)]:
  - @commercetools-uikit/utils@10.39.6
  - @commercetools-uikit/design-system@10.39.6
  - @commercetools-uikit/constraints@10.39.6
  - @commercetools-uikit/spacings-inline@10.39.6
  - @commercetools-uikit/spacings-stack@10.39.6

## 10.39.4

### Patch Changes

- [`a635fcc`](https://github.com/commercetools/ui-kit/commit/a635fcc8105b81545baaa684751432769cc0d94a) [#1652](https://github.com/commercetools/ui-kit/pull/1652) Thanks [@emmenko](https://github.com/emmenko)! - Fix spacings package name (regression).

- Updated dependencies [[`a635fcc`](https://github.com/commercetools/ui-kit/commit/a635fcc8105b81545baaa684751432769cc0d94a)]:
  - @commercetools-uikit/design-system@10.39.4
  - @commercetools-uikit/constraints@10.39.4
  - @commercetools-uikit/spacings-inline@10.39.4
  - @commercetools-uikit/spacings-stack@10.39.4
  - @commercetools-uikit/utils@10.39.4

## 10.39.3

### Patch Changes

- [`1d12f65`](https://github.com/commercetools/ui-kit/commit/1d12f65d06e237b500b27749e9ee93b4fababacb) [#1650](https://github.com/commercetools/ui-kit/pull/1650) Thanks [@emmenko](https://github.com/emmenko)! - Rebundle all packages due to a fix in Rollup.

- Updated dependencies [[`1d12f65`](https://github.com/commercetools/ui-kit/commit/1d12f65d06e237b500b27749e9ee93b4fababacb)]:
  - @commercetools-uikit/design-system@10.39.3
  - @commercetools-uikit/constraints@10.39.3
  - @commercetools-uikit/utils@10.39.3

## 10.39.2

### Patch Changes

- [`efde835`](https://github.com/commercetools/ui-kit/commit/efde83584d00f1e3147d179f3ee8233a325b515b) [#1646](https://github.com/commercetools/ui-kit/pull/1646) Thanks [@emmenko](https://github.com/emmenko)! - Improve Rollup configuration, use babel runtime helpers

* [`d65d494`](https://github.com/commercetools/ui-kit/commit/d65d4946feeac082ad8f0a5d44010e3afacb4c79) [#1649](https://github.com/commercetools/ui-kit/pull/1649) Thanks [@emmenko](https://github.com/emmenko)! - Explicitly declare `@emotion/styled-base` dependency so that Yarn workspaces can properly hoist it and node can resolve the module.

* Updated dependencies [[`efde835`](https://github.com/commercetools/ui-kit/commit/efde83584d00f1e3147d179f3ee8233a325b515b), [`d65d494`](https://github.com/commercetools/ui-kit/commit/d65d4946feeac082ad8f0a5d44010e3afacb4c79)]:
  - @commercetools-uikit/design-system@10.39.2
  - @commercetools-uikit/constraints@10.39.2
  - @commercetools-uikit/utils@10.39.2

## 10.39.1

### Patch Changes

- [`7897ced`](https://github.com/commercetools/ui-kit/commit/7897cede31440e29ce8afdb2b17fa23462f6f211) [#1642](https://github.com/commercetools/ui-kit/pull/1642) Thanks [@emmenko](https://github.com/emmenko)! - Ensure each package.json of each package has all the necessary fields.

- Updated dependencies [[`7897ced`](https://github.com/commercetools/ui-kit/commit/7897cede31440e29ce8afdb2b17fa23462f6f211)]:
  - @commercetools-uikit/design-system@10.39.1
  - @commercetools-uikit/constraints@10.39.1
  - @commercetools-uikit/utils@10.39.1

## 10.34.0

### Minor Changes

- [`4cb094a`](https://github.com/commercetools/ui-kit/commit/4cb094a5db4ec3fd27455ad9d7028b43111b3667) [#1539](https://github.com/commercetools/ui-kit/pull/1539) Thanks [@jonnybel](https://github.com/jonnybel)! - Improved keyboard navigation support by adding/enhancing visual indicators for hover and focus states, including for readOnly mode.

## 10.30.1

### Patch Changes

- [`2ab294a`](https://github.com/commercetools/ui-kit/commit/2ab294a36e98dc3483507127a0b5d35862cf5429) [#1497](https://github.com/commercetools/ui-kit/pull/1497) Thanks [@emmenko](https://github.com/emmenko)! - Fix a11y issue with relationshipts between label and form/non-form elements

* [`db6b77c`](https://github.com/commercetools/ui-kit/commit/db6b77c3baf110136440dfc7c6d42cace74eb85e) [#1492](https://github.com/commercetools/ui-kit/pull/1492) Thanks [@emmenko](https://github.com/emmenko)! - Use ranged versions for emotion dependencies

* Updated dependencies [[`db6b77c`](https://github.com/commercetools/ui-kit/commit/db6b77c3baf110136440dfc7c6d42cace74eb85e)]:
  - @commercetools-uikit/constraints@10.30.1
  - @commercetools-uikit/spacings-inline@10.30.1
  - @commercetools-uikit/spacings-stack@10.30.1

## 10.27.1

### Patch Changes

- Updated dependencies [[`0c09ae4`](https://github.com/commercetools/ui-kit/commit/0c09ae4c3ceaeb65af57bdfcb7ed07c64eff8cb4)]:
  - @commercetools-uikit/spacings-inline@10.27.1
  - @commercetools-uikit/spacings-stack@10.27.1

## 10.24.0

### Patch Changes

- [`bf63fd7`](https://github.com/commercetools/ui-kit/commit/bf63fd7b13b9d1a2386b85f123fcda93823d4bcf) [#1421](https://github.com/commercetools/ui-kit/pull/1421) Thanks [@mohib0306](https://github.com/mohib0306)! - Move `src/components/inputs` to `packages/components/inputs`

## 10.21.0

### Patch Changes

- Updated dependencies [[`f3fb2f0`](https://github.com/commercetools/ui-kit/commit/f3fb2f02f303b8627eece8972c5421e0d17ebb64)]:
  - @commercetools-uikit/utils@10.21.0
  - @commercetools-uikit/constraints@10.21.0
  - @commercetools-uikit/spacings-inline@10.21.0
  - @commercetools-uikit/spacings-stack@10.21.0
