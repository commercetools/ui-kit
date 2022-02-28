## Static methods

### `LocalizedMoneyInput.convertToMoneyValue`

The `convertToMoneyValue` function will turn a LocalizedMoneyInput value into a [`MoneyValue`](https://docs.commercetools.com/http-api-types#money) the API can handle. It automatically converts to `centPrecision` or `highPrecision` types when the number of supplied fraction digits exceeds the number of fraction digits used by the currency.
If you want to forbid `highPrecision`, then the form's validation needs to add an error when it sees a `highPrecision` price. See example below.

Here are examples of `centPrecision` and `highPrecision` prices.

```js
// 42.00 €
{
  "type": "centPrecision",
  "currencyCode": "EUR",
  "centAmount": 4200,
  "fractionDigits": 2
}
```

```js
// 0.0123456 €
{
 "type": "highPrecision",
 "currencyCode": "EUR",
 "centAmount": 1,
 "preciseAmount": 123456,
 "fractionDigits": 7
}
```

### `LocalizedMoneyInput.parseMoneyValue`

The `parseMoneyValue` function will turn a [`MoneyValue`](https://docs.commercetools.com/http-api-types#money) into a value the LocalizedMoneyInput component can handle `({ amount, currencyCode })`.

### `LocalizedMoneyInput.getEmptyCurrencies`

Returns array of the empty currencies

```js
LocalizedMoneyInput.getEmptyCurrencies({});
// -> []
```

```js
LocalizedMoneyInput.getEmptyCurrencies({
  USD: { currencyCode: 'USD', amount: '' },
  EUR: { currencyCode: 'EUR', amount: '' },
});
// -> ['USD', 'EUR']
```

```js
LocalizedMoneyInput.getEmptyCurrencies({
  USD: { currencyCode: 'USD', amount: '12.43' },
  EUR: { currencyCode: 'EUR', amount: '' },
});
// -> ['EUR']
```

### `LocalizedMoneyInput.getHighPrecisionCurrencies`

Returns array of the currencies that have high precision amount

```js
LocalizedMoneyInput.getHighPrecisionCurrencies({});
// -> []
```

```js
LocalizedMoneyInput.getHighPrecisionCurrencies({
  USD: {
    currencyCode: 'USD',
    amount: '12.2221',
  },
  EUR: {
    currencyCode: 'EUR',
    amount: '9.9999',
  },
});
// -> ['USD', 'EUR']
```

```js
LocalizedMoneyInput.getHighPrecisionCurrencies({
  USD: {
    currencyCode: 'USD',
    amount: '12.43',
  },
  EUR: {
    currencyCode: 'EUR',
    amount: '0.00001',
  },
});
// -> ['EUR']
```

### `LocalizedMoneyInput.convertToMoneyValues`

The convertToMoneyValues function will turn a `LocalizedMoneyInput` value into array of [`MoneyValue`](https://docs.commercetools.com/http-api-types#money) the API can handle. It automatically converts to `centPrecision` or `highPrecision` types when the number of supplied fraction digits exceeds the number of fraction digits used by the currency. If you want to forbid `highPrecision`, then the form's validation needs to add an error when it sees a `highPrecision` price. See example below.

Here are examples of `centPrecision` and `highPrecision` prices.

```js
// 42.00 €
[
  {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 4200,
    fractionDigits: 2,
  },
];
```

```js
// 0.0123456 €
[
  {
    type: 'highPrecision',
    currencyCode: 'EUR',
    centAmount: 1,
    preciseAmount: 123456,
    fractionDigits: 7,
  },
];
```

### `LocalizedMoneyInput.parseMoneyValues`

The `parseMoneyValues` function will turn a `MoneyValue` into a value the `LocalizedMoneyInput` component can handle.

```js
LocalizedMoneyInput.parseMoneyValues([{ currencyCode: 'EUR', centAmount: 10 }]);
```

### `LocalizedMoneyInput.getEmptyCurrencies`

The getEmptyCurrencies function will return array of currencies that don't have amount .

```js
LocalizedMoneyInput.getEmptyCurrencies({
  EUR: { currencyCode: 'EUR', amount: '' },
  USD: { currencyCode: 'USD', amount: '12.77' },
}); // -> ['EUR']
LocalizedMoneyInput.getEmptyCurrencies({
  EUR: { currencyCode: 'EUR', amount: '12.77' },
}); // -> []
```

## Examples

Here's an example of how `LocalizedMoneyInput` would be used inside a form.

```jsx
import { IntlProvider } from 'react-intl';
import { Formik } from 'formik';
import omitEmpty from 'omit-empty-es';
import { ErrorMessage } from '@commercetools-uikit/messages';
import LocalizedMoneyInput from '@commercetools-uikit/localized-money-input';
// the existing document, e.g. from the database
const doc = {
  prices: [
    {
      currencyCode: 'EUR',
      centAmount: 1200,
    },
    {
      currencyCode: 'AMD',
      centAmount: 3300,
    },
  ],
};
// A function to convert a document to form values.
const docToFormValues = (doc) => ({
  // The parseMoneyValue function will turn a MoneyValue into a
  // value the LocalizedMoneyInput component can handle ({currency: amount})
  prices: LocalizedMoneyInput.parseMoneyValues(doc.prices),
});
// a function to convert form values back to a document
const formValuesToDoc = (formValues) => ({
  // The convertToMoneyValue function will convert a LocalizedMoneyInput
  // value into a value the API can handle
  // It automatically converts to centPrecision or highPrecision
  // depending on the number of supplied fraction digits and the
  // used currency code.
  // If you want to forbid highPrecision, then the form's validation
  // needs to add an error when it sees a highPrecision price.
  // See example below
  prices: LocalizedMoneyInput.convertToMoneyValues(formValues.prices),
});
const validate = (formValues) => {
  const errors = { prices: {} };
  Object.keys(formValues.prices).forEach((currency) => {
    errors.prices[currency] = {};
  });
  const emptyCurrencies = LocalizedMoneyInput.getEmptyCurrencies(
    formValues.prices
  );
  // ['EUR', 'USD']
  // This form doesn't accept high precision prices
  const highPrecisionCurrencies =
    LocalizedMoneyInput.getHighPrecisionCurrencies(formValues.prices);
  // ['CAD', 'USD']
  emptyCurrencies.forEach((emptyCurrency) => {
    errors.prices[emptyCurrency].missing = true;
  });
  highPrecisionCurrencies.forEach((highPrecisionCurrency) => {
    errors.prices[highPrecisionCurrency].highPrecision = true;
  });
  return omitEmpty(errors);
};
const initialValues = docToFormValues(doc);
const renderErrors = (errors) => {
  Object.keys(errors.prices).reduce((currency) => {
    const error =
      (errors.prices[currency] && errors.prices[currency].missing && (
        <ErrorMessage>This field is required!</ErrorMessage>
      )) ||
      (errors.prices[currency] && errors.prices[currency].highPrecision && (
        <ErrorMessage>High precision prices not supported here!</ErrorMessage>
      ));
    return {
      [currency]: touched.prices[currency] && error,
    };
  });
};
return (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(formValues) => {
      // doc will contain "prices" holding a MoneyValue,
      // ready to be consumed by the API
      const nextDoc = formValuesToDoc(formValues);
      console.log(nextDoc);
    }}
    render={({
      values,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    }) => (
      <form onSubmit={handleSubmit}>
        <LocalizedMoneyInput
          value={values.prices}
          onChange={handleChange}
          onBlur={handleBlur}
          isDisabled={isSubmitting}
          errors={renderErrors(errors)}
          horizontalConstraint={10}
        />
        <button type="submit">Submit</button>
      </form>
    )}
  />
);
```
