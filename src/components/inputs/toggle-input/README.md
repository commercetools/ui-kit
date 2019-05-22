# ToggleInput

#### Description

The `ToggleInput` component allows a single settings option to be turned on or off.

#### Usage

```js
import { ToggleInput } from '@commercetools-frontend/ui-kit';

<ToggleInput
  disable={false}
  checked={false}
  onChange={event => alert(event.target.checked)}
  size="small"
/>;
```

#### Use case

The table below describes the use of the `ToggleInput` vs `Checkbox` and `Radio`.

| Switch type   | Number of options | Selection |
| ------------- | ----------------- | --------- |
| `Checkbox`    | Multiple          | Multiple  |
| `Radio`       | Multiple          | Single    |
| `ToggleInput` | Two               | Single    |

#### Properties

| Props      | Type     | Required | Values                  | Default | Description                            |
| ---------- | -------- | :------: | ----------------------- | ------- | -------------------------------------- |
| `id`       | `string` |          |                         |         | Used as the HTML `id` property         |
| `name`     | `string` |          |                         |         | Used as the HTML `name` property       |
| `disable`  | `bool`   |          |                         | `false` | Disables the ToggleInput               |
| `checked`  | `bool`   |          |                         | `false` | Checks the ToggleInput                 |
| `onChange` | `func`   |    ✅    |                         |         | called with the new value.             |
| `size`     | `string` |    ✅    | oneOf(['small', 'big']) | `big`   | The size of the ToggleInput component. |
