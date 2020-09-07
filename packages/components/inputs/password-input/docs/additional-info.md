## `data-*` props

The component further forwards all `data-` attributes to the underlying `input` component.

## Static methods

### `PasswordInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is empty or consists of spaces only.

```js
PasswordInput.isEmpty(''); // -> true
PasswordInput.isEmpty(' '); // -> true
PasswordInput.isEmpty('tree'); // -> false
```

## Main Functions and use cases are:

- Password field
