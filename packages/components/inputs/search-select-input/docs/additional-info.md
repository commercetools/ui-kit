## Additional information

The underlying `@commercetools-uikit/async-select-input` is built on top of [`react-select`](https://github.com/JedWatson/react-select) v3. `@commercetools-uikit/async-select-input` supports mostly same properties as `react-select` with some minor changes in the behaviour of some of the props. The `@commercetools-uikit/search-select-input` which is built on top `@commercetools-uikit/async-select-input` has predefined values for some the props. The props that has predefined values in `@commercetools-uikit/search-select-input` are as follows:

- `components.DropdownIndicator`: Default dropdown indicator is replaced with search icon indicator
- `components.Option`: The shown in the dropdown menu can be on of `singled-lined`, `brief-detailed`, or `extended-detailed` types. However if someone still wants to have a different option layout, they can still pass their own `components.Option` to `@commercetools-uikit/search-select-input`
- `isSearchable`: `true`
- `showOptionGroupDivider`: `false`
- `defaultOptions`: `false`

See the [official documentation](https://react-select.com/components) for more information about the props they receive.
