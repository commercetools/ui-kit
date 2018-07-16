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

| Props             | Type   | Required | Values | Default | Description                                                                                                                                                                                                                                                                                                         |
| ----------------- | ------ | :------: | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`        | `node` |    -     | -      | -       | The descriptive text of the Checkbox                                                                                                                                                                                                                                                                                |
| `isDisabled`      | `bool` |    -     | -      | `false` | Disables the Checkbox                                                                                                                                                                                                                                                                                               |
| `isIndeterminate` | `bool` |    -     | -      | `false` | If `true`, this state is shown as a dash in the checkbox, and indicates that its state is neither checked nor unchecked. This is most often used when the checkbox is tied to a collection of items in mixed states (E.g nested checkboxes). This takes precedence visually in case `isChecked` is marked as `true` |
| `isChecked`       | `bool` |    -     | -      | `false` | Checks the Checkbox                                                                                                                                                                                                                                                                                                 |
| `isChecked`       | `bool` |    -     | -      | `false` | The checked property sets or returns the checked state of a checkbox.                                                                                                                                                                                                                                               |
| `hasError`        | `bool` |    -     | -      | `false` | Indicates that the checkbox has an error                                                                                                                                                                                                                                                                            |
| `onChange`        | `func` |    ✅    | -      | -       | Will be triggered whenever an `Checkbox` is clicked. Called with `event`                                                                                                                                                                                                                                            |
