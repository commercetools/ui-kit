# RichTextInput

### THIS COMPONENT IS IN BETA!

Please be aware that this component may be subject to upcoming breaking changes as it's still in active development.

---

## Description

A controlled rich text input component for rich text with validation
states.

## Usage

```js
import RichTextInput from '@commercetools-uikit/rich-text-input';

const html = '<p>hello world</p>';

const Input = props => {
  const [value, setValue] = React.useState(html);
  return (
    <RichTextInput
      value={value}
      onChange={event => { setValue(event.target.value)}
    />;
  )
}
```

## Properties

| Props                        | Type     | Required | Values                  | Default | Description                                                                                                                 |
| ---------------------------- | -------- | :------: | ----------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `name`                       | `string` |    -     | -                       | -       | Used as HTML `name` property                                                                                                |
| `autoComplete`               | `string` |    -     | -                       | -       | Used as HTML `autoComplete` property                                                                                        |
| `id`                         | `string` |    -     | -                       | -       | Specifies the id of an element                                                                                              |
| `value`                      | `string` |    ✅    | -                       | -       | Value of the input                                                                                                          |
| `onChange`                   | `func`   |    ✅    | -                       | -       | Called with an event containing the new value. Required, unless input is `read-only`. Parent should pass it back as `value` |
| `onBlur`                     | `func`   |    -     | -                       | -       | Called when field is blurred                                                                                                |
| `onFocus`                    | `func`   |    -     | -                       | -       | Called when field is focused                                                                                                |
| `isAutofocussed`             | `bool`   |    -     | -                       | -       | Focuses the input field on initial render                                                                                   |
| `defaultExpandMultilineText` | `bool`   |    -     | -                       | `false` | Expands rich text input initially                                                                                           |
| `placeholder`                | `string` |    -     | -                       | -       | Placeholder text for the input                                                                                              |
| `isDisabled`                 | `bool`   |    -     | -                       | `false` | Indicates that the field cannot be used (e.g not authorised, or changes not saved)                                          |
| `isReadOnly`                 | `bool`   |    -     | -                       | `false` | Indicates that the field is displaying read-only content                                                                    |
| `hasError`                   | `bool`   |    -     | -                       | `false` | Indicates the input field has an error                                                                                      |
| `hasWarning`                 | `bool`   |    -     | -                       | `false` | Indicates the input field has a warning                                                                                     |
| `horizontalConstraint`       | `object` |          | `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                  |
| `showExpandIcon`             | `bool`   |    -     | -                       | `false` | Shows an `expand` icon in the toolbar                                                                                       |
| `onClickExpand`              | `func`   |    -     | -                       | -       | Called when the `expand` button is clicked                                                                                  |

## Static methods

### `RichTextInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is empty.

```js
RichTextInput.isEmpty(''); // -> true
RichTextInput.isEmpty('<p></p>'); // -> true
RichTextInput.isEmpty('tree'); // -> false
```

### `isTouched(touched)`

Expects to be called with an array or boolean.
Returns `true` when truthy.
