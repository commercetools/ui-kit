# FieldErrors

## Description

Renders errors based on configuration.

## Usage

```jsx
import FieldErrors from '@commercetools-uikit/field-errors';

// This example shows how to handle custom errors on top of the
// predefined errors of FieldErrors which this component and other
// Field components use under the hood.
<FieldErrors
  errors={{
    [FieldErrors.errors.MISSING]: true,
    duplicate: true,
    minLength: true,
  }}
  isVisible={isTouched}
  renderError={(key) => {
    switch (key) {
      case 'duplicate':
        return 'This thing is already in use. It must be unique.';
      default:
        // When null is returned then the default error handling from
        // renderDefaultError will kick in for that error.
        return null;
    }
  }}
  renderDefaultError={(key) => {
    switch (key) {
      case 'minLength':
        return 'This thing is too short.';
      default:
        // When null is returned then the error handling defined in
        // FieldError itself will kick in
        return null;
    }
  }}
/>;
```

## Properties

| Props                | Type     | Required | Values | Default | Description                                                                                                                                                                                                                               |
| -------------------- | -------- | :------: | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `errors`             | `object` |    -     | -      | -       | List of errors. Only entries with truthy values will count as active errors.                                                                                                                                                              |
| `isVisible`          | `bool`   |    -     | -      | -       | `true` when the error messages should be rendered. Usually you'd pass in a `touched` state of fields.                                                                                                                                     |
| `renderError`        | `func`   |    -     | -      | -       | Function which gets called with each error key (from the `errors` prop) and may render an error message or return `null` to hand the error handling off to `renderDefaultError`.                                                          |
| `renderDefaultError` | `func`   |    -     | -      | -       | Function which gets called with each error key (from the `errors` prop) for which `renderError` returned `null`. It may render an error message or return `null` to hand the error handling off to `FieldError`s built-in error handling. |

## Static properties

### `FieldErrors.errorTypes`

An enum of known errors which `FieldErrors` can handle itself. You might want to use this while constructing the error object you're passing as the `errors` prop.
