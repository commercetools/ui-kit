---
'@commercetools-frontend/ui-kit': patch
---

Internal: post-pnpm tooling polish — rewrite cross-workspace dep specifiers to `workspace:^`, adopt pnpm catalogs for shared external deps, rename `bundlesize` script and config to `bundlewatch`. No consumer-facing changes; published artifacts are functionally identical (pnpm resolves `workspace:^` and `catalog:` to concrete versions at publish time).

Side effect: structurally fixes the manypkg/release-flow drift that blocks the Version Packages PR. The root `ui-kit/package.json` previously pinned its 5 internal cross-workspace deps to the prior release version; when `changeset version` bumped the workspaces to the next version it skipped the private root workspace, leaving the root's specifiers stale and tripping `manypkg check` in postinstall. With `workspace:^`, the root auto-tracks each workspace's current `version`, so the bump no longer creates drift.
