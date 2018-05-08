# MoneyInput

#### Description

A controlled input component for money values with validation states.

## Usage

```js
import MoneyInput from '@commercetools-local/ui-kit/inputs/money-input';

<MoneyInput
  value={{
    amount: 10,
    currencyCode: 'EUR',
  }}
  fractionDigits={2}
  language="en"
  currencies={[{ value: 'EUR', label: '€' }, { value: 'USD', label: '$' }]}
/>;
```

#### Properties

| Props                  | Type                                                            | Required | Values                             | Default | Description                                                                                                                                                                                                                                                                  |
| ---------------------- | --------------------------------------------------------------- | :------: | ---------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                | `{ currencyCode: string, amount: number }`                      |    -     | -                                  | -       | Value of the input, composed by currency code and amount. `amount` is a number as the parent is responsible for formatting the value as money. Currency symbol is mapped using `currencyCode` and currencies array. If no match is found the currency code is shown instead. |
| `fractionDigits`       | `number`                                                        |    -     | -                                  | 2       | Number of decimal digits in the fractional part of the value.                                                                                                                                                                                                                |
| `language`             | `string`                                                        |    ✅    | -                                  | -       | Language of the input. This is a string as the parent is responsible for converting it into a money value according to format of the language.                                                                                                                               |  |
| `currencies`           | array of `{ label: string, value: string }`                     |    -     | -                                  | -       | List of possible currencies with value and label. When only one currency is provided, the component renders a label instead of a dropdown.                                                                                                                                   |
| `placeholder`          | `string`                                                        |    -     |                                    | -       | Placeholder text for the input.                                                                                                                                                                                                                                              |
| `onBlur`               | `func`                                                          |    -     | -                                  | -       | Called when the amount field is blurred.                                                                                                                                                                                                                                     |
| `isDisabled`           | `bool`                                                          |    -     | -                                  | `false` | Indicates that the field cannot be used (e.g not authorised)                                                                                                                                                                                                                 |
| `onChange`             | `function(nextValue: { currencyCode: string, amount: number })` |    -     | -                                  | -       | Called when either the currency or the amount have changed.                                                                                                                                                                                                                  |
| `hasCurrencyError`     | `bool`                                                          |    -     | -                                  | -       | Indicates if the currency field has an error                                                                                                                                                                                                                                 |
| `hasCurrencyWarning`   | `bool`                                                          |    -     | -                                  | -       | Indicates if the currency field has a warning                                                                                                                                                                                                                                |
| `hasAmountError`       | `bool`                                                          |    -     | -                                  | -       | Indicates if the amount field has an error                                                                                                                                                                                                                                   |
| `hasAmountWarning`     | `bool`                                                          |    -     | -                                  | -       | Indicates if the amount field has a warning                                                                                                                                                                                                                                  |
| `horizontalConstraint` | `string`                                                        |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                                                                                                                                                   |
