## Static methods

### `MultilineTextInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is empty or consists of spaces and linebreaks only.

```js
MultilineTextInput.isEmpty(''); // -> true
MultilineTextInput.isEmpty(' '); // -> true
MultilineTextInput.isEmpty('\n'); // -> true
MultilineTextInput.isEmpty('tree'); // -> false
```

# Dos and don'ts

- Whenever a user input can hold multiline strings this `MultilineTextInput` component is recommended

- Not recommended to be used when the content is single-lined (e.g email address, password etc.)

- The horizontal constraint is not recommended to be smaller than `s` since content may cut off
