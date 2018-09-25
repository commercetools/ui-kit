# Inset

If you want to learn more about the spacing components take a look at
[this](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)
article.

## Example

```jsx
import { Spacings } from '@commercetools-frontend/ui-kit';

<Spacings.Inset scale="m">{/* Container with padding 🎉  */}</Spacings.Inset>;
```

## Properties

| Props      | Type             | Required | Values                        | Default |
| ---------- | ---------------- | :------: | ----------------------------- | ------- |
| `scale`    | `String`         |    -     | `['xs', 's', 'm', 'l', 'xl']` | `x`     |
| `children` | `PropTypes.node` |    -     | -                             | -       |

## Scales

| Scale | Pixel |
| :---- | :---- |
| xs    | `4`   |
| s     | `8`   |
| m     | `16`  |
| l     | `24`  |
| xl    | `32`  |
