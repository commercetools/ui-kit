# TextField

#### Description

A controlled text input component for single-line strings with validation
states.

## Usage

```js
import TextField from '@commercetools-frontend/ui-kit/fields/text-field';

<TextField title="Username" value="foo" onChange={value => alert(value)} />;
```

#### Properties

| Props                  | Type               | Required | Values                             | Default | Description                                                                                                                                                                                                                                                           |
| ---------------------- | ------------------ | :------: | ---------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string`           |    -     | -                                  | -       | Used as HTML `id` property. An `id` is auto-generated when it is not specified.                                                                                                                                                                                       |
| `horizontalConstraint` | `object`           |          | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                                                                                                                                            |
| `errors`               | `object`           |    -     | -                                  | -       | A map of errors. Error messages for known errors are rendered automatically. Unknown errors will be forwarded to `renderError`.                                                                                                                                       |
| `renderError`          | `function`         |    -     | -                                  | -       | Called with custom errors, as `renderError(key, error)`. This function can return a message which will be wrapped in an `ErrorMessage`. It can also return `null` to show no error.                                                                                   |
| `isRequired`           | `bool`             |    -     | -                                  | `false` | Indicates if the value is required. Shows an the "required asterisk" if so.                                                                                                                                                                                           |
| `isTouched`            | `bool`             |    -     | -                                  | `false` | Indicates whether the field was touched. Errors will only be shown when the field was touched.                                                                                                                                                                        |
| `name`                 | `string`           |    ✅    | -                                  | -       | Used as HTML `name` of the input component. property                                                                                                                                                                                                                  |
| `value`                | `string`           |    ✅    | -                                  | -       | Value of the input component.                                                                                                                                                                                                                                         |
| `onChange`             | `func`             |    -     | -                                  | -       | Called with an event containing the new value. Required when input is not read only. Parent should pass it back as `value`.                                                                                                                                           |
| `onBlur`               | `func`             |    -     | -                                  | -       | Called when input is blurred                                                                                                                                                                                                                                          |
| `onFocus`              | `func`             |    -     | -                                  | -       | Called when input is focused                                                                                                                                                                                                                                          |
| `isAutofocussed`       | `bool`             |    -     | -                                  | -       | Focus the input on initial render                                                                                                                                                                                                                                     |
| `isDisabled`           | `bool`             |    -     | -                                  | `false` | Indicates that the input cannot be modified (e.g not authorised, or changes currently saving).                                                                                                                                                                        |
| `isReadOnly`           | `bool`             |    -     | -                                  | `false` | Indicates that the field is displaying read-only content                                                                                                                                                                                                              |
| `placeholder`          | `string`           |    -     | -                                  | -       | Placeholder text for the input                                                                                                                                                                                                                                        |
| `title`                | `string` or `node` |    ✅    | -                                  | -       | Title of the label                                                                                                                                                                                                                                                    |
| `onInfoButtonClick`    | `function`         |    -     | -                                  | -       | Function called when info button is pressed. Info button will only be visible when this prop is passed.                                                                                                                                                               |
| `hint`                 | `string` or `node` |    -     | -                                  | -       | Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`. |
| `hintIcon`             | `node`             |    -     | -                                  | -       | Icon to be displayed beside the hint text. Will only get rendered when `hint` is passed as well.                                                                                                                                                                      |
| `description`          | `string` or `node` |    -     | -                                  | -       | Provides a description for the title.                                                                                                                                                                                                                                 |
| `badge`                | `node`             |    -     | -                                  | -       | Badge to be displayed beside the label. Might be used to display additional information about the content of the field (E.g verified email)                                                                                                                           |

The component further forwards all `data-` attributes to the underlying `input` component.

### Static methods

#### `TextField.isEmpty`

Returns `true` when the value is considered empty, which is when the value is empty or consists of spaces only.

```js
TextField.isEmpty(''); // -> true
TextField.isEmpty(' '); // -> true
TextField.isEmpty('tree'); // -> false
```

### Main Functions and use cases are:

- Input field for single-line strings
