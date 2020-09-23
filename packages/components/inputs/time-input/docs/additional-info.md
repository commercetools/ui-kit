## `value`

The value after the field has been blurred is always either valid or an empty string. The input automatically formats the value on blur by calling `onChange` with the formatted value - or with an empty value in case the input was not a valid time.

## Usage in forms

It's likely that you want to use this input to get [`Time`](https://docs.commercetools.com/http-api-types#time) values from the user. Make sure to convert all times to the 24h format using `TimeInput.to24h` when converting the form values to a document for the API.

## Static methods

### `TimeInput.to24h`

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

### `TimeInput.toLocaleTime`

Converts any value to either a formatted value suitable for the locale, or an empty string. The resulting format might use 12h or 24h depending on the locale. If milliseconds are included, the 24h format is returned.

```
Signature: (time: String, locale: String) => String
```

```js
TimeInput.toLocaleTime('10:00', 'en'); // -> '10:00 AM'
TimeInput.toLocaleTime('10:00', 'de'); // -> '10:00'
TimeInput.toLocaleTime('13:00', 'en'); // -> '1:00 PM'
TimeInput.toLocaleTime('13:00', 'de'); // -> '13:00'
TimeInput.toLocaleTime('1:00:00.111 PM', 'en'); // -> '13:00:00.111'
TimeInput.toLocaleTime('13:00:00.111', 'en'); // -> '13:00:00.111'
TimeInput.toLocaleTime('banter', 'en'); // -> ''
```

## Main Functions and use cases are:

- Input field for time
