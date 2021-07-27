---
'@commercetools-uikit/avatar': patch
'@commercetools-uikit/accessible-button': patch
'@commercetools-uikit/flat-button': patch
'@commercetools-uikit/icon-button': patch
'@commercetools-uikit/primary-button': patch
'@commercetools-uikit/secondary-button': patch
'@commercetools-uikit/secondary-icon-button': patch
'@commercetools-uikit/field-errors': patch
'@commercetools-uikit/link': patch
'@commercetools-uikit/tooltip': patch
---

Fix TypeScript signatures for `as` props in buttons. Now TypeScript correctly infers and checks any props or attributes specific to the component passed to the `as` prop.

For example, if you need to pass `Link` (from React Router) to a `<FlatButton>`, you need to provide the `to` prop.

```js
<FlatButton as={Link} to="/foo" label="Foo" />
```

Previously TypeScript would show an error that the `to` prop is not recognized by the `<FlatButton>` component. Now, TypeScript is able to do that correctly.

> NOTE: the generated `prop-types` will define the `as` prop as `any`. This is because the actual type is a generic type and it cannot be statically defined.
