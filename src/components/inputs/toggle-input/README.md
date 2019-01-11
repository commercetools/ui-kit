# ToggleInput

#### Description

The `ToggleInput` component allows a single settings option to be turned on or off.

#### Usage

```js
import { ToggleInput } from '@commercetools-frontend/ui-kit';

<ToggleInput
  isDisabled={false}
  isChecked={false}
  onChange={..}
  size='small'
/>
```

#### Use case

The table below describes the use of the `ToggleInput`.

| Switch type | Number of options | Selection |
| ----------- | ----------------- | --------- |
| `Checkbox`  | Multiple          | Multiple  |
| `Radio`     | Multiple          | Single    |
| `Toggle`    | Two               | Single    |

#### Properties

| Props        | Type     | Required | Values                  | Default | Description                       |
| ------------ | -------- | :------: | ----------------------- | ------- | --------------------------------- |
| `isDisabled` | `bool`   |    -     | -                       | `false` | Disables the Toggle               |
| `isChecked`  | `bool`   |    -     | -                       | `false` | Checks the Toggle                 |
| `onChange`   | `func`   |    ✅    | -                       | -       | called with the new value.        |
| `size`       | `string` |    ✅    | oneOf(['small', 'big']) | `big`   | The size of the Toggle component. |
