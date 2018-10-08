# TimeInput

#### Description

The `TimeInput` component allows the user to select a time.
It formats the selected date depending on the locale.

## Usage

```js
import { TimeInput } from '@commercetools-frontend/ui-kit';

<TimeInput value="14:00" onChange={() => {}} />;
```

#### Properties

| Props                  | Type     | Required | Values                             | Default | Description                                                                                                              |
| ---------------------- | -------- | :------: | ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `id`                   | `string` |    -     | -                                  | -       | Used as HTML `id` property                                                                                               |
| `name`                 | `string` |    -     | -                                  | -       | Used as HTML `name` property                                                                                             |
| `value`                | `string` |    ✅    | -                                  | -       | Value of the input                                                                                                       |
| `onChange`             | `func`   |    -     | -                                  | -       | Called with an event holding the new value. Required when input is not read only. Parent should pass it back as `value`- |
| `onBlur`               | `func`   |    -     | -                                  | -       | Called when field is blurred                                                                                             |
| `hasError`             | `bool`   |    -     | -                                  | -       | Indicates the input field has an error                                                                                   |
| `isAutofocussed`       | `bool`   |    -     | -                                  | -       | Focus the input field on initial render                                                                                  |
| `isDisabled`           | `bool`   |    -     | -                                  | `false` | Indicates that the field cannot be used (e.g not authorised, or changes not saved)                                       |
| `isReadOnly`           | `bool`   |    -     | -                                  | `false` | Indicates that the field is displaying read-only content                                                                 |
| `placeholder`          | `string` |    -     | -                                  | -       | Placeholder text for the input                                                                                           |
| `horizontalConstraint` | `object` |          | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                               |

The value after the field has been blurred is always either valid or an empty string. The input automatically formats the value on blur by calling `onChange` with the formatted value - or with an empty value in case the input was not a valid time.

### Static methods

#### `TimeInput.to24h`

Returns `true` when the value is considered empty, which is when the value is empty or consists of spaces only.

```js
TimeInput.to24h(''); // -> ''
TimeInput.to24h(' '); // -> ''
TimeInput.to24h('three'); // -> ''
TimeInput.to24h('4 pm'); // -> 16:00
TimeInput.to24h('4:40 AM'); // -> 04:00
TimeInput.to24h('3pm'); // -> 15:00
```

### Main Functions and use cases are:

- Input field for time
