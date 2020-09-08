## `onChange`

The `onChange` function is forwarded to `<input type="number" />` as-is. So the default behavior of a number-input applies:

The `onChange` function will be called with an event whose `event.target.value` holds an empty string in case the entered value can not be parsed as a number. Otherwise, `onChange` will be called with an event whose `event.target.value` is a string holding the provided number.

## Formik

If you pass `<NumberInput name="foo" onChange={formik.handleChange} />` then Formik will detect that the event stems from a numeric input and convert the value to a number before storing it in `formik.values.foo`. Formik will store an empty string in case the entered value is not a number. So the only types you have to handle are either an empty string or a valid number. Input like `10e2` will be converted to `1000` on `formik.values.foo`. This means that you can just use a number as the initial value of `NumberInput` as well, no need to convert the number to a string! However, you should still convert `undefined` to an empty string in cases where the inital value might be undefined. You can use `NumberInput.toFormValue()` for this.

If you use `<NumberInput name="foo" onChange={event => formik.setFieldValue('foo', event.target.value)} />` then Formik will not know that it is supposed to convert the value to a number, so a string will be stored on `formik.values.foo`. The string will be empty in case the input can not be parsed to a number, or it will be a string holding the valid number. Input like `10e2` will be be kept as `"10e2"` on `formik.values.foo`.

## Static methods

### `NumberInput.toFormValue`

Converts a number, or `undefined` value to a value the input can work with. It replaces non-numbers with an empty string to make sure the underlying input component never turns into an uncontrolled state.

```js
NumberInput.toFormValue(3); // -> 3
NumberInput.toFormValue('3'); // -> '3'
NumberInput.toFormValue(); // -> ''
NumberInput.toFormValue(undefined); // -> ''
```

### `NumberInput.isEmpty`

Returns `true` when `NumberInput` value passed to the function is empty.

```js
NumberInput.isEmpty(); // -> true
NumberInput.isEmpty(undefined); // -> true
NumberInput.isEmpty(NaN); // -> true
NumberInput.isEmpty(2); // -> false
NumberInput.isEmpty('2'); // -> false
```

### `NumberInput.hasFractionDigits`

```js
NumberInput.hasFractionDigits(); // -> throws
NumberInput.hasFractionDigits(2.2); // -> true
NumberInput.hasFractionDigits('2.2'); // -> true
NumberInput.hasFractionDigits('2'); // -> false
NumberInput.hasFractionDigits(2); // -> false
```
