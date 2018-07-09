# Switches: Checkbox

## Usage

```js
import { Checkbox } from '@commercetools-frontend/ui-kit/switches';
```

#### Description

A `Checkbox` is an element which indicates an checked or non checked status and
notifies with a value accordingly.

#### Usage

```js
import { Checkbox } from '@commercetools-frontend/ui-kit/switches';

<Checkbox value="foo-radio-value" onChange={..}>
  What ever option
</Checkbox>
<Checkbox value="bar-radio-value" isDisabled={true} onChange={..}>
  Another option
</Checkbox>
```

#### Properties

| Props             | Type     | Required | Values | Default | Description                                                                                                                                                                                                                                                                             |
| ----------------- | -------- | :------: | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`        | `string` |    -     | -      | -       | The descriptive text of the Checkbox                                                                                                                                                                                                                                                    |
| `isDisabled`      | `bool`   |    -     | -      | `false` | Disables the Checkbox                                                                                                                                                                                                                                                                   |
| `isIndeterminate` | `bool`   |    -     | -      | `false` | The indeterminate state is visual only. Its used for nested checkboxes. Each checkbox may have child checkboxes. If all those children are checked, it may be checked. If none are checked, it is unchecked. If some of them are checked, then `isIndeterminate` state should be `true` |
| `isChecked`       | `bool`   |    -     | -      | `false` | Checks the Checkbox                                                                                                                                                                                                                                                                     |
| `value`           | `string` |    -     | -      | -       | The value of the option passed to `onChange` if not checked                                                                                                                                                                                                                             |
| `hasError`        | `bool`   |    -     | -      | -       | Indicates that the checkbox has an error                                                                                                                                                                                                                                                |
| `onChange`        | `func`   |    ✅    | -      | -       | What will trigger whenever an `Radio.Option` is clicked. Trigged with `undefined` is checked otherwise the value                                                                                                                                                                        |
