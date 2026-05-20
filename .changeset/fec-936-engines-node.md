---
'@commercetools-frontend/ui-kit': patch
---

Every published `@commercetools-uikit/*` and `@commercetools-frontend/ui-kit`
package now declares `engines.node: ">=22"`. Installing on Node 21 or older
produces a non-fatal `npm install` engine warning; updating to a maintained
LTS line silences it.
