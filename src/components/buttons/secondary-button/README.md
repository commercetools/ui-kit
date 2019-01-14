# Buttons: Secondary Button

## Usage

```js
import { SecondaryButton } from '@commercetools-frontend/ui-kit';
```

#### Description

Secondary buttons are used in combination with a `PrimaryButton` given a
converse secondary action on a page. You must also pass a label for
accessibility reasons.

#### Usage

```js
<SecondaryButton
  iconLeft={<InformationIcon />}
  label="Alerts a message"
  onClick={() => alert('Button clicked')}
/>
```

#### Properties

| Props              | Type                 | Required | Values                      | Default   | Description                                                                                                                                      |
| ------------------ | -------------------- | :------: | --------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `label`            | `string`             |    ✅    | -                           | -         | Should describe what the button does, for accessibility purposes (screen-reader users)                                                           |
| `iconLeft`         | `node`               |    ✅    | -                           | -         | The left icon displayed within the button                                                                                                        |
| `isToggleButton`   | `bool`               |    ✅    | -                           | `false`   | If this is active, it means the button will persist in an "active" state when toggled (see `isToggled`), and back to normal state when untoggled |
| `isToggled`        | `bool`               |    -     | -                           | -         | Tells when the button should present a toggled state. It does not have any effect when `isToggleButton` is false                                 |
| `theme`            | `string`             |    -     | `default`, `blue`           | `default` | The component may have a theme only if `isToggleButton` is true                                                                                  |
| `isDisabled`       | `bool`               |    -     | -                           | -         | Tells when the button should present a disabled state                                                                                            |
| `buttonAttributes` | `object`             |    -     | -                           | -         | Allows setting custom attributes on the underlying button html element                                                                           |
| `type`             | `string`             |    -     | `submit`, `reset`, `button` | `button`  | Used as the HTML `type` attribute.                                                                                                               |
| `onClick`          | `func`               |          | -                           | -         | What the button will trigger when clicked                                                                                                        |
| `linkTo`           | `string` or `object` |    -     | -                           | -         | Where the button should redirect when clicked                                                                                                    |

Main Functions and use cases are:

- Secondary action _example: Discard changes_

- Restoring state _example: Canceling a form_
