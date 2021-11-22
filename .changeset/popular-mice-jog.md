---
'@commercetools-uikit/data-table': patch
---

Allow to pass a generic type for table rows shape.

Example:

```ts
type MyData = {
  id: string,
  name: string,
  roles: string[],
}
<DataTable<MyData>
  // ...
/>
```

The shape should have at least an `id` field.