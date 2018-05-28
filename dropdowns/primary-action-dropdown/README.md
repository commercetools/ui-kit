# Dropdowns: PrimaryActionDropdown

## Usage

```js
import PrimaryActionDropdown, {
  Option,
} from '@commercetools-local/ui-kit/dropdowns/primary-action-dropdown';
```

#### Description

A `PrimaryActionDropdown` is a dropdown with any number of action whereas the
first action of the dropdown can be triggered without opening the dropdown
itself.

The primary action, rendered as the head of the dropdown, is always the first
non-disabled `<Option />`. If all `<Option />`s are disabled, the head of the
dropdown will be disabled.

#### Usage

```js
import PrimaryActionDropdown, { Option } from '@commercetools-local/ui-kit/dropdowns/primary-action-dropdown';

<PrimaryActionDropdown>
  <Option icon={<AddBoldIcon />} onClick={alert('primary clicked')}}>Primary option</Option>
  <Option onClick={alert('clicked')}>Another option</Option>
  <Option isDisabled={true} onClick={alert('clicked')}>Even another option</Option>
</PrimaryActionDropdown>
```

#### Properties

##### PrimaryActionDropdown

| Props      | Type   | Required | Values | Default | Description                                                              |
| ---------- | ------ | :------: | ------ | ------- | ------------------------------------------------------------------------ |
| `children` | `node` |    ✅    | -      | -       | The options of the dropdown (use the `Option` export from the component) |

##### Option

| Props        | Type     | Required | Values | Default | Description                                                                                        |
| ------------ | -------- | :------: | ------ | ------- | -------------------------------------------------------------------------------------------------- |
| `onClick`    | `func`   |    ✅    | -      | -       | What will trigger whenever the option is clicked                                                   |
| `isDisabled` | `bool`   |    -     | -      | `false` | Disables the option within the dropdown. If all options are disabled the dropdown will be disabled |
| `icon`       | `node`   |    ✅    | -      | -       | The icon left to the option (only for the primary option)                                          |
| `children`   | `string` |    ✅    | -      | -       | The label of the option                                                                            |

#### Invariants

1.  The `PrimaryActionDropdown` must have at least two `Option` elements as
    `children`

- Use a `PrimaryButton` otherwise

Main Functions and use cases are:

- Export button _example: Default to export all but offer selected to be
  exported_
