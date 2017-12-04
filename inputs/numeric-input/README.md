# NumericInput

#### Description

A controlled input component for numbers with validation states.

## Usage

```js
import NumericInput from '@commercetools-local/ui-kit/inputs/numeric-input';

<NumericInput value="2.5" onChange={value => alert(value)} />;
```

#### Properties

| Props         | Type     | Required | Values | Default | Description                                                                                        |
| ------------- | -------- | :------: | ------ | ------- | -------------------------------------------------------------------------------------------------- |
| `name`        | `string` |    ✅    | -      | -       | Used as HTML `name` property                                                                       |
| `value`       | `string` |    ✅    | -      | -       | Value of the input. This is a string as the parent is responsible for converting it into a number. |
| `onChange`    | `func`   |    ✅    | -      | -       | Called with the new value. Parent should pass it back as `value`                                   |
| `onBlur`      | `func`   |    -     | -      | -       | Called when field is blurred                                                                       |
| `isDisabled`  | `bool`   |    -     | -      | `false` | Controls disabled state of input                                                                   |
| `placeholder` | `string` |    -     | -      | -       | Placeholder for the input                                                                          |
| `hasError`    | `bool`   |    -     | -      | -       | Turns on the "error" state of the input (shows a red border)                                       |
