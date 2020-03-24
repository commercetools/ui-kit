# RadioField

#### Description

A controlled radio input component with validation states and a label.

## Usage

```js
import { RadioField } from '@commercetools-frontend/ui-kit';

<RadioField
  title="Fruits"
  name="fruits"
  value="apple"
  onChange={(event) => alert(event.target.value)}
>
  <RadioInput.Option value="apple">{'Apple'}</RadioInput.Option>
  <RadioInput.Option value="banana">{'Banana'}</RadioInput.Option>
</RadioField>;
```

#### Properties

##### RadioField

| Props                  | Type               | Required | Values                  | Default          | Description                                                                                                                                                                                                                                                           |
| ---------------------- | ------------------ | :------: | ----------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string`           |    -     | -                       | -                | Used as HTML `id` property. An `id` is auto-generated when it is not specified.                                                                                                                                                                                       |
| `horizontalConstraint` | `object`           |          | `m`, `l`, `xl`, `scale` | `scale`          | Horizontal size limit of the input fields.                                                                                                                                                                                                                            |
| `errors`               | `object`           |    -     | -                       | -                | A map of errors. Error messages for known errors are rendered automatically. Unknown errors will be forwarded to `renderError`.                                                                                                                                       |
| `renderError`          | `function`         |    -     | -                       | -                | Called with custom errors, as `renderError(key, error)`. This function can return a message which will be wrapped in an `ErrorMessage`. It can also return `null` to show no error.                                                                                   |
| `isRequired`           | `bool`             |    -     | -                       | `false`          | Indicates if the value is required. Shows an the "required asterisk" if so.                                                                                                                                                                                           |
| `touched`              | `bool`             |    -     | -                       | `false`          | Indicates whether the field was touched. Errors will only be shown when the field was touched.                                                                                                                                                                        |
| `name`                 | `string`           |    -     | -                       | -                | Used as HTML `name` of the input component. property                                                                                                                                                                                                                  |
| `value`                | `string`           |    ✅    | -                       | -                | Value of the input component.                                                                                                                                                                                                                                         |
| `onChange`             | `func`             |    -     | -                       | -                | Called with an event containing the new value. Required when input is not read only. Parent should pass it back as `value`.                                                                                                                                           |
| `onBlur`               | `func`             |    -     | -                       | -                | Called when input is blurred                                                                                                                                                                                                                                          |
| `onFocus`              | `func`             |    -     | -                       | -                | Called when input is focused                                                                                                                                                                                                                                          |
| `isDisabled`           | `bool`             |    -     | -                       | `false`          | Indicates that the input cannot be modified (e.g not authorised, or changes currently saving).                                                                                                                                                                        |
| `isReadOnly`           | `bool`             |    -     | -                       | `false`          | Indicates that the field is displaying read-only content                                                                                                                                                                                                              |
| `direction`            | `string`           |    -     | `stack` \| `inline`     | `stack`          | Rendering direction of the radio `RadioInput.Option`s                                                                                                                                                                                                                 |
| `directionProps`       | `object`           |    -     | -                       | `{ scale: "m" }` | Passes props of the `Spacings.Stack` or `Spacings.Inline`, dependeing on the chosen direction                                                                                                                                                                         |
| `children`             | `node`             |    ✅    | -                       | -                | At least one `RadioInput.Option` component or another node (mixed children are allowed)                                                                                                                                                                               |
| `title`                | `string` or `node` |    ✅    | -                       | -                | Title of the label                                                                                                                                                                                                                                                    |
| `hint`                 | `string` or `node` |    -     | -                       | -                | Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`. |
| `description`          | `string` or `node` |    -     | -                       | -                | Provides a description for the title.                                                                                                                                                                                                                                 |
| `onInfoButtonClick`    | `function`         |    -     | -                       | -                | Function called when info button is pressed. Info button will only be visible when this prop is passed.                                                                                                                                                               |
| `hintIcon`             | `node`             |    -     | -                       | -                | Icon to be displayed beside the hint text. Will only get rendered when `hint` is passed as well.                                                                                                                                                                      |
| `badge`                | `node`             |    -     | -                       | -                | Badge to be displayed beside the label. Might be used to display additional information about the content of the field (E.g verified email)                                                                                                                           |

The component further forwards all `data-` attributes to the underlying `RadioInput` component.

##### RadioInput.Option

See `RadioInput` README for the list of props.

##### `errors`

This object is a key-value map. The `renderError` prop will be called for each entry with the key and the value. The return value will be rendered inside an `ErrorMessage` component underneath the input.

The `RadioField` supports some errors out of the box. Return `undefined` from `renderError` for these and the default errors will be shown instead. This prevents consumers from having to reimplement the same error messages for known errors while still keeping the flexibility of showing custom error messages for them.

When the `key` is known, and when the value is truthy, and when `renderError` returned `undefined` for that error entry, then the `RadioField` will render an appropriate error automatically.

Known error keys are:

- `missing`: tells the user that this field is required

### Main Functions and use cases are:

- Single option selection field in login forms
