## Static methods

### `MoneyInput.convertToMoneyValue`

The `convertToMoneyValue` function will turn a `MoneyInput` value into a [`MoneyValue`](https://docs.commercetools.com/http-api-types#money) the API can handle. It automatically converts to `centPrecision` or `highPrecision` types when the number of supplied fraction digits exceeds the number of fraction digits used by the currency.
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

### `MoneyInput.parseMoneyValue`

The `parseMoneyValue` function will turn a [`MoneyValue`](https://docs.commercetools.com/http-api-types#money) into a value the `MoneyInput` component can handle `({ amount, currencyCode })`.

### `MoneyInput.isEmpty`

The `isEmpty` function will return `true` when the passed `MoneyInput` value is empty (either has no currency or no amount, or does not exist at all).

```js
MoneyInput.isEmpty({ amount: '', currencyCode: 'EUR' }); // -> true
MoneyInput.isEmpty({ amount: '5', currencyCode: '' }); // -> true
MoneyInput.isEmpty(); // -> true

MoneyInput.isEmpty({ amount: '5', currencyCode: 'EUR' }); // -> false
```

### `MoneyInput.isTouched`

The `isTouched` function will return `true` when all input elements were touched (currency dropdown and amount input).

```js
MoneyInput.isTouched({ amount: true, currencyCode: true }); // -> true

MoneyInput.isTouched({ amount: true }); // -> false
MoneyInput.isTouched({ currencyCode: true }); // -> false
MoneyInput.isTouched({ amount: false, currencyCode: false }); // -> false
MoneyInput.isTouched({}); // -> false
```

### `MoneyInput.getCurrencyDropdownId`

**`getCurrencyDropdownId(idPrefix)`**

Returns the `id` of the currency dropdown. This is useful in case you want to create a label for the input field. You can use it as

```js
MoneyInput.getCurrencyDropdownId('price');
// -> "price.currencyCode"
```

### `MoneyInput.getAmountInputId(idPrefix)`

Returns the `id` of the amount input. This is useful in case you want to create a label for the input field. You can use it as

```js
MoneyInput.getAmountInputId('price');
// -> "price.amount"
```

### `MoneyInput.isHighPrecision`

The `isHighPrecision` function will return `true` when a `MoneyInput` value is passed for which the number of fraction digits of the amount exceeds the number of fraction digits the supplied currency usually uses.

The function may not be called with empty money values. It will throw in those cases.

```js
MoneyInput.isHighPrecision({ amount: '2.00', currencyCode: 'EUR' }, 'en'); // -> false
MoneyInput.isHighPrecision({ amount: '2.001', currencyCode: 'EUR' }, 'en'); // -> true
MoneyInput.isHighPrecision({ amount: '2.001', currencyCode: 'EUR' }, 'de'); // -> false
MoneyInput.isHighPrecision({ amount: '2,001', currencyCode: 'EUR' }, 'de'); // -> true
MoneyInput.isHighPrecision({ amount: '', currencyCode: 'EUR' }, 'en'); // -> throws
```

## Examples

Here's an example of how `MoneyInput` would be used inside a form.

```jsx
import { IntlProvider } from 'react-intl';
import { Formik } from 'formik';
import omitEmpty from 'omit-empty-es';
import { ErrorMessage } from '@commercetools-uikit/messages';
import MoneyInput from '@commercetools-uikit/money-input';

const currencies = ['EUR', 'USD', 'AED', 'KWD'];

// the existing document, e.g. from the database
const doc = {
  somePrice: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 4200,
    fractionDigits: 2,
  },
};

// A function to convert a document to form values.
const docToFormValues = (aDoc) => ({
  // The parseMoneyValue function will turn a MoneyValue into a
  // value the MoneyInput component can handle ({ amount, currencyCode })
  somePrice: MoneyInput.parseMoneyValue(aDoc.somePrice),
});

// a function to convert form values back to a document
const formValuesToDoc = (formValues, locale) => ({
  // The convertToMoneyValue function will turn a MoneyInput
  // value into a value the API can handle
  // It automatically converts to centPrecision or highPrecision
  // depending on the number of supplied fraction digits and the
  // used currency code.
  // If you want to forbid highPrecision, then the form's validation
  // needs to add an error when it sees a highPrecision price.
  // See example below
  somePrice: MoneyInput.convertToMoneyValue(formValues.somePrice, locale),
});

const validate = (formValues, locale) => {
  const errors = { somePrice: {} };
  const moneyValue = MoneyInput.convertToMoneyValue(
    formValues.somePrice,
    locale
  );
  // convertToMoneyValue returns null whenever the value is invalid
  if (!moneyValue) {
    errors.somePrice.missing = true;
  } else if (moneyValue.type === 'highPrecision') {
    // This form does not allow highPrecision prices
    errors.somePrice.highPrecision = true;
  }
  return omitEmpty(errors);
};
const initialValues = docToFormValues(doc);

return (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(formValues) => {
      // doc will contain "somePrice" holding a MoneyValue,
      // ready to be consumed by the API
      const nextDoc = formValuesToDoc(formValues);
      console.log(nextDoc);
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
          onChange={(value) => setFieldValue('somePrice', value)}
          hasError={
            MoneyInput.isTouched(touched.somePrice) && Boolean(errors.somePrice)
          }
          horizontalConstraint={10}
        />
        {touched.somePrice && errors.somePrice && errors.somePrice.missing && (
          <ErrorMessage>This field is required!</ErrorMessage>
        )}
        {touched.somePrice &&
          errors.somePrice &&
          errors.somePrice.highPrecision && (
            <ErrorMessage>
              High precision prices are not supported here!
            </ErrorMessage>
          )}
        <button type="submit">Submit</button>
      </form>
    )}
  />
);
```
