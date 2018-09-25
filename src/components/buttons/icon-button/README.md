# Buttons: Icon Button

## Usage

```js
import { IconButton } from '@commercetools-frontend/ui-kit';
```

#### Description

Icon Buttons are "icon-only" buttons. They trigger an action when clicked
(`onClick` prop). You must also pass a label for accessibility reasons.

#### Usage

```js
<IconButton
  icon={<InformationIcon />}
  label="Alerts a message"
  onClick={() => alert('Button clicked')}
/>
```

#### Properties

| Props            | Type     | Required | Values                   | Default         | Description                                                                                                                                      |
| ---------------- | -------- | :------: | ------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `label`          | `string` |    ✅    | -                        | -               | Should describe what the button does, for accessibility purposes (screen-reader users)                                                           |
| `onClick`        | `func`   |    ✅    | -                        | -               | What the button will trigger when clicked                                                                                                        |
| `isToggleButton` | `bool`   |    ✅    | -                        | `false`         | If this is active, it means the button will persist in an "active" state when toggled (see `isToggled`), and back to normal state when untoggled |
| `isToggled`      | `bool`   |    -     | -                        | -               | Tells when the button should present a toggled state. It does not have any effect when `isToggleButton` is false                                 |
| `shape`          | `oneOf`  |    -     | `round`, `square`        | `round`         | The container shape of the button                                                                                                                |
| `size`           | `oneOf`  |    -     | `big`, `medium`, `small` | `big`           | -                                                                                                                                                |
| `icon`           | `node`   |    -     | -                        | -               | Likely an `Icon` component                                                                                                                       |
| `theme`          | `oneOf`  |    -     | `default`                | `blue`, `green` | The component may have a theme only if `isToggleButton` is true                                                                                  |
| `isDisabled`     | `bool`   |    -     | -                        | -               | Tells when the button should present a disabled state                                                                                            |

#### Where to use

Main Functions and use cases are:

- Secondary action _example: Delete product_

- Minimize effect _example: Reordering table_

- Highlight actions _example: Master variant, set default Shipping billing
  address_

- Save space _example: Manage custom views_
