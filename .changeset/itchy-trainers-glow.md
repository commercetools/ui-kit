---
'@commercetools-uikit/async-creatable-select-input': patch
'@commercetools-uikit/selectable-search-input': patch
'@commercetools-uikit/creatable-select-input': patch
'@commercetools-uikit/async-select-input': patch
'@commercetools-uikit/select-input': patch
'@commercetools-uikit/select-utils': patch
---

Fix behaviour of `auto` value for the `horizontalConstraint` property in all `select` input components.

I was previously making the components to use all its available width (same as `scale` value) and now their width will be calculated based on their contents (placeholder or selected value).
