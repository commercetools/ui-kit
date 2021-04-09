# Inline

## Description

If you want to learn more about the spacing components take a look at
[this](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)
article.

## Usage

```jsx
import SpacingsInline from '@commercetools-uikit/spacings-inline';

<SpacingsInline scale="m">
  <FlatButton />
  <FlatButton />
  <FlatButton />
</SpacingsInline>;
```

### Using Spacings preset

Inline spacing can be imported and used via `spacings` preset as well.

```jsx
import Spacings from '@commercetools-uikit/spacings';

<Spacings.Inline scale="m">
  <FlatButton />
  <FlatButton />
  <FlatButton />
</Spacings.Inline>;
```

## Properties

| Props            | Type             | Required | Values                                                                                  | Default      |
| ---------------- | ---------------- | :------: | --------------------------------------------------------------------------------------- | ------------ |
| `scale`          | `String`         |    -     | `['xs', 's', 'm', 'l', 'xl']`                                                           | `s`          |
| `alignItems`     | `oneOf`          |    -     | `['stretch', 'flex-start', 'flex-end', 'center', 'baseline']`                           | `flex-start` |
| `justifyContent` | `oneOf`          |    -     | `['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']` | `flex-start` |
| `children`       | `PropTypes.node` |    -     | -                                                                                       | -            |

If you need to use `flex-wrap` CSS property, consider using instead the component [`<Grid />`](https://uikit.commercetools.com/?path=/story/components-grid--grid).

## Scales

| Scale | Pixel |
| :---- | :---- |
| xs    | `4`   |
| s     | `8`   |
| m     | `16`  |
| l     | `24`  |
| xl    | `32`  |
