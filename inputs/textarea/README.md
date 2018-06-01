# TextArea

#### Description

Used for displaying multiple-line form’s fields text content.

## Usage

```js
import TextArea from '@commercetools-local/ui-kit/inputs/textarea';

<TextArea value="foo" onChange={value => alert(value)} />;
```

#### Properties

| Props                  | Type     | Required | Values                             | Default | Description                                                                                            |
| ---------------------- | -------- | :------: | ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `name`                 | `string` |    ✅    | -                                  | -       | Used as HTML `name` property                                                                           |
| `value`                | `string` |          | -                                  | -       | Value of the input                                                                                     |
| `id`                   | `string` |          | -                                  | -       | Passed from a wrapping form component for identification purposes                                      |
| `placeholder`          | `string` |    -     | -                                  | -       | Placeholder text for the input                                                                         |
| `isAutofocussed`       | `bool`   |    -     | -                                  | -       | Focus the input field on initial render                                                                |
| `isDisabled`           | `bool`   |    -     | -                                  | `false` | Indicates that the field cannot be used (e.g not authorised, or changes not saved)                     |
| `isReadOnly`           | `bool`   |    -     | -                                  | `false` | Indicates that the field is displaying read-only content                                               |
| `hasError`             | `bool`   |    -     | -                                  | `false` | Indicates the input field has an error                                                                 |
| `hasWarning`           | `bool`   |    -     | -                                  | `false` | Indicates the input field has a warning                                                                |
| `onChange`             | `func`   |    -     | -                                  | -       | Called with the new value. Required when input is not read only. Parent should pass it back as `value` |
| `onBlur`               | `func`   |    -     | -                                  | -       | Called when field is blurred                                                                           |
| `onFocus`              | `func`   |    -     | -                                  | -       | Called when field is focused                                                                           |
| `horizontalConstraint` | `object` |          | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                             |

# Do's and don't's

- Whenever the content is expected to be displayed in more than one line (e.g TextInput component) a TextArea component is recommended.

- Not recommended to be used when to content fits into one line (e.g email, password etc.)

- Constraints are not recommended to have scale smaller than `s`
