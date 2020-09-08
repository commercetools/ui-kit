## `data-*` props

The component further forwards all `data-` attributes to the underlying `input` component.

## Static methods

### `DateRangeInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is an empty array.

```js
TextInput.isEmpty([]); // -> true
TextInput.isEmpty(['2018-09-20', '2018-09-24']); // -> false
```
