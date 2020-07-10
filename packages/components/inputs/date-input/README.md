# Dates: DateInput

## Usage

```js
import { DateInput } from '@commercetools-frontend/ui-kit';
```

#### Description

The `DateInput` component allows the user to select a date. It formats the selected date depending on the users' locale.

#### Usage

```js
<DateInput
  placeholder="Select a date..."
  value="2017-12-31"
  onChange={() => {}}
/>
```

#### Properties

| Props                  | Type     | Required | Values                  | Default | Description                                                                                                                               |
| ---------------------- | -------- | :------: | ----------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `horizontalConstraint` | `object` |    -     | `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input field.                                                                                                 |
| `value`                | `string` |    ✅    | -                       | -       | The selected date, must either be an empty string or a date formatted as "YYYY-MM-DD".                                                    |
| `onChange`             | `func`   |    ✅    | -                       | -       | Called when the date changes. Called with an event containing either an empty string (no value) or a string in this format: "YYYY-MM-DD". |
| `onFocus`              | `func`   |    -     | -                       | -       | Called when the date input gains focus.                                                                                                   |
| `onBlur`               | `func`   |    -     | -                       | -       | Called when the date input loses focus.                                                                                                   |
| `id`                   | `string` |    -     | -                       | -       | Used as the HTML `id` attribute.                                                                                                          |
| `name`                 | `string` |    -     | -                       | -       | Used as the HTML `name` attribute.                                                                                                        |
| `placeholder`          | `string` |    -     | -                       | -       | Placeholder value to show in the input field                                                                                              |
| `isDisabled`           | `bool`   |    -     | -                       | `false` | Disables the date picker                                                                                                                  |
| `isReadOnly`           | `bool`   |    -     | -                       | `false` | Disables the date picker menu and makes input field read-only                                                                             |
| `hasError`             | `bool`   |    -     | -                       | -       | Indicates the input field has an error                                                                                                    |
| `hasWarning`           | `bool`   |    -     | -                       | -       | Indicates the input field has a warning                                                                                                   |
| `minValue`             | `string` |    -     | -                       | -       | A minimum selectable date. Must either be an empty string or a date formatted as "YYYY-MM-DD".                                            |
| `maxValue`             | `string` |    -     | -                       | -       | A maximum selectable date. Must either be an empty string or a date formatted as "YYYY-MM-DD".                                            |

### Static methods

#### `DateInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is an empty string.

```js
DateInput.isEmpty(''); // -> true
DateInput.isEmpty('2018-09-20'); // -> false
```
