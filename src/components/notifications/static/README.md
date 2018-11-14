# MoneyInput

#### Description

An in-place notification panel.

## Usage

```js
import { Notifications } from '@commercetools-frontend/ui-kit';

<Notifications.Static type="error">
  Something went wrong here!
</Notifications.Static>;
```

#### Properties

| Props      | Type     | Required | Values                                | Default | Description                                       |
| ---------- | -------- | :------: | ------------------------------------- | ------- | ------------------------------------------------- |
| `children` | `node`   |    -     | -                                     | -       | Message to be shown inside a notification panel.  |
| `type`     | `string` |    -     | `success`, `info`, `warning`, `error` | -       | Type of notification, determining its appearance. |
