---
'@commercetools-uikit/dropdown-menu': patch
'@commercetools-uikit/data-table-manager': patch
---

We fixed an issue with the `DropdownMenu` component when using these values:

* `menuPosition`: right
* `menuHorizontalConstraint`: auto

In that situation, the width and positioning of the floating menu was not correctly calculated.
