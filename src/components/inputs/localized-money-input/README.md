# LocalizedMoneyInput

#### Description

A controlled input component for localized money values with validation
states.

## Usage

```js
import { LocalizedMoneyInput } from '@commercetools-frontend/ui-kit';

<LocalizedMoneyInput
  value={{ USD: '12.22', EUR: '41.44' }}
  onChange={event => alert(event.target.name, event.target.value)}
/>;
```

#### Properties

| Props                   | Type             | Required | Values                             | Default | Description                                                                                                                                                                                                        |
| ----------------------- | ---------------- | :------: | ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                    | `string`         |    -     | -                                  | -       | Used as prefix of HTML `id` property. Each input field id will have the currency as a suffix (`${idPrefix}.${lang}`), e.g. `foo.en`                                                                                |
| `name`                  | `string`         |    -     | -                                  | -       | Used as HTML `name` property for each input field. Each input field name will have the currency as a suffix (`${namePrefix}.${lang}`), e.g. `foo.en`                                                               |
| `value`                 | `object`         |    ✅    | -                                  | -       | Values to use. Keyed by currency, the values are the actual values, e.g. `{ USD: '12.22', EUR: '41.44' }`                                                                                                          |
| `onChange`              | `function`       |    ✅    | -                                  | -       | Gets called when any input is changed. Is called with the change event of the changed input.                                                                                                                       |
| `selectedCurrency`      | `string`         |    ✅    | -                                  | -       | Specifies which currency will be shown in case the `LocalizedMoneyInput` is collapsed.                                                                                                                             |
| `onBlur`                | `function`       |    -     | -                                  | -       | Called when any field is blurred. Is called with the `event` of that field.                                                                                                                                        |
| `onFocus`               | `function`       |    -     | -                                  | -       | Called when any field is focussed. Is called with the `event` of that field.                                                                                                                                       |
| `hideExpansionControls` | `bool`           |    -     | -                                  | `false` | Will hide the currency toggle controls when set to `true`. It always shows all currencies instead.                                                                                                                 |
| `isDefaultExpanded`     | `bool`           |    -     | -                                  | `false` | Controls whether one or all currencies are visible by default. Pass `true` to show all currencies by default.                                                                                                      |
| `isDisabled`            | `bool`           |    -     | -                                  | `false` | Disables all input fields.                                                                                                                                                                                         |
| `placeholder`           | `object`         |    -     | -                                  | -       | Placeholders for each currency. Object of the same shape as `value`.                                                                                                                                               |
| `horizontalConstraint`  | `object`         |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                                                                                         |
| `hasError`              | `bool`           |    -     | -                                  | -       | Will apply the error state to each input without showing any error message.                                                                                                                                        |
| `errors`                | `objectOf(node)` |    -     | -                                  | -       | Used to show errors underneath the inputs of specific currencies. Pass an object holding the currency to show the error for as the key, and a value holding a React node which will be shown underneath the input. |

The component forwards all `data` attribute props. It further adds a `-${currency}` suffix to the values of the `data-test` and `data-track-component` attributes, e.g `data-test="foo"` will get added to the input for `en` as `data-test="foo-en"`.

Main Functions and use cases are:

- Receiving localized input from user

#### Static Properties

#### `LocalizedMoneyInput.convertToMoneyValue`

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

#### `LocalizedMoneyInput.parseMoneyValue`

The `parseMoneyValue` function will turn a [`MoneyValue`](https://docs.commercetools.com/http-api-types#money) into a value the LocalizedMoneyInput component can handle `({ amount, currencyCode })`.

##### `isEmpty(localizedField)`

Returns `true` when all values in a localized field are empty.

```js
LocalizedMoneyInput.isEmpty({});
// -> true
```

```js
LocalizedMoneyInput.isEmpty({ USD: '', EUR: '  ' });
// -> true
```

```js
LocalizedMoneyInput.isEmpty({ USD: '12.43', EUR: '' });
// -> false
```

##### `LocalizedMoneyInput.convertToMoneyValues`

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

##### `LocalizedMoneyInput.parseMoneyValues`

The `parseMoneyValues` function will turn a [`MoneyValue`](https://docs.commercetools.com/http-api-types#money) into a value the LocalizedMoneyInput component can handle `({ amount, currencyCode })`.

##### `LocalizedMoneyInput.isEmpty`

The `isEmpty` function will return `true` for the crrency when the passed `LocalizedMoneyInput` value for this currency is empty (either has no currency or no amount, or does not exist at all).

```js
LocalizedMoneyInput.isEmpty([{ amount: '', currencyCode: 'EUR' }]); // -> { EUR: true }

LocalizedMoneyInput.isEmpty({ amount: '5', currencyCode: 'EUR' }); // -> { EUR: false }
```

##### `LocalizedMoneyInput.isAllEmpty`

The `isAllEmpty` function will return `true` when the passed `LocalizedMoneyInput` values are all empty value (no amount, or does not exist at all).

```js
LocalizedMoneyInput.isAllEmpty([
  { amount: '', currencyCode: 'EUR' },
  { amount: '', currencyCode: 'USD' },
]); // ->  true

LocalizedMoneyInput.isAllEmpty([
  { amount: '12.93', currencyCode: 'EUR' },
  { amount: '', currencyCode: 'USD' },
]); // ->  false
```

##### `LocalizedMoneyInput.hasEmptyValue`

The `hasEmptyValue` function will return `true` when the passed `LocalizedMoneyInput` values has at least one empty value (no amount, or does not exist at all).

```js
LocalizedMoneyInput.hasEmptyValue([
  { amount: '', currencyCode: 'EUR' },
  { amount: '', currencyCode: 'USD' },
]); // ->  false

LocalizedMoneyInput.hasEmptyValue([
  { amount: '12.93', currencyCode: 'EUR' },
  { amount: '', currencyCode: 'USD' },
]); // ->  true
```
