# Label

## Usage

```js
import Label from '@commercetools-local/ui-kit/label';
```

## Example

```jsx
import Label from '@commercetools-local/ui-kit/label';

<Label tone="primary">
  <Text.Detail>{'Hello'}</Text.Detail>
</Label>;
```

## Properties

| Props      | Type             | Required | Values                                                                       | Default |
| ---------- | ---------------- | :------: | ---------------------------------------------------------------------------- | ------- |
| `tone`     | `String`         |    ✅    | `['critical', 'warning', 'positive', 'information', 'primary', 'secondary']` | -       |
| `children` | `PropTypes.node` |    ✅    | -                                                                            | -       |
