# Buttons: Primary Button

## Usage

```js
import { PrimaryButton } from '@commercetools-frontend/ui-kit';
```

#### Description

Primary buttons are used for a primary action on a page. You must also pass a
label for accessibility reasons.

#### Usage

```js
<PrimaryButton
  iconLeft={<InformationIcon />}
  label="Alerts a message"
  onClick={() => alert('Button clicked')}
/>
```

#### Properties

| Props              | Type     | Required | Values                      | Default   | Description                                                                                                                                      |
| ------------------ | -------- | :------: | --------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`             | `oneOf`  |    -     | `submit`, `reset`, `button` | `button`  | Used as the HTML `type` attribute.                                                                                                               |
| `label`            | `string` |    ✅    | -                           | -         | Should describe what the button does, for accessibility purposes (screen-reader users)                                                           |
| `buttonAttributes` | `object` |    -     | -                           | -         | Allows setting custom attributes on the underlying button html element                                                                           |
| `iconLeft`         | `node`   |    ✅    | -                           | -         | The left icon displayed within the button                                                                                                        |
| `isToggleButton`   | `bool`   |    ✅    | -                           | `false`   | If this is active, it means the button will persist in an "active" state when toggled (see `isToggled`), and back to normal state when untoggled |
| `isToggled`        | `bool`   |    -     | -                           | -         | Tells when the button should present a toggled state. It does not have any effect when `isToggleButton` is false                                 |
| `isDisabled`       | `bool`   |    -     | -                           | -         | Tells when the button should present a disabled state                                                                                            |
| `onClick`          | `func`   |    ✅    | -                           | -         | What the button will trigger when clicked                                                                                                        |
| `size`             | `oneOf`  |    -     | `big`, `small`              | `big`     | -                                                                                                                                                |
| `tone`             | `oneOf`  |    -     | `urgent`, `primary`         | `primary` | The component may have a theme only if `isToggleButton` is true                                                                                  |

The component further forwards all `data-` and `aria-` attributes to the underlying `button` component.

Main Functions and use cases are:

- Primary action _example: Save changes_

- Affirming affects _example: Submit a form_

- Attracting attention _example: Add a discount rule_
