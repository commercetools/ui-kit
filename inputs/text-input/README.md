# TextInput

#### Description

A controlled text input component for single-line strings with validation
states.

## Usage

```js
import TextInput from '@commercetools-local/ui-kit/inputs/text-input';

<TextInput value="foo" onChange={value => alert(value)} />;
```

#### Properties

| Props            | Type     | Required | Values | Default | Description                                                                        |
| ---------------- | -------- | :------: | ------ | ------- | ---------------------------------------------------------------------------------- |
| `name`           | `string` |    ✅    | -      | -       | Used as HTML `name` property                                                       |
| `value`          | `string` |    ✅    | -      | -       | Value of the input                                                                 |
| `onChange`       | `func`   |    ✅    | -      | -       | Called with the new value. Parent should pass it back as `value`                   |
| `onBlur`         | `func`   |    -     | -      | -       | Called when field is blurred                                                       |
| `onFocus`        | `func`   |    -     | -      | -       | Called when field is focused                                                       |
| `hasWarning`     | `bool`   |    -     | -      | -       | Indicates the input field has a warning                                            |
| `hasError`       | `bool`   |    -     | -      | -       | Indicates the input field has an error                                             |
| `isAutofocussed` | `bool`   |    -     | -      | -       | Focus the input field on initial render                                            |
| `isDisabled`     | `bool`   |    -     | -      | `false` | Indicates that the field cannot be used (e.g not authorised, or changes not saved) |
| `isReadOnly`     | `bool`   |    -     | -      | `false` | Indicates that the field is displaying read-only content                           |
| `placeholder`    | `string` |    -     | -      | -       | Placeholder text for the input                                                     |

Main Functions and use cases are:

* Input field for single-line strings
