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

| Props                  | Type     | Required | Values                       | Default | Description                                                                                                              |
| ---------------------- | -------- | :------: | ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `id`                   | `string` |    -     | -                            | -       | Used as HTML `id` property                                                                                               |
| `name`                 | `string` |    -     | -                            | -       | Used as HTML `name` property                                                                                             |
| `autoComplete`         | `string` |    -     | -                            | -       | Used as HTML `autocomplete` property                                                                                     |
| `value`                | `string` |    ✅    | -                            | -       | Value of the input                                                                                                       |
| `onChange`             | `func`   |    -     | -                            | -       | Called with an event holding the new value. Required when input is not read only. Parent should pass it back as `value`- |
| `onFocus`              | `func`   |    -     | -                            | -       | Called when field is focused                                                                                             |
| `onBlur`               | `func`   |    -     | -                            | -       | Called when field is blurred                                                                                             |
| `hasError`             | `bool`   |    -     | -                            | -       | Indicates the input field has an error                                                                                   |
| `isAutofocussed`       | `bool`   |    -     | -                            | -       | Focus the input field on initial render                                                                                  |
| `isDisabled`           | `bool`   |    -     | -                            | `false` | Indicates that the field cannot be used (e.g not authorised, or changes not saved)                                       |
| `isReadOnly`           | `bool`   |    -     | -                            | `false` | Indicates that the field is displaying read-only content                                                                 |
| `placeholder`          | `string` |    -     | -                            | -       | Placeholder text for the input                                                                                           |
| `horizontalConstraint` | `object` |          | `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                               |

The value after the field has been blurred is always either valid or an empty string. The input automatically formats the value on blur by calling `onChange` with the formatted value - or with an empty value in case the input was not a valid time.

#### Usage in forms

It's likely that you want to use this input to get [`Time`](https://docs.commercetools.com/http-api-types#time) values from the user. Make sure to convert all times to the 24h format using `TimeInput.to24h` when converting the form values to a document for the API.

### Static methods

#### `TimeInput.to24h`

Returns `true` when the value is considered empty, which is when the value is empty or consists of spaces only.

```js
TimeInput.to24h(''); // -> ''
TimeInput.to24h(' '); // -> ''
TimeInput.to24h('three'); // -> ''
TimeInput.to24h('4 pm'); // -> '16:00'
TimeInput.to24h('4:40 AM'); // -> '04:00'
TimeInput.to24h('3pm'); // -> '15:00'
TimeInput.to24h('4:40 AM'); // -> '04:00'

TimeInput.to24h('15:10'); // -> '15:10'
TimeInput.to24h('15:2'); // -> '15:02'
TimeInput.to24h('04'); // -> '04:00'
TimeInput.to24h('3 AM'); // -> '03:00'
TimeInput.to24h('3 PM'); // -> '15:00'
TimeInput.to24h('3:15 AM'); // -> '03:15'
TimeInput.to24h('3:5 AM'); // -> '03:05'
TimeInput.to24h('0:00'); // -> '00:00'
TimeInput.to24h('10:02:03'); // -> '10:02:03'
TimeInput.to24h('10:2:3'); // -> '10:02:03'
TimeInput.to24h('10:2:3.456'); // -> '10:02:03.456'
TimeInput.to24h('10:2:3.5'); // -> '10:02:03.500'
TimeInput.to24h('10:3.5'); // -> ''
TimeInput.to24h('1300:00.000'); // -> ''
TimeInput.to24h('1300'); // -> ''
TimeInput.to24h('300'); // -> ''
TimeInput.to24h('13:00.000'); // -> ''
TimeInput.to24h('15:09.300'); // -> ''
TimeInput.to24h('10:3.5'); // -> ''
```

### Main Functions and use cases are:

- Input field for time
