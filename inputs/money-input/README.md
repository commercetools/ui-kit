# MoneyInput

#### Description

A controlled input component for money values with validation states.

## Usage

```js
import MoneyInput from '@commercetools-local/ui-kit/inputs/money-input';

<MoneyInput
  value={{
    centAmount: 10,
    currencyCode: 'EUR',
  }}
  fractionDigits={2}
  language="en"
  currencies={['EUR', 'USD']}
/>;
```

#### Properties

| Props                  | Type                                                                | Required | Values                       | Default | Description                                                                                                                                                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------- | :------: | ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                | `{ currencyCode: string, centAmount: number }`                      |    -     | -                            | -       | Value of the input, composed by currency code and cent amount. `centAmount` is a number as the parent is responsible for formatting the value as money. Currency symbol is mapped using `currencyCode` and currencies array. If no match is found the currency code is shown instead. |
| `fractionDigits`       | `number`                                                            |    -     | -                            | 2       | Number of decimal digits in the fractional part of the value.                                                                                                                                                                                                                         |
| `language`             | `string`                                                            |    ✅    | -                            | -       | Language of the input. This is a string as the parent is responsible for converting it into a money value according to format of the language.                                                                                                                                        |  |
| `currencies`           | array of `string`                                                   |    -     | -                            | []      | List of possible currencies. When not provided or doesn't have at least one element the component renders a label with the currency instead of a dropdown.                                                                                                                            |
| `placeholder`          | `string`                                                            |    -     |                              | -       | Placeholder text for the input.                                                                                                                                                                                                                                                       |
| `onBlur`               | `func`                                                              |    -     | -                            | -       | Called when the `centAmount` field is blurred.                                                                                                                                                                                                                                        |
| `isDisabled`           | `bool`                                                              |    -     | -                            | `false` | Indicates that the field cannot be used (e.g not authorised)                                                                                                                                                                                                                          |
| `onChange`             | `function(nextValue: { currencyCode: string, centAmount: number })` |    -     | -                            | -       | Called when either the currency or the centAmount have changed.                                                                                                                                                                                                                       |
| `hasCurrencyError`     | `bool`                                                              |    -     | -                            | -       | Indicates if the currency field has an error                                                                                                                                                                                                                                          |
| `hasCurrencyWarning`   | `bool`                                                              |    -     | -                            | -       | Indicates if the currency field has a warning                                                                                                                                                                                                                                         |
| `hasAmountError`       | `bool`                                                              |    -     | -                            | -       | Indicates if the centAmount field has an error                                                                                                                                                                                                                                        |
| `hasAmountWarning`     | `bool`                                                              |    -     | -                            | -       | Indicates if the centAmount field has a warning                                                                                                                                                                                                                                       |
| `horizontalConstraint` | `string`                                                            |    -     | `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                                                                                                                                                            |
