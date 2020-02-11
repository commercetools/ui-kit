# Buttons: Icon Button

#### Description

Icon Buttons are "icon-only" buttons. They trigger an action when clicked
(`onClick` prop). You must also pass a label for accessibility reasons.

#### Usage

```js
import IconButton from '@commercetools-uikit/icon-button';

<IconButton
  icon={<InformationIcon />}
  label="Alerts a message"
  onClick={() => alert('Button clicked')}
/>;
```

#### Properties

| Props            | Type                  | Required | Values                      | Default           | Description                                                                                                                                      |
| ---------------- | --------------------- | :------: | --------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`           | `string`              |    -     | `submit`, `reset`, `button` | `button`          | Used as the HTML `type` attribute.                                                                                                               |
| `label`          | `string`              |    ✅    | -                           | -                 | Should describe what the button does, for accessibility purposes (screen-reader users)                                                           |
| `icon`           | `node`                |    -     | -                           | -                 | Likely an `Icon` component                                                                                                                       |
| `isToggleButton` | `bool`                |    -     | -                           | `false`           | If this is active, it means the button will persist in an "active" state when toggled (see `isToggled`), and back to normal state when untoggled |
| `isToggled`      | `bool`                |    -     | -                           | -                 | Tells when the button should present a toggled state. It does not have any effect when `isToggleButton` is false                                 |
| `isDisabled`     | `bool`                |    -     | -                           | -                 | Tells when the button should present a disabled state                                                                                            |
| `onClick`        | `func`                |    ✅    | -                           | -                 | What the button will trigger when clicked                                                                                                        |
| `shape`          | `oneOf`               |    -     | `round`, `square`           | `round`           | The container shape of the button                                                                                                                |
| `size`           | `oneOf`               |    -     | `big`, `medium`, `small`    | `big`             | -                                                                                                                                                |
| `theme`          | `oneOf`               |    -     | `default`                   | `info`, `primary` | The component may have a theme only if `isToggleButton` is true                                                                                  |
| `as`             | `string` or `element` |    -     | -                           | -                 | You may pass in a string like "a" to have the button render as an anchor tag instead. Or you could pass in a React Component, like a `Link`.     |

The component further forwards all valid HTML attributes to the underlying `button` component.

#### Where to use

Main Functions and use cases are:

- Secondary action _example: Delete product_

- Minimize effect _example: Reordering table_

- Highlight actions _example: Master variant, set default Shipping billing
  address_

- Save space _example: Manage custom views_
