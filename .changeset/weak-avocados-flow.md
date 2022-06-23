---
'@commercetools-uikit/collapsible-panel': patch
---

Fix auto ID generation.

There was an issue when using several `CollapsiblePanel` components in the same view and relying on them to auto generate the IDs used for the rendered HTML resulting in the same ID value for all the components.
