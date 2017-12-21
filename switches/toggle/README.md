# Switches: Toggle

#### Description

The `Toggle` switch allows a single settings option to be turned on or off.

**The current version of the `Toggle` is not designed for use as a form control.**

#### Usage

```js
import { Toggle } from '@commercetools-local/ui-kit/switches';

<Toggle
  isDisabled={false}
  isChecked={false}
  onChange={..}
  size='small'
/>
```

#### Use case

The table below describes the use of the `Toggle` compared with the other switches.

| Switch type | Number of options | Selection |
| ----------- | ----------------- | --------- |
| `Checkbox`  | Multiple          | Multiple  |
| `Radio`     | Multiple          | Single    |
| `Toggle`    | Two               | Single    |

#### Properties

| Props        | Type     | Required | Values                  | Default | Description                                         |
| ------------ | -------- | :------: | ----------------------- | ------- | --------------------------------------------------- |
| `isDisabled` | `bool`   |    -     | -                       | `false` | Disables the Toggle                                 |
| `isChecked`  | `bool`   |    -     | -                       | `false` | Checks the Toggle                                   |
| `onChange`   | `func`   |    ✅    | -                       | -       | What will trigger whenever the `Toggle` is clicked. |
| `size`       | `string` |    ✅    | oneOf(['small', 'big']) | `big`   | The size of the Toggle component.                   |
