# TextArea

#### Description

A controlled text input component for multi-line strings with validation
states.

## Usage

```js
import TextArea from '@commercetools-frontend/ui-kit/inputs/text-area';

<TextArea value="foo" onChange={event => alert(event.target.value)} />;
```

#### Properties

| Props                  | Type     | Required | Values                  | Default | Description                                                                                                               |
| ---------------------- | -------- | :------: | ----------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `name`                 | `string` |    -     | -                       | -       | Used as HTML `name` property                                                                                              |
| `value`                | `string` |    ✅    | -                       | -       | Value of the input                                                                                                        |
| `onChange`             | `func`   |    ✅    | -                       | -       | Called with an event containing the new value. Required, unless input is `read-only. Parent should pass it back as`value` |
| `id`                   | `string` |    -     | -                       | -       | Specifies the id of an element                                                                                            |
| `placeholder`          | `string` |    -     | -                       | -       | Placeholder text for the input                                                                                            |
| `isDefaultClosed`      | `bool`   |    -     | -                       | `false` | Closes input initially                                                                                                    |
| `isAutofocussed`       | `bool`   |    -     | -                       | -       | Focuses the input field on initial render                                                                                 |
| `isDisabled`           | `bool`   |    -     | -                       | `false` | Indicates that the field cannot be used (e.g not authorised, or changes not saved)                                        |
| `isReadOnly`           | `bool`   |    -     | -                       | `false` | Indicates that the field is displaying read-only content                                                                  |
| `hasError`             | `bool`   |    -     | -                       | `false` | Indicates the input field has an error                                                                                    |
| `hasWarning`           | `bool`   |    -     | -                       | `false` | Indicates the input field has a warning                                                                                   |
| `onBlur`               | `func`   |    -     | -                       | -       | Called when field is blurred                                                                                              |
| `onFocus`              | `func`   |    -     | -                       | -       | Called when field is focused                                                                                              |
| `horizontalConstraint` | `object` |    -     | `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                |

### Static methods

#### `TextArea.isEmpty`

Returns `true` when the value is considered empty, which is when the value is empty or consists of spaces and linebreaks only.

```js
TextArea.isEmpty(''); // -> true
TextArea.isEmpty(' '); // -> true
TextArea.isEmpty('\n'); // -> true
TextArea.isEmpty('tree'); // -> false
```

# Do's and don't's

- Whenever a user input can hold multiline strings the TextArea component is recommended

- Not recommended to be used when the content is single-lined (e.g email address, password etc.)

- Constraints are not recommended to have scale smaller than `s` since content may cut off
