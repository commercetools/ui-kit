---
'@commercetools-uikit/selectable-search-input': patch
---

We included two new props (`selectDataProps`, `inputDataProps`) which allow consumers to forward `data-*` html props independently to both the `select` and `input` HTML elements.

If you were providing `data-*` props directly to these component, those will keep being forwarded to the `input` HTML element the same way they currently do but we will intend to remove that behaviour in the future in favour of the new added props.
