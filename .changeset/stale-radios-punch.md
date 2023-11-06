---
'@commercetools-uikit/spacings-inset-squish': minor
'@commercetools-uikit/spacings-inset': minor
---

Refactor vertical space usage so consumers can control it.

There's a new property named `height` (available values: `min-content` and `max-content`; the former is the default) that will allow consumers to control the vertical space usage of the component.
When using the `max-content` value, it will force the component main container to use `100%` of the available height.
