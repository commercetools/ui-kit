# Inline

#### Description

If you want to learn more about the spacing components take a look at
[this](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)
article.

#### Usage

```jsx
import { Spacings } from '@commercetools-frontend/ui-kit';

<Spacings.Inline scale="m">
  <FlatButton />
  <FlatButton />
  <FlatButton />
</Spacings.Inline>;
```

#### Properties

| Props            | Type             | Required | Values                                                                                  | Default      |
| ---------------- | ---------------- | :------: | --------------------------------------------------------------------------------------- | ------------ |
| `scale`          | `String`         |    -     | `['xs', 's', 'm', 'l', 'xl']`                                                           | `s`          |
| `alignItems`     | `oneOf`          |    -     | `['stretch', 'flex-start', 'flex-end', 'center', 'baseline']`                           | `flex-start` |
| `justifyContent` | `oneOf`          |    -     | `['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']` | `flex-start` |
| `children`       | `PropTypes.node` |    -     | -                                                                                       | -            |

#### Scales

| Scale | Pixel |
| :---- | :---- |
| xs    | `4`   |
| s     | `8`   |
| m     | `16`  |
| l     | `24`  |
| xl    | `32`  |
