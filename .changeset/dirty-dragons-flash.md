---
'@commercetools-uikit/select-input': minor
'@commercetools-uikit/select-utils': minor
'@commercetools-uikit/design-system': minor
---

A new property `appearance` has been added to the `SelectInput` component to control its main styles.
Available values are `default` and `quiet`: the first one will just render the component as usual and the latter will render a cleaner version of it.
Bear in mind when using the `quiet` value that it is expected you also use the `auto` value for the `horizontalConstraint` property.