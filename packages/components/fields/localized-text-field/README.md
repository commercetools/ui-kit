<!-- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. -->
<!-- This file is created by the `yarn generate-readme` script. -->

# LocalizedTextField

## Description

A controlled text input component for localized single-line strings with validation states.

## Installation

```
yarn add @commercetools-uikit/localized-text-field
```

```
npm --save install @commercetools-uikit/localized-text-field
```

Additionally install the peer dependencies (if not present)

```
yarn add react
```

```
npm --save install react
```

## Usage

```jsx
import LocalizedTextField from '@commercetools-uikit/localized-text-field';

const Example = () => (
  <LocalizedTextField
    title="Description"
    value={{
      en: 'Parrot that knows how to party',
      de: 'Papagei der ordentlich abfeiert',
    }}
    selectedLanguage="en"
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
```

## Properties

| Props                           | Type                                                                                         | Required | Default   | Description                                                                                                                                                                                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------- | :------: | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                            | `string`                                                                                     |          |           | Used as HTML id property. An id is auto-generated when it is not specified.                                                                                                                                                                                           |
| `horizontalConstraint`          | `union`<br/>Possible values:<br/>`, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 'scale', 'auto'` |          | `'scale'` | Horizontal size limit of the input fields.                                                                                                                                                                                                                            |
| `errors`                        | `Record`                                                                                     |          |           | A map of errors. Error messages for known errors are rendered automatically.&#xA;<br />&#xA;Unknown errors will be forwarded to `renderError`                                                                                                                         |
| `renderError`                   | `Function`<br/>[See signature.](#signature-rendererror)                                      |          |           | Called with custom errors. This function can return a message which will be wrapped in an ErrorMessage. It can also return null to show no error.                                                                                                                     |
| `warnings`                      | `Record`                                                                                     |          |           | A map of warnings. Warning messages for known warnings are rendered automatically.&#xA;<br/>&#xA;Unknown warnings will be forwarded to renderWarning.                                                                                                                 |
| `renderWarning`                 | `Function`<br/>[See signature.](#signature-renderwarning)                                    |          |           | Called with custom warnings, as renderWarning(key, warning). This function can return a message which will be wrapped in a WarningMessage.&#xA;<br />&#xA;It can also return null to show no warning.                                                                 |
| `additionalInfo`                | `Record`                                                                                     |          |           | An object mapping locales to additional messages to be rendered below each input element.&#xA;Example:&#xA;{&#xA;en: 'Some value',&#xA;es: 'Algún valor',&#xA;}                                                                                                       |
| `isRequired`                    | `boolean`                                                                                    |          |           | Indicates if the value is required. Shows an the "required asterisk" if so.                                                                                                                                                                                           |
| `touched`                       | `boolean`                                                                                    |          |           | Indicates whether the field was touched. Errors will only be shown when the field was touched.                                                                                                                                                                        |
| `autoComplete`                  | `string`                                                                                     |          |           | Used as HTML `autocomplete` of the input component. property                                                                                                                                                                                                          |
| `name`                          | `string`                                                                                     |          |           | Used as HTML name of the input component. property                                                                                                                                                                                                                    |
| `value`                         | `Record`                                                                                     |    ✅    |           | Values to use.&#xA;<br />&#xA;Keyed by language, the values are the actual values, e.g. `{ en: 'Horse', de: 'Pferd' }`                                                                                                                                                |
| `onChange`                      | `ChangeEventHandler`                                                                         |          |           | Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.                                                                                                                                             |
| `selectedLanguage`              | `string`                                                                                     |    ✅    |           | Specifies which language will be shown in case the `LocalizedTextInput` is collapsed.                                                                                                                                                                                 |
| `onBlur`                        | `FocusEventHandler`                                                                          |          |           | Called when input is blurred                                                                                                                                                                                                                                          |
| `onFocus`                       | `FocusEventHandler`                                                                          |          |           | Called when input is focused                                                                                                                                                                                                                                          |
| `hideLanguageExpansionControls` | `boolean`                                                                                    |          |           | Will hide the language expansion controls when set to `true`. All languages will be shown when set to `true`.                                                                                                                                                         |
| `defaultExpandLanguages`        | `boolean`                                                                                    |          |           | Controls whether one or all languages are visible by default                                                                                                                                                                                                          |
| `isAutofocussed`                | `boolean`                                                                                    |          |           | Focus the input on initial render                                                                                                                                                                                                                                     |
| `isCondensed`                   | `boolean`                                                                                    |          |           | Whether the text inputs for each localization should render with condensed paddings.                                                                                                                                                                                  |
| `isDisabled`                    | `boolean`                                                                                    |          |           | Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).                                                                                                                                                                        |
| `isReadOnly`                    | `boolean`                                                                                    |          |           | Indicates that the field is displaying read-only content                                                                                                                                                                                                              |
| `placeholder`                   | `Record`                                                                                     |          |           | Placeholders for each language. Object of the same shape as `value`.                                                                                                                                                                                                  |
| `errorsByLanguage`              | `Record`                                                                                     |          |           | Errors for each translation. These are forwarded to the `errors` prop of `LocalizedTextInput`.                                                                                                                                                                        |
| `title`                         | `ReactNode`                                                                                  |    ✅    |           | Title of the label                                                                                                                                                                                                                                                    |
| `hint`                          | `ReactNode`                                                                                  |          |           | Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`. |
| `description`                   | `ReactNode`                                                                                  |          |           | Provides a description for the title.                                                                                                                                                                                                                                 |
| `onInfoButtonClick`             | `Function`<br/>[See signature.](#signature-oninfobuttonclick)                                |          |           | Function called when info button is pressed.&#xA;<br />&#xA;Info button will only be visible when this prop is passed.                                                                                                                                                |
| `hintIcon`                      | `ReactElement`                                                                               |          |           | Icon to be displayed beside the hint text.&#xA;<br />&#xA;Will only get rendered when `hint` is passed as well.                                                                                                                                                       |
| `badge`                         | `ReactNode`                                                                                  |          |           | Badge to be displayed beside the label.&#xA;<br />&#xA;Might be used to display additional information about the content of the field (E.g verified email)                                                                                                            |

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

The `LocalizedTextField` supports some errors out of the box. Return `undefined` from `renderError` for these and the default errors will be shown instead. This prevents consumers from having to reimplement the same error messages for known errors while still keeping the flexibility of showing custom error messages for them.

When the `key` is known, and when the value is truthy, and when `renderError` returned `undefined` for that error entry, then the `LocalizedTextField` will render an appropriate error automatically.

Known error keys are:

- `missing`: tells the user that this field is required

## Static methods

### `LocalizedTextField.toFieldErrors`

Use this function to convert the Formik `errors` object type to our custom field errors type. This is primarily useful when using TypeScript.

```ts
type FormValues = {
  myField: string;
};

<LocalizedTextField
  // ...
  name="my-field"
  errors={LocalizedTextField.toFieldErrors<FormValues>(formik.errors).myField}
/>;
```
