# SelectInput

> ⚠️ This component is in beta!
> We are still experimenting with the API, so it might change heavily.
> The component is still unstyled and docs might be incomplete or outdated.

#### Description

An input component getting a selection from the user.

## Usage

```js
import SelectInput from '@commercetools-frontend/ui-kit/inputs/select-input';

<SelectInput
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

| Props                  | Type       | Required | Values                 | Default | Description                                                                                                                                                                                                                                                     |
| ---------------------- | ---------- | :------: | ---------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `horizontalConstraint` | `string`   |          | xs, s, m, l, xl, scale | -       | Used as HTML `name` property                                                                                                                                                                                                                                    |
| `onChange`             | `function` |    ✅    | -                      | -       | Called with a fake event when value changes. The event's `target.name` will be the `name` supplied in props. The event's `target.value` will hold the value. The value will be a the selected option, or an array of options in case `props.isMulti` is `true`. |
| `onBlur`               | `function` |    -     | -                      | -       | Called with a fake event when input is blurred. The event's `target.name` will be the `name` supplied in props. In case `props.isMulti` is `true`, the name will have `.0` appended which helps with the formik integration.                                    |

See the [official documentation](https://react-select.com/props) for all other properties.
