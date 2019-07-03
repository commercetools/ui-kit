# Links: Link

## Usage

```js
import { Link } from '@commercetools-frontend/ui-kit';
```

#### Description

Links are used either to link to other ui routes, or to link to external pages. This component is a very thin wrapper over either a React Router Link, or a normal HTML <a> tag.

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

| Props          | Type                                                              | Required | Values | Default | Description                                                                 |
| -------------- | ----------------------------------------------------------------- | :------: | ------ | ------- | --------------------------------------------------------------------------- |
| `to`           | `string` or `{ pathname: String, search: String, query: Object }` |    ✅    | -      | -       | The URL that the Link should point to                                       |
| `isExternal`   | `boolean`                                                         |    -     | -      | false   | If true, a regular <a> is rendered instead of the default React Router Link |
| `hasUnderline` | `boolean`                                                         |    -     | -      | true    | Either sets text-decoration to none or to underline                         |

The component further forwards all remaining props to the underlying component. The external link includes `target="_blank"` and `rel="noopener noreferrer"` by default.

Main Functions and use cases are:

- Used within Content/Text paragraphs
