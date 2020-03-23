# LoadingSpinner

## Description

A spinner animation to show the user some information is loading

## Usage

```js
import { LoadingSpinner } from '@commercetools-frontend/ui-kit';

<LoadingSpinner size="s">{'Loading'}</LoadingSpinner>;
```

## Properties

| Props      | Type     | Required | Values   | Default | Description                                         |
| ---------- | -------- | :------: | -------- | ------- | --------------------------------------------------- |
| `scale`    | `string` |          | 's', 'l' | `l`     | Defines the size of the loading spinner's container |
| `children` | `string` |          | -        | -       | Used as the text for the loader                     |

Main Functions and use cases are:

- When fetching requests or processing data
