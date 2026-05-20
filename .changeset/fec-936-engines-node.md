---
'@commercetools-frontend/ui-kit': patch
---

**FEC-936 — publint metadata cleanup across published packages.** Closes
three of the four publint findings that every published package
emitted. All changes are pure metadata — no build output, runtime, or
consumer-API impact.

- `"engines": { "node": ">=22" }` declared on every published package.
  Consumers installing on Node <22 will see a non-fatal `npm install`
  engine warning.
- `"type": "commonjs"` declared on every published package, matching
  what Preconstruct's `.cjs.js` / `.esm.js` output already required Node
  to assume.
- `repository.url` rewritten from `https://…` to `git+https://…` so the
  field is unambiguously parseable as a git remote.

The fourth finding (`pkg.exports` is missing) is deferred. Adding an
`exports` field via Preconstruct's stable config silently degrades
TypeScript types for consumers using `moduleResolution: "Bundler"` or
`"NodeNext"` (TS resolves through the `module` condition, finds no
`.esm.d.ts` sibling, and types drop to `any`). It will be revisited
separately so the migration can be evaluated against downstream type
resolution properly.

Internal-only:

- `scripts/check-workspace-constraints.js` enforces the new metadata
  shape across the workspace.
- `generators/package-json` template updated to preserve the new fields
  across regenerations.
