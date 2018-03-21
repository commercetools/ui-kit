# NumberInput

#### Description

A controlled input component for numbers with validation states.

## Usage

```js
import NumberInput from '@commercetools-local/ui-kit/inputs/number-input';

<NumberInput value="2.5" onChange={value => alert(value)} />;
```

#### Properties

| Props             | Type     | Required | Values                             | Default | Description                                                                                            |
| ----------------- | -------- | :------: | ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `name`            | `string` |    ✅    | -                                  | -       | Used as HTML `name` property                                                                           |
| `value`           | `string` |    ✅    | -                                  | -       | Value of the input. This is a string as the parent is responsible for converting it into a number.     |
| `min`             | `number` |          | -                                  | -       | Value is used as `min` property on input field                                                         |
| `max`             | `number` |          | -                                  | -       | Value is used as `max` property on input field                                                         |
| `step`            | `number` |          | -                                  | -       | Value is used as `step` property on input field                                                        |
| `onChange`        | `func`   |    -     | -                                  | -       | Called with the new value. Required when input is not read only. Parent should pass it back as `value` |
| `onBlur`          | `func`   |    -     | -                                  | -       | Called when field is blurred                                                                           |
| `onFocus`         | `func`   |    -     | -                                  | -       | Called when field is focused                                                                           |
| `hasWarning`      | `bool`   |    -     | -                                  | -       | Indicates the input field has a warning                                                                |
| `hasError`        | `bool`   |    -     | -                                  | -       | Indicates the input field has an error                                                                 |
| `isAutofocussed`  | `bool`   |    -     | -                                  | -       | Focus the input field on initial render                                                                |
| `isDisabled`      | `bool`   |    -     | -                                  | `false` | Indicates that the field cannot be used (e.g not authorised)                                           |
| `isReadOnly`      | `bool`   |    -     | -                                  | `false` | Indicates that the field is displaying read-only content                                               |
| `placeholder`     | `string` |    -     | -                                  | -       | Placeholder text for the input                                                                         |
| `horizontalScale` | `object` |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                             |
