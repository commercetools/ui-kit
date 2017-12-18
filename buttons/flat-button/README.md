# Buttons: Flat Button

## Usage

```js
import FlatButton from '@commercetools-local/ui-kit/buttons/flat-button';
```

#### Description

Flat buttons are minimal and a flat variation of primary and secondary buttons.

#### Usage

```js
<FlatButton
  type="primary"
  icon={<InformationIcon />}
  label="A label text"
  onClick={() => alert('Button clicked')}
  isDisabled={false}
/>
```

iconClass label url onClick

#### Properties

| Props          | Type      | Required | Values                 | Default   | Description                                           |
| -------------- | --------- | :------: | ---------------------- | --------- | ----------------------------------------------------- |
| `type`         | `oneOf`   |    -     | `primary`, `secondary` | `primary` | -                                                     |
| `label`        | `string`  |    ✅    | -                      | -         | Should describe what the button is for                |
| `onClick`      | `func`    |    ✅    | -                      | -         | What the button will trigger when clicked             |
| `icon`         | `element` |    -     | -                      | -         | The icon of the button                                |
| `iconPosition` | `oneOf`   |    -     | `left`, `right`        | `left`    | The position of the icon                              |
| `isDisabled`   | `boolean` |    -     | -                      | -         | Tells when the button should present a disabled state |

#### Where to use

Main Functions and use cases are:

* Secondary or primary action _example: clear filters_

* Expand/Collapse list of fields _example: product attributes_
