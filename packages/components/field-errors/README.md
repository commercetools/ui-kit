<!-- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. -->
<!-- This file is created by the `yarn generate-readme` script. -->

# FieldErrors

## Description

Renders errors based on configuration.

## Installation

```
yarn add @commercetools-uikit/field-errors
```

```
npm --save install @commercetools-uikit/field-errors
```

Additionally install the peer dependencies (if not present)

```
yarn add react react-intl
```

```
npm --save install react react-intl
```

## Usage

```jsx
import FieldErrors from '@commercetools-uikit/field-errors';

const Example = () => (
  // This example shows how to handle custom errors on top of the
  // predefined errors of FieldErrors which this component and other
  // Field components use under the hood.
  <FieldErrors
    errors={{
      [FieldErrors.errors.MISSING]: true,
      duplicate: true,
      minLength: true,
    }}
    isVisible={true}
    renderError={(key) => {
      switch (key) {
        case 'duplicate':
          return 'This is already in use. It must be unique.';
        default:
          // When null is returned then the default error handling from
          // renderDefaultError will kick in for that error.
          return null;
      }
    }}
    renderDefaultError={(key) => {
      switch (key) {
        case 'minLength':
          return 'This is too short.';
        default:
          // When null is returned then the error handling defined in
          // FieldError itself will kick in
          return null;
      }
    }}
  />
);

export default Example;
```

## Properties

| Props                | Type                                                           | Required | Default | Description                                                                                                                                                                                                                                   |
| -------------------- | -------------------------------------------------------------- | :------: | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                 | `string`                                                       |          |         | ID of the error field.                                                                                                                                                                                                                        |
| `errors`             | `Record`                                                       |          |         | List of errors. Only entries with truthy values will count as active errors.                                                                                                                                                                  |
| `isVisible`          | `boolean`                                                      |          |         | `true` when the error messages should be rendered. Usually you'd pass in a `touched` state of fields.                                                                                                                                         |
| `renderError`        | `Function`<br/>[See signature.](#signature-rendererror)        |          |         | Function which gets called with each error key (from the `errors` prop) and may render an error message or return `null` to hand the error handling off to `renderDefaultError`.                                                              |
| `renderDefaultError` | `Function`<br/>[See signature.](#signature-renderdefaulterror) |          |         | Function which gets called with each error key (from the `errors` prop) for which `renderError` returned `null`.&#xA;It may render an error message or return `null` to hand the error handling off to `FieldError`s built-in error handling. |

## Signatures

### Signature `renderError`

```ts
(key: string, error?: boolean) => ReactNode;
```

### Signature `renderDefaultError`

```ts
(key: string, error?: boolean) => ReactNode;
```

## Static properties

### `FieldErrors.errorTypes`

An enum of known errors which `FieldErrors` can handle itself. You might want to use this while constructing the error object you're passing as the `errors` prop.
