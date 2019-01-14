# DateTimeField

#### Description

A controlled date time input component for single date.

## Usage

```js
import { DateTimeField } from '@commercetools-frontend/ui-kit';

<DateTimeField
  title="Release Date"
  value="2018-11-30T13:25:59.500Z"
  onChange={event => alert(event.target.value)}
/>;
```

#### Properties

| Props                  | Type               | Required | Values                             | Default | Description                                                                                                                                                                                                                                                           |
| ---------------------- | ------------------ | :------: | ---------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string`           |    -     | -                                  | -       | Used as HTML `id` property. An `id` is auto-generated when it is not specified.                                                                                                                                                                                       |
| `horizontalConstraint` | `object`           |          | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                                                                                                                                            |
| `errors`               | `object`           |    -     | -                                  | -       | A map of errors. Error messages for known errors are rendered automatically. Unknown errors will be forwarded to `renderError`.                                                                                                                                       |
| `renderError`          | `function`         |    -     | -                                  | -       | Called with custom errors, as `renderError(key, error)`. This function can return a message which will be wrapped in an `ErrorMessage`. It can also return `null` to show no error.                                                                                   |
| `isRequired`           | `bool`             |    -     | -                                  | `false` | Indicates if the value is required. Shows an the "required asterisk" if so.                                                                                                                                                                                           |
| `touched`              | `bool`             |    -     | -                                  | `false` | Indicates whether the field was touched. Errors will only be shown when the field was touched.                                                                                                                                                                        |
| `name`                 | `string`           |    -     | -                                  | -       | Used as HTML `name` of the input component. property                                                                                                                                                                                                                  |
| `value`                | `string`           |    ✅    | -                                  | -       | The selected date, must either be an empty string or a date formatted as "YYYY-MM-DD".                                                                                                                                                                                |
| `onChange`             | `func`             |    ✅    | -                                  | -       | Called with an event containing the new value. This is always called with either an empty string or a valid date in the format of `YYYY-MM-DD`. Parent should pass it back as `value`.                                                                                |
| `onBlur`               | `func`             |    -     | -                                  | -       | Called when input is blurred                                                                                                                                                                                                                                          |
| `timeZone`             | `string`           |    ✅    | -                                  | -       | Specifies the time zone in which the calendar and selected values are shown. It also influences how entered dates and times are parsed. See the `DateTimeInput` docs for more information.                                                                            |
| `onFocus`              | `func`             |    -     | -                                  | -       | Called when input is focused                                                                                                                                                                                                                                          |
| `isDisabled`           | `bool`             |    -     | -                                  | `false` | Indicates that the input cannot be modified (e.g not authorised, or changes currently saving).                                                                                                                                                                        |
| `placeholder`          | `string`           |    -     | -                                  | -       | Placeholder text for the input                                                                                                                                                                                                                                        |
| `title`                | `string` or `node` |    ✅    | -                                  | -       | Title of the label                                                                                                                                                                                                                                                    |
| `hint`                 | `string` or `node` |    -     | -                                  | -       | Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`. |
| `description`          | `string` or `node` |    -     | -                                  | -       | Provides a description for the title.                                                                                                                                                                                                                                 |
| `onInfoButtonClick`    | `function`         |    -     | -                                  | -       | Function called when info button is pressed. Info button will only be visible when this prop is passed.                                                                                                                                                               |
| `hintIcon`             | `node`             |    -     | -                                  | -       | Icon to be displayed beside the hint text. Will only get rendered when `hint` is passed as well.                                                                                                                                                                      |
| `badge`                | `node`             |    -     | -                                  | -       | Badge to be displayed beside the label. Might be used to display additional information about the content of the field (E.g verified email)                                                                                                                           |

The component further forwards all `data-` attributes to the underlying `input` component.

##### `errors`

This object is a key-value map. The `renderError` prop will be called for each entry with the key and the value. The return value will be rendered inside an `ErrorMessage` component underneath the input.

The `DateTimeField` supports some errors out of the box. Return `undefined` from `renderError` for these and the default errors will be shown instead. This prevents consumers from having to reimplement the same error messages for known errors while still keeping the flexibility of showing custom error messages for them.

When the `key` is known, and when the value is truthy, and when `renderError` returned `undefined` for that error entry, then the `DateTimeField` will render an appropriate error automatically.

Known error keys are:

- `missing`: tells the user that this field is required

### Main Functions and use cases are:

- Input field for a single date
