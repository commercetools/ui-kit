## Static methods

### `RichTextInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is empty.

```js
RichTextInput.isEmpty(''); // -> true
RichTextInput.isEmpty('<p></p>'); // -> true
RichTextInput.isEmpty('tree'); // -> false
```

### `isTouched(touched)`

Expects to be called with an array or boolean.
Returns `true` when truthy.
