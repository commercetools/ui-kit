## `data-*` props

The component further forwards all `data-` attributes to the underlying `input` component.

## Static methods

### `SelectableSearchInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is empty or consists of spaces only.

```js
SelectableSearchInput.isEmpty(''); // -> true
SelectableSearchInput.isEmpty(' '); // -> true
SelectableSearchInput.isEmpty('tree'); // -> false
```

## Main Functions and use cases are:

- Input field for single-line strings. Used for search.
