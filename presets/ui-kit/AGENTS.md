# @commercetools-frontend/ui-kit

## Purpose

All-in-one preset that re-exports the primary UI Kit components, design tokens,
and selected utilities. This is the main entry point for consumers who want the
full library. Some specialized packages (e.g. `calendar-utils`,
`calendar-time-utils`, `localized-utils`) must be imported directly.

## Key Context

- `src/index.ts` is **manually maintained** — there is no codegen. When a new
  component package is added to the monorepo, it must be manually added here
  as an export and as a dependency in `package.json`.
- Four packages (`buttons`, `fields`, `icons`, `inputs`) use `export *`
  re-exports. All other components use explicit named exports.
- `src/version.ts` contains a placeholder
  (`__@UI_KIT_PACKAGE/VERSION_OF_RELEASE__`) that is replaced during build.
- The `copy-assets` script copies `design-system/materials/` and
  `packages/i18n/data/` into this package before publishing so consumers can
  access CSS custom properties and translation data.

## How To Work Here

- After adding a new component package, add its export to `src/index.ts` and
  add the dependency to `package.json`.
- Run `yarn workspace @commercetools-frontend/ui-kit copy-assets` to refresh
  bundled materials and i18n data.

## Gotchas

- **High-blast-radius file**: `src/index.ts` is the public API surface for the
  all-in-one package. Breaking an export here breaks all consumers using the
  preset.
- Packages re-exported via `export *` must NOT export a `version` property, or
  it will conflict with this package's own version export.
- `materials/` and `i18n/` directories are copied artifacts — do not edit them
  here. Edit at source (`design-system/` and `packages/i18n/`).
