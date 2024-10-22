# Buttons: Secondary Button

## Description

Secondary buttons are used in combination with a `PrimaryButton` given a
converse secondary action on a page. You must also pass a label for
accessibility reasons.

## Usage

```js
import SecondaryButton from '@commercetools-uikit/secondary-button';

<SecondaryButton
  iconLeft={<InformationIcon />}
  label="Alerts a message"
  onClick={() => alert('Button clicked')}
/>;
```

## Properties

| Props              | Type                  | Required | Values                      | Default     | Description                                                                                                                                      |
| ------------------ | --------------------- | :------: | --------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `label`            | `string`              |    ✅    | -                           | -           | Should describe what the button does, for accessibility purposes (screen-reader users)                                                           |
| `iconLeft`         | `node`                |    -     | -                           | -           | The left icon displayed within the button                                                                                                        |
| `iconRight`        | `node`                |    -     | -                           | -           | The right icon displayed within the button                                                                                                       |
| `isToggleButton`   | `bool`                |    ✅    | -                           | `false`     | If this is active, it means the button will persist in an "active" state when toggled (see `isToggled`), and back to normal state when untoggled |
| `isToggled`        | `bool`                |    -     | -                           | -           | Tells when the button should present a toggled state. It does not have any effect when `isToggleButton` is false                                 |
| `theme`            | `string`              |    -     | `default`, `info`           | `default`   | The component may have a theme only if `isToggleButton` is true. &#xA;This property has been **deprecated** in favor of `tone`.                  |
| `tone`             | `string`              |    -     | `secondary`, `info`         | `secondary` | Indicates the color scheme of the button                                                                                                         |
| `size`             | `string`              |    -     | `'medium' , 'big'`          | `'big'`     | Indicates the size of the button.                                                                                                                |
| `isDisabled`       | `bool`                |    -     | -                           | -           | Tells when the button should present a disabled state                                                                                            |
| `buttonAttributes` | `object`              |    -     | -                           | -           | Allows setting custom attributes on the underlying button html element                                                                           |
| `type`             | `string`              |    -     | `submit`, `reset`, `button` | `button`    | Used as the HTML `type` attribute.                                                                                                               |
| `onClick`          | `func`                |          | -                           | -           | What the button will trigger when clicked                                                                                                        |
| `to`               | `string` or `object`  |    -     | -                           | -           | Where the button should redirect when clicked                                                                                                    |
| `as`               | `string` or `element` |    -     | -                           | -           | You may pass in a string like "a" to have the button render as an anchor tag instead. Or you could pass in a React Component, like a `Link`.     |

The component further forwards all valid HTML attributes to the underlying `button` component.

Main Functions and use cases are:

- Secondary action _example: Discard changes_

- Restoring state _example: Canceling a form_
