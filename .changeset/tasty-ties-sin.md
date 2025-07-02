---
'@commercetools-uikit/data-table': patch
---

Fix DataTable cell alignment props not working.
verticalCellAlignment and horizontalCellAlignment were not passed from DataRow to DataCell, causing default alignment to apply instead.