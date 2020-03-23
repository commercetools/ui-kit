# Buttons: Flat Button

## Description

Flat buttons are minimal and a flat variation of primary and secondary buttons.

## Usage

```js
import FlatButton from '@commercetools-uikit/flat-button';

<FlatButton
  tone="primary"
  icon={<InformationIcon />}
  label="A label text"
  onClick={() => alert('Button clicked')}
  isDisabled={false}
/>;
```

iconClass label url onClick

## Properties

| Props          | Type                  | Required | Values                            | Default   | Description                                                                                                                                  |
| -------------- | --------------------- | :------: | --------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `tone`         | `oneOf`               |    -     | `primary`, `secondary`, `iverted` | `primary` | -                                                                                                                                            |
| `type`         | `string`              |    -     | `submit`, `reset`, `button`       | `button`  | Used as the HTML `type` attribute.                                                                                                           |
| `label`        | `string`              |    ✅    | -                                 | -         | Should describe what the button is for                                                                                                       |
| `onClick`      | `func`                |    ✅    | -                                 | -         | What the button will trigger when clicked                                                                                                    |
| `icon`         | `element`             |    -     | -                                 | -         | The icon of the button                                                                                                                       |
| `iconPosition` | `oneOf`               |    -     | `left`, `right`                   | `left`    | The position of the icon                                                                                                                     |
| `isDisabled`   | `boolean`             |    -     | -                                 | -         | Tells when the button should present a disabled state                                                                                        |
| `as`           | `string` or `element` |    -     | -                                 | -         | You may pass in a string like "a" to have the button render as an anchor tag instead. Or you could pass in a React Component, like a `Link`. |

The component further forwards all valid HTML attributes to the underlying `button` component.

## Where to use

Main Functions and use cases are:

- Secondary or primary action _example: clear filters_

- Expand/Collapse list of fields _example: product attributes_
