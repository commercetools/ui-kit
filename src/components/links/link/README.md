# Links: Link

## Usage

```js
import { Link } from '@commercetools-frontend/ui-kit';
```

#### Description

Link buttons are similar to Flat buttons, however they are constructed as a
`<Link>` and they do not have types.

> Requires `react-router`.

#### Usage

```js
<Link to={'/foo/bar'}>Go to foo bar</Link>
```

```js
<Link isExternal={true} to={'https://kanyetothe.com'}>
  Go to external link
</Link>
```

#### Properties

| Props        | Type                                                              | Required | Values | Default | Description                                                                 |
| ------------ | ----------------------------------------------------------------- | :------: | ------ | ------- | --------------------------------------------------------------------------- |
| `to`         | `string` or `{ pathname: String, search: String, query: Object }` |    ✅    | -      | -       | The URL that the Link should point to                                       |
| `isExternal` | `boolean`                                                         |    -     | -      | false   | If true, a regular <a> is rendered instead of the default React Router Link |

The component further forwards all remaining props to the underlying component.

Main Functions and use cases are:

- Used within Content/Text paragraphs
