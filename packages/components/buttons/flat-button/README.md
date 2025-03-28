<!-- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. -->
<!-- This file is created by the `yarn generate-readme` script. -->

# FlatButton

## Description

Flat buttons are minimal and a flat variation of primary and secondary buttons.

## Installation

```
yarn add @commercetools-uikit/flat-button
```

```
npm --save install @commercetools-uikit/flat-button
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
import FlatButton from '@commercetools-uikit/flat-button';
import { InformationIcon } from '@commercetools-uikit/icons';

const Example = () => (
  <FlatButton
    tone="primary"
    icon={<InformationIcon />}
    label="A label text"
    onClick={() => alert('Button clicked')}
    isDisabled={false}
  />
);

export default Example;
```

## Properties

| Props          | Type                                                                                 | Required | Default     | Description                                                                                                                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------ | :------: | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `as`           | `TStringOrComponent`                                                                 |          |             | You may pass in a string like "a" to have the button element render an anchor tag, or&#xA;you could pass in a React Component, like a `Link`.&#xA;<br />&#xA;The `<FlatButton>` additionally accepts any props or attributes specific to the given element or component. |
| `tone`         | `union`<br/>Possible values:<br/>`'primary' , 'secondary' , 'inverted' , 'critical'` |          | `'primary'` | Indicates the color scheme of the button.                                                                                                                                                                                                                                |
| `type`         | `union`<br/>Possible values:<br/>`'submit' , 'reset' , 'button'`                     |          | `'button'`  | Used as the HTML `type` attribute.                                                                                                                                                                                                                                       |
| `label`        | `string`                                                                             |    ✅    |             | Should describe what the button is for.                                                                                                                                                                                                                                  |
| `onClick`      | `Function`<br/>[See signature.](#signature-onclick)                                  |          |             | Handler when the button is clicked.                                                                                                                                                                                                                                      |
| `icon`         | `ReactElement`                                                                       |          |             | The icon of the button.                                                                                                                                                                                                                                                  |
| `iconPosition` | `union`<br/>Possible values:<br/>`'left' , 'right'`                                  |          | `'left'`    | The position of the icon.                                                                                                                                                                                                                                                |
| `isDisabled`   | `boolean`                                                                            |          | `false`     | Determines if the button is disabled.&#xA;<br />&#xA;Note that this influences the `tone` and `onClick` will not be triggered in this state.                                                                                                                             |

## Signatures

### Signature `onClick`

```ts
(
  event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
) => void
```

## Where to use

Main Functions and use cases are:

- Secondary or primary action _example: clear filters_
- Expand/Collapse list of fields _example: product attributes_
