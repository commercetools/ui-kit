---
'@commercetools-frontend/ui-kit': patch
---

Internal-only tooling polish. No consumer-facing changes — published artifacts are functionally identical.

- Cross-workspace dep specifiers migrated to `workspace:^`.
- Shared external dep versions consolidated under `pnpm` catalogs.
- `bundlesize` script and config renamed to `bundlewatch` to match the underlying tool.
