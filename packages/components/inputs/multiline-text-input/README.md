# MultilineTextInput

## Description

A controlled text input component for multi-line strings with validation
states.

## Usage

```js
import MultilineTextInput from '@commercetools-uikit/multiline-text-input';

<MultilineTextInput
  value="foo"
  onChange={(event) => alert(event.target.value)}
/>;
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
| `defaultExpandMultilineText` | `bool`   |    -     | -                       | `false` | Expands multiline text input initially                                                                                      |
| `placeholder`                | `string` |    -     | -                       | -       | Placeholder text for the input                                                                                              |
| `isDisabled`                 | `bool`   |    -     | -                       | `false` | Indicates that the field cannot be used (e.g not authorised, or changes not saved)                                          |
| `isReadOnly`                 | `bool`   |    -     | -                       | `false` | Indicates that the field is displaying read-only content                                                                    |
| `hasError`                   | `bool`   |    -     | -                       | `false` | Indicates the input field has an error                                                                                      |
| `hasWarning`                 | `bool`   |    -     | -                       | `false` | Indicates the input field has a warning                                                                                     |
| `horizontalConstraint`       | `object` |    -     | `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                  |

## Static methods

### `MultilineTextInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is empty or consists of spaces and linebreaks only.

```js
MultilineTextInput.isEmpty(''); // -> true
MultilineTextInput.isEmpty(' '); // -> true
MultilineTextInput.isEmpty('\n'); // -> true
MultilineTextInput.isEmpty('tree'); // -> false
```

# Dos and don'ts

- Whenever a user input can hold multiline strings this `MultilineTextInput` component is recommended

- Not recommended to be used when the content is single-lined (e.g email address, password etc.)

- The horizontal constraint is not recommended to be smaller than `s` since content may cut off
