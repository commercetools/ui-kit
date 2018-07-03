# Fields: RequiredIndicator

## Usage

```js
import RequiredIndicator from '@commercetools-frontend/ui-kit/required-indicator';
```

#### Description

The `RequiredIndicator` component indicates a field is required by decorating its label with an `*`.

#### Usage

```js
import RequiredIndicator from '@commercetools-frontend/ui-kit/fields/required-indicator';

<Text.Body>{isRequired ? <RequiredIndicator /> : null}</Text.Body>;
```

#### Properties

| Props       | Type   | Required | Values | Default | Description                            |
| ----------- | ------ | :------: | ------ | ------- | -------------------------------------- |
| `uncolored` | `bool` |          | -      | -       | Sets the \* to the text colour if true |
