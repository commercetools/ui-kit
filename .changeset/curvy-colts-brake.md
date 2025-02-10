---
'@commercetools-uikit/async-creatable-select-input': patch
'@commercetools-uikit/creatable-select-input': patch
'@commercetools-uikit/async-select-input': patch
'@commercetools-uikit/select-input': patch
---

We are now using `moduleResolution: bundler` which attempts to optimize to avoid long paths. The re-exported components from `react-select` need to be explicitly typed now, to avoid TypeScript having to infer an internal import path.
