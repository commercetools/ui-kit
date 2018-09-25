# LoadingSpinner

#### Description

A spinner animation to show the user some information is loading

## Usage

```js
import { LoadingSpinner } from '@commercetools-frontend/ui-kit';

<LoadingSpinner size="s">{'Loading'}</LoadingSpinner>;
```

#### Properties

| Props      | Type     | Required | Values     | Default | Description                                         |
| ---------- | -------- | :------: | ---------- | ------- | --------------------------------------------------- |
| `children` | `string` |          | -          | -       | Used as the text for the loader                     |
| `scale`    | `string` |          | ['l', 's'] | `l`     | Defines the size of the loading spinner's container |

Main Functions and use cases are:

- When fetching requests or processing data
