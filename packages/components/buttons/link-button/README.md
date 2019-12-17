# Buttons: Link Button

## Usage

```js
import { LinkButton } from '@commercetools-ui-kit/link-button';
```

#### Description

Link buttons are similar to Flat buttons, however they are constructed as a
`<Link>` and they do not have types. They also support an `isExternal` prop. When passed,
the Link button is then constructed with a `<a>` instead of the default `<Link>` tag.

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

```js
<LinkButton
  to={'https://kanyetothe.com'}
  iconLeft={<SupportIcon />}
  label="A label text"
  isDisabled={false}
  isExternal={true}
/>
```

#### Properties

| Props        | Type                                                              | Required | Values | Default | Description                                                                 |
| ------------ | ----------------------------------------------------------------- | :------: | ------ | ------- | --------------------------------------------------------------------------- |
| `label`      | `string`                                                          |    ✅    | -      | -       | Should describe what the button is for                                      |
| `to`         | `string` or `{ pathname: String, search: String, query: Object }` |    ✅    | -      | -       | The URL that the Link should point to                                       |
| `iconLeft`   | `element`                                                         |    -     | -      | -       | The icon of the button                                                      |
| `isDisabled` | `boolean`                                                         |    -     | -      | false   | Tells when the button should present a disabled state                       |
| `isExternal` | `boolean`                                                         |    -     | -      | false   | If true, a regular <a> is rendered instead of the default React Router Link |

The component further forwards all remaining props to the underlying component.

Main Functions and use cases are:

- Back to list _example: a link to going back to another page_
