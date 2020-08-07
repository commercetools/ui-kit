# PasswordInput

## Description

A controlled password input component.

## Usage

```js
import PasswordInput from '@commercetools-uikit/password-input';

<PasswordInput value="foo" onChange={(event) => alert(event.target.value)} />;
```

## Properties

| Props                  | Type     | Required |                        Values                         | Default | Description                                                                                            |
| ---------------------- | -------- | :------: | :---------------------------------------------------: | ------- | ------------------------------------------------------------------------------------------------------ |
| `id`                   | `string` |    -     |                           -                           | -       | Used as HTML `id` property                                                                             |
| `name`                 | `string` |    -     |                           -                           | -       | Used as HTML `name` property                                                                           |
| `value`                | `string` |    ✅    |                           -                           | -       | Value of the input                                                                                     |
| `onChange`             | `func`   |    -     |                           -                           | -       | Called with the new value. Required when input is not read only. Parent should pass it back as `value` |
| `onBlur`               | `func`   |    -     |                           -                           | -       | Called when field is blurred                                                                           |
| `onFocus`              | `func`   |    -     |                           -                           | -       | Called when field is focused                                                                           |
| `isAutofocussed`       | `bool`   |    -     |                           -                           | -       | Focus the input field on initial render                                                                |
| `isDisabled`           | `bool`   |    -     |                           -                           | `false` | Indicates that the field cannot be used (e.g not authorised, or changes not saved)                     |
| `isReadOnly`           | `bool`   |    -     |                           -                           | `false` | Indicates that the field is displaying read-only content                                               |
| `hasError`             | `bool`   |    -     |                           -                           | -       | Indicates the input field has an error                                                                 |
| `hasWarning`           | `bool`   |    -     |                           -                           | -       | Indicates the input field has a warning                                                                |
| `isPasswordVisible`    | `bool`   |    -     |                           -                           | `false` | Indicates whether we show the password or not                                                          |
| `placeholder`          | `string` |    -     |                           -                           | -       | Placeholder text for the input                                                                         |
| `horizontalConstraint` | `string` |    -     |         `s` \| `m` \| `l` \| `xl` \| `scale`          | `scale` | Horizontal size limit of the input fields.                                                             |
| `autoComplete`         | `string` |    -     | `on` \| `off` \| `current-password` \| `new-password` | -       | Password autocomplete mode                                                                             |

The component further forwards all `data-` attributes to the underlying `input` component.

## Static methods

### `PasswordInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is empty or consists of spaces only.

```js
PasswordInput.isEmpty(''); // -> true
PasswordInput.isEmpty(' '); // -> true
PasswordInput.isEmpty('tree'); // -> false
```

## Main Functions and use cases are:

- Password field
