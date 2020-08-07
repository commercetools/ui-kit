# PrimaryActionDropdown

## Description

A `PrimaryActionDropdown` is a dropdown with any number of action whereas the
first action of the dropdown can be triggered without opening the dropdown
itself.

The primary action, rendered as the head of the dropdown, is always the first
non-disabled `<Option />`. If all `<Option />`s are disabled, the head of the
dropdown will be disabled.

## Usage

```js
import PrimaryActionDropdown, {
  PrimaryActionDropdownOption,
} from '@commercetools-uikit/primary-action-dropdown';

<PrimaryActionDropdown>
  <PrimaryActionDropdownOption iconLeft={<PlusBoldIcon />} onClick={() => {}}>
    Primary option
  </PrimaryActionDropdownOption>
  <PrimaryActionDropdownOption onClick={() => {}}>
    Another option
  </PrimaryActionDropdownOption>
  <PrimaryActionDropdownOption isDisabled={true} onClick={() => {}}>
    Even another option
  </PrimaryActionDropdownOption>
</PrimaryActionDropdown>;
```

## Properties

### PrimaryActionDropdown

| Props      | Type   | Required | Values | Default | Description                                                              |
| ---------- | ------ | :------: | ------ | ------- | ------------------------------------------------------------------------ |
| `children` | `node` |    ✅    | -      | -       | The options of the dropdown (use the `Option` export from the component) |

### Option

| Props        | Type     | Required | Values | Default | Description                                                                                        |
| ------------ | -------- | :------: | ------ | ------- | -------------------------------------------------------------------------------------------------- |
| `onClick`    | `func`   |    ✅    | -      | -       | What will trigger whenever the option is clicked                                                   |
| `isDisabled` | `bool`   |    -     | -      | `false` | Disables the option within the dropdown. If all options are disabled the dropdown will be disabled |
| `children`   | `string` |    ✅    | -      | -       | The label of the option                                                                            |
| `iconLeft`   | `node`   |    ✅    | -      | -       | The icon left to the option (only for the primary option)                                          |

## Invariants

1.  The `PrimaryActionDropdown` must have at least two `Option` elements as
    `children`

- Use a `PrimaryButton` otherwise

Main Functions and use cases are:

- Export button _example: Default to export all but offer selected to be
  exported_
