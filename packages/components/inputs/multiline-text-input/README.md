<!-- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. -->
<!-- This file is created by the `yarn generate-readme` script. -->

# MultilineTextInput

## Description

A controlled text input component for multi-line strings with validation states.

## Installation

```
yarn add @commercetools-uikit/multiline-text-input
```

```
npm --save install @commercetools-uikit/multiline-text-input
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
import MultilineTextInput from '@commercetools-uikit/multiline-text-input';

const Example = () => (
  <MultilineTextInput
    value="foo"
    onChange={
      (/** event */) => {
        // alert(event.target.value)
      }
    }
  />
);

export default Example;
```

## Properties

| Props                        | Type                                                                                         | Required | Default | Description                                                                                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------- | :------: | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                       | `string`                                                                                     |          |         | Used as HTML name of the input component. property                                                                                                            |
| `aria-invalid`               | `boolean`                                                                                    |          |         | Indicate if the value entered in the input is invalid.                                                                                                        |
| `aria-errormessage`          | `string`                                                                                     |          |         | HTML ID of an element containing an error message related to the input.                                                                                       |
| `autoComplete`               | `string`                                                                                     |          |         | Used as HTML `autocomplete` property                                                                                                                          |
| `id`                         | `string`                                                                                     |          |         | Used as HTML id property. An id is auto-generated when it is not specified.                                                                                   |
| `value`                      | `string`                                                                                     |    ✅    |         | Value of the input component.                                                                                                                                 |
| `onChange`                   | `ChangeEventHandler`                                                                         |          |         | Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.                                     |
| `onBlur`                     | `FocusEventHandler`                                                                          |          |         | Called when input is blurred                                                                                                                                  |
| `onFocus`                    | `FocusEventHandler`                                                                          |          |         | Called when input is focused                                                                                                                                  |
| `isAutofocussed`             | `boolean`                                                                                    |          |         | Focus the input on initial render                                                                                                                             |
| `defaultExpandMultilineText` | `boolean`                                                                                    |          | `false` | Expands multiline text input initially                                                                                                                        |
| `isDisabled`                 | `boolean`                                                                                    |          |         | Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).                                                                |
| `isReadOnly`                 | `boolean`                                                                                    |          |         | Indicates that the field is displaying read-only content                                                                                                      |
| `placeholder`                | `string`                                                                                     |          |         | Placeholder text for the input                                                                                                                                |
| `hasError`                   | `boolean`                                                                                    |          |         | Indicates that input has errors                                                                                                                               |
| `hasWarning`                 | `boolean`                                                                                    |          |         | Control to indicate on the input if there are selected values that are potentially invalid                                                                    |
| `horizontalConstraint`       | `union`<br/>Possible values:<br/>`, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 'scale', 'auto'` |          |         | Horizontal size limit of the input fields.                                                                                                                    |
| `rightActionIcon`            | `ReactElement`                                                                               |          |         | Custom action icon to be displayed on the right side of the input.&#xA;**Will only show**, if `rightActionProps` is provided.                                 |
| `rightActionProps`           | `TSecondaryButtonIconProps`                                                                  |          |         | Props for the right-action icon-button. Required when rightActionIcon is provided.&#xA;At least a `label` and an `onClick` prop/function need to be provided. |
| `isCondensed`                | `boolean`                                                                                    |          |         | Set this to `true` to reduce the paddings of the input allowing the input to display&#xA;more data in less space.                                             |
| `maxRows`                    | `number`                                                                                     |          |         | Set this to value to determine the maximum text rows of the text area.&#xA;Any text overflow past this row number would implement a scroll                    |

## Static methods

### `MultilineTextInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is empty or consists of spaces and linebreaks only.

```js
MultilineTextInput.isEmpty(''); // -> true
MultilineTextInput.isEmpty(' '); // -> true
MultilineTextInput.isEmpty('\n'); // -> true
MultilineTextInput.isEmpty('tree'); // -> false
```

# Dos and don'ts

- Whenever a user input can hold multiline strings this `MultilineTextInput` component is recommended

- Not recommended to be used when the content is single-lined (e.g email address, password etc.)

- The horizontal constraint is not recommended to be smaller than `s` since content may cut off
