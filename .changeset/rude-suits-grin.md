---
'@commercetools-uikit/data-table': patch
'@commercetools-uikit/icons': patch
'@commercetools-uikit/checkbox-input': patch
'@commercetools-uikit/radio-input': patch
'@commercetools-uikit/rich-text-utils': patch
---

Fix generated icon components: selected colors are not explicitly mapped, unused IDs are removed (via SVGO), do not use IDs as style selectors.

This is an internal refactoring and should not affect the usage of the components.
