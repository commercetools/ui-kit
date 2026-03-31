# @commercetools-uikit/design-system

## Purpose

Core design tokens and styling utilities consumed by every component package in
this monorepo and by external consumers via CSS custom properties or JS imports.

## Key Context

- Tokens are defined in `materials/internals/definition.yaml` using a structured
  choices → decisions model: choices define available values (colors, spacing,
  shadows), decisions assign choices to component groups and states.
- Token naming follows a strict pattern:
  `<attribute>-for-<component-group>[-as-<variant>][-when-<state>]`.
- `scripts/generate-design-tokens.js` code-gens from the YAML into:
  - `src/design-tokens.ts` (TypeScript object)
  - `materials/custom-properties.css` (CSS custom properties)
  - `materials/custom-properties.json` (JSON)
  - Theme-aware variants (`custom-properties_default.css`,
    `custom-properties_recolouring.css`)
- `src/icon-utils.ts` and `src/theme-provider.tsx` provide shared icon styling
  and theme context used by all icon and themed components.

## How To Work Here

- Edit `materials/internals/definition.yaml` to add/modify tokens.
- Run `yarn design-tokens:build` to regenerate all output files.
- Run `yarn typecheck` after token changes — downstream components may break.
- Use `yarn design-tokens:build:watch` during iterative development.

## Gotchas

- Never hand-edit files in `materials/` (except `internals/definition.yaml`) or
  `src/design-tokens.ts` — they are overwritten by the generator.
- The YAML enforces allowed states, component groups, and variants. Adding a new
  state or component group requires updating the top-level `states`,
  `componentGroups`, or `variants` keys first.
- `materials/internals/deprecated-tokens.js` is a placeholder for mapping old
  token names to new ones — currently empty, but update it when renaming tokens.
