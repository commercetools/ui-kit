---
"@commercetools-local/storybook": patch
---

Storybook 8.6.18 → 9.1.20 upgrade, rolled into FEC-935.

This is internal-only — the storybook workspace is private and the change has no consumer impact. It unblocks FEC-935 by eliminating the v8-era bug where the stories glob picked up `@storybook/react`'s bundled `template/cli/js/Button.jsx` and `Page.jsx` under strict pnpm. Storybook 9's flatter dependency graph removes the offending template directory entirely.

Notable changes (no action required for consumers):

- Consolidated packages dropped from `storybook/package.json`: `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/addon-storysource`, `@storybook/blocks`, `@storybook/manager-api`, `@storybook/react`, `@storybook/test`, `@storybook/theming` (all merged into the core `storybook` package in v9).
- `Meta` / `StoryObj` / `StoryFn` / `Preview` / `Decorator` type imports moved from `@storybook/react` → `@storybook/react-vite` across 92 story files, 2 decorators, and `preview.tsx`.
- Doc blocks moved from `@storybook/blocks` → `@storybook/addon-docs/blocks` across 80 `.readme.mdx` files.
- `manager-api` and `theming` imports moved to the `storybook/manager-api` and `storybook/theming` subpaths.
- Stories glob in `storybook/.storybook/main.ts` tightened to require a literal `src/` segment so it cannot descend into nested `node_modules/` symlinks (strict pnpm leaves workspace deps there).
