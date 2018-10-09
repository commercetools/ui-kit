# Buttons: Critical Action Button

## Usage

```js
import { CriticalActionButton } from '@commercetools-frontend/ui-kit';
```

#### Description

The CriticalActionButton is used for a critical action on a page. You must also pass an
aria label for accessibility reasons.

#### Usage

```js
<CriticalActionButton
  iconLeft={<AddIcon />}
  onClick={() => alert('Products deleted')}
  aria-label="Deletes all products"
  label="Delete all"
/>
```

### Dos and don'ts

- `isToggled` should not be used to display business logic. E.g (When a discount is activated). For this, use `ToggleButton` instead.

#### Properties

| Props        | Type     | Required | Values                        | Default  | Description                                                                                                                                                                                                                   |
| ------------ | -------- | :------: | ----------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`         | `string` |    -     | -                             | -        | Used as HTML `id` property                                                                                                                                                                                                    |
| `name`       | `string` |    -     | -                             | -        | Used as HTML `name` property                                                                                                                                                                                                  |
| `label`      | `string` |    ✅    | -                             | -        | The button text                                                                                                                                                                                                               |
| `aria-label` | `string` |    -     | -                             | -        | Should describe what the button does, for accessibility purposes (screen-reader users). E.g a button which contains "x" as a content (implying that this would close some window), should have a "close" string as aria-label |
| `iconLeft`   | `node`   |    ✅    | -                             | -        | The left icon displayed within the button                                                                                                                                                                                     |
| `onClick`    | `func`   |    ✅    | -                             | -        | What the button will trigger when clicked                                                                                                                                                                                     |
|              |
| `isToggled`  | `bool`   |    -     | -                             | -        | Tells when the button should present a toggled state. It does not have any effect when `isToggleButton` is false                                                                                                              |
| `isDisabled` | `bool`   |    -     | -                             | -        | Tells when the button should present a disabled state                                                                                                                                                                         |
| `type`       | `string` |    -     | ['button', 'reset', 'submit'] | 'button' | Allows setting custom attributes on the underlying button html element                                                                                                                                                        |

Main Functions and use cases are:

- Confirming _example: Confirm a deletion a form_

- Attracting attention (use with caution) _example: To differ from others PrimaryActionButton's_
