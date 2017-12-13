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
| `isDisabled`  | `bool`   |    -     | -      | `false` | Controls disabled state of input |
| `isInactive`  | `bool`   |    -     | -      | `false` | Applies the inactive style. (e.G a fetch is being executed in a search input field) |
| `placeholder` | `string` |    -     | -      | -       | Placeholder text for the input                                                                          |
| `tone`    | `oneOf`   |    -     | ['default', 'warning', 'error', 'info']      | `default` | applies the styles regarding the received tone |

Main Functions and use cases are:

* Input field for single-line strings
