# ContentNotification

## Description

An in-place notification panel.

## Usage

```js
import { ContentNotification } from '@commercetools-uikit/notifications';

<ContentNotification type="error">
  Something went wrong here!
</ContentNotification>;
```

## Properties

| Props         | Type           | Required | Values                                | Default | Description                                                          |
| ------------- | -------------- | :------: | ------------------------------------- | ------- | -------------------------------------------------------------------- |
| `type`        | `string`       |    ✅    | `success`, `info`, `warning`, `error` | -       | Type of notification, determining its appearance.                    |
| `children`    | `node`         | ✅ (\*)  | -                                     | -       | Message to be shown inside a notification panel.                     |
| `intlMessage` | `intl message` | ✅ (\*)  | -                                     | -       | An intl message object that will be rendered with `FormattedMessage` |

> `*`: `children` is required only if `intlMessage` is not provided, and vice-versa
