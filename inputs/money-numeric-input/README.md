# MoneyNumericInput

#### Description

A controlled input component for money values with validation states.

## Usage

```js
import MoneyNumericInput from '@commercetools-local/ui-kit/inputs/money-numeric-input';

<MoneyNumericInput
  value={10}
  fractionDigits={2}
  language="en"
  currency={{ value: 'EUR', label: '€' }}
  currencies={[{ value: 'EUR', label: '€' }, { value: 'USD', label: '$' }]}
/>;
```

#### Properties

| Props                  | Type                                                       | Required | Values                             | Default | Description                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------- | :------: | ---------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `currencyInputName`    | `string`                                                   |    -     | -                                  | -       | Used as HTML `name` property for the currency value                                                                                            |
| `amountInputName`      | `string`                                                   |    -     | -                                  | -       | Used as HTML `name` property for the amount value                                                                                              |
| `value`                | `number`                                                   |    -     | -                                  | -       | Value of the input. This is a number as the parent is responsible for formatting the value as money.                                           |
| `fractionDigits`       | `number`                                                   |    -     | -                                  | 2       | Number of decimal digits in the fractional part of the value.                                                                                  |
| `language`             | `string`                                                   |    ✅    | -                                  | -       | Language of the input. This is a string as the parent is responsible for converting it into a money value according to format of the language. |
| `currency`             | `{ label: string, value: string }`                         |    -     | -                                  | -       | Selected currency with label and value.                                                                                                        |
| `currencies`           | array of `{ label: string, value: string }`                |    -     | -                                  | -       | List of possible currencies with value and label.                                                                                              |
| `placeholder`          | `string`                                                   |    -     |                                    | -       | Placeholder text for the input.                                                                                                                |
| `onBlur`               | `func`                                                     |    -     | -                                  | -       | Called when the amount field is blurred.                                                                                                       |
| `isDisabled`           | `bool`                                                     |    -     | -                                  | `false` | Indicates that the field cannot be used (e.g not authorised)                                                                                   |
| `onCurrencyChange`     | `function(nextCurrency: { value: string, label: string })` |    -     | -                                  | -       | Called with the event including the new currency value and label.                                                                              |
| `hasCurrencyError`     | `bool`                                                     |    -     | -                                  | -       | Indicates if the currency field has an error                                                                                                   |
| `hasCurrencyWarning`   | `bool`                                                     |    -     | -                                  | -       | Indicates if the currency field has a warning                                                                                                  |
| `onAmountChange`       | `function(nextAmount: { value: number})`                   |    -     | -                                  | -       | Called with the event including the new formatted amount. When the value is deleted the event passes `undefined`.                              |
| `hasAmountError`       | `bool`                                                     |    -     | -                                  | -       | Indicates if the amount field has an error                                                                                                     |
| `hasAmountWarning`     | `bool`                                                     |    -     | -                                  | -       | Indicates if the amount field has a warning                                                                                                    |
| `horizontalConstraint` | `string`                                                   |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                     |
