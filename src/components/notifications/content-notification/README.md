# ContentNotification

#### Description

An in-place notification panel.

## Usage

```js
import { ContentNotification } from '@commercetools-frontend/ui-kit';

<ContentNotification type="error">
  Something went wrong here!
</ContentNotification>;
```

#### Properties

| Props      | Type     | Required | Values                                | Default | Description                                       |
| ---------- | -------- | :------: | ------------------------------------- | ------- | ------------------------------------------------- |
| `type`     | `string` |    ✅    | `success`, `info`, `warning`, `error` | -       | Type of notification, determining its appearance. |
| `children` | `node`   |    -     | -                                     | -       | Message to be shown inside a notification panel.  |
