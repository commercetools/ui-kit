---
'@commercetools-uikit/checkbox-input': patch
---

Changed the label of the input to render as a `span` instead of `p`, allowing to render more complex labels without causing DOM Warnings due to nesting unallowed elements inside a `p`.
