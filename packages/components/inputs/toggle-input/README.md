# ToggleInput

## Description

The `ToggleInput` component allows a single settings option to be turned on or off.

## Usage

```js
import ToggleInput from '@commercetools-uikit/toggle-input';

<ToggleInput
  isDisabled={false}
  isChecked={false}
  onChange={(event) => alert(event.target.checked)}
  size="small"
/>;
```

The table below describes the use of the `ToggleInput` vs `Checkbox` and `Radio`.

| Switch type   | Number of options | Selection |
| ------------- | ----------------- | --------- |
| `Checkbox`    | Multiple          | Multiple  |
| `Radio`       | Multiple          | Single    |
| `ToggleInput` | Two               | Single    |

## Properties

| Props        | Type     | Required | Values                  | Default | Description                            |
| ------------ | -------- | :------: | ----------------------- | ------- | -------------------------------------- |
| `id`         | `string` |          |                         |         | Used as the HTML `id` property         |
| `name`       | `string` |          |                         |         | Used as the HTML `name` property       |
| `isDisabled` | `bool`   |          |                         | `false` | Disables the ToggleInput               |
| `isChecked`  | `bool`   |          |                         | `false` | Checks the ToggleInput                 |
| `onChange`   | `func`   |    ✅    |                         |         | called with the new value.             |
| `size`       | `string` |    ✅    | oneOf(['small', 'big']) | `big`   | The size of the ToggleInput component. |
