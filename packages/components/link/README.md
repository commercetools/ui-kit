# Links: Link

## Description

Links are used either to link to other ui routes, or to link to external pages. This component is a very thin wrapper over either a React Router Link, or a normal HTML <a> tag.

> Requires `react-router`.

## Usage

```js
import Link from '@commercetools-uikit/link';

<Link to={'/foo/bar'}>Go to foo bar</Link>

<Link isExternal={true} to={'https://kanyetothe.com'}>
  Go to external link
</Link>
```

## Properties

| Props          | Type                                                              | Required | Values                | Default   | Description                                                                 |
| -------------- | ----------------------------------------------------------------- | :------: | --------------------- | --------- | --------------------------------------------------------------------------- |
| `to`           | `string` or `{ pathname: String, search: String, query: Object }` |    ✅    | -                     | -         | The URL that the Link should point to                                       |
| `children`     | `node`                                                            | ✅ (\*)  | -                     | -         | Value of the link                                                           |
| `intlMessage`  | `intl message`                                                    | ✅ (\*)  | -                     | -         | An intl message object that will be rendered with `FormattedMessage`        |
| `isExternal`   | `boolean`                                                         |    -     | -                     | false     | If true, a regular <a> is rendered instead of the default React Router Link |
| `hasUnderline` | `boolean`                                                         |    -     | -                     | true      | Either sets text-decoration to none or to underline                         |
| `tone`         | `oneOf`                                                           |    -     | `primary`, `inverted` | `primary` | Color of the link                                                           |

> `*`: `children` is required only if `intlMessage` is not provided, and vice-versa

The component further forwards all remaining props to the underlying component. The external link includes `target="_blank"` and `rel="noopener noreferrer"` by default.

Main Functions and use cases are:

- Used within Content/Text paragraphs
