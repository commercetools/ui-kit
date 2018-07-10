# NumberInput

#### Description

A controlled input component for numbers with validation states.

## Usage

```js
import NumberInput from '@commercetools-frontend/ui-kit/inputs/number-input';

<NumberInput value="2.5" onChange={value => alert(value)} />;
```

#### Properties

| Props                  | Type                 | Required | Values                             | Default | Description                                                                                            |
| ---------------------- | -------------------- | :------: | ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `name`                 | `string`             |    ✅    | -                                  | -       | Used as HTML `name` property                                                                           |
| `value`                | `string` or `number` |    ✅    | -                                  | -       | Value of the input                                                                                     |
| `min`                  | `number`             |          | -                                  | -       | Value is used as `min` property on input field                                                         |
| `max`                  | `number`             |          | -                                  | -       | Value is used as `max` property on input field                                                         |
| `step`                 | `number`             |          | -                                  | -       | Value is used as `step` property on input field                                                        |
| `onChange`             | `func`               |    -     | -                                  | -       | Called with the new value. Required when input is not read only. Parent should pass it back as `value` |
| `onBlur`               | `func`               |    -     | -                                  | -       | Called when field is blurred                                                                           |
| `onFocus`              | `func`               |    -     | -                                  | -       | Called when field is focused                                                                           |
| `hasWarning`           | `bool`               |    -     | -                                  | -       | Indicates the input field has a warning                                                                |
| `hasError`             | `bool`               |    -     | -                                  | -       | Indicates the input field has an error                                                                 |
| `isAutofocussed`       | `bool`               |    -     | -                                  | -       | Focus the input field on initial render                                                                |
| `isDisabled`           | `bool`               |    -     | -                                  | `false` | Indicates that the field cannot be used (e.g not authorised)                                           |
| `isReadOnly`           | `bool`               |    -     | -                                  | `false` | Indicates that the field is displaying read-only content                                               |
| `placeholder`          | `string`             |    -     | -                                  | -       | Placeholder text for the input                                                                         |
| `horizontalConstraint` | `object`             |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                             |

### Static methods

#### `NumberInput.toFormValue`

Converts a number, or `undefined` value to a value the input can work with. It replaces non-numbers with an empty string to make sure the underlying input component never turns into an uncontrolled state.

```js
NumberInput.toFormValue(3); // -> 3
NumberInput.toFormValue('3'); // -> '3'
NumberInput.toFormValue(); // -> ''
NumberInput.toFormValue(undefined); // -> ''
```

#### `NumberInput.isEmpty`

Returns `true` when `NumberInput` value passed to the function is empty.

```js
NumberInput.isEmpty(); // -> true
NumberInput.isEmpty(undefined); // -> true
NumberInput.isEmpty(NaN); // -> true
NumberInput.toFormValue(2); // -> false
NumberInput.toFormValue('2'); // -> false
```

#### `NumberInput.hasFractionDigits`

```js
NumberInput.hasFractionDigits(); // -> throws
NumberInput.hasFractionDigits(2.2); // -> true
NumberInput.hasFractionDigits('2.2'); // -> true
NumberInput.hasFractionDigits('2'); // -> false
NumberInput.hasFractionDigits(2); // -> false
```
