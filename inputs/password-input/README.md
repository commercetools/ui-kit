# PasswordInput

#### Description

A controlled password input component.

## Usage

```js
import PasswordInput from '@commercetools-frontend/ui-kit/inputs/password-input';

<PasswordInput value="foo" onChange={value => alert(value)} />;
```

#### Properties

| Props                  | Type     | Required |                        Values                         | Default | Description                                                                                            |
| ---------------------- | -------- | :------: | :---------------------------------------------------: | ------- | ------------------------------------------------------------------------------------------------------ |
| `name`                 | `string` |    ✅    |                           -                           | -       | Used as HTML `name` property                                                                           |
| `value`                | `string` |    ✅    |                           -                           | -       | Value of the input                                                                                     |
| `onChange`             | `func`   |    -     |                           -                           | -       | Called with the new value. Required when input is not read only. Parent should pass it back as `value` |
| `onBlur`               | `func`   |    -     |                           -                           | -       | Called when field is blurred                                                                           |
| `onFocus`              | `func`   |    -     |                           -                           | -       | Called when field is focused                                                                           |
| `hasWarning`           | `bool`   |    -     |                           -                           | -       | Indicates the input field has a warning                                                                |
| `hasError`             | `bool`   |    -     |                           -                           | -       | Indicates the input field has an error                                                                 |
| `showPassword`         | `bool`   |    -     |                           -                           | `false` | Indicates whether we show the password or not                                                          |
| `isAutofocussed`       | `bool`   |    -     |                           -                           | -       | Focus the input field on initial render                                                                |
| `isDisabled`           | `bool`   |    -     |                           -                           | `false` | Indicates that the field cannot be used (e.g not authorised, or changes not saved)                     |
| `isReadOnly`           | `bool`   |    -     |                           -                           | `false` | Indicates that the field is displaying read-only content                                               |
| `placeholder`          | `string` |    -     |                           -                           | -       | Placeholder text for the input                                                                         |
| `horizontalConstraint` | `string` |    -     |     `xs` \| `s` \| `m` \| `l` \| `xl` \| `scale`      | `scale` | Horizontal size limit of the input fields.                                                             |
| `autoComplete`         | `string` |    -     | `on` \| `off` \| `current-password` \| `new-password` | -       | Password autocomplete mode                                                                             |

The component further forwards all `data-` attributes to the underlying `input` component.

### Main Functions and use cases are:

- Password field
