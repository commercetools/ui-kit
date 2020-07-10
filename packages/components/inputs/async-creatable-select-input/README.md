# AsyncCreatableSelectInput

#### Description

An input component getting a selection from an asynchronously loaded list from the user, and where options can be created by the user.

## Usage

```js
import { AsyncCreatableSelectInput } from '@commercetools-frontend/ui-kit';

<AsyncCreatableSelectInput
  name="form-field-name"
  value={value}
  onChange={handleChange}
  options={[
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ]}
/>;
```

## Terminology

### `option`

An `option` is a suggestion the user can select. The option minimally consists of:

`{ label, value }`

An `option` also has the special `__isNew__` property, which gets added when the option was created by the user.

The `options` flow into `AsyncCreatableSelectInput` by either being passed as `defaultOptions` or by being returned from `loadOptions`. The parent finds out about selected options through `onChange` (which passes the selected option values up, including any addition information available on `defaultOptions` or returned from `loadOptions`).

### `value`

There are two types of values:

- the `value` of an `option`
- the `value` of the `AsyncCreatableSelectInput`

#### `value` (of `option`)

Each `option` has a `value`. This is a plain-text string. The `onChange` method is passed the value of the selected option (or the selected options when in `isMulti` mode).

#### `value` (of `AsyncCreatableSelectInput`)

Any parent component using `AsyncCreatableSelectInput` has to pass in a value, which is is the selected option (or an array of selected options when in `isMulti` mode).

#### Properties

#### Properties

| Props                     | Type                | Required | Values                       | Default  | Description                                                                                                                                                                                                                                                                                 |
| ------------------------- | ------------------- | :------: | ---------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `horizontalConstraint`    | `object`            |    -     | `s`, `m`, `l`, `xl`, `scale` | `scale`  | Horizontal size limit of the input fields.                                                                                                                                                                                                                                                  |
| `hasError`                | `bool`              |    -     | -                            | -        | Indicates the input field has an error                                                                                                                                                                                                                                                      |
| `hasWarning`              | `bool`              |    -     | -                            | -        | Indicates the input field has a warning                                                                                                                                                                                                                                                     |
| `aria-label`              | `string`            |    -     | -                            | -        | Aria label (for assistive tech)                                                                                                                                                                                                                                                             |
| `aria-labelledby`         | `string`            |    -     | -                            | -        | HTML ID of an element that should be used as the label (for assistive tech)                                                                                                                                                                                                                 |
| `isAutofocussed`          | `bool`              |    -     | -                            | -        | Focus the control when it is mounted                                                                                                                                                                                                                                                        |
| `backspaceRemovesValue`   | `bool`              |    -     | -                            | `true`   | Remove the currently focused option when the user presses backspace                                                                                                                                                                                                                         |
| `components`              | `objectOf(func)`    |    -     | -                            | -        | Map of components to overwrite the default ones, see [what components you can override](https://react-select.com/components)                                                                                                                                                                |
| `filterOption`            | `func`              |    -     | -                            | -        | Custom method to filter whether an option should be displayed in the menu                                                                                                                                                                                                                   |
| `id`                      | `string`            |    -     | -                            | -        | The id of the search input                                                                                                                                                                                                                                                                  |
| `containerId`             | `string`            |    -     | -                            | -        | The id to set on the SelectContainer component                                                                                                                                                                                                                                              |
| `isClearable`             | `bool`              |    -     | -                            | -        | Is the select value clearable                                                                                                                                                                                                                                                               |
| `isDisabled`              | `bool`              |    -     | -                            | -        | Is the select disabled                                                                                                                                                                                                                                                                      |
| `isReadOnly`              | `bool`              |    -     | -                            | -        | Is the select read-only                                                                                                                                                                                                                                                                     |
| `isOptionDisabled`        | `func`              |    -     | -                            | -        | Override the built-in logic to detect whether an option is disabled                                                                                                                                                                                                                         |
| `isMulti`                 | `bool`              |    -     | -                            | -        | Support multiple selected options                                                                                                                                                                                                                                                           |
| `isSearchable`            | `bool`              |    -     | -                            | `true`   | Whether to enable search functionality                                                                                                                                                                                                                                                      |
| `maxMenuHeight`           | `number`            |    -     | -                            | -        | Maximum height of the menu before scrolling                                                                                                                                                                                                                                                 |
| `menuPortalTarget`        | `HTMLElement`       |    -     | -                            | -        | Dom element to portal the select menu to                                                                                                                                                                                                                                                    |
| `menuPortalZIndex`        | `number`            |    -     | -                            | -        | z-index value for the menu portal                                                                                                                                                                                                                                                           |
| `menuShouldBlockScroll`   | `bool`              |    -     | -                            | `false`  | whether the menu should block scroll while open                                                                                                                                                                                                                                             |
| `name`                    | `string`            |    -     | -                            | -        | Name of the HTML Input (optional - without this, no input will be rendered)                                                                                                                                                                                                                 |
| `noOptionsMessage`        | `func`              |    -     | -                            | -        | Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with `{ inputValue: String }`. `inputValue` will be an empty string when no search text is present. |
| `onBlur`                  | `func`              |    -     | -                            | -        | Handle blur events on the control                                                                                                                                                                                                                                                           |
| `onChange`                | `func`              |    ✅    | -                            | -        | Called with a fake event when value changes. The event's `target.name` will be the `name` supplied in props. The event's `target.value` will hold the value. The value will be the selected option, or an array of options in case `isMulti` is `true`.                                     |
| `onFocus`                 | `func`              |    -     | -                            | -        | Handle focus events on the control                                                                                                                                                                                                                                                          |
| `onInputChange`           | `func`              |    -     | -                            | -        | Handle change events on the input                                                                                                                                                                                                                                                           |
| `placeholder`             | `string`            |    -     | -                            | -        | Placeholder text for the select value                                                                                                                                                                                                                                                       |
| `tabIndex`                | `string`            |    -     | -                            | `"0"`    | Sets the tabIndex attribute on the input                                                                                                                                                                                                                                                    |
| `tabSelectsValue`         | `bool`              |    -     | -                            | `true`   | Select the currently focused option when the user presses tab                                                                                                                                                                                                                               |
| `value`                   | `object` / `array`  |    -     | -                            | -        | The value of the select; reflected by the selected option                                                                                                                                                                                                                                   |
| `defaultOptions`          | `boolean` / `array` |    -     | -                            | -        | The default set of options to show before the user starts searching. When set to true, the results for loadOptions('') will be autoloaded.                                                                                                                                                  |
| `loadOptions`             | `function`          |    -     | -                            | -        | Function that returns a promise, which is the set of options to be used once the promise resolves.                                                                                                                                                                                          |
| `cacheOptions`            | `any`               |    -     | -                            | -        | If cacheOptions is truthy, then the loaded data will be cached. The cache will remain until cacheOptions changes value.                                                                                                                                                                     |
| `allowCreateWhileLoading` | `bool`              |    -     | -                            | -        | Allow options to be created while the isLoading prop is true. Useful to prevent the "create new ..." option being displayed while async results are still being loaded.                                                                                                                     |
| `formatCreateLabel`       | `func`              |    -     | -                            | -        | Gets the label for the "create new ..." option in the menu. Is given the current input value.                                                                                                                                                                                               |
| `isValidNewOption`        | `func`              |    -     | -                            | -        | Determines whether the "create new ..." option should be displayed based on the current input value, select value and options array.                                                                                                                                                        |
| `getNewOptionData`        | `func`              |    -     | -                            | -        | Returns the data for the new option when it is created. Used to display the value, and is passed to onChange.                                                                                                                                                                               |
| `onCreateOption`          | `func`              |    -     | -                            | -        | If provided, this will be called with the input value when a new option is created, and onChange will not be called. Use this when you need more control over what happens when new options are created.                                                                                    |
| `createOptionPosition`    | `string`            |    -     | `"first"`, `"last"`          | `"last"` | Sets the position of the createOption element in your options list.                                                                                                                                                                                                                         |
| `showOptionGroupDivider`  | `boolean`           |    -     | -                            | `false`  | Determines if option groups will be separated by a divider                                                                                                                                                                                                                                  |

This input is built on top of [`react-select`](https://github.com/JedWatson/react-select) v2.
It supports mostly same properties as `react-select`. Behaviour for some props was changed, and support for others was dropped.

In case you need one of the currently excluded props, feel free to open a PR adding them.

#### Static Properties

##### `isTouched(touched)`

Expects to be called with an array or boolean.
Returns `true` when truthy.

##### Components

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
