---
'@commercetools-uikit/localized-rich-text-input': patch
---

Fix regression of `onChange` to pass `target.name` and `target.id` with the locale suffix.

Furthermore, the reset functionality works correctly for all localized inputs.
