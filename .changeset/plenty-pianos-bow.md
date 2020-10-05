---
'@commercetools-uikit/collapsible-motion': patch
---

When closed, the content of the component now gains `visibility: hidden`, which means it's visually hidden from the DOM and removed from the accessibility tree and cannot receive focus, even though it remains present in the layout.
