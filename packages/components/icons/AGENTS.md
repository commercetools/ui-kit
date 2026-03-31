# @commercetools-uikit/icons

## Purpose

All SVG icons rendered as React components, consumed by other UI Kit components
and by external applications.

## Key Context

- Uses SVGR with a custom template (`svgr.config.js` at repo root) to transform
  raw SVGs into Emotion-styled React components.
- Each icon gets its own Preconstruct entrypoint via the `preconstruct.entrypoints`
  config in `package.json` — this enables per-icon tree-shaking.
- Also exports `CustomIcon`, `InlineSvg`, and `LeadingIcon` utility components
  from dedicated sub-entrypoints.

## How To Work Here

- Add new SVGs to `src/svg/` with a `.react.svg` extension.
- Run `yarn generate-icons` to regenerate `src/generated/` components and the
  index file.
- Run `yarn preconstruct dev` to create entrypoint stubs for new icons.
- The `generate-icons` command also runs for `checkbox-input` and
  `rich-text-utils` packages (see root `package.json` script).

## Gotchas

- Everything in `src/generated/` is auto-generated — never hand-edit.
- The SVG filename drives the component name:
  `angle-down.react.svg` → `AngleDownIcon`. Renaming an SVG is a breaking change.
- The SVGR template wraps each icon in Emotion's `ClassNames` for dynamic styling
  via `getIconStyles()` from `@commercetools-uikit/design-system`.
