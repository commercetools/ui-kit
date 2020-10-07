## `data-*` props

The component further forwards all `data-` attributes to the underlying `SearchSelectInput` component.

The underlying `@commercetools-uikit/search-select-input` is built on top of `@commercetools-uikit/async-select-input` which on its own turn is built on top of [`react-select`](https://github.com/JedWatson/react-select) v3. `@commercetools-uikit/async-select-input` supports mostly the same properties as `react-select` with some minor changes in the behaviour of some of the props. The `@commercetools-uikit/search-select-input` which is built on top `@commercetools-uikit/async-select-input` has predefined values for some the props. The props that have predefined values in `@commercetools-uikit/search-select-input` are as follows:

In case you need one of the currently excluded props, feel free to open a PR adding them to either `@commercetools-uikit/search-select-input` or `@commercetools-uikit/async-select-input`.

## `errors`

This object is a key-value map. The `renderError` prop will be called for each entry with the key and the value. The return value will be rendered inside an `ErrorMessage` component underneath the input.

The `SearchSelectField` supports some errors out of the box. Return `undefined` from `renderError` for these and the default errors will be shown instead. This prevents consumers from having to reimplement the same error messages for known errors while still keeping the flexibility of showing custom error messages for them.

When the `key` is known, and when the value is truthy, and when `renderError` returned `undefined` for that error entry, then the `SearchSelectField` will render an appropriate error automatically.

Known error keys are:

- `missing`: tells the user that this field is required
