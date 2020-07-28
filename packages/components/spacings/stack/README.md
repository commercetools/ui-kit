# Stack

## Description

If you want to learn more about the spacing components take a look at
[this](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)
article.

## Usage

```jsx
import SpacingsStack from '@commercetools-uikit/spacings-stack';

<SpacingsStack scale="m">
  <Card />
  <Card />
  <Card />
</SpacingsStack>;
```

### Using Spacings preset

Stack spacing can be imported and used via `spacings` preset as well.

```jsx
import Spacings from '@commercetools-frontend/spacings';

<Spacings.Stack scale="m">
  <Card />
  <Card />
  <Card />
</Spacings.Stack>;
```

## Properties

| Props        | Type             | Required | Values                                            | Default   |
| ------------ | ---------------- | :------: | ------------------------------------------------- | --------- |
| `scale`      | `String`         |    -     | `['xs', 's', 'm', 'l', 'xl']`                     | `s`       |
| `alignItems` | `oneOf`          |    -     | `['stretch', 'flex-start', 'flex-end', 'center']` | `stretch` |
| `children`   | `PropTypes.node` |    -     | -                                                 | -         |

## Scales

| Scale | Pixel |
| :---- | :---- |
| xs    | `4`   |
| s     | `8`   |
| m     | `16`  |
| l     | `24`  |
| xl    | `32`  |
