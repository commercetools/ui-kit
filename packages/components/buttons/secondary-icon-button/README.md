# Buttons: SecondaryIconButton

## Description

Secondary Icon Buttons are "icon-only" buttons and a restricted version of the
`<IconButton>`. They trigger an action when clicked (`onClick` prop). You must
also pass a label for accessibility reasons.

## Usage

```js
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';

<SecondaryIconButton
  icon={<ArrowRightIcon />}
  label="Next"
  onClick={() => alert('Button clicked')}
/>;
```

## Properties

| Props        | Type                  | Required | Values                      | Default  | Description                                                                                                                                  |
| ------------ | --------------------- | :------: | --------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`       | `string`              |    -     | `submit`, `reset`, `button` | `button` | Used as the HTML `type` attribute.                                                                                                           |
| `label`      | `string`              |    ✅    | -                           | -        | Should describe what the button does, for accessibility purposes (screen-reader users)                                                       |
| `icon`       | `node`                |    ✅    | -                           | -        | An `Icon` component                                                                                                                          |
| `isDisabled` | `bool`                |    -     | -                           | `false`  | Tells when the button should present a disabled state                                                                                        |
| `onClick`    | `func`                |    ✅    | -                           | -        | What the button will trigger when clicked                                                                                                    |
| `color`      | `oneOf`               |    -     | `solid`, `primary`          | `solid`  | Sets the color of the icon                                                                                                                   |
| `as`         | `string` or `element` |    -     | -                           | -        | You may pass in a string like "a" to have the button render as an anchor tag instead. Or you could pass in a React Component, like a `Link`. |

The component further forwards all valid HTML attributes to the underlying `button` component.

## Note

The size of the button should be adjusted directly on the passed `Icon` component. Example:

```js
<SecondaryIconButton
  icon={<ArrowRightIcon size="small" />}
  label="Next"
  onClick={() => alert('Button clicked')}
/>
```

## Where to use

Mostly in all places where you just need a "clickable" icon, without the complex
behaviours of the `IconButton`

- Pagination list _example: Go to next page_
