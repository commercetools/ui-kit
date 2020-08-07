# MoneyField

## Description

A controlled input component for money values with validation states and a label.

## Usage

```js
import MoneyField from '@commercetools-uikit/money-field';

<MoneyField
  title="Price"
  value={{ amount: '20', currencyCode: 'EUR' }}
  onChange={event => alert(event.target.value)}
  currencies={['EUR', 'USD']} />;
/>
```

## High Precision Money Values

The `MoneyField` component always operates on a value consisting of

```js
{ amount: String, currencyCode: String }
```

The amount can have an arbitrary precision. When the precision of the amount exceeds the precision of that currency, then that Money Value is referred to as being "high precision".

> ⚠️ The `MoneyField` will allow high precision money values by default. If you want to discourage them, you need to add validation as shown in the example below, or the Examples/Forms story.

## Properties

| Props                   | Type                                       | Required | Values                  | Default | Description                                                                                                                                                                                                                                                           |
| ----------------------- | ------------------------------------------ | :------: | ----------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                    | `string`                                   |    -     | -                       | -       | Used as HTML `id` property. An `id` is auto-generated when it is not specified.                                                                                                                                                                                       |
| `autoComplete`          | `string`                                   |    -     | -                       | -       | Used as HTML `autocomplete` property                                                                                                                                                                                                                                  |
| `horizontalConstraint`  | `object`                                   |          | `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                                                                                                                                            |
| `errors`                | `object`                                   |    -     | -                       | -       | A map of errors. Error messages for known errors are rendered automatically. Unknown errors will be forwarded to `renderError`.                                                                                                                                       |
| `renderError`           | `function`                                 |    -     | -                       | -       | Called with custom errors, as `renderError(key, error)`. This function can return a message which will be wrapped in an `ErrorMessage`. It can also return `null` to show no error.                                                                                   |
| `isRequired`            | `bool`                                     |    -     | -                       | `false` | Indicates if the value is required. Shows an the "required asterisk" if so.                                                                                                                                                                                           |
| `touched`               | `object`                                   |    -     | -                       | -       | Indicates whether the `currencyCode` or `amount` fields were touched. Errors will only be shown when the field was touched.                                                                                                                                           |
| `name`                  | `string`                                   |    -     | -                       | -       | The prefix used to create a HTML `name` property for the amount input field (`${name}.amount`) and the currency dropdown (`${name}.currencyCode`).                                                                                                                    |
| `value`                 | `{ currencyCode: string, amount: string }` |    ✅    | -                       | -       | Value of the input. Consists of the currency code and an amount. `amount` is a string representing the amount. A dot has to be used as the decimal separator.                                                                                                         |
| `currencies`            | array of `string`                          |    -     | -                       | []      | List of possible currencies. When not provided or empty, the component renders a label with the value's currency instead of a dropdown.                                                                                                                               |
| `placeholder`           | `string`                                   |    -     | -                       | -       | Placeholder text for the amount input                                                                                                                                                                                                                                 |
| `onBlur`                | `func`                                     |    -     | -                       | -       | Called when input is blurred                                                                                                                                                                                                                                          |
| `onFocus`               | `func`                                     |    -     | -                       | -       | Called when input is focused.                                                                                                                                                                                                                                         |
| `isDisabled`            | `bool`                                     |    -     | -                       | `false` | Indicates that the input cannot be modified (e.g not authorised, or changes currently saving).                                                                                                                                                                        |
| `isReadOnly`            | `bool`                                     |    -     | -                       | `false` | Indicates that the field is displaying read-only content                                                                                                                                                                                                              |
| `isAutofocussed`        | `bool`                                     |    -     | -                       | -       | Focus the input on initial render                                                                                                                                                                                                                                     |
| `onChange`              | `function(event)`                          |    ✳️    | -                       | -       | Called with the event of the input or dropdown when either the currency or the amount have changed. Either `onChange` or `onChangeValue` must be passed.                                                                                                              |
| `title`                 | `string` or `node`                         |    ✅    | -                       | -       | Title of the label                                                                                                                                                                                                                                                    |
| `onInfoButtonClick`     | `function`                                 |    -     | -                       | -       | Function called when info button is pressed. Info button will only be visible when this prop is passed.                                                                                                                                                               |
| `hint`                  | `string` or `node`                         |    -     | -                       | -       | Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`. |
| `hintIcon`              | `node`                                     |    -     | -                       | -       | Icon to be displayed beside the hint text. Will only get rendered when `hint` is passed as well.                                                                                                                                                                      |
| `description`           | `string` or `node`                         |    -     | -                       | -       | Provides a description for the title.                                                                                                                                                                                                                                 |
| `hasHighPrecisionBadge` | `bool`                                     |    -     | -                       | -       | Shows high precision badge in case current value uses high precision.                                                                                                                                                                                                 |
| `menuPortalTarget`      | `HTMLElement`                              |    -     | -                       | -       | Dom element to portal the currency select menu to                                                                                                                                                                                                                     |
| `menuPortalZIndex`      | `number`                                   |    -     | -                       | -       | z-index value for the currency select menu portal                                                                                                                                                                                                                     |
| `menuShouldBlockScroll` | `bool`                                     |    -     | -                       | `false` | whether the menu should block scroll while open                                                                                                                                                                                                                       |

The component further forwards all `data-` attributes to the underlying `input` component.

## `errors`

This object is a key-value map. The `renderError` prop will be called for each entry with the key and the value. The return value will be rendered inside an `ErrorMessage` component underneath the input.

The `MoneyField` supports some errors out of the box. Return `undefined` from `renderError` for these and the default errors will be shown instead. This prevents consumers from having to reimplement the same error messages for known errors while still keeping the flexibility of showing custom error messages for them.

When the `key` is known, and when the value is truthy, and when `renderError` returned `undefined` for that error entry, then the `MoneyField` will render an appropriate error automatically.

Known error keys are:

- `missing`: tells the user that this field is required but no value was provided

## Main Functions and use cases are:

- Getting monetary value input with a currency from users (with cent precision or high precision)
