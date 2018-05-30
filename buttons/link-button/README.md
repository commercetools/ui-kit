# Buttons: Link Button

## Usage

```js
import LinkButton from '@commercetools-local/ui-kit/buttons/link-button';
```

#### Description

Link buttons are similar to Flat buttons, however they are constructed as a
`<Link>` and they do not have types.

> Requires `react-router`.

#### Usage

```js
<LinkButton
  to={'/foo/bar'}
  iconLeft={<AddIcon />}
  label="A label text"
  isDisabled={false}
/>
```

#### Properties

| Props        | Type      | Required | Values | Default | Description                                           |
| ------------ | --------- | :------: | ------ | ------- | ----------------------------------------------------- |
| `label`      | `string`  |    ✅    | -      | -       | Should describe what the button is for                |
| `to`         | `string`  |    ✅    | -      | -       | The URL that the Link should point to                 |
| `iconLeft`   | `element` |    -     | -      | -       | The icon of the button                                |
| `isDisabled` | `boolean` |    -     | -      | -       | Tells when the button should present a disabled state |

Main Functions and use cases are:

- Back to list _example: a link to going back to another page_
