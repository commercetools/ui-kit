# TextInput

#### Description

A controlled text input component for single-line strings with validation
states.

## Usage

```js
import { TextInput } from '@commercetools-frontend/ui-kit';

<TextInput value="foo" onChange={event => alert(event.target.value)} />;
```

#### Properties

| Props                  | Type     | Required | Values                             | Default | Description                                                                                            |
| ---------------------- | -------- | :------: | ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `id`                   | `string` |    -     | -                                  | -       | Used as HTML `id` property                                                                             |
| `name`                 | `string` |    -     | -                                  | -       | Used as HTML `name` property                                                                           |
| `value`                | `string` |    ✅    | -                                  | -       | Value of the input                                                                                     |
| `onChange`             | `func`   |    -     | -                                  | -       | Called with the new value. Required when input is not read only. Parent should pass it back as `value` |
| `onBlur`               | `func`   |    -     | -                                  | -       | Called when field is blurred                                                                           |
| `onFocus`              | `func`   |    -     | -                                  | -       | Called when field is focused                                                                           |
| `hasWarning`           | `bool`   |    -     | -                                  | -       | Indicates the input field has a warning                                                                |
| `hasError`             | `bool`   |    -     | -                                  | -       | Indicates the input field has an error                                                                 |
| `isAutofocussed`       | `bool`   |    -     | -                                  | -       | Focus the input field on initial render                                                                |
| `isDisabled`           | `bool`   |    -     | -                                  | `false` | Indicates that the field cannot be used (e.g not authorised, or changes not saved)                     |
| `isReadOnly`           | `bool`   |    -     | -                                  | `false` | Indicates that the field is displaying read-only content                                               |
| `placeholder`          | `string` |    -     | -                                  | -       | Placeholder text for the input                                                                         |
| `horizontalConstraint` | `object` |          | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                             |

The component further forwards all `data-` attributes to the underlying `input` component.

### Static methods

#### `TextInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is empty or consists of spaces only.

```js
TextInput.isEmpty(''); // -> true
TextInput.isEmpty(' '); // -> true
TextInput.isEmpty('tree'); // -> false
```

### Main Functions and use cases are:

- Input field for single-line strings
