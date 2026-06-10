---
"@commercetools-uikit/constraints": patch
"@commercetools-uikit/radio-input": patch
"@commercetools-uikit/view-switcher": patch
---

fix: stop declaration emit from leaking `@commercetools-frontend/ui-kit` into published types

The compound components (`Constraints`, `RadioInput`, `ViewSwitcher`) emitted
`import("@commercetools-frontend/ui-kit").T...Props` in their published `.d.ts`.
Strict consumers that install only the granular `@commercetools-uikit/*`
packages don't have the aggregate preset, so the reference resolved to `any` —
collapsing event-handler prop types and producing `TS7006` on a minor upgrade.

The leak was triggered by `@commercetools-frontend/ui-kit` becoming a root
`devDependency` (so the `.visualroute`/`bundlespec` fixtures resolve under
strict pnpm), which made the bare specifier resolvable during preconstruct's
declaration emit. The build now hides that symlink for the emit step only, so
the correct in-package relative specifier is used. No component API changed.
