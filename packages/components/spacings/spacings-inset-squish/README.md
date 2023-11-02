# Inset Squish

## Description

If you want to learn more about the spacing components take a look at
[this](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)
article.

## Usage

```jsx
import SpacingsInsetSquish from '@commercetools-uikit/spacings-inset-squish';

// button component that uses SpacingsInsetSquish
<div className={styles.background}>
  <SpacingsInsetSquish scale="m">
    <Text.Detail>{/* SUBMIT */}</Text.Detail>
  </SpacingsInsetSquish>
</div>;
```

### Using Spacings preset

InsetSquish spacing can be imported and used via `spacings` preset as well.

```jsx
import Spacings from '@commercetools-uikit/spacings';

// button component that uses SpacingsInsetSquish
<div className={styles.background}>
  <Spacings.InsetSquish scale="m">
    <Text.Detail>{/* SUBMIT */}</Text.Detail>
  </Spacings.InsetSquish>
</div>;
```

## Properties

| Props                   | Type             | Required | Values            | Default |
| ----------------------- | ---------------- | :------: | ----------------- | ------- |
| `scale`                 | `String`         |    -     | `['s', 'm', 'l']` | `m`     |
| `useAllAvailableHeight` | `boolean`        |    -     | `true`            | `false` |
| `children`              | `PropTypes.node` |    -     | -                 | -       |

## Scales

| Scale | Pixel       |
| :---- | :---------- |
| s     | `4` x `8`   |
| m     | `8` x `16`  |
| l     | `16` x `32` |
