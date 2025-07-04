<!-- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. -->
<!-- This file is created by the `yarn generate-readme` script. -->

# RichTextInput

## Description

A controlled rich text input component for rich text with validation states.

## Installation

```
yarn add @commercetools-uikit/rich-text-input
```

```
npm --save install @commercetools-uikit/rich-text-input
```

Additionally install the peer dependencies (if not present)

```
yarn add react react-dom react-intl
```

```
npm --save install react react-dom react-intl
```

## Usage

```jsx
import { useState, useCallback, useRef } from 'react';
import RichTextInput from '@commercetools-uikit/rich-text-input';

const html = '<p>hello world</p>';

const Example = (props) => {
  const [value, setValue] = useState(html);
  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  const ref = useRef(null);
  const handleReset = useCallback(() => {
    ref.current?.resetValue('<p>after reset</p>');
  }, []);

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <RichTextInput value={value} onChange={handleChange} ref={ref} />
    </>
  );
};

export default Example;
```

## Properties

| Props                        | Type                                                                                      | Required | Default | Description                                                                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------- | :------: | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `isAutofocussed`             | `boolean`                                                                                 |          |         | Focus the control when it is mounted                                                                                      |
| `defaultExpandMultilineText` | `boolean`                                                                                 |          |         | Expands multiline text input initially                                                                                    |
| `hasError`                   | `boolean`                                                                                 |          |         | Indicates the input field has an error                                                                                    |
| `hasWarning`                 | `boolean`                                                                                 |          |         | Indicates the input field has warning                                                                                     |
| `id`                         | `string`                                                                                  |          |         | Used as the HTML `id` attribute.                                                                                          |
| `name`                       | `string`                                                                                  |          |         | Used as the HTML `name` attribute.                                                                                        |
| `placeholder`                | `string`                                                                                  |    ✅    |         | Placeholder value to show in the input field                                                                              |
| `isDisabled`                 | `boolean`                                                                                 |          |         | Disables the rich text input                                                                                              |
| `isReadOnly`                 | `boolean`                                                                                 |          |         | Indicates that the rich text input is displaying read-only content                                                        |
| `horizontalConstraint`       | `union`<br/>Possible values:<br/>`, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 'scale', 'auto'` |          |         | Horizontal size limit of the input fields                                                                                 |
| `onChange`                   | `Function`<br/>[See signature.](#signature-onchange)                                      |          |         | Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value. |
| `onFocus`                    | `FocusEventHandler`                                                                       |          |         | Called when input is focused                                                                                              |
| `onBlur`                     | `FocusEventHandler`                                                                       |          |         | Called when input is blurred                                                                                              |
| `value`                      | `string`                                                                                  |          |         | Value of the input component.                                                                                             |
| `showExpandIcon`             | `boolean`                                                                                 |    ✅    |         | Indicates whether the expand icon should be visible                                                                       |
| `onClickExpand`              | `Function`<br/>[See signature.](#signature-onclickexpand)                                 |          |         | Called when the `expand` button is clicked                                                                                |

## Signatures

### Signature `onChange`

```ts
(event: TChangeEvent) => void
```

### Signature `onClickExpand`

```ts
() => boolean;
```

## Static methods

### `RichTextInput.isEmpty`

Returns `true` when the value is considered empty, which is when the value is empty.

```js
RichTextInput.isEmpty(''); // -> true
RichTextInput.isEmpty('<p></p>'); // -> true
RichTextInput.isEmpty('tree'); // -> false
```

### `isTouched(touched)`

Expects to be called with an array or boolean.
Returns `true` when truthy.
