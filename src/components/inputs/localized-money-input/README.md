# LocalizedMoneyInput

#### Description

A controlled text input component for localized multi-line strings with validation
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

##### `isTouched(touched)`

Expects to be called with an object or `undefined`.
Returns `true` when at least one value is truthy.
