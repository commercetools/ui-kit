# Messages: ErrorMessage

## Description

Represents an error message.

## Usage

```js
import { ErrorMessage } from '@commercetools-uikit/messages';

<ErrorMessage>Something went wrong</ErrorMessage>;
```

## Properties

| Props         | Type           | Required | Values | Default | Description                                                          |
| ------------- | -------------- | :------: | ------ | ------- | -------------------------------------------------------------------- |
| `children`    | `node`         | ✅ (\*)  | -      | -       | Error message, either as string or node                              |
| `intlMessage` | `intl message` | ✅ (\*)  | -      | -       | An intl message object that will be rendered with `FormattedMessage` |

> `*`: `children` is required only if `intlMessage` is not provided

Main functions and use cases are:

- Display validation errors of input fields

# Messages: InfoMessage

## Description

Represents an info message.

## Usage

```js
import { InfoMessage } from '@commercetools-uikit/messages';

<InfoMessage>Something went wrong</InfoMessage>;
```

## Properties

| Props         | Type           | Required | Values | Default | Description                                                          |
| ------------- | -------------- | :------: | ------ | ------- | -------------------------------------------------------------------- |
| `children`    | `node`         | ✅ (\*)  | -      | -       | Info message, either as string or node                               |
| `intlMessage` | `intl message` | ✅ (\*)  | -      | -       | An intl message object that will be rendered with `FormattedMessage` |

> `*`: `children` is required only if `intlMessage` is not provided

Main functions and use cases are:

- Display neutral information of input fields

# Messages: WarningMessage

## Description

Represents an warning message.

## Usage

```js
import { WarningMessage } from '@commercetools-uikit/messages';

<WarningMessage>This is a duplicate of {`${duplicate}`}</WarningMessage>;
```

## Properties

| Props         | Type           | Required | Values | Default | Description                                                          |
| ------------- | -------------- | :------: | ------ | ------- | -------------------------------------------------------------------- |
| `children`    | `node`         | ✅ (\*)  | -      | -       | Warning message, either as string or node                            |
| `intlMessage` | `intl message` | ✅ (\*)  | -      | -       | An intl message object that will be rendered with `FormattedMessage` |

> `*`: `children` is required only if `intlMessage` is not provided

Main functions and use cases are:

- Display validation warnings of input fields
