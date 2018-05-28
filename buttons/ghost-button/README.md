# Buttons: Ghost Button

## Usage

```js
import GhostButton from '@commercetools-local/ui-kit/buttons/ghost-button';
```

#### Description

Ghost buttons are minimal and transparent, empty buttons with an `onClick`
action. You must also pass a label for accessibility reasons.

#### Usage

```js
<GhostButton
  iconLeft={<InformationIcon />}
  label="Alerts a message"
  onClick={() => alert('Button clicked')}
/>
```

#### Properties

| Props              | Type     | Required | Values | Default | Description                                                                                                                                      |
| ------------------ | -------- | :------: | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `label`            | `string` |    ✅    | -      | -       | Should describe what the button does, for accessibility purposes (screen-reader users)                                                           |
| `iconLeft`         | `node`   |    ✅    | -      | -       | The left icon displayed within the button                                                                                                        |
| `onClick`          | `func`   |    ✅    | -      | -       | What the button will trigger when clicked                                                                                                        |
| `isToggleButton`   | `bool`   |    ✅    | -      | `false` | If this is active, it means the button will persist in an "active" state when toggled (see `isToggled`), and back to normal state when untoggled |
| `isToggled`        | `bool`   |    -     | -      | -       | Tells when the button should present a toggled state. It does not have any effect when `isToggleButton` is false                                 |
| `isDisabled`       | `bool`   |    -     | -      | -       | Tells when the button should present a disabled state                                                                                            |
| `buttonAttributes` | `object` |    -     | -      | -       | Allows setting custom attributes on the underlying button html element                                                                           |

Main Functions and use cases are:

- General action _example: Filter by attributes_
