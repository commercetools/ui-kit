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
| `minValue`    | `string` |    ✅    | -      | -       | Specifies a minimum value that the field can have |
| `maxValue`    | `string` |    ✅    | -      | -       | Specifies a maximum value that the field can have |
| `stepValue`    | `string` |    ✅    | -      | -       | Displays up and down step arrows which will increase and decrease the value by the provided `stepValue` amount each time |
| `onChange`    | `func`   |    ✅    | -      | -       | Called with the new value. Parent should pass it back as `value`                                   |
| `onBlur`      | `func`   |    -     | -      | -       | Called when field is blurred                                                                      |
| `onFocus`      | `func`   |    -     | -      | -      | Called when field is focused                                     |
| `hasWarning` | `bool` |    -     | -      | -       | Indicates the input field has a warning                     |
| `hasError` | `bool` |    -     | -      | -       | Indicates the input field has an error                      |
| `isDisabled`  | `bool`   |    -     | -      | `false` | Indicates that the field cannot be used (e.g not authorised, or changes not saved) |
| `isLoading`  | `bool`   |    -     | -      | `false` | Shows a loading spinner.                                  |
| `isReadOnly`  | `bool`   |    -     | -      | `false` | Indicates that the field is displaying read-only content |
| `placeholder` | `string` |    -     | -      | -       | Placeholder text for the input                           |
