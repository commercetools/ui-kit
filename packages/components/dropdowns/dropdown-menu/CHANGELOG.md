# @commercetools-uikit/dropdown-menu

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
