# Inset Squish

#### Description

If you want to learn more about the spacing components take a look at
[this](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)
article.

#### Usage

```jsx
import { Spacings } from '@commercetools-frontend/ui-kit';

// button component that uses InsetSquish
<div className={styles.background}>
  <Spacings.InsetSquish scale="m">
    <Text.Detail>{/* SUBMIT */}</Text.Detail>
  </Spacings.InsetSquish>
</div>;
```

#### Properties

| Props      | Type             | Required | Values            | Default |
| ---------- | ---------------- | :------: | ----------------- | ------- |
| `scale`    | `String`         |    -     | `['s', 'm', 'l']` | `m`     |
| `children` | `PropTypes.node` |    -     | -                 | -       |

#### Scales

| Scale | Pixel       |
| :---- | :---------- |
| s     | `4` x `8`   |
| m     | `8` x `16`  |
| l     | `16` x `32` |
