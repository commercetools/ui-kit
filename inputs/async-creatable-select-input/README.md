# AsyncCreatableSelectInput

> ⚠️ This component is in beta!
> We are still experimenting with the API, so it might change heavily.
> The component is still unstyled and docs might be incomplete or outdated.

#### Description

An input component getting a selection from an asynchronously loaded list from the user, and where options can be created by the user.

## Usage

```js
import AsyncCreatableSelectInput from '@commercetools-frontend/ui-kit/inputs/async-creatable-select-input';

<AsyncCreatableSelectInput
  name="form-field-name"
  value={value}
  onChange={handleChange}
  options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]}
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

This input is built on top of [`react-select`](https://github.com/JedWatson/react-select) v2.
It supports the same properties as `react-select`, except for `onChange` and `onBlur` for which the behavior was changed.

##### Customized properties

| Props                  | Type       | Required | Values                 | Default | Description                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------- | ---------- | :------: | ---------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `horizontalConstraint` | `string`   |    -     | xs, s, m, l, xl, scale | -       | Horizontal size limit of the input fields.                                                                                                                                                                                                                                                                                                                        |
| `onChange`             | `function` |    ✅    | -                      | -       | Called with a fake event when value is changed by user. The event's `target.name` will be the `name` supplied in props. The event's `target.value` will hold the value. The value will be a the selected option, or an array of options in case `props.isMulti` is `true`. The second argument is an object containing information about the cause of the change. |
| `onBlur`               | `function` |    -     | -                      | -       | Called with a fake event when input is blurred. The event's `target.name` will be the `name` supplied in props. In case `props.isMulti` is `true`, the name will have `.0` appended which helps with the formik integration.                                                                                                                                      |
| `hasWarning`           | `bool`     |    -     | -                      | -       | Indicates the input field has a warning                                                                                                                                                                                                                                                                                                                           |
| `hasError`             | `bool`     |    -     | -                      | -       | Indicates the input field has an error                                                                                                                                                                                                                                                                                                                            |

See the [official documentation](https://react-select.com/props) for all other properties.
