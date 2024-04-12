---
'@commercetools-uikit/dropdown-menu': minor
'@commercetools-frontend/ui-kit': minor
---

Added the new DropdownMenu component which allows to display floating panels to be rendered after clicking a triggering element.

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
