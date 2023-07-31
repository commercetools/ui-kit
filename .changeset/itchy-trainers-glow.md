---
'@commercetools-uikit/localized-multiline-text-input': patch
'@commercetools-uikit/async-creatable-select-input': patch
'@commercetools-uikit/selectable-search-input': patch
'@commercetools-uikit/creatable-select-input': patch
'@commercetools-uikit/localized-money-input': patch
'@commercetools-uikit/localized-text-input': patch
'@commercetools-uikit/async-select-input': patch
'@commercetools-uikit/search-text-input': patch
'@commercetools-uikit/date-range-input': patch
'@commercetools-uikit/select-input': patch
'@commercetools-uikit/select-utils': patch
'@commercetools-uikit/input-utils': patch
'@commercetools-uikit/money-input': patch
'@commercetools-uikit/date-input': patch
'@commercetools-uikit/time-input': patch
'@commercetools-uikit/calendar-utils': patch
---

Fix behaviour of `auto` value for the `horizontalConstraint` property in all input components.

I was previously making the components to use all its available width (same as `scale` value) and now their width will be calculated based on their contents.
