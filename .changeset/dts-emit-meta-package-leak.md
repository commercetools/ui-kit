---
"@commercetools-uikit/constraints": patch
"@commercetools-uikit/radio-input": patch
"@commercetools-uikit/view-switcher": patch
---

fix: correct leaked type references in `Constraints`, `RadioInput`, and `ViewSwitcher` declarations

Their published `.d.ts` referenced the aggregate `@commercetools-frontend/ui-kit`
package, which isn't installed when you depend only on the granular
`@commercetools-uikit/*` packages. That unresolved reference collapsed the
affected prop types to `any`, surfacing as `TS7006` errors in strict
TypeScript setups. The declarations now use in-package relative references, so
the prop types resolve correctly. No component API or runtime behavior changed.
