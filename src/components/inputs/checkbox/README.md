# Switches: Checkbox

## Usage

```js
import { Checkbox } from '@commercetools-frontend/ui-kit';
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

| Props             | Type     | Required | Values | Default | Description                                                                                                                                                                                                                                                                                                         |
| ----------------- | -------- | :------: | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | `string` |    -     | -      | -       | Used as HTML `id` property. An `id` is auto-generated when it is not specified.                                                                                                                                                                                                                                     |
| `name`            | `string` |    -     | -      | -       | Used as HTML `name` property.                                                                                                                                                                                                                                                                                       |
| `children`        | `node`   |    -     | -      | -       | The descriptive text of the Checkbox                                                                                                                                                                                                                                                                                |
| `isDisabled`      | `bool`   |    -     | -      | `false` | Disables the Checkbox                                                                                                                                                                                                                                                                                               |
| `isHovered`       | `bool`   |    -     | -      | `false` | Forces Checkbox to be rendered in a hovered state. That's needed for the cases when hovered appearance should be triggered by the parent component and not the Checkbox itself. Checkbox is capable of handling it's own hovering without the need to pass this prop.                                               |
| `isIndeterminate` | `bool`   |    -     | -      | `false` | If `true`, this state is shown as a dash in the checkbox, and indicates that its state is neither checked nor unchecked. This is most often used when the checkbox is tied to a collection of items in mixed states (E.g nested checkboxes). This takes precedence visually in case `isChecked` is marked as `true` |
| `isChecked`       | `bool`   |    -     | -      | `false` | The checked property sets the checked state of a checkbox.                                                                                                                                                                                                                                                          |
| `hasError`        | `bool`   |    -     | -      | `false` | Indicates that the checkbox has an error                                                                                                                                                                                                                                                                            |
| `onChange`        | `func`   |    ✅    | -      | -       | Will be triggered whenever an `Checkbox` is clicked. Called with `event`                                                                                                                                                                                                                                            |
