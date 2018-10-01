# SelectField

#### Description

A controlled input component with validation states and a label getting a selection from the user.

## Usage

```js
import { SelectField } from '@commercetools-frontend/ui-kit';

<SelectField
  title="State"
  value="ready"
  options={[
    { value: 'ready', label: 'Ready' },
    { value: 'shipped', label: 'Shipped' },
  ]}
  onChange={event => alert(event.target.value)}
/>;
```

#### Properties

| Props                  | Type               | Required | Values                             | Default | Description                                                                                                                                                                                                                                                                                 |
| ---------------------- | ------------------ | :------: | ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string`           |    -     | -                                  | -       | Used as HTML `id` property. An `id` is auto-generated when it is not specified.                                                                                                                                                                                                             |
| `horizontalConstraint` | `object`           |          | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                                                                                                                                                                  |
| `errors`               | `object`           |    -     | -                                  | -       | A map of errors. Error messages for known errors are rendered automatically. Unknown errors will be forwarded to `renderError`.                                                                                                                                                             |
| `renderError`          | `function`         |    -     | -                                  | -       | Called with custom errors, as `renderError(key, error)`. This function can return a message which will be wrapped in an `ErrorMessage`. It can also return `null` to show no error.                                                                                                         |
| `isRequired`           | `bool`             |    -     | -                                  | `false` | Indicates if the value is required. Shows an the "required asterisk" if so.                                                                                                                                                                                                                 |
| `touched`              | `bool`             |    -     | -                                  | `false` | Indicates whether the field was touched. Errors will only be shown when the field was touched.                                                                                                                                                                                              |
| `name`                 | `string`           |    -     | -                                  | -       | Used as HTML `name` of the select component. property                                                                                                                                                                                                                                       |
| `isMulti`              | `bool`             |    -     | -                                  | `false` | Multiple values can be selected when this option is checked. The `event` passed to `onChange` will contain an array of values then.                                                                                                                                                         |
| `components`           | `object`           |    -     | -                                  | -       | Overrides for `SelectInput` conponents , see [what components you can override](https://react-select.com/components)                                                                                                                                                                        |
| `options`              | `array`            |    -     | Items should contain `value` key   | -       | Selectable options                                                                                                                                                                                                                                                                          |
| `onChange`             | `func`             |    ✅    | -                                  | -       | Called with a fake event when value changes. The event's `target.name` will be the `name` supplied in props. The event's `target.value` will hold the value. The value will be the selected option, or an array of options in case `isMulti` is `true`.                                     |
| `onBlur`               | `func`             |    -     | -                                  | -       | Called with a fake event when input is blurred. The event's `target.name` will be the `name` supplied in props. In case `isMulti` is `true`, the name will have `.0` appended which helps with the formik integration.                                                                      |
| `maxMenuHeight`        | `number`           |    -     | -                                  | 200     | Maximum height of the menu.                                                                                                                                                                                                                                                                 |
| `isDisabled`           | `bool`             |    -     | -                                  | `false` | Indicates that the input cannot be modified (e.g not authorised, or changes currently saving).                                                                                                                                                                                              |
| `title`                | `string` or `node` |    ✅    | -                                  | -       | Title of the label                                                                                                                                                                                                                                                                          |
| `noOptionsMessage`     | `function`         |    -     | -                                  | -       | Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with `{ inputValue: String }`. `inputValue` will be an empty string when no search text is present. |
| `onInfoButtonClick`    | `function`         |    -     | -                                  | -       | Function called when info button is pressed. Info button will only be visible when this prop is passed.                                                                                                                                                                                     |
| `hint`                 | `string` or `node` |    -     | -                                  | -       | Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`.                       |
| `hintIcon`             | `node`             |    -     | -                                  | -       | Icon to be displayed beside the hint text. Will only get rendered when `hint` is passed as well.                                                                                                                                                                                            |
| `description`          | `string` or `node` |    -     | -                                  | -       | Provides a description for the title.                                                                                                                                                                                                                                                       |
| `badge`                | `node`             |    -     | -                                  | -       | Badge to be displayed beside the label. Might be used to display additional information about the content of the field (E.g verified email)                                                                                                                                                 |

The component further forwards all `data-` attributes to the underlying `input` component.

See the [official documentation](https://react-select.com/props) for all other properties supported by the select input.

##### `errors`

This object is a key-value map. The `renderError` prop will be called for each entry with the key and the value. The return value will be rendered inside an `ErrorMessage` component underneath the input.

The `SelectField` supports some errors out of the box. Return `undefined` from `renderError` for these and the default errors will be shown instead. This prevents consumers from having to reimplement the same error messages for known errors while still keeping the flexibility of showing custom error messages for them.

When the `key` is known, and when the value is truthy, and when `renderError` returned `undefined` for that error entry, then the `SelectField` will render an appropriate error automatically.

Known error keys are:

- `missing`: tells the user that this field is required

### Static methods

`SelectField` supports the same static methods as `SelectInput`. See `SelectInput` for the description.
