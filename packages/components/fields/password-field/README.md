<!-- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. -->
<!-- This file is created by the `yarn generate-readme` script. -->

# PasswordField

## Description

A controlled text input component for passwords with validation states.

## Installation

```
yarn add @commercetools-uikit/password-field
```

```
npm --save install @commercetools-uikit/password-field
```

Additionally install the peer dependencies (if not present)

```
yarn add react react-intl
```

```
npm --save install react react-intl
```

## Usage

```jsx
import PasswordField from '@commercetools-uikit/password-field';

const Example = () => (
  <PasswordField
    title="myPassword"
    value="s3cr3t"
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
```

## Properties

| Props                  | Type                                                                                                  | Required | Default   | Description                                                                                                                                                                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | :------: | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string`                                                                                              |          |           | Used as HTML id property. An id is auto-generated when it is not specified.                                                                                                                                                                                           |
| `horizontalConstraint` | `union`<br/>Possible values:<br/>`, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 'scale', 'auto'` |          | `'scale'` | Horizontal size limit of the input fields.                                                                                                                                                                                                                            |
| `errors`               | `Record`                                                                                              |          |           | A map of errors. Error messages for known errors are rendered automatically.&#xA;<br />&#xA;Unknown errors will be forwarded to `renderError`                                                                                                                         |
| `warnings`             | `Record`                                                                                              |          |           | A map of warnings. Warning messages for known warnings are rendered automatically.&#xA;<br/>&#xA;Unknown warnings will be forwarded to renderWarning.                                                                                                                 |
| `renderError`          | `Function`<br/>[See signature.](#signature-rendererror)                                               |          |           | Called with custom errors. This function can return a message which will be wrapped in an ErrorMessage. It can also return null to show no error.                                                                                                                     |
| `renderWarning`        | `Function`<br/>[See signature.](#signature-renderwarning)                                             |          |           | Called with custom warnings, as renderWarning(key, warning). This function can return a message which will be wrapped in a WarningMessage.&#xA;<br />&#xA;It can also return null to show no warning.                                                                 |
| `isRequired`           | `boolean`                                                                                             |          |           | Indicates if the value is required. Shows an the "required asterisk" if so.                                                                                                                                                                                           |
| `touched`              | `boolean`                                                                                             |          |           | Indicates whether the field was touched. Errors will only be shown when the field was touched.                                                                                                                                                                        |
| `name`                 | `string`                                                                                              |          |           | Used as HTML name of the input component. property                                                                                                                                                                                                                    |
| `value`                | `string`                                                                                              |    ✅    |           | Value of the input component.                                                                                                                                                                                                                                         |
| `onChange`             | `ChangeEventHandler`                                                                                  |          |           | Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.                                                                                                                                             |
| `onBlur`               | `FocusEventHandler`                                                                                   |          |           | Called when input is blurred                                                                                                                                                                                                                                          |
| `onFocus`              | `FocusEventHandler`                                                                                   |          |           | Called when input is focused                                                                                                                                                                                                                                          |
| `isAutofocussed`       | `boolean`                                                                                             |          |           | Focus the input on initial render                                                                                                                                                                                                                                     |
| `isDisabled`           | `boolean`                                                                                             |          |           | Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).                                                                                                                                                                        |
| `isReadOnly`           | `boolean`                                                                                             |          |           | Indicates that the field is displaying read-only content                                                                                                                                                                                                              |
| `placeholder`          | `string`                                                                                              |          |           | Placeholder text for the input                                                                                                                                                                                                                                        |
| `autoComplete`         | `union`<br/>Possible values:<br/>`'on' , 'off' , 'current-password' , 'new-password'`                 |          |           | Password autocomplete mode                                                                                                                                                                                                                                            |
| `title`                | `union`<br/>Possible values:<br/>`string , ReactNode`                                                 |    ✅    |           | Title of the label                                                                                                                                                                                                                                                    |
| `hint`                 | `union`<br/>Possible values:<br/>`string , ReactNode`                                                 |          |           | Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`. |
| `description`          | `union`<br/>Possible values:<br/>`string , ReactNode`                                                 |          |           | Provides a description for the title.                                                                                                                                                                                                                                 |
| `onInfoButtonClick`    | `Function`<br/>[See signature.](#signature-oninfobuttonclick)                                         |          |           | Function called when info button is pressed.&#xA;<br />&#xA;Info button will only be visible when this prop is passed.                                                                                                                                                |
| `hintIcon`             | `ReactElement`                                                                                        |          |           | Icon to be displayed beside the hint text.&#xA;<br />&#xA;Will only get rendered when `hint` is passed as well.                                                                                                                                                       |
| `badge`                | `ReactNode`                                                                                           |          |           | Badge to be displayed beside the label.&#xA;<br />&#xA;Might be used to display additional information about the content of the field (E.g verified email)                                                                                                            |
| `renderShowHideButton` | `boolean`                                                                                             |          | `true`    | Determines whether to render the "Show/Hide" button for the password field.                                                                                                                                                                                           |

## Signatures

### Signature `renderError`

```ts
(key: string, error?: boolean) => ReactNode;
```

### Signature `renderWarning`

```ts
(key: string, warning?: boolean) => ReactNode;
```

### Signature `onInfoButtonClick`

```ts
(
  event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
) => void
```

## `data-*` props

The component further forwards all `data-` attributes to the underlying `input` component.

## `errors`

This object is a key-value map. The `renderError` prop will be called for each entry with the key and the value. The return value will be rendered inside an `ErrorMessage` component underneath the input.

The `PasswordField` supports some errors out of the box. Return `undefined` from `renderError` for these and the default errors will be shown instead. This prevents consumers from having to reimplement the same error messages for known errors while still keeping the flexibility of showing custom error messages for them.

When the `key` is known, and when the value is truthy, and when `renderError` returned `undefined` for that error entry, then the `TextField` will render an appropriate error automatically.

Known error keys are:

- `missing`: tells the user that this field is required

## Main Functions and use cases are:

- Password field in login forms

## Static methods

### `PasswordField.toFieldErrors`

Use this function to convert the Formik `errors` object type to our custom field errors type. This is primarily useful when using TypeScript.

```ts
type FormValues = {
  myField: string;
};

<PasswordField
  // ...
  name="my-field"
  errors={PasswordField.toFieldErrors<FormValues>(formik.errors).myField}
/>;
```
