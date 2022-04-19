---
'@commercetools-uikit/data-table-manager': patch
---

Due to some dependencies updates (`react-select`) we SLIGHTLY updated the type for the prop `columnManager.searchHiddenColumns`.
This props is used to provide a callback function which is called when the search input for the hidden columns panel changes.
The change should not impact consumers as we are just relaxing the type.

```
// PREVIOUS DEFINITION
searchHiddenColumns?: (searchTerm: string) => Promise<unknown>;

// NEW DEFINITION
searchHiddenColumns?: (searchTerm: string) => Promise<void> | void;
```
