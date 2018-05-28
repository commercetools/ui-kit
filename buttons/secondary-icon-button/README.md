# Buttons: SecondaryIconButton

## Usage

```js
import SecondaryIconButton from '@commercetools-local/ui-kit/buttons/secondary-icon-button';
```

#### Description

Secondary Icon Buttons are "icon-only" buttons and a restricted version of the
`<IconButton>`. They trigger an action when clicked (`onClick` prop). You must
also pass a label for accessibility reasons.

#### Usage

```js
<SecondaryIconButton
  icon={<ArrowRightIcon />}
  label="Next"
  onClick={() => alert('Button clicked')}
/>
```

#### Properties

| Props        | Type     | Required | Values | Default | Description                                                                            |
| ------------ | -------- | :------: | ------ | ------- | -------------------------------------------------------------------------------------- |
| `label`      | `string` |    ✅    | -      | -       | Should describe what the button does, for accessibility purposes (screen-reader users) |
| `onClick`    | `func`   |    ✅    | -      | -       | What the button will trigger when clicked                                              |
| `icon`       | `node`   |    ✅    | -      | -       | An `Icon` component                                                                    |
| `isDisabled` | `bool`   |    -     | -      | `false` | Tells when the button should present a disabled state                                  |

#### Where to use

Mostly in all places where you just need a "clickable" icon, without the complex
behaviours of the `IconButton`

- Pagination list _example: Go to next page_
