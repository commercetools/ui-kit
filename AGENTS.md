# commercetools UI Kit

## What This Repo Does

React component library implementing the commercetools Design System. These
components are consumed by Merchant Center custom applications and other
commercetools frontend products. Published to npm under `@commercetools-uikit/*`
(individual packages) and `@commercetools-frontend/ui-kit` (all-in-one preset).

## Start Here

- **Toolchain:** Node 24 (`.nvmrc`), Yarn 3 (Berry), React 19 peer dependency —
  verify these before installing. Do not assume React 18 patterns.
- **Dev loop:** `yarn start` launches Storybook (the canonical visual playground).
- **Fast test feedback:** `yarn workspace @commercetools-uikit/<pkg> test` runs
  a single package's tests without walking the whole repo.

## Architecture

This is a Yarn 3 (Berry) workspaces monorepo. Packages fall into these categories:

- **`design-system/`** — Design tokens and shared styling utilities. Tokens are
  defined in `design-system/materials/internals/definition.yaml` and code-genned
  into TypeScript, CSS custom properties, and JSON via
  `design-system/scripts/generate-design-tokens.js`. All component packages
  depend on this.
- **`packages/components/`** — Individual UI components (buttons, inputs, fields,
  icons, spacings, etc.). Each is published as its own npm package. Fields
  compose an input with a label + error display. Components use Emotion for
  CSS-in-JS and `react-intl` for i18n.
- **`packages/`** (top-level) — Shared utilities (`utils`, `hooks`,
  `localized-utils`, `calendar-utils`, `calendar-time-utils`) and the `i18n`
  package containing all translation messages.
- **`presets/`** — Convenience packages that re-export groups of component
  packages (e.g. `@commercetools-uikit/buttons` re-exports all button types).
  `presets/ui-kit` is the all-in-one `@commercetools-frontend/ui-kit` package.
- **`storybook/`** — Storybook playground (private, not published).
- **`visual-testing-app/`** — Vite app used by Percy for visual regression
  testing (private).
- **`generators/`** — Scaffolding tools for package.json and README generation
  (private).

Data flow for design tokens: YAML definitions →
`generate-design-tokens.js` → TypeScript source (`design-system/src/`) + CSS
custom properties (`design-system/materials/`). Components import tokens from
`@commercetools-uikit/design-system`.

Data flow for icons: raw SVGs (`packages/components/icons/src/svg/*.react.svg`)
→ `svgr` with custom template (`svgr.config.js`) → generated React components
(`packages/components/icons/src/generated/`).

Data flow for i18n: component `messages.ts` files → `formatjs extract` →
`packages/i18n/data/core.json` → translated JSON files per locale →
`formatjs compile-folder` → `packages/i18n/compiled-data/`.

All publishable packages are built via Preconstruct. Changesets manages
versioning — all `@commercetools-frontend/*` and `@commercetools-uikit/*`
packages are in a fixed version group (they share the same version number).

## How To Make Changes

### Verify your work

| Task              | Command                                          | Notes                                        |
| ----------------- | ------------------------------------------------ | -------------------------------------------- |
| Test one package  | `yarn workspace @commercetools-uikit/<pkg> test` | Fastest feedback for a single package        |
| Test by path      | `yarn test packages/components/buttons`          | Positional path; matches any tests under it  |
| Typecheck         | `yarn typecheck`                                 | Runs `tsc --noEmit --skipLibCheck`           |
| Lint              | `yarn lint`                                      | Uses Jest runner for ESLint                  |
| Visual test suite | `yarn test:visual`                               | Runs `--runInBand`; needs visual-testing-app |

### Common workflows

**Add a new icon:**

1. Add the raw SVG to `packages/components/icons/src/svg/` — file must end with
   `.react.svg`
2. Run `yarn generate-icons` to generate the React component in
   `packages/components/icons/src/generated/`
3. Run `yarn preconstruct dev` to create entrypoint stubs

**Update design tokens:**

1. Edit `design-system/materials/internals/definition.yaml`
2. Run `yarn design-tokens:build` to regenerate TypeScript + CSS outputs
3. Run `yarn typecheck` — token changes can break components

**Add or update translations:**

1. Define messages in the component's `messages.ts`
2. Run `yarn extract-intl` to update `packages/i18n/data/core.json`
3. Add translations to the locale JSON files in `packages/i18n/data/`
4. Run `yarn compile-intl` to produce compiled output

**Add a changeset for a PR:**

1. Run `yarn changeset`
2. Select affected packages, semver bump type, and describe the change
3. Commit the generated `.changeset/*.md` file with the PR

**Full build (rarely needed locally):**

Run `yarn build` — wraps codegen and `preconstruct build` into one step.

## Boundaries

- All `@commercetools-uikit/*` and `@commercetools-frontend/ui-kit` packages are
  **published to npm** under a fixed version group — every semver bump applies to
  all packages. Treat all public API changes as semver-significant.
- `storybook/`, `visual-testing-app/`, and `generators/` are **private** — not
  published, no semver obligations.
- Components should be **domain-agnostic** — no commercetools business logic.
  They implement the design system, not product features.
- Peer dependencies: consumers must provide `react`, `react-dom`, and typically
  `react-intl`. Do not bundle these.

## Gotchas

- **Generated files must not be hand-edited.** Icon components in
  `packages/components/icons/src/generated/` and design token outputs are
  overwritten by codegen scripts. Edit the SVG source or `definition.yaml`
  instead.
- **Icon SVG filenames have a convention:** they must end with `.react.svg`.
  The filename drives the exported component name (e.g.
  `angle-down.react.svg` → `AngleDownIcon`).
- **All publishable packages share a single version.** The changeset `fixed`
  config groups `@commercetools-frontend/*` and `@commercetools-uikit/*`
  together — a bump to one bumps all.
- **Lint runs through Jest runners**, not directly via `eslint` CLI. Use
  `yarn lint:js` or `yarn lint`, not `npx eslint`.
- **Pre-commit hooks** run Prettier, lint (via Jest), and `tsc-files` on staged
  `.ts`/`.tsx` files. Expect these to block if types are broken.
- **Visual specs** (`.visualspec.js` / `.visualroute.jsx`) are consumed by Percy
  for visual regression testing. If you change component appearance, the visual
  spec may need updating and Percy snapshots must be approved.
- **Yarn constraints** (`constraints.pro`) enforce metadata consistency (license,
  repository fields, publishConfig) across all public packages.

## Conventions

- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
  — enforced by commitlint. Scopes may contain slashes (e.g.
  `refactor(app/my-component): ...`).
- Component files follow a naming pattern:
  `<component-name>.tsx`, `<component-name>.spec.js`,
  `<component-name>.stories.tsx`, `<component-name>.styles.ts`,
  `<component-name>.visualroute.jsx`, `<component-name>.visualspec.js`.
- Each component has an `export-types.ts` that re-exports its public types and
  a `version.ts` that re-exports the package version.
- Tests use `@testing-library/react` — behavior-driven, no shallow rendering.
- CSS-in-JS uses Emotion (`@emotion/react` with `css` prop / `ClassNames`).

## Further Reading

- `design-system/materials/internals/TOKENS.md` — design token structure reference
- `.changeset/README.md` — changesets workflow
