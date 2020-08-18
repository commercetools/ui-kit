---
'@commercetools-local/generator-readme': patch
'@commercetools-uikit/data-table': patch
---

Check for required `columns` prop for `DataTable` on runtime. This is important to allow compound components such as `DataTableManager` to inject the `columns` prop, as otherwise the prop types validation would fail.
