# Constraint

## Example

```jsx
import Spacings from '@commercetools-local/ui-kit/materials/spacings';

<Spacings.Constraint horizontalConstraint="m">
  <FlatButton />
  <FlatButton />
  <FlatButton />
</Spacings.Constraint>;
```

## Properties

| Props                  | Type             | Required | Values                                 | Default |
| ---------------------- | ---------------- | :------: | -------------------------------------- | ------- |
| `horizontalConstraint` | `String`         |    -     | `['scale', 'xs', 's', 'm', 'l', 'xl']` | `scale` |
| `children`             | `PropTypes.node` |    ✅    | -                                      | -       |

## Scales

| Scale | Pixel   |
| :---- | :------ |
| scale | `100%`  |
| xs    | `50px`  |
| s     | `132px` |
| m     | `355px` |
| l     | `400px` |
| xl    | `768px` |
