# Stamp

## Description

Stamps are visual labels which hold small amounts of information regarding an item. (E.g Indicating if a product is published in a list)

## Usage

```js
import { Stamp } from '@commercetools-frontend/ui-kit';
```

## Example

```jsx
import Stamp from '@commercetools-frontend/ui-kit/stamp';

<Stamp tone="primary">
  <Text.Detail>{'Hello'}</Text.Detail>
</Stamp>;
```

## Properties

| Props      | Type             | Required | Values                                                                       | Default |
| ---------- | ---------------- | :------: | ---------------------------------------------------------------------------- | ------- |
| `tone`     | `String`         |    ✅    | `['critical', 'warning', 'positive', 'information', 'primary', 'secondary']` | -       |
| `children` | `PropTypes.node` |    ✅    | -                                                                            | -       |
