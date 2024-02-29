# @commercetools-uikit/selectable-search-input

## 18.2.0

### Patch Changes

- Updated dependencies [[`a414fb5`](https://github.com/commercetools/ui-kit/commit/a414fb5d2d63edc988ad1c8ccc32e2ce2d646fa3), [`5518760`](https://github.com/commercetools/ui-kit/commit/5518760cc2ba912312386aa370ec2b5c281c5377)]:
  - @commercetools-uikit/icons@18.2.0
  - @commercetools-uikit/design-system@18.2.0
  - @commercetools-uikit/input-utils@18.2.0
  - @commercetools-uikit/select-utils@18.2.0
  - @commercetools-uikit/secondary-icon-button@18.2.0
  - @commercetools-uikit/constraints@18.2.0
  - @commercetools-uikit/hooks@18.2.0
  - @commercetools-uikit/utils@18.2.0

## 18.1.0

### Patch Changes

- Updated dependencies [[`78d878c`](https://github.com/commercetools/ui-kit/commit/78d878cdb62bf46e1596f0df72fc6871a847ecb9)]:
  - @commercetools-uikit/design-system@18.1.0
  - @commercetools-uikit/secondary-icon-button@18.1.0
  - @commercetools-uikit/constraints@18.1.0
  - @commercetools-uikit/icons@18.1.0
  - @commercetools-uikit/input-utils@18.1.0
  - @commercetools-uikit/select-utils@18.1.0
  - @commercetools-uikit/hooks@18.1.0
  - @commercetools-uikit/utils@18.1.0

## 18.0.0

### Minor Changes

- [#2703](https://github.com/commercetools/ui-kit/pull/2703) [`c029c7c`](https://github.com/commercetools/ui-kit/commit/c029c7cc9f8f96b01089822b54405ebc8fedb9d6) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update design tokens usage.

### Patch Changes

- Updated dependencies [[`c029c7c`](https://github.com/commercetools/ui-kit/commit/c029c7cc9f8f96b01089822b54405ebc8fedb9d6), [`c029c7c`](https://github.com/commercetools/ui-kit/commit/c029c7cc9f8f96b01089822b54405ebc8fedb9d6), [`568c28e`](https://github.com/commercetools/ui-kit/commit/568c28ef90c5b7f97d1cc37a1a402cfe6f001c45), [`db371ba`](https://github.com/commercetools/ui-kit/commit/db371bab2237b82035a227af3d9227926448cb99)]:
  - @commercetools-uikit/secondary-icon-button@18.0.0
  - @commercetools-uikit/select-utils@18.0.0
  - @commercetools-uikit/input-utils@18.0.0
  - @commercetools-uikit/design-system@18.0.0
  - @commercetools-uikit/constraints@18.0.0
  - @commercetools-uikit/icons@18.0.0
  - @commercetools-uikit/hooks@18.0.0
  - @commercetools-uikit/utils@18.0.0

## 17.1.0

### Minor Changes

- [#2698](https://github.com/commercetools/ui-kit/pull/2698) [`d263f01`](https://github.com/commercetools/ui-kit/commit/d263f01990551a3a0dcb6c0886b9d2b35c7f7cf5) Thanks [@obulaworld](https://github.com/obulaworld)! - We've included a new property in all `*Field` components so consumers can not only render errors (below the input) but also warnings.
  The main difference between them is the color used for the text.

  Please take a look at the README files of the fields components to learn how to use this new property.

### Patch Changes

- Updated dependencies [[`a0abf51`](https://github.com/commercetools/ui-kit/commit/a0abf51483dcf26861f6af506b3acf10cb9fcd2c), [`3425f6c`](https://github.com/commercetools/ui-kit/commit/3425f6c371e2b386d60aa04c97ca8ffbf43f6cb1), [`8ba22f1`](https://github.com/commercetools/ui-kit/commit/8ba22f109d50d171b1d7f6f0bdc751c4689e0f11)]:
  - @commercetools-uikit/icons@17.1.0
  - @commercetools-uikit/design-system@17.1.0
  - @commercetools-uikit/constraints@17.1.0
  - @commercetools-uikit/input-utils@17.1.0
  - @commercetools-uikit/select-utils@17.1.0
  - @commercetools-uikit/secondary-icon-button@17.1.0
  - @commercetools-uikit/hooks@17.1.0
  - @commercetools-uikit/utils@17.1.0

## 17.0.1

### Patch Changes

- Updated dependencies [[`20dc5bb`](https://github.com/commercetools/ui-kit/commit/20dc5bb6e331d2737439d87299057c773669f72e)]:
  - @commercetools-uikit/select-utils@17.0.1
  - @commercetools-uikit/design-system@17.0.1
  - @commercetools-uikit/secondary-icon-button@17.0.1
  - @commercetools-uikit/constraints@17.0.1
  - @commercetools-uikit/icons@17.0.1
  - @commercetools-uikit/input-utils@17.0.1
  - @commercetools-uikit/hooks@17.0.1
  - @commercetools-uikit/utils@17.0.1

## 17.0.0

### Patch Changes

- [#2678](https://github.com/commercetools/ui-kit/pull/2678) [`39c71b647`](https://github.com/commercetools/ui-kit/commit/39c71b647a463ea69fe99d245faca7f8526ea3f3) Thanks [@ddouglasz](https://github.com/ddouglasz)! - We included two new props (`selectDataProps`, `inputDataProps`) which allow consumers to forward `data-*` html props independently to both the `select` and `input` HTML elements.

  If you were providing `data-*` props directly to these component, those will keep being forwarded to the `input` HTML element the same way they currently do but we will intend to remove that behaviour in the future in favour of the new added props.

- Updated dependencies [[`6803787a0`](https://github.com/commercetools/ui-kit/commit/6803787a03e07020b8a2437483fc6fe7fac488f5), [`475df2d59`](https://github.com/commercetools/ui-kit/commit/475df2d59bf73d91ce955be3ce63eef7e1a4c8ba)]:
  - @commercetools-uikit/select-utils@17.0.0
  - @commercetools-uikit/design-system@17.0.0
  - @commercetools-uikit/secondary-icon-button@17.0.0
  - @commercetools-uikit/constraints@17.0.0
  - @commercetools-uikit/icons@17.0.0
  - @commercetools-uikit/input-utils@17.0.0
  - @commercetools-uikit/hooks@17.0.0
  - @commercetools-uikit/utils@17.0.0

## 16.12.1

### Patch Changes

- Updated dependencies [[`e7981d960`](https://github.com/commercetools/ui-kit/commit/e7981d960919a5de7e59470ae5ecc33d308c1e9b)]:
  - @commercetools-uikit/select-utils@16.12.1
  - @commercetools-uikit/design-system@16.12.1
  - @commercetools-uikit/secondary-icon-button@16.12.1
  - @commercetools-uikit/constraints@16.12.1
  - @commercetools-uikit/icons@16.12.1
  - @commercetools-uikit/input-utils@16.12.1
  - @commercetools-uikit/hooks@16.12.1
  - @commercetools-uikit/utils@16.12.1

## 16.12.0

### Patch Changes

- Updated dependencies [[`e5f42ff8a`](https://github.com/commercetools/ui-kit/commit/e5f42ff8ab4bafbcc0c7e111b4aab462dfaa3e8c), [`5fc86c87a`](https://github.com/commercetools/ui-kit/commit/5fc86c87a0533f4ae744ad59ca6a4981f61b2bf4)]:
  - @commercetools-uikit/select-utils@16.12.0
  - @commercetools-uikit/icons@16.12.0
  - @commercetools-uikit/input-utils@16.12.0
  - @commercetools-uikit/design-system@16.12.0
  - @commercetools-uikit/secondary-icon-button@16.12.0
  - @commercetools-uikit/constraints@16.12.0
  - @commercetools-uikit/hooks@16.12.0
  - @commercetools-uikit/utils@16.12.0

## 16.11.0

### Patch Changes

- Updated dependencies [[`36ab2f477`](https://github.com/commercetools/ui-kit/commit/36ab2f477f16b3b348a481be40a9e5f0968c1e38)]:
  - @commercetools-uikit/select-utils@16.11.0
  - @commercetools-uikit/design-system@16.11.0
  - @commercetools-uikit/secondary-icon-button@16.11.0
  - @commercetools-uikit/constraints@16.11.0
  - @commercetools-uikit/icons@16.11.0
  - @commercetools-uikit/input-utils@16.11.0
  - @commercetools-uikit/hooks@16.11.0
  - @commercetools-uikit/utils@16.11.0

## 16.10.0

### Patch Changes

- Updated dependencies [[`6e53b7a63`](https://github.com/commercetools/ui-kit/commit/6e53b7a63289f00e6ecd522eac917c20ca31ac70)]:
  - @commercetools-uikit/design-system@16.10.0
  - @commercetools-uikit/secondary-icon-button@16.10.0
  - @commercetools-uikit/select-utils@16.10.0
  - @commercetools-uikit/constraints@16.10.0
  - @commercetools-uikit/icons@16.10.0
  - @commercetools-uikit/input-utils@16.10.0
  - @commercetools-uikit/hooks@16.10.0
  - @commercetools-uikit/utils@16.10.0

## 16.9.0

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/secondary-icon-button@16.9.0
  - @commercetools-uikit/select-utils@16.9.0
  - @commercetools-uikit/design-system@16.9.0
  - @commercetools-uikit/constraints@16.9.0
  - @commercetools-uikit/icons@16.9.0
  - @commercetools-uikit/input-utils@16.9.0
  - @commercetools-uikit/hooks@16.9.0
  - @commercetools-uikit/utils@16.9.0

## 16.8.0

### Patch Changes

- Updated dependencies [[`1713d8450`](https://github.com/commercetools/ui-kit/commit/1713d8450b9230f197421e97a905754e35fe08f7), [`31c790812`](https://github.com/commercetools/ui-kit/commit/31c7908124bbe95ffc5272a013a87793cc5b0a0d), [`1112bdf5a`](https://github.com/commercetools/ui-kit/commit/1112bdf5a26dcd2bab76172d03a7314365a930ba), [`fbd12e273`](https://github.com/commercetools/ui-kit/commit/fbd12e2738b8156e7b783103497cd90e41a229dd), [`f69f39684`](https://github.com/commercetools/ui-kit/commit/f69f396843708a5c00dea7059a3f45ac5f1985c9)]:
  - @commercetools-uikit/design-system@16.8.0
  - @commercetools-uikit/select-utils@16.8.0
  - @commercetools-uikit/icons@16.8.0
  - @commercetools-uikit/secondary-icon-button@16.8.0
  - @commercetools-uikit/constraints@16.8.0
  - @commercetools-uikit/input-utils@16.8.0
  - @commercetools-uikit/hooks@16.8.0
  - @commercetools-uikit/utils@16.8.0

## 16.7.5

### Patch Changes

- [#2603](https://github.com/commercetools/ui-kit/pull/2603) [`1f7f2e06c`](https://github.com/commercetools/ui-kit/commit/1f7f2e06c78a7e11e7d2c2a9dad22642418bb796) Thanks [@kark](https://github.com/kark)! - Add missing peer dependencies

- Updated dependencies [[`1f7f2e06c`](https://github.com/commercetools/ui-kit/commit/1f7f2e06c78a7e11e7d2c2a9dad22642418bb796)]:
  - @commercetools-uikit/select-utils@16.7.5
  - @commercetools-uikit/hooks@16.7.5
  - @commercetools-uikit/design-system@16.7.5
  - @commercetools-uikit/secondary-icon-button@16.7.5
  - @commercetools-uikit/constraints@16.7.5
  - @commercetools-uikit/icons@16.7.5
  - @commercetools-uikit/input-utils@16.7.5
  - @commercetools-uikit/utils@16.7.5

## 16.7.4

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/design-system@16.7.4
  - @commercetools-uikit/secondary-icon-button@16.7.4
  - @commercetools-uikit/constraints@16.7.4
  - @commercetools-uikit/icons@16.7.4
  - @commercetools-uikit/input-utils@16.7.4
  - @commercetools-uikit/select-utils@16.7.4
  - @commercetools-uikit/hooks@16.7.4
  - @commercetools-uikit/utils@16.7.4

## 16.7.3

### Patch Changes

- Updated dependencies [[`9cfdcbb22`](https://github.com/commercetools/ui-kit/commit/9cfdcbb2272e16677056f0aebe812ad6caf18ff7)]:
  - @commercetools-uikit/design-system@16.7.3
  - @commercetools-uikit/secondary-icon-button@16.7.3
  - @commercetools-uikit/constraints@16.7.3
  - @commercetools-uikit/icons@16.7.3
  - @commercetools-uikit/input-utils@16.7.3
  - @commercetools-uikit/select-utils@16.7.3
  - @commercetools-uikit/hooks@16.7.3
  - @commercetools-uikit/utils@16.7.3

## 16.7.2

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/design-system@16.7.2
  - @commercetools-uikit/secondary-icon-button@16.7.2
  - @commercetools-uikit/constraints@16.7.2
  - @commercetools-uikit/icons@16.7.2
  - @commercetools-uikit/input-utils@16.7.2
  - @commercetools-uikit/select-utils@16.7.2
  - @commercetools-uikit/hooks@16.7.2
  - @commercetools-uikit/utils@16.7.2

## 16.7.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/design-system@16.7.1
  - @commercetools-uikit/secondary-icon-button@16.7.1
  - @commercetools-uikit/constraints@16.7.1
  - @commercetools-uikit/icons@16.7.1
  - @commercetools-uikit/input-utils@16.7.1
  - @commercetools-uikit/select-utils@16.7.1
  - @commercetools-uikit/hooks@16.7.1
  - @commercetools-uikit/utils@16.7.1

## 16.7.0

### Patch Changes

- Updated dependencies [[`be20cc204`](https://github.com/commercetools/ui-kit/commit/be20cc2045128dcabd96e86b7979c22540d260c9)]:
  - @commercetools-uikit/design-system@16.7.0
  - @commercetools-uikit/secondary-icon-button@16.7.0
  - @commercetools-uikit/constraints@16.7.0
  - @commercetools-uikit/icons@16.7.0
  - @commercetools-uikit/input-utils@16.7.0
  - @commercetools-uikit/select-utils@16.7.0
  - @commercetools-uikit/hooks@16.7.0
  - @commercetools-uikit/utils@16.7.0

## 16.6.1

### Patch Changes

- Updated dependencies [[`27c002aad`](https://github.com/commercetools/ui-kit/commit/27c002aadf38ffbc5d827c425f239d46dfa71b7f)]:
  - @commercetools-uikit/icons@16.6.1
  - @commercetools-uikit/design-system@16.6.1
  - @commercetools-uikit/input-utils@16.6.1
  - @commercetools-uikit/select-utils@16.6.1
  - @commercetools-uikit/secondary-icon-button@16.6.1
  - @commercetools-uikit/constraints@16.6.1
  - @commercetools-uikit/hooks@16.6.1
  - @commercetools-uikit/utils@16.6.1

## 16.6.0

### Patch Changes

- [#2572](https://github.com/commercetools/ui-kit/pull/2572) [`b0dad1173`](https://github.com/commercetools/ui-kit/commit/b0dad1173d9a93d4b3c863527177c82d24b9dcfa) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Fix behaviour of `auto` value for the `horizontalConstraint` property in all `select` input components.

  It was previously making the components to use all its available width (same as `scale` value) and now their width will be calculated based on their contents (placeholder or selected value).

- [#2559](https://github.com/commercetools/ui-kit/pull/2559) [`2fde27808`](https://github.com/commercetools/ui-kit/commit/2fde27808abbf0850d0c901889c649b76d3c3bad) Thanks [@dependabot](https://github.com/apps/dependabot)! - Updated [semver](https://github.com/npm/node-semver) dependency.

- [#2557](https://github.com/commercetools/ui-kit/pull/2557) [`af871d072`](https://github.com/commercetools/ui-kit/commit/af871d0726c8aeae14f0563d73147512ea9e96ae) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update [semver](https://github.com/salesforce/tough-cookie) dependency.

- Updated dependencies [[`0697dc48c`](https://github.com/commercetools/ui-kit/commit/0697dc48c6dfa858bcc7f2fabd841711a20795fa), [`b0dad1173`](https://github.com/commercetools/ui-kit/commit/b0dad1173d9a93d4b3c863527177c82d24b9dcfa), [`5c88b1c9e`](https://github.com/commercetools/ui-kit/commit/5c88b1c9e637d47ff372d0555729f9df717a45c1), [`86a5f09f2`](https://github.com/commercetools/ui-kit/commit/86a5f09f26e0f2dcac8f61d9333a6043a6ecc39a), [`2fde27808`](https://github.com/commercetools/ui-kit/commit/2fde27808abbf0850d0c901889c649b76d3c3bad), [`af871d072`](https://github.com/commercetools/ui-kit/commit/af871d0726c8aeae14f0563d73147512ea9e96ae), [`ea757c503`](https://github.com/commercetools/ui-kit/commit/ea757c503af763a845d9ae8c4370c94bd77dd9ab)]:
  - @commercetools-uikit/design-system@16.6.0
  - @commercetools-uikit/select-utils@16.6.0
  - @commercetools-uikit/icons@16.6.0
  - @commercetools-uikit/secondary-icon-button@16.6.0
  - @commercetools-uikit/constraints@16.6.0
  - @commercetools-uikit/input-utils@16.6.0
  - @commercetools-uikit/hooks@16.6.0
  - @commercetools-uikit/utils@16.6.0

## 16.5.0

### Patch Changes

- Updated dependencies [[`6729c7595`](https://github.com/commercetools/ui-kit/commit/6729c7595c4d80d558697fabcd6c92d3788f0266)]:
  - @commercetools-uikit/icons@16.5.0
  - @commercetools-uikit/input-utils@16.5.0
  - @commercetools-uikit/select-utils@16.5.0
  - @commercetools-uikit/design-system@16.5.0
  - @commercetools-uikit/secondary-icon-button@16.5.0
  - @commercetools-uikit/constraints@16.5.0
  - @commercetools-uikit/hooks@16.5.0
  - @commercetools-uikit/utils@16.5.0

## 16.4.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/design-system@16.4.1
  - @commercetools-uikit/secondary-icon-button@16.4.1
  - @commercetools-uikit/constraints@16.4.1
  - @commercetools-uikit/icons@16.4.1
  - @commercetools-uikit/input-utils@16.4.1
  - @commercetools-uikit/select-utils@16.4.1
  - @commercetools-uikit/hooks@16.4.1
  - @commercetools-uikit/utils@16.4.1

## 16.4.0

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/design-system@16.4.0
  - @commercetools-uikit/secondary-icon-button@16.4.0
  - @commercetools-uikit/constraints@16.4.0
  - @commercetools-uikit/icons@16.4.0
  - @commercetools-uikit/input-utils@16.4.0
  - @commercetools-uikit/select-utils@16.4.0
  - @commercetools-uikit/hooks@16.4.0
  - @commercetools-uikit/utils@16.4.0

## 16.3.0

### Patch Changes

- Updated dependencies [[`767267936`](https://github.com/commercetools/ui-kit/commit/767267936f2900f08e94d19811cbe6b8f8c9cbd7), [`0105a8b4a`](https://github.com/commercetools/ui-kit/commit/0105a8b4af8e214e586ab1e69aae3daf879c4a5a)]:
  - @commercetools-uikit/design-system@16.3.0
  - @commercetools-uikit/secondary-icon-button@16.3.0
  - @commercetools-uikit/constraints@16.3.0
  - @commercetools-uikit/icons@16.3.0
  - @commercetools-uikit/input-utils@16.3.0
  - @commercetools-uikit/select-utils@16.3.0
  - @commercetools-uikit/hooks@16.3.0
  - @commercetools-uikit/utils@16.3.0

## 16.2.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/design-system@16.2.1
  - @commercetools-uikit/secondary-icon-button@16.2.1
  - @commercetools-uikit/constraints@16.2.1
  - @commercetools-uikit/icons@16.2.1
  - @commercetools-uikit/input-utils@16.2.1
  - @commercetools-uikit/select-utils@16.2.1
  - @commercetools-uikit/hooks@16.2.1
  - @commercetools-uikit/utils@16.2.1

## 16.2.0

### Patch Changes

- Updated dependencies [[`c3a505a94`](https://github.com/commercetools/ui-kit/commit/c3a505a941958e095799db6f9eab02a872b9b0fd), [`b6fae35c8`](https://github.com/commercetools/ui-kit/commit/b6fae35c8cc0de405a4d8aacbffac4f46a369fc4), [`daab7741e`](https://github.com/commercetools/ui-kit/commit/daab7741e3b46044695eff319053809449488f3a)]:
  - @commercetools-uikit/design-system@16.2.0
  - @commercetools-uikit/hooks@16.2.0
  - @commercetools-uikit/input-utils@16.2.0
  - @commercetools-uikit/icons@16.2.0
  - @commercetools-uikit/secondary-icon-button@16.2.0
  - @commercetools-uikit/constraints@16.2.0
  - @commercetools-uikit/select-utils@16.2.0
  - @commercetools-uikit/utils@16.2.0

## 16.1.1

### Patch Changes

- [#2521](https://github.com/commercetools/ui-kit/pull/2521) [`251c0dd89`](https://github.com/commercetools/ui-kit/commit/251c0dd89dc9d2228ffe23f05e25178ec3662f45) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Remove supporting code for look and feel migration.

- Updated dependencies [[`5469c3468`](https://github.com/commercetools/ui-kit/commit/5469c3468fc788041b06f2b5288029993339a593), [`251c0dd89`](https://github.com/commercetools/ui-kit/commit/251c0dd89dc9d2228ffe23f05e25178ec3662f45)]:
  - @commercetools-uikit/input-utils@16.1.1
  - @commercetools-uikit/select-utils@16.1.1
  - @commercetools-uikit/design-system@16.1.1
  - @commercetools-uikit/secondary-icon-button@16.1.1
  - @commercetools-uikit/constraints@16.1.1
  - @commercetools-uikit/icons@16.1.1
  - @commercetools-uikit/hooks@16.1.1
  - @commercetools-uikit/utils@16.1.1

## 16.1.0

### Patch Changes

- [#2509](https://github.com/commercetools/ui-kit/pull/2509) [`cd36078fa`](https://github.com/commercetools/ui-kit/commit/cd36078fa6f1bf83bd1be03035d916298ad6038e) Thanks [@renovate](https://github.com/apps/renovate)! - Updated all dependencies

- Updated dependencies [[`9ec1a6f9a`](https://github.com/commercetools/ui-kit/commit/9ec1a6f9a72ccb08a8d058396db48a6347861887), [`03dad5626`](https://github.com/commercetools/ui-kit/commit/03dad56266eda43d9ccfda3d32ca8febfeb0998b), [`9bc8e06ec`](https://github.com/commercetools/ui-kit/commit/9bc8e06ec03b1a123c507e442254c6d486f4ae71), [`cd36078fa`](https://github.com/commercetools/ui-kit/commit/cd36078fa6f1bf83bd1be03035d916298ad6038e)]:
  - @commercetools-uikit/design-system@16.1.0
  - @commercetools-uikit/select-utils@16.1.0
  - @commercetools-uikit/icons@16.1.0
  - @commercetools-uikit/utils@16.1.0
  - @commercetools-uikit/secondary-icon-button@16.1.0
  - @commercetools-uikit/constraints@16.1.0
  - @commercetools-uikit/input-utils@16.1.0
  - @commercetools-uikit/hooks@16.1.0

## 16.0.0

### Major Changes

- [#2475](https://github.com/commercetools/ui-kit/pull/2475) [`8e6c74559`](https://github.com/commercetools/ui-kit/commit/8e6c745597aa0fdf761037e10fa3251797c0e30c) Thanks [@emmenko](https://github.com/emmenko)! - Upgrade `react-intl` to `v6`.

  # Migration

  The peer dependency of `react-intl` should be updated to `v6`. No other migration steps are required.

### Patch Changes

- Updated dependencies [[`8e6c74559`](https://github.com/commercetools/ui-kit/commit/8e6c745597aa0fdf761037e10fa3251797c0e30c)]:
  - @commercetools-uikit/secondary-icon-button@16.0.0
  - @commercetools-uikit/select-utils@16.0.0
  - @commercetools-uikit/input-utils@16.0.0
  - @commercetools-uikit/design-system@16.0.0
  - @commercetools-uikit/constraints@16.0.0
  - @commercetools-uikit/icons@16.0.0
  - @commercetools-uikit/hooks@16.0.0
  - @commercetools-uikit/utils@16.0.0

## 15.15.1

### Patch Changes

- [#2463](https://github.com/commercetools/ui-kit/pull/2463) [`c03ec4d7d`](https://github.com/commercetools/ui-kit/commit/c03ec4d7d7a927b112392069a606d8c8194046f6) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependencies

- Updated dependencies [[`c03ec4d7d`](https://github.com/commercetools/ui-kit/commit/c03ec4d7d7a927b112392069a606d8c8194046f6)]:
  - @commercetools-uikit/select-utils@15.15.1
  - @commercetools-uikit/design-system@15.15.1
  - @commercetools-uikit/secondary-icon-button@15.15.1
  - @commercetools-uikit/constraints@15.15.1
  - @commercetools-uikit/icons@15.15.1
  - @commercetools-uikit/input-utils@15.15.1
  - @commercetools-uikit/hooks@15.15.1
  - @commercetools-uikit/utils@15.15.1

## 15.15.0

### Patch Changes

- [#2496](https://github.com/commercetools/ui-kit/pull/2496) [`03cb6a23d`](https://github.com/commercetools/ui-kit/commit/03cb6a23dc0f2709e774e60f46ba610080db47b4) Thanks [@emmenko](https://github.com/emmenko)! - Fix internal component types

- [#2484](https://github.com/commercetools/ui-kit/pull/2484) [`75da6b87b`](https://github.com/commercetools/ui-kit/commit/75da6b87b3ae9c7a14548ea1cd38b427e1e167c5) Thanks [@kark](https://github.com/kark)! - Improve docs regarding the use of `menuPortalZIndex` prop.
  Warn when `menuPortalZIndex` is used without setting `menuPortalTarget`.
- Updated dependencies [[`26830d8ed`](https://github.com/commercetools/ui-kit/commit/26830d8ed0f0bccad6ceae0891e4c2491328c685), [`5bf3bdacf`](https://github.com/commercetools/ui-kit/commit/5bf3bdacf2e8553ce965e564a805b0fe011a9612), [`def5354db`](https://github.com/commercetools/ui-kit/commit/def5354db2c351e4f035d395de44c0666f0a92d1), [`ee66b4b6d`](https://github.com/commercetools/ui-kit/commit/ee66b4b6db56b2fbef54f9196de5b66645af7d84), [`b9f80bf64`](https://github.com/commercetools/ui-kit/commit/b9f80bf64a5a483bfd93c5d8e856fcd587ced281), [`ee66b4b6d`](https://github.com/commercetools/ui-kit/commit/ee66b4b6db56b2fbef54f9196de5b66645af7d84), [`75da6b87b`](https://github.com/commercetools/ui-kit/commit/75da6b87b3ae9c7a14548ea1cd38b427e1e167c5)]:
  - @commercetools-uikit/select-utils@15.15.0
  - @commercetools-uikit/icons@15.15.0
  - @commercetools-uikit/design-system@15.15.0
  - @commercetools-uikit/hooks@15.15.0
  - @commercetools-uikit/input-utils@15.15.0
  - @commercetools-uikit/secondary-icon-button@15.15.0
  - @commercetools-uikit/constraints@15.15.0
  - @commercetools-uikit/utils@15.15.0

## 15.14.3

### Patch Changes

- Updated dependencies [[`120278ce9`](https://github.com/commercetools/ui-kit/commit/120278ce94f17f7083cb2ae854298e62a95cba3f)]:
  - @commercetools-uikit/select-utils@15.14.3
  - @commercetools-uikit/design-system@15.14.3
  - @commercetools-uikit/secondary-icon-button@15.14.3
  - @commercetools-uikit/constraints@15.14.3
  - @commercetools-uikit/icons@15.14.3
  - @commercetools-uikit/input-utils@15.14.3
  - @commercetools-uikit/hooks@15.14.3
  - @commercetools-uikit/utils@15.14.3

## 15.14.2

### Patch Changes

- [#2467](https://github.com/commercetools/ui-kit/pull/2467) [`56ce7921d`](https://github.com/commercetools/ui-kit/commit/56ce7921db35ec34ba83f4b65b2c1e777e1b0b54) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Refactored the way we export Typescript definitions as there was an issue with generic types.

- Updated dependencies [[`56ce7921d`](https://github.com/commercetools/ui-kit/commit/56ce7921db35ec34ba83f4b65b2c1e777e1b0b54)]:
  - @commercetools-uikit/secondary-icon-button@15.14.2
  - @commercetools-uikit/input-utils@15.14.2
  - @commercetools-uikit/constraints@15.14.2
  - @commercetools-uikit/select-utils@15.14.2
  - @commercetools-uikit/design-system@15.14.2
  - @commercetools-uikit/icons@15.14.2
  - @commercetools-uikit/hooks@15.14.2
  - @commercetools-uikit/utils@15.14.2

## 15.14.1

### Patch Changes

- [#2447](https://github.com/commercetools/ui-kit/pull/2447) [`9d354abe6`](https://github.com/commercetools/ui-kit/commit/9d354abe62009f20138a8c3aeb535aa50060e503) Thanks [@renovate](https://github.com/apps/renovate)! - Upgrade dependencies

- Updated dependencies [[`9d354abe6`](https://github.com/commercetools/ui-kit/commit/9d354abe62009f20138a8c3aeb535aa50060e503), [`8fb88a98d`](https://github.com/commercetools/ui-kit/commit/8fb88a98da1b2267d05e14c1b65f99569df06974)]:
  - @commercetools-uikit/select-utils@15.14.1
  - @commercetools-uikit/icons@15.14.1
  - @commercetools-uikit/design-system@15.14.1
  - @commercetools-uikit/input-utils@15.14.1
  - @commercetools-uikit/secondary-icon-button@15.14.1
  - @commercetools-uikit/constraints@15.14.1
  - @commercetools-uikit/hooks@15.14.1
  - @commercetools-uikit/utils@15.14.1

## 15.14.0

### Patch Changes

- [#2443](https://github.com/commercetools/ui-kit/pull/2443) [`500ba82ca`](https://github.com/commercetools/ui-kit/commit/500ba82ca036c73b4bb3892b5c9b607eb22465bb) Thanks [@chloe0592](https://github.com/chloe0592)! - Unifying sizes of the buttons

- [#2452](https://github.com/commercetools/ui-kit/pull/2452) [`44a6d6a4e`](https://github.com/commercetools/ui-kit/commit/44a6d6a4ec63a058c6329f52868894fa95810b59) Thanks [@Rhotimee](https://github.com/Rhotimee)! - Style update for new theme

- [#2429](https://github.com/commercetools/ui-kit/pull/2429) [`4c2501b92`](https://github.com/commercetools/ui-kit/commit/4c2501b92dc41777b45bb5c99b4f15cc4e08f224) Thanks [@ddouglasz](https://github.com/ddouglasz)! - Export component props typescript definition for uikit components. This will give users access to the Typescript definitions for the components props.

- Updated dependencies [[`12d05bc50`](https://github.com/commercetools/ui-kit/commit/12d05bc502490f271e4255463f2e226af24387bd), [`500ba82ca`](https://github.com/commercetools/ui-kit/commit/500ba82ca036c73b4bb3892b5c9b607eb22465bb), [`44a6d6a4e`](https://github.com/commercetools/ui-kit/commit/44a6d6a4ec63a058c6329f52868894fa95810b59), [`4c2501b92`](https://github.com/commercetools/ui-kit/commit/4c2501b92dc41777b45bb5c99b4f15cc4e08f224)]:
  - @commercetools-uikit/design-system@15.14.0
  - @commercetools-uikit/secondary-icon-button@15.14.0
  - @commercetools-uikit/select-utils@15.14.0
  - @commercetools-uikit/input-utils@15.14.0
  - @commercetools-uikit/constraints@15.14.0
  - @commercetools-uikit/icons@15.14.0
  - @commercetools-uikit/hooks@15.14.0
  - @commercetools-uikit/utils@15.14.0

## 15.13.2

### Patch Changes

- [#2420](https://github.com/commercetools/ui-kit/pull/2420) [`e539cb497`](https://github.com/commercetools/ui-kit/commit/e539cb497ae74a2f557b8fdad3656f2814229aca) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Update common input styles in the new theme (`background-color` on hover and read-only state styles).

- Updated dependencies [[`29964960c`](https://github.com/commercetools/ui-kit/commit/29964960c78206aa7b766b2a173f46f0743d8b5c), [`9a1fe4877`](https://github.com/commercetools/ui-kit/commit/9a1fe4877cc429e0b1c4f7dfe1ca89aeec9d75d2), [`e539cb497`](https://github.com/commercetools/ui-kit/commit/e539cb497ae74a2f557b8fdad3656f2814229aca)]:
  - @commercetools-uikit/design-system@15.13.2
  - @commercetools-uikit/select-utils@15.13.2
  - @commercetools-uikit/input-utils@15.13.2
  - @commercetools-uikit/secondary-icon-button@15.13.2
  - @commercetools-uikit/constraints@15.13.2
  - @commercetools-uikit/icons@15.13.2
  - @commercetools-uikit/hooks@15.13.2
  - @commercetools-uikit/utils@15.13.2

## 15.13.1

### Patch Changes

- Updated dependencies [[`5e3708319`](https://github.com/commercetools/ui-kit/commit/5e37083198755a7b94a77d0c4c843e5609d5f2d0)]:
  - @commercetools-uikit/design-system@15.13.1
  - @commercetools-uikit/secondary-icon-button@15.13.1
  - @commercetools-uikit/constraints@15.13.1
  - @commercetools-uikit/icons@15.13.1
  - @commercetools-uikit/input-utils@15.13.1
  - @commercetools-uikit/select-utils@15.13.1
  - @commercetools-uikit/hooks@15.13.1
  - @commercetools-uikit/utils@15.13.1

## 15.13.0

### Minor Changes

- [#2426](https://github.com/commercetools/ui-kit/pull/2426) [`8608921ca`](https://github.com/commercetools/ui-kit/commit/8608921ca62346ae4657ffc11cc75c29a1d7a410) Thanks [@Rhotimee](https://github.com/Rhotimee)! - Add [SelectableSearchInput](https://uikit.commercetools.com/?path=/story/components-inputs--selectablesearchinput) component to ui-kit.

### Patch Changes

- Updated dependencies [[`884d209e8`](https://github.com/commercetools/ui-kit/commit/884d209e81f6965fb4c12d90b4a20fb3d0b7a4d0), [`6fb466f4d`](https://github.com/commercetools/ui-kit/commit/6fb466f4d59667ccb5731a46692bf54e3e4f19c8), [`8530369b3`](https://github.com/commercetools/ui-kit/commit/8530369b3e84bc108e318f9ec73711cea9af13f0)]:
  - @commercetools-uikit/design-system@15.13.0
  - @commercetools-uikit/utils@15.13.0
  - @commercetools-uikit/secondary-icon-button@15.13.0
  - @commercetools-uikit/constraints@15.13.0
  - @commercetools-uikit/icons@15.13.0
  - @commercetools-uikit/input-utils@15.13.0
  - @commercetools-uikit/select-utils@15.13.0
  - @commercetools-uikit/hooks@15.13.0

## 15.12.0

### Patch Changes
