---
'@commercetools-frontend/ui-kit': patch
---

Declare `engines.node` on all published packages.

Adds `"engines": { "node": ">=22" }` to every published `@commercetools-uikit/*`
and `@commercetools-frontend/ui-kit` package. Closes one of the publint
suggestions tracked in FEC-936. Pure metadata — no runtime, build, or
consumer-API change.

Consumers installing on Node <22 may see a non-fatal `npm install` engine
warning. Node 22 is the current LTS line; pick a newer Node to silence it.
