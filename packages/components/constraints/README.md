# Constraint

## Usage

```jsx
import Constraints from '@commercetools-uikit/constraints';

<Constraints.Horizontal constraint="m">
  <DatePicker />
</Constraints.Horizontal>;
```

## Properties

| Props        | Type             | Required | Values                               | Default |
| ------------ | ---------------- | :------: | ------------------------------------ | ------- |
| `constraint` | `String`         |    -     | `'scale', 'xs', 's', 'm', 'l', 'xl'` | `scale` |
| `children`   | `PropTypes.node` |    ✅    | -                                    | -       |

## Scales

| Scale | Pixel   |
| :---- | :------ |
| scale | `100%`  |
| xs    | `50px`  |
| s     | `132px` |
| m     | `355px` |
| l     | `496px` |
| xl    | `768px` |
