# Buttons: Primary Action Button

## Usage

```js
import { PrimaryActionButton } from '@commercetools-frontend/ui-kit';
```

#### Description

The PrimaryActionButton is used for a primary action on a page. You must also pass an
aria label for accessibility reasons.

#### Usage

```js
<PrimaryActionButton
  icon={<AddIcon />}
  onClick={() => alert('Product added')}
  {...{ 'aria-label': 'Adds a new product' }}
>
  {'Product'}
</PrimaryActionButton>
```

### Dos and don'ts

- `isToggled` should not be used to display business logic. E.g (When a discount is activated). For this, use `ToggleButton` instead.

#### Properties

| Props            | Type     | Required | Values                        | Default  | Description                                                                                                                                                                                                                   |
| ---------------- | -------- | :------: | ----------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `string` |    -     | -                             | -        | Used as HTML `id` property                                                                                                                                                                                                    |
| `name`           | `string` |    -     | -                             | -        | Used as HTML `name` property                                                                                                                                                                                                  |
| `label`          | `string` |    ✅    | -                             | -        | The button text                                                                                                                                                                                                               |
| `aria-label`     | `string` |    -     | -                             | -        | Should describe what the button does, for accessibility purposes (screen-reader users). E.g a button which contains "x" as a content (implying that this would close some window), should have a "close" string as aria-label |
| `iconLeft`       | `node`   |    ✅    | -                             | -        | The left icon displayed within the button                                                                                                                                                                                     |
| `onClick`        | `func`   |    ✅    | -                             | -        | What the button will trigger when clicked                                                                                                                                                                                     |
| `isToggleButton` | `bool`   |    -     | -                             | `false`  | If this is active, it means the button will persist in an "active" state when toggled (see `isToggled`), and back to normal state when untoggled                                                                              |
| `isToggled`      | `bool`   |    -     | -                             | -        | Tells when the button should present a toggled state. It does not have any effect when `isToggleButton` is false                                                                                                              |
| `isDisabled`     | `bool`   |    -     | -                             | -        | Tells when the button should present a disabled state                                                                                                                                                                         |
| `type`           | `string` |    -     | ['button', 'reset', 'submit'] | 'button' | Allows setting custom attributes on the underlying button html element                                                                                                                                                        |

Main Functions and use cases are:

- Primary action _example: Save changes_

- Affirming affects _example: Submit a form_

- Attracting attention _example: Add a discount rule_
