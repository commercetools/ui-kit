# Buttons: Primary Action Button

## Usage

```js
import PrimaryActionButton from '@commercetools-frontend/ui-kit/buttons/primary-action-button';
```

#### Description

The PrimaryActionButton is used for a primary action on a page. You must also pass an
ariaLabel for accessibility reasons.

#### Usage

```js
<PrimaryActionButton
  icon={<AddIcon />}
  ariaLabel="Adds a new product"
  onClick={() => alert('Product added')}
>
  {'Product'}
</PrimaryActionButton>
```

### Dos and don'ts

- `isToggled` should not be used to display business logic. E.g (When a discount is activated). For this, use `ToggleButton` instead.

#### Properties

| Props        | Type     | Required | Values                        | Default  | Description                                                                                                                                                                                                                  |
| ------------ | -------- | :------: | ----------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`         | `string` |    -     | -                             | -        | Used as the HTML `id` attribute.                                                                                                                                                                                             |
| `name`       | `string` |    -     | -                             | -        | Used as the HTML `name` attribute.                                                                                                                                                                                           |
| `ariaLabel`  | `string` |    ✅    | -                             | -        | Should describe what the button does, for accessibility purposes (screen-reader users). E.g a button which contains "x" as a content (implying that this would close some window), should have a "close" string as ariaLabel |
| `children`   | `node`   |    ✅    | -                             | -        | The button text                                                                                                                                                                                                              |
| `icon`       | `node`   |    -     | -                             | -        | The left icon displayed within the button                                                                                                                                                                                    |
| `onClick`    | `func`   |    ✅    | -                             | -        | What the button will trigger when clicked                                                                                                                                                                                    |
| `isToggled`  | `bool`   |    -     | -                             | -        | Tells when the button should present a toggled state.                                                                                                                                                                        |
| `isDisabled` | `bool`   |    -     | -                             | -        | Tells when the button should present a disabled state                                                                                                                                                                        |
| `dataAttr`   | `object` |    -     | -                             | -        | Allows setting custom attributes on the underlying button html element                                                                                                                                                       |
| `type`       | `string` |    -     | ['button', 'reset', 'submit'] | 'button' | Allows setting custom attributes on the underlying button html element                                                                                                                                                       |
| `size`       | `string` |    -     | ['small', 'big']              | 'big'    | The visual size of the button                                                                                                                                                                                                |

Main Functions and use cases are:

- Primary action _example: Save changes_

- Affirming affects _example: Submit a form_

- Attracting attention _example: Add a discount rule_
