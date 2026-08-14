---
'@commercetools-uikit/date-input': patch
'@commercetools-uikit/date-range-input': patch
'@commercetools-uikit/date-time-input': patch
---

Migrate date inputs from Downshift render-prop API to `useCombobox` hook to fix `TypeError: t.contains is not a function` crash in downshift@9.3.6 with React 19.
