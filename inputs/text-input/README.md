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

| Props         | Type     | Required | Values | Default | Description                                                      |
| ------------- | -------- | :------: | ------ | ------- | ---------------------------------------------------------------- |
| `name`        | `string` |    ✅    | -      | -       | Used as HTML `name` property                                     |
| `value`       | `string` |    ✅    | -      | -       | Value of the input                                               |
| `onChange`    | `func`   |    ✅    | -      | -       | Called with the new value. Parent should pass it back as `value` |
| `onBlur`      | `func`   |    -     | -      | -       | Called when field is blurred                                     |
| `isDisabled`  | `bool`   |    -     | -      | `false` | Controls disabled state of input                                 |
| `placeholder` | `string` |    -     | -      | -       | Placeholder for the input                                        |
| `hasError`    | `bool`   |    -     | -      | -       | Turns on the "error" state of the input (shows a red border)     |

Main Functions and use cases are:

* Input field for single-line strings
