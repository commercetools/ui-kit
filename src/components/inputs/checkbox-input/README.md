# CheckboxInput

## Usage

```js
import { CheckboxInput } from '@commercetools-frontend/ui-kit';
```

#### Description

A `CheckboxInput` is an element which indicates an checked or non checked status and
notifies with a value accordingly.

#### Usage

```js
import { CheckboxInput } from '@commercetools-frontend/ui-kit/switches';

<CheckboxInput value="foo-radio-value" onChange={..}>
  What ever option
</CheckboxInput>
<CheckboxInput value="bar-radio-value" disabled={true} onChange={..}>
  Another option
</CheckboxInput>
```

#### Properties

| Props             | Type     | Required | Values | Default | Description                                                                                                                                                                                                                                                                                                       |
| ----------------- | -------- | :------: | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | `string` |    -     | -      | -       | Used as HTML `id` property. An `id` is auto-generated when it is not specified.                                                                                                                                                                                                                                   |
| `name`            | `string` |    -     | -      | -       | Used as HTML `name` property.                                                                                                                                                                                                                                                                                     |
| `children`        | `node`   |    -     | -      | -       | The descriptive text of the CheckboxInput                                                                                                                                                                                                                                                                         |
| `checked`         | `bool`   |    -     | -      | `false` | The checked property sets the checked state of a checkbox.                                                                                                                                                                                                                                                        |
| `disabled`        | `bool`   |    -     | -      | `false` | Disables the CheckboxInput                                                                                                                                                                                                                                                                                        |
| `isHovered`       | `bool`   |    -     | -      | `false` | Forces CheckboxInput to be rendered in a hovered state. That's needed for the cases when hovered appearance should be triggered by the parent component and not the CheckboxInput itself. CheckboxInput is capable of handling it's own hovering without the need to pass this prop.                              |
| `isIndeterminate` | `bool`   |    -     | -      | `false` | If `true`, this state is shown as a dash in the checkbox, and indicates that its state is neither checked nor unchecked. This is most often used when the checkbox is tied to a collection of items in mixed states (E.g nested checkboxes). This takes precedence visually in case `checked` is marked as `true` |
| `hasError`        | `bool`   |    -     | -      | `false` | Indicates that the checkbox has an error                                                                                                                                                                                                                                                                          |
| `onChange`        | `func`   |    ✅    | -      | -       | Will be triggered whenever a `CheckboxInput` is clicked. Called with `event`                                                                                                                                                                                                                                      |
