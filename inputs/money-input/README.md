# MoneyInput

#### Description

A controlled input component for money values with validation states.

## Usage

```js
import MoneyInput from '@commercetools-local/ui-kit/inputs/money-input';

<MoneyInput
  value={{ amount: '1.00', currencyCode: 'EUR' }}
  onChange={({ amount, currencyCode }) => {
    /* .. */
  }}
  currencies={['EUR', 'USD']}
/>;
```

#### Properties

| Props                  | Type                                                                | Required | Values                       | Default | Description                                                                                                                                                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------- | :------: | ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                | `{ currencyCode: string, centAmount: number }`                      |    ✅    | -                            | -       | Value of the input, composed by currency code and cent amount. `centAmount` is a number as the parent is responsible for formatting the value as money. Currency symbol is mapped using `currencyCode` and currencies array. If no match is found the currency code is shown instead. |
| `fractionDigits`       | `number`                                                            |    -     | -                            | 2       | Number of decimal digits in the fractional part of the value.                                                                                                                                                                                                                         |
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

### Example

Here's an example of how `MoneyInput` would be used inside a form.

```jsx
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Formik } from 'formik';
import ErrorMessage from '@commercetools-local/ui-kit/messages/error-message';
import MoneyInput from '@commercetools-local/ui-kit/inputs/money-input';

const currencies = ['EUR', 'USD', 'AED', 'KWD'];
const doc = {
  somePrice: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 4200,
    fractionDigits: 2,
  },
};
const docToFormValues = aDoc => ({
  somePrice: MoneyInput.parseMoneyValue(aDoc.somePrice, {
    defaultCurrencyCode: currencies[0],
  }),
});
const formValuesToDoc = formValues => ({
  somePrice: MoneyInput.convertToMoneyValue(formValues.somePrice),
});
const validate = formValues => {
  const errors = {};
  const moneyValue = MoneyInput.convertToMoneyValue(formValues.somePrice);
  if (moneyValue.type === 'highPrecision') {
    errors.somePrice = 'high-precision not allowed';
  }
  return errors;
};
const initialValues = docToFormValues(doc);

return (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={formValues => {
      console.log(formValuesToDoc(formValues));
    }}
    render={({
      values,
      errors,
      touched,
      setFieldValue,
      setFieldTouched,
      handleSubmit,
      isSubmitting,
    }) => (
      <form onSubmit={handleSubmit}>
        <MoneyInput
          value={values.somePrice}
          currencies={currencies}
          onBlur={() => setFieldTouched('somePrice')}
          isDisabled={isSubmitting}
          onChange={value => setFieldValue('somePrice', value)}
          hasAmountError={touched.somePrice && Boolean(errors.somePrice)}
          horizontalConstraint="l"
        />
        {touched.somePrice && <ErrorMessage>{errors.somePrice}</ErrorMessage>}
        <button type="submit">Submit</button>
      </form>
    )}
  />
);
```
