# Dates: DateRangeInput

## Description

The `DateRangeInput` component allows the user to select a date range.

## Usage

```js
import DateRangeInput from '@commercetools-uikit/date-range-input';

<DateRangeInput
  placeholder="Select a date..."
  value={['2017-01-11', '2017-01-14']}
  onChange={() => {}}
/>;
```

## Properties

| Props                  | Type     | Required | Values                  | Default | Description                                                                                                                                                       |
| ---------------------- | -------- | :------: | ----------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `horizontalConstraint` | `object` |    -     | `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input field.                                                                                                                         |
| `value`                | `string` |    -     | -                       | -       | The selected date range, must either be an empty array or an array of two strings holding dates formatted as "YYYY-MM-DD".                                        |
| `onChange`             | `func`   |    ✅    | -                       | -       | Called when the date range changes. Called with an event containing either an empty array (no value) or an array holding two string in this format: "YYYY-MM-DD". |
| `onFocus`              | `func`   |    -     | -                       | -       | Called when the date input gains focus.                                                                                                                           |
| `onBlur`               | `func`   |    -     | -                       | -       | Called when the date input loses focus.                                                                                                                           |
| `id`                   | `string` |    -     | -                       | -       | Used as the HTML `id` attribute.                                                                                                                                  |
| `name`                 | `string` |    -     | -                       | -       | Used as the HTML `name` attribute.                                                                                                                                |
| `placeholder`          | `string` |    -     | -                       | -       | Placeholder value to show in the input field                                                                                                                      |
| `isClearable`          | `bool`   |    -     | -                       | `true`  | allows the range to be cleared                                                                                                                                    |
| `isDisabled`           | `bool`   |    -     | -                       | `false` | Disables the date picker                                                                                                                                          |
| `isReadOnly`           | `bool`   |    -     | -                       | `false` | Disables the date picker menu and makes input field read-only                                                                                                     |

| `hasError` | `bool` | - | - | - | Indicates the input field has an error |
| `hasWarning` | `bool` | - | - | - | Indicates the input field has a warning |

The component further forwards all `data-` attributes to the underlying `input` component.

## Static methods

### `DateRangeInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is an empty array.

```js
TextInput.isEmpty([]); // -> true
TextInput.isEmpty(['2018-09-20', '2018-09-24']); // -> false
```
