## `data-*` props

The component further forwards all `data-` attributes to the underlying `input` component.

## Static methods

### `TextInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is empty or consists of spaces only.

```js
TextInput.isEmpty(''); // -> true
TextInput.isEmpty(' '); // -> true
TextInput.isEmpty('tree'); // -> false
```

## Main Functions and use cases are:

- Input field for single-line strings
