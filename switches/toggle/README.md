# Switches: Toggle

#### Description

A `Toggle` is an element which indicates an checked or non checked business logic status and
notifies with a value accordingly. It is similar to the `Checkbox` but is styled
like a switch.

#### Usage

```js
import { Toggle } from '@commercetools-local/ui-kit/switches';

<Toggle.Toggle
  isDisabled={false}
  isChecked={false}
  onChange={..}
  size='small'
>
  <Toggle.On>On</Toggle.On>
  <Toggle.Off>Off</Toggle.Off>
</Toggle.Toggle>
```

#### Properties

| Props        | Type     | Required | Values | Default | Description                                         |
| ------------ | -------- | :------: | ------ | ------- | --------------------------------------------------- |
| `children`   | `node`   |    ✅    | -      | -       | The `Toggle.On` and `Toggle.Off` components         |
| `isDisabled` | `bool`   |    -     | -      | `false` | Disables the Toggle                                 |
| `isChecked`  | `bool`   |    -     | -      | `false` | Checks the Toggle                                   |
| `onChange`   | `func`   |    ✅    | -      | -       | What will trigger whenever the `Toggle` is clicked. |
| `size`       | `string` |    ✅    | -      | `big`   | The size of the Toggle component.                   |

#### Invariants

1. The `Toggle.Toggle` must have one each of the `Toggle.On` and `Toggle.Off` components.
