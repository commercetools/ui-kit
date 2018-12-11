# Dates: DateRangeInput

## Usage

```js
import { DateRangeInput } from '@commercetools-frontend/ui-kit';
```

#### Description

The `DateRangeInput` component allows the user to select a date range.

#### Usage

```js
<DateRangeInput
  placeholder="Select a date..."
  value={['2017-01-11', '2017-01-14']}
  onChange={() => {}}
/>
```

#### Properties

| Props                  | Type     | Required | Values                             | Default | Description                                                                                                                                                       |
| ---------------------- | -------- | :------: | ---------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string` |    -     | -                                  | -       | Used as the HTML `id` attribute.                                                                                                                                  |
| `name`                 | `string` |    -     | -                                  | -       | Used as the HTML `name` attribute.                                                                                                                                |
| `onChange`             | `func`   |    ✅    | -                                  | -       | Called when the date range changes. Called with an event containing either an empty array (no value) or an array holding two string in this format: "YYYY-MM-DD". |
| `onFocus`              | `func`   |    -     | -                                  | -       | Called when the date input gains focus.                                                                                                                           |
| `onBlur`               | `func`   |    -     | -                                  | -       | Called when the date input loses focus.                                                                                                                           |
| `value`                | `string` |    -     | -                                  | -       | The selected date range, must either be an empty array or an array of two strings holding dates formatted as "YYYY-MM-DD".                                        |
| `placeholder`          | `string` |    -     | -                                  | -       | Placeholder value to show in the input field                                                                                                                      |
| `isDisabled`           | `bool`   |    -     | -                                  | `false` | Disables the date picker                                                                                                                                          |
| `horizontalConstraint` | `object` |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input field.                                                                                                                         |
| `hasWarning`           | `bool`   |    -     | -                                  | -       | Indicates the input field has a warning                                                                                                                           |
| `hasError`             | `bool`   |    -     | -                                  | -       | Indicates the input field has an error                                                                                                                            |

The component further forwards all `data-` attributes to the underlying `input` component.

### Static methods

#### `DateRangeInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is an empty array.

```js
TextInput.isEmpty([]); // -> true
TextInput.isEmpty(['2018-09-20', '2018-09-24']); // -> false
```
