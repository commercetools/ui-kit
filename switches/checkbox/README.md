# Switches: Checkbox

## Usage

```js
import { Checkbox } from '@commercetools-local/ui-kit/switches';
```

#### Description

A `Checkbox` is an element which indicates an checked or non checked status and
notifies with a value accordingly.

#### Usage

```js
import { Checkbox } from '@commercetools-local/ui-kit/switches';

<Checkbox value="foo-radio-value" onChange={..}>
  What ever option
</Checkbox>
<Checkbox value="bar-radio-value" isDisabled={true} onChange={..}>
  Another option
</Checkbox>
```

#### Properties

| Props        | Type     | Required | Values | Default | Description                                                                                                      |
| ------------ | -------- | :------: | ------ | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `children`   | `string` |    -     | -      | -       | The descriptive text of the Checkbox                                                                             |
| `isDisabled` | `bool`   |    -     | -      | `false` | Disables the Checkbox                                                                                            |
| `isChecked`  | `bool`   |    -     | -      | `false` | Checks the Checkbox                                                                                              |
| `value`      | `string` |    -     | -      | -       | The value of the option passed to `onChange` if not checked                                                      |
| `onChange`   | `func`   |    ✅    | -      | -       | What will trigger whenever an `Radio.Option` is clicked. Trigged with `undefined` is checked otherwise the value |
