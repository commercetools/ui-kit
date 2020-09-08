This input is built on top of [`react-select`](https://github.com/JedWatson/react-select) v2.
It supports mostly same properties as `react-select`. Behaviour for some props was changed, and support for others was dropped.

In case you need one of the currently excluded props, feel free to open a PR adding them.

### Static Properties

#### `isTouched(touched)`

Expects to be called with an array or boolean.
Returns `true` when truthy.

#### Components

It is possible to customize `SelectInput` by passing the `components` property.
`SelectInput` exports the default underlying components as static exports.

Components available as static exports are:

- `ClearIndicator`
- `Control`
- `DropdownIndicator`
- `DownChevron`
- `CrossIcon`
- `Group`
- `GroupHeading`
- `IndicatorsContainer`
- `IndicatorSeparator`
- `Input`
- `LoadingIndicator`
- `Menu`
- `MenuList`
- `MenuPortal`
- `LoadingMessage`
- `NoOptionsMessage`
- `MultiValue`
- `MultiValueContainer`
- `MultiValueLabel`
- `MultiValueRemove`
- `Option`
- `Placeholder`
- `SelectContainer`
- `SingleValue`
- `ValueContainer`

See the [official documentation](https://react-select.com/components) for more information about the props they receive.
