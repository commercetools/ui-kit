# @commercetools-uikit/dropdown-menu

## 19.3.1

### Patch Changes

- [#2812](https://github.com/commercetools/ui-kit/pull/2812) [`f1fff9f`](https://github.com/commercetools/ui-kit/commit/f1fff9fca6fc25068fbed79c1f14cbfae52e7d2c) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - We fixed an issue with the `DropdownMenu` component when using these values:

  - `menuPosition`: right
  - `menuHorizontalConstraint`: auto

  In that situation, the width and positioning of the floating menu was not correctly calculated.

- Updated dependencies []:
  - @commercetools-uikit/design-system@19.3.1
  - @commercetools-uikit/accessible-button@19.3.1
  - @commercetools-uikit/secondary-button@19.3.1
  - @commercetools-uikit/constraints@19.3.1
  - @commercetools-uikit/spacings-inline@19.3.1
  - @commercetools-uikit/spacings-stack@19.3.1
  - @commercetools-uikit/hooks@19.3.1
  - @commercetools-uikit/utils@19.3.1

## 19.3.0

### Minor Changes

- [#2804](https://github.com/commercetools/ui-kit/pull/2804) [`4013cd3`](https://github.com/commercetools/ui-kit/commit/4013cd3dbb3fbfcfaf4b7c97ec3af5e7fd3aaa90) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - We've fixed two issues we had regarding floating menu position when scrolling and its height.

  We're also introducing a new property (`menuMaxHeight`) which allows consumers to limit the floating panel maximum height.

### Patch Changes

- Updated dependencies [[`a0626f7`](https://github.com/commercetools/ui-kit/commit/a0626f7de81e3a76bea227bdfb3038ad5339a57a), [`9ae9f0f`](https://github.com/commercetools/ui-kit/commit/9ae9f0ff939884df1ea50f6b26f55a4f26b30fe0)]:
  - @commercetools-uikit/design-system@19.3.0
  - @commercetools-uikit/secondary-button@19.3.0
  - @commercetools-uikit/accessible-button@19.3.0
  - @commercetools-uikit/constraints@19.3.0
  - @commercetools-uikit/spacings-inline@19.3.0
  - @commercetools-uikit/spacings-stack@19.3.0
  - @commercetools-uikit/hooks@19.3.0
  - @commercetools-uikit/utils@19.3.0

## 19.2.0

### Minor Changes

- [#2785](https://github.com/commercetools/ui-kit/pull/2785) [`3a47d4a`](https://github.com/commercetools/ui-kit/commit/3a47d4a673b4642c7a697eef85afbc41ca6cc526) Thanks [@ddouglasz](https://github.com/ddouglasz)! - Remove unused old theme and token reference

### Patch Changes

- Updated dependencies [[`3a47d4a`](https://github.com/commercetools/ui-kit/commit/3a47d4a673b4642c7a697eef85afbc41ca6cc526)]:
  - @commercetools-uikit/accessible-button@19.2.0
  - @commercetools-uikit/secondary-button@19.2.0
  - @commercetools-uikit/spacings-inline@19.2.0
  - @commercetools-uikit/spacings-stack@19.2.0
  - @commercetools-uikit/constraints@19.2.0
  - @commercetools-uikit/hooks@19.2.0
  - @commercetools-uikit/utils@19.2.0
  - @commercetools-uikit/design-system@19.2.0

## 19.1.0

### Minor Changes

- [#2768](https://github.com/commercetools/ui-kit/pull/2768) [`c2447db`](https://github.com/commercetools/ui-kit/commit/c2447dbae4048b2a06017c6ef3db88efdbc955fd) Thanks [@CarlosCortizasCT](https://github.com/CarlosCortizasCT)! - Added the new DropdownMenu component which allows to display floating panels to be rendered after clicking a triggering element.

  Example:

  ```jsx
  <DropdownMenu
    triggerElement={
      <SecondaryButton label="Filters" iconLeft={<FilterIcon />} />
    }
    menuHorizontalConstraint={6}
    menuPosition="right"
  >
    <SpacingsStack scale="m">
      <Text.Body>Store</Text.Body>
      <CheckboxInput isChecked value="store" onChange={(event) => {}}>
        Canada (FR)
      </CheckboxInput>
    </SpacingsStack>
  </DropdownMenu>
  ```

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/design-system@19.1.0
  - @commercetools-uikit/accessible-button@19.1.0
  - @commercetools-uikit/secondary-button@19.1.0
  - @commercetools-uikit/constraints@19.1.0
  - @commercetools-uikit/spacings-inline@19.1.0
  - @commercetools-uikit/spacings-stack@19.1.0
  - @commercetools-uikit/hooks@19.1.0
  - @commercetools-uikit/utils@19.1.0
