This input is built on top of [`react-select`](https://github.com/JedWatson/react-select) v2.
It supports mostly same properties as `react-select`. Behaviour for some props was changed, and support for others was dropped.

In case you need one of the currently excluded props, feel free to open a PR adding them.

### Static Properties

#### `isTouched(touched)`

Returns truthy value for the Formik `touched` value of this input field.

## Components

It is possible to customize `AsyncCreatableSelectInput` by passing the `components` property.
`AsyncCreatableSelectInput` exports the default underlying components as static exports.

Components available as static exports are:

- `ClearIndicator`
- `Control`
- `CrossIcon`
- `DownChevron`
- `DropdownIndicator`
- `Group`
- `GroupHeading`
- `IndicatorsContainer`
- `IndicatorSeparator`
- `Input`
- `LoadingIndicator`
- `LoadingMessage`
- `Menu`
- `MenuList`
- `MenuPortal`
- `MultiValue`
- `MultiValueContainer`
- `MultiValueLabel`
- `MultiValueRemove`
- `NoOptionsMessage`
- `Option`
- `Placeholder`
- `SelectContainer`
- `SingleValue`
- `ValueContainer`

See the [official documentation](https://react-select.com/components) for more information about the props they receive.
