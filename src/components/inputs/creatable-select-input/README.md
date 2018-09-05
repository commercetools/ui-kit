# CreatableSelectInput

> ⚠️ This component is in beta!
> We are still experimenting with the API, so it might change heavily.
> The component is still unstyled and docs might be incomplete or outdated.

#### Description

An input component getting a selection from the user, and where options can also be created by the user.

## Usage

```js
import CreatableSelectInput from '@commercetools-frontend/ui-kit/inputs/creatable-select-input';

<CreatableSelectInput
  name="form-field-name"
  value={value}
  onChange={handleChange}
  options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]}
/>;
```

#### Properties

This input is built on top of [`react-select`](https://github.com/JedWatson/react-select) v2.
It supports the same properties as `react-select`, except for `onChange` and `onBlur` for which the behavior was changed.

##### Customized properties

| Props                  | Type       | Required | Values                             | Default | Description                                                                                                                                                                                                                                                                                 |
| ---------------------- | ---------- | :------: | ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `horizontalConstraint` | `object`   |          | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                                                                                                                                                                  |
| `name`                 | `string`   |          |                                    |         | Used as HTML `name` property                                                                                                                                                                                                                                                                |
| `onChange`             | `function` |    ✅    | -                                  | -       | Called with a fake event when value changes. The event's `target.name` will be the `name` supplied in props. The event's `target.value` will hold the value. The value will be the selected option, or an array of options in case `isMulti` is `true`.                                     |
| `onBlur`               | `function` |          | -                                  | -       | Called with a fake event when input is blurred. The event's `target.name` will be the `name` supplied in props. In case `isMulti` is `true`, the name will have `.0` appended which helps with the formik integration.                                                                      |
| `isDisabled`           | `bool`     |          | -                                  | `false` | Indicates that the field cannot be used (e.g not authorised, or changes not saved)                                                                                                                                                                                                          |
| `isMulti`              | `bool`     |          | -                                  | `false` | Multiple values can be selected when this option is checked. The `event` passed to `onChange` will contain an array of values then.                                                                                                                                                         |
| `components`           | `object`   |    -     | -                                  | -       | Overrides for `CreatableSelectInput` conponents , see [what components you can override](https://react-select.com/components)                                                                                                                                                               |
| `options`              | `array`    |          | Items should contain `value` key   |         | Selectable options                                                                                                                                                                                                                                                                          |
| `noOptionsMessage`     | `function` |          |                                    |         | Can be used to render a custom value when there are no options (either because of no search results, or all options have been used, or there were none in the first place). Gets called with `{ inputValue: String }`. `inputValue` will be an empty string when no search text is present. |
| `hasError`             | `bool`     |          | -                                  | -       | Indicates the input field has an error                                                                                                                                                                                                                                                      |

See the [official documentation](https://react-select.com/props) for all other properties.

##### `options`

The options support a `isDisabled` property which will render the option with a disabled style and will prevent users from selecting it.

#### Static Properties

##### `isTouched(touched)`

Expects to be called with an array or boolean.
Returns `true` when truthy.

##### `ClearIndicator`

Default implementation of internal `ClearIndicator` component.
See the [official documentation](https://react-select.com/components).

##### `Control`

Default implementation of internal `Control` component.
See the [official documentation](https://react-select.com/components).

##### `DropdownIndicator`

Default implementation of internal `DropdownIndicator` component.
See the [official documentation](https://react-select.com/components).

##### `DownChevron`

Default implementation of internal `DownChevron` component.
See the [official documentation](https://react-select.com/components).

##### `CrossIcon`

Default implementation of internal `CrossIcon` component.
See the [official documentation](https://react-select.com/components).

##### `Group`

Default implementation of internal `Group` component.
See the [official documentation](https://react-select.com/components).

##### `GroupHeading`

Default implementation of internal `GroupHeading` component.
See the [official documentation](https://react-select.com/components).

##### `IndicatorsContainer`

Default implementation of internal `IndicatorsContainer` component.
See the [official documentation](https://react-select.com/components).

##### `IndicatorSeparator`

Default implementation of internal `IndicatorSeparator` component.
See the [official documentation](https://react-select.com/components).

##### `Input`

Default implementation of internal `Input` component.
See the [official documentation](https://react-select.com/components).

##### `LoadingIndicator`

Default implementation of internal `LoadingIndicator` component.
See the [official documentation](https://react-select.com/components).

##### `Menu`

Default implementation of internal `Menu` component.
See the [official documentation](https://react-select.com/components).

##### `MenuList`

Default implementation of internal `MenuList` component.
See the [official documentation](https://react-select.com/components).

##### `MenuPortal`

Default implementation of internal `MenuPortal` component.
See the [official documentation](https://react-select.com/components).

##### `LoadingMessage`

Default implementation of internal `LoadingMessage` component.
See the [official documentation](https://react-select.com/components).

##### `NoOptionsMessage`

Default implementation of internal `NoOptionsMessage` component.
See the [official documentation](https://react-select.com/components).

##### `MultiValue`

Default implementation of internal `MultiValue` component.
See the [official documentation](https://react-select.com/components).

##### `MultiValueContainer`

Default implementation of internal `MultiValueContainer` component.
See the [official documentation](https://react-select.com/components).

##### `MultiValueLabel`

Default implementation of internal `MultiValueLabel` component.
See the [official documentation](https://react-select.com/components).

##### `MultiValueRemove`

Default implementation of internal `MultiValueRemove` component.
See the [official documentation](https://react-select.com/components).

##### `Option`

Default implementation of internal `Option` component.
See the [official documentation](https://react-select.com/components).

##### `Placeholder`

Default implementation of internal `Placeholder` component.
See the [official documentation](https://react-select.com/components).

##### `SelectContainer`

Default implementation of internal `SelectContainer` component.
See the [official documentation](https://react-select.com/components).

##### `SingleValue`

Default implementation of internal `SingleValue` component.
See the [official documentation](https://react-select.com/components).

##### `ValueContainer`

Default implementation of internal `ValueContainer` component.
See the [official documentation](https://react-select.com/components).
