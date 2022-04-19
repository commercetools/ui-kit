---
'@commercetools-uikit/data-table-manager': patch
---

The return type of the `searchHiddenColumns` function has been refined after we noticed some inconsistencies.

```ts
// Before
searchHiddenColumns?: (searchTerm: string) => Promise<unknown>;

// After
searchHiddenColumns?: (searchTerm: string) => Promise<void> | void;
```

This function is not meant to return any specific value but instead trigger some side effects (e.g. fetching data or updating some state) as a result of the user typing into the search input.

Consumers should not be affected by this change.
