# LocalizedMoneyInput

## Description

A controlled input component for localized money values with validation
states.

## Usage

```js
import LocalizedMoneyInput from '@commercetools-uikit/localized-money-input';

<LocalizedMoneyInput
  value={{
    USD: { currencyCode: 'USD', amount: '12.22' },
    EUR: { currencyCode: 'EUR', amount: '41.44' },
  }}
  onChange={(event) => alert(event.target.name, event.target.value)}
/>;
```

## Properties

| Props                           | Type             | Required | Values                  | Default | Description                                                                                                                                                            |
| ------------------------------- | ---------------- | :------: | ----------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                            | `string`         |    -     | -                       | -       | Used as prefix of HTML `id` property. Each input field id will have the currency as a suffix (`${idPrefix}.${lang}`), e.g. `foo.en`                                    |
| `name`                          | `string`         |    -     | -                       | -       | Used as HTML `name` property for each input field. Each input field name will have the currency as a suffix (`${namePrefix}.${lang}`), e.g. `foo.en`                   |
| `value`                         | `object`         |    ✅    | -                       | -       | Values to use. Keyed by currency, the values are the money values, e.g. `{ USD: {currencyCode: 'USD', amount: '12.22'}, EUR: {currencyCode: 'EUR', amount: '41.44'} }` |
| `onChange`                      | `function`       |    ✅    | -                       | -       | Gets called when any input is changed. Is called with the change event of the changed input.                                                                           |
| `selectedCurrency`              | `string`         |    ✅    | -                       | -       | Specifies which currency will be shown in case the `LocalizedMoneyInput` is collapsed.                                                                                 |
| `onBlur`                        | `function`       |    -     | -                       | -       | Called when any field is blurred. Is called with the `event` of that field.                                                                                            |
| `onFocus`                       | `function`       |    -     | -                       | -       | Called when any field is focussed. Is called with the `event` of that field.                                                                                           |
| `hideCurrencyExpansionControls` | `bool`           |    -     | -                       | `false` | Will hide the currency toggle controls when set to `true`. It always shows all currencies instead.                                                                     |
| `defaultExpandCurrencies`       | `bool`           |    -     | -                       | `false` | Controls whether one or all currencies are visible by default. Pass `true` to show all currencies by default.                                                          |
| `isDisabled`                    | `bool`           |    -     | -                       | `false` | Disables all input fields.                                                                                                                                             |
| `isReadOnly`                    | `bool`           |    -     | -                       | `false` | Makes all input fields readonly.                                                                                                                                       |
| `placeholder`                   | `object`         |    -     | -                       | -       | Placeholders for each currency. Object of the same shape as `value`.                                                                                                   |
| `horizontalConstraint`          | `object`         |    -     | `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                                             |
| `hasError`                      | `bool`           |    -     | -                       | -       | Will apply the error state to each input without showing any error message.                                                                                            |
| `hasWarning`                    | `bool`           |    -     | -                       | -       | Indicates the input field has a warning                                                                                                                                |
| `errors`                        | `objectOf(node)` |    -     | -                       | -       | Used to show errors underneath the inputs of specific currencies. Pass an object whose key is a currency and whose value is the error to show for that key.            |
| `warnings`                      | `objectOf(node)` |    -     | -                       | -       | Used to show warnings underneath the inputs of specific currencies. Pass an object whose key is a currency and whose value is the warning to show for that key.        |

The component forwards all `data` attribute props. It further adds a `-${currency}` suffix to the values of the `data-test` and `data-track-component` attributes, e.g `data-test="foo"` will get added to the input for `en` as `data-test="foo-en"`.

Main Functions and use cases are:

- Receiving localized input from user

## Static Properties

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

The `convertToMoneyValues` function will turn a LocalizedMoneyInput value into array of [`MoneyValue`](https://docs.commercetools.com/http-api-types#money) the API can handle. It automatically converts to `centPrecision` or `highPrecision` types when the number of supplied fraction digits exceeds the number of fraction digits used by the currency.
If you want to forbid `highPrecision`, then the form's validation needs to add an error when it sees a `highPrecision` price. See example below.

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

The `parseMoneyValues` function will turn a [`MoneyValue`](https://docs.commercetools.com/http-api-types#money) into a value the LocalizedMoneyInput component can handle `({ [currencyCode]: {currencyCode, amount} })`.

### `LocalizedMoneyInput.getEmptyCurrencies`

The `getEmptyCurrencies` function will return array of currencies that don't have amount .

```js
LocalizedMoneyInput.getEmptyCurrencies({
  EUR: { currencyCode: 'EUR', amount: '' },
  USD: { currencyCode: 'USD', amount: '12.77' },
}); // -> ['EUR']

LocalizedMoneyInput.getEmptyCurrencies({
  EUR: { currencyCode: 'EUR', amount: '12.77' },
}); // -> []
```

## Example

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
